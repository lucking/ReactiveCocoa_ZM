//

//  X5
//
//  Created by 007slm on 12/24/14.
//
//
#import <UIKit/UIKit.h>

#import <CommonCrypto/CommonDigest.h>
#import <CommonCrypto/CommonCryptor.h>
#import <CommonCrypto/CommonHMAC.h>
#import "NSData+AES128.h"
#import <CommonCrypto/CommonCryptor.h>

@implementation NSData (AES128)

- (NSData *)AES128Decrypt{
    const unsigned char bytes[] = {49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 49, 50, 51, 52, 53, 54};
    //const unsigned char bytes[] =  {63, 24, -78, 68, 10, -57, -73, -97, 14, -98, 49, 87, -72, -80, -23, 35};
    NSData *keyData = [NSData dataWithBytes:bytes length:sizeof(bytes)];
    NSString *key = [[NSString alloc] initWithData:keyData encoding:NSASCIIStringEncoding];
    char keyPtr[kCCKeySizeAES128 + 1];
    bzero(keyPtr, sizeof(keyPtr));
    [key getCString:keyPtr maxLength:sizeof(keyPtr) encoding:NSASCIIStringEncoding];
    NSUInteger dataLength = [self length];
    size_t bufferSize           = dataLength + kCCBlockSizeAES128;
    void* buffer                = malloc(bufferSize);
    size_t numBytesDecrypted    = 0;
    CCCryptorStatus cryptStatus = CCCrypt(kCCDecrypt, kCCAlgorithmAES128, kCCOptionECBMode | kCCOptionPKCS7Padding,keyPtr, kCCKeySizeAES128,
                                          NULL,
                                          [self bytes], dataLength,
                                          buffer, bufferSize,
                                          &numBytesDecrypted);
    if (cryptStatus == kCCSuccess){
        return [NSData dataWithBytesNoCopy:buffer length:numBytesDecrypted];
    }
    free(buffer);
    return nil;
}


@end