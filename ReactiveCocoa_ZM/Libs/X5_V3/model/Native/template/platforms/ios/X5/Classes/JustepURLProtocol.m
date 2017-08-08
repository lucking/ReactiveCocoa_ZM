//
//  JustepURLProtocol.m
//  CachedWebView
//
//  Created by 007slm on 6/25/14.
//
//
#import <AssetsLibrary/ALAsset.h>
#import <AssetsLibrary/ALAssetRepresentation.h>
#import <AssetsLibrary/ALAssetsLibrary.h>
#import <MobileCoreServices/MobileCoreServices.h>
#import "NSData+AES128.h"

#import "JustepURLProtocol.h"

@implementation JustepURLProtocol

+(BOOL)canInitWithRequest:(NSURLRequest *)request{
    NSString *localURI = [JustepURLProtocol getLocalURIByURL:request];
    NSLog(@"localURI:%@",localURI);
    localURI = [JustepURLProtocol pathForResource:localURI];
    
    NSLog(@"pathForResource:%@",localURI);
    //获取程序Documents目录路径
    NSFileManager *fileManager = [NSFileManager defaultManager];
    if([fileManager fileExistsAtPath:localURI]){
        NSLog(@"本地存在文件:%@",localURI);
        return YES;
    }
    NSLog(@"本地不存在文件:%@",localURI);
    return NO;
}

+(NSString *)getLocalURIByURL:(NSURLRequest *)request{
    NSString *baseURL = @"";
    if ([[request URL] port] == nil) {
        baseURL = [NSString stringWithFormat:@"%@://%@/",[[request URL] scheme],[[request URL] host]];
    }else{
        baseURL = [NSString stringWithFormat:@"%@://%@:%@/",[[request URL] scheme],[[request URL] host],[[request URL] port]];
    }
    if (!([[[request URL] scheme] isEqualToString:@"http"] || [[[request URL] scheme] isEqualToString:@"https"])) {
        return [[request URL] absoluteString];
    }
    NSString *localURI = [[[request URL] absoluteString] stringByReplacingOccurrencesOfString:baseURL withString:@""];
    
    NSRange range = [localURI rangeOfString:@"?"];
    if (range.length > 0 ) {
       localURI = [localURI substringToIndex:range.location];
    }
    
    NSRange rangeMao = [localURI rangeOfString:@"#"];
    if (rangeMao.length > 0 ) {
        localURI = [localURI substringToIndex:rangeMao.location];
    }
    return localURI;
}

+ (NSString*)pathForResource:(NSString*)resourcepath{
    NSBundle* mainBundle = [NSBundle mainBundle];
    NSMutableArray* directoryParts = [NSMutableArray arrayWithArray:[resourcepath componentsSeparatedByString:@"/"]];
    NSString* filename = [directoryParts lastObject];
    [directoryParts removeLastObject];
    NSString* directoryPartsJoined = [directoryParts componentsJoinedByString:@"/"];
    NSString* directoryStr = @"www";
    
    if ([directoryPartsJoined length] > 0) {
        directoryStr = [NSString stringWithFormat:@"%@/%@/", @"www", [directoryParts componentsJoinedByString:@"/"]];
    }
    return [mainBundle pathForResource:filename ofType:@"" inDirectory:directoryStr];
}


+ (NSURLRequest *)canonicalRequestForRequest:(NSURLRequest *)request{
    return request;
}


-(NSString *)getMimeType:(NSString *)localURI{
    NSString *extension = [localURI pathExtension];
    
    CFStringRef typeId = UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension, (__bridge CFStringRef)extension, NULL);
    NSString* mimeType = @"*/*";
    if (typeId) {
        mimeType = (__bridge_transfer NSString*)UTTypeCopyPreferredTagWithClass(typeId, kUTTagClassMIMEType);
        if (!mimeType) {
            // special case for m4a
            if ([(__bridge NSString*)typeId rangeOfString : @"m4a-audio"].location != NSNotFound) {
                mimeType = @"audio/mp4";
            } else if ([[localURI pathExtension] rangeOfString:@"wav"].location != NSNotFound) {
                mimeType = @"audio/wav";
            }
        }
        CFRelease(typeId);
    }
    if ([[extension lowercaseString] isEqualToString:@"w"]){
        mimeType = @"text/html";
    }
    NSLog(@"extension:%@",extension);
    return mimeType;
}

Boolean needDecrypted = false;

-(void)startLoading{
    NSLog(@"%@", [[self.request URL] absoluteString]);
    NSString *localURI = [JustepURLProtocol getLocalURIByURL:[self request]];
    localURI = [JustepURLProtocol pathForResource:localURI];
    NSString* mimeType = [self getMimeType:localURI];
    NSURLResponse *response = [[NSURLResponse alloc] initWithURL:[self.request URL]
                                                        MIMEType:mimeType
                                           expectedContentLength:-1
                                                textEncodingName:nil];
    NSData *data = [NSData dataWithContentsOfFile:localURI];
    [[self client] URLProtocol:self didReceiveResponse:response cacheStoragePolicy:NSURLCacheStorageAllowed];
    
    if(needDecrypted && ([localURI rangeOfString:@"/www/plugins/"].length <= 0) && ([localURI rangeOfString:@"/www/cordova"].length <= 0)){
        NSData *decryptedData =[data AES128Decrypt];
        [[self client] URLProtocol:self didLoadData:decryptedData];
    }else{
        [[self client] URLProtocol:self didLoadData:data];
    }
    [[self client] URLProtocolDidFinishLoading:self];
}

- (void)stopLoading{
    NSLog(@"stoploading!");
}

@end