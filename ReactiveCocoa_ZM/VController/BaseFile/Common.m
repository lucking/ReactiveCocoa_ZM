//
//  Common.m
//  ZM_BaseViewController
//
//  Created by tangdi on 15/6/12.
//  Copyright (c) 2015年 ZM. All rights reserved.
//

#import "Common.h"

@implementation Common

//======================="  特殊判断  "=================================
#pragma mark 判断中文
+ (BOOL)isChinese:(NSString*)mystring
{                                                       //点
// NSString *regex = @"[\u4e00-\u9fa5][\u4e00-\u9fa5][\u00b7]+";
    NSString *regex = @"([\u4e00-\u9fa5][\u4e00-\u9fa5]+)|([\u00b7])";
    NSPredicate *pred = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", regex];
    if([pred evaluateWithObject:mystring]){
        return YES;
    }else{
        return NO;
    }
}

#pragma mark 判断登录密码格式
+ (BOOL)isCharAndNumber:(NSString*)mystring
{
    //   NSString *mystring = @"Letter123";
    // 数字和字符混合组成 (不能有特殊符号，不能有空格)
    NSCharacterSet *disallowedCharacters = [[NSCharacterSet characterSetWithCharactersInString:@"0123456789QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"] invertedSet];
    NSRange Range = [mystring rangeOfCharacterFromSet:disallowedCharacters];
    // 不能全是数字
    NSCharacterSet *CharSet1= [[NSCharacterSet characterSetWithCharactersInString:@"0123456789"] invertedSet];
    NSRange Range1= [mystring rangeOfCharacterFromSet:CharSet1];
    // 不能全是字母
    NSCharacterSet *CharSet2 = [[NSCharacterSet characterSetWithCharactersInString:@"QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"] invertedSet];
    NSRange Range2= [mystring rangeOfCharacterFromSet:CharSet2];
    
    NSLog(@"---> mystring.length：%lu",(unsigned long)mystring.length);
    if (mystring.length>=6 && mystring.length<=16) {//6～16
        
        if (Range.location == NSNotFound){          //只能由6～16数字和字符混合组成
            if (Range1.location != NSNotFound) {    //不能全是数字
                if (Range2.location != NSNotFound) {//不能全是字母

                    return YES;

				}else return NO;
            }else return NO;
        }else return NO;
    }else return NO;
    
}
//========="  验证邮箱、手机号、身份证、qq  "=================================

static NSString *emailRegex=@"^([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$";
static NSString *qqRegex=@"^[1-9][0-9]{4,9}$";
static NSString *mobileNumberRegex=@"^1[0-9]{10,10}$";
static NSString *passwordRegex=@"^[a-zA-Z0-9]{8,17}$";

+(BOOL)validateCheck:(NSString *)str stringType:(VALIDATE_CHECK)type
{
    NSError *error;
    NSRegularExpression *regex;
    NSTextCheckingResult *result;
    NSString *regexStr = @"";
    if(type==VALIDATE_CHECK_EMAIL)
    {
        regexStr= emailRegex;
    }
    else if(type==VALIDATE_CHECK_QQ)
    {
        regexStr= qqRegex;
    }
    else if(type==VALIDATE_CHECK_MOBILE)
    {
        regexStr= mobileNumberRegex;
    }
    else if(type==VALIDATE_CHECK_PASSWORD)
    {
        regexStr= passwordRegex;
    }
    regex=[NSRegularExpression regularExpressionWithPattern:regexStr options:0 error:&error];
    result=[regex firstMatchInString:str options:0 range:NSMakeRange(0, [str length])];
    if(!result){
        return NO;
    }else{
        return YES;
    }
}

#pragma mark 验证邮箱
#pragma
+ (BOOL)validateEmail:(NSString *)email
{
    NSString *emailRegex = @"[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}";
    NSPredicate *emailTest = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", emailRegex];
    return [emailTest evaluateWithObject:email];
}
#pragma mark 验证手机号
#pragma
//1.简单的判断方法
+ (BOOL)validatePhone:(NSString *)phone
{   //这只是简单地判断手机号格式。其实手机的格式还是有一点复杂的
    //手机号以13，15，17，18开头
    NSString *phoneRegex = @"1[3|5|7|8|][0-9]{9}";
    NSPredicate *phoneTest = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", phoneRegex];
    return [phoneTest evaluateWithObject:phone];
}
//2.详细的判断方法
+ (BOOL)validateMyPhone:(NSString *)phone
{   //正则判断手机号码格式
    /**
     * 手机号码
     * 移动：134[0-8],135,136,137,138,139,150,151,157,158,159,182,187,188
     * 联通：130,131,132,152,155,156,185,186
     * 电信：133,1349,153,180,189
     */
    NSString * MOBILE = @"^1(3[0-9]|5[0-35-9]|8[025-9])\\d{8}$";
    /**
     10         * 中国移动：China Mobile
     11         * 134[0-8],135,136,137,138,139,150,151,157,158,159,182,187,188
         加177,178
     12         */
    NSString * CM = @"^1(34[0-8]|(3[5-9]|5[017-9]|7[78]|8[278])\\d)\\d{7}$";
    /**
     15         * 中国联通：China Unicom
     16         * 130,131,132,152,155,156,185,186  加176
     17         */
    NSString * CU = @"^1(3[0-2]|5[256]|7[6]|8[56])\\d{8}$";
    /**
     20         * 中国电信：China Telecom
     21         * 133,1349,153,180,189   加177,178
     22         */
    NSString * CT = @"^1((33|53|77|78|8[09])[0-9]|349)\\d{7}$";
    /**
     25         * 大陆地区固话及小灵通
     26         * 区号：010,020,021,022,023,024,025,027,028,029
     27         * 号码：七位或八位
     28         */
    // NSString * PHS = @"^0(10|2[0-5789]|\\d{3})\\d{7,8}$";
    
    NSPredicate *regextestmobile = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", MOBILE];
    NSPredicate *regextestcm = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", CM];
    NSPredicate *regextestcu = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", CU];
    NSPredicate *regextestct = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", CT];
    
    if (([regextestmobile evaluateWithObject:phone] == YES)
        || ([regextestcm evaluateWithObject:phone] == YES)
        || ([regextestct evaluateWithObject:phone] == YES)
        || ([regextestcu evaluateWithObject:phone] == YES))
    {
        if([regextestcm evaluateWithObject:phone] == YES) {
            NSLog(@"China Mobile");
        } else if([regextestct evaluateWithObject:phone] == YES) {
            NSLog(@"China Telecom");
        } else if ([regextestcu evaluateWithObject:phone] == YES) {
            NSLog(@"China Unicom");
        } else {
            NSLog(@"Unknow");
        }
        
        return YES;
    }
    else
    {
        return NO;
    }
}


// 判断是否为空
+(BOOL)isNull:(id)object
{
	if (!object) {
		return YES;
	}
    else if ([object isEqualToString:@""]){
        return YES;
    }
	else if (object && [object isEqual:[NSNull null]]){
		return YES;
	}
	else if ([object isKindOfClass:[NSNull class]]){
		return YES;
	}
	else if (object == nil) {
		return YES;
	}
	return NO;
}

// 转换为空串
+(NSString*)convertNull:(id)object
{
	if (!object) {
		return @"";
	}
    if (object && [object isEqual:[NSNull null]]){
        return @"";
    }else if ([object isKindOfClass:[NSNull class]]){
        return @"";
    }else if (object == nil) {
        return @"";
    }
    
    return object;
}

//==========================="   动画   "================================

#pragma mark 导航视图 动画
+(void)pushViewController:(UIViewController *)nav
{
    UIWindow *window=[[[UIApplication sharedApplication] delegate] window];
    window.rootViewController=nav;
    
    [UIView beginAnimations:nil context:nil];
    [UIView setAnimationDuration:0.5];
    [UIView setAnimationTransition:UIViewAnimationTransitionNone forView:window cache:YES];
    nav.modalTransitionStyle = UIModalTransitionStyleCoverVertical;    //从底部滑入
    //nav.modalPresentationStyle =  UIModalPresentationFullScreen;
    [UIView commitAnimations];
}

#pragma mark 普通动画
+(void)flipView:(UIView *)myView Rect:(CGRect)myRect forView:(UIView *)view timeInterval:(NSTimeInterval)myTime
{
	[UIView beginAnimations:nil context:nil];
	[UIView setAnimationDuration:myTime];
	[UIView setAnimationTransition:UIViewAnimationTransitionNone forView:view cache:YES];
	myView.frame = myRect;
	[UIView commitAnimations];

}


//==========================="   系统   "================================
// 获取当前系统的版本号
+ (NSString *)getCFBundleVersion{
    
    NSString *Versionid = [[Common getInfoDictionary] objectForKey:@"CFBundleVersion"];
    if (Versionid) {
        return Versionid;
    }
    return nil;
}
// 获取系统配置文件
+ (NSDictionary *)getInfoDictionary
{
    NSDictionary *infoDictionary= [[NSBundle mainBundle] infoDictionary];
    return infoDictionary;
}

// 获取系统：appID
+ (NSString *)getInfoCFBundleId
{
    NSDictionary *InfoDic= [[NSBundle mainBundle] infoDictionary];
    NSString* appID = InfoDic[@"CFBundleIdentifier"];
    return appID;
}



#pragma mark  清除UITableView底部多余的分割线
+ (void)clearTableViewLine:(UITableView *)tabelView {
    
    UIView *View=[UIView new];
    View.backgroundColor= [UIColor clearColor];
    [tabelView setTableFooterView:View];
    [tabelView setTableHeaderView:View];
}




@end


