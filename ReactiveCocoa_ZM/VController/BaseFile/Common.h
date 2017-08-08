//
//  Common.h
//  ZM_BaseViewController
//
//  Created by tangdi on 15/6/12.
//  Copyright (c) 2015年 ZM. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <CoreText/CoreText.h>//字间距 使用
#import <sys/sysctl.h>//系统参数 使用

// 验证邮箱、手机号、身份证、qq
typedef enum{
	VALIDATE_CHECK_EMAIL    =1,
	VALIDATE_CHECK_QQ       =2,
	VALIDATE_CHECK_MOBILE   =3,
	VALIDATE_CHECK_PASSWORD =4,
}VALIDATE_CHECK;


@interface Common : NSObject



//======================="  特殊判断  "=================================
#pragma mark 判断中文
+ (BOOL)isChinese:(NSString*)mystring;

#pragma mark 判断登录密码格式
+ (BOOL)isCharAndNumber:(NSString*)mystring;//只能由8～18数字和字符混合组


#pragma mark //==================="   验证邮箱、手机号、身份证、qq，银行卡、手机号处理   "=======================

//验证邮箱、手机号、身份证、qq
+(BOOL)validateCheck:(NSString *)str stringType:(VALIDATE_CHECK)type;

// ---------------"  验证邮箱  "-----------------
+ (BOOL)validateEmail:(NSString *)email;

// ---------------"  验证手机号  "---------------
//1.简单的判断方法
+ (BOOL)validatePhone:(NSString *)phone;
//2.详细的判断方法
+ (BOOL)validateMyPhone:(NSString *)phone;

#pragma mark //==========================="   空数据处理   "================================

// 判断是否为空
+(BOOL)isNull:(id)object;
// 转换为空串
+(NSString*)convertNull:(id)object;


#pragma mark //==========================="   动画   "================================
// 导航视图 动画
+(void)pushViewController:(UIViewController *)nav;
// 普通动画
+(void)flipView:(UIView *)myView Rect:(CGRect)myRect forView:(UIView *)view timeInterval:(NSTimeInterval)myTime;



#pragma mark //==========================="   系统   "================================
// 获取当前系统的版本号
+ (NSString *)getCFBundleVersion;
// 获取系统配置文件
+ (NSDictionary *)getInfoDictionary;
// 获取系统：appID
+ (NSString *)getInfoCFBundleId;


#pragma mark //==========================="   UIViewController   "================================

#pragma mark  清除UITableView底部多余的分割线
+ (void)clearTableViewLine:(UITableView *)tabelView;



@end

