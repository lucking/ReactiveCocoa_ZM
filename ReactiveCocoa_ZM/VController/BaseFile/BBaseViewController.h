//
//  BBaseViewController.h
//  AutoAdaptCellHeight
//
//  Created by ZM on 2017/2/15.
//  Copyright © 2017年 ZM. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface BBaseViewController : UIViewController
{
    
}
// 添加按钮：UIButton
-(void)addBtnTitle:(NSString*)title frame:(CGRect)frame Tag:(int)tag;

// 存入本地信息: Object
+ (void)setObject:(id)object forKey:(NSString*)mykey;
// 读取一个本地信息: Object
+ (id)getObjectForKey:(NSString *)mykey;


@end
