//
//  BBaseViewController.m
//  AutoAdaptCellHeight
//
//  Created by ZM on 2017/2/15.
//  Copyright © 2017年 ZM. All rights reserved.
//

#import "BBaseViewController.h"
#import "BaseHeader.h"

@interface BBaseViewController ()

@end

@implementation BBaseViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    // 设置 标题 颜色
    NSDictionary *dic = [NSDictionary dictionaryWithObject:Color_009988
                                                    forKey:NSForegroundColorAttributeName];
    self.navigationController.navigationBar.titleTextAttributes = dic;
    
}



-(void)addBtnTitle:(NSString*)title frame:(CGRect)frame Tag:(int)tag
{
    UIButton *Btn1= [UIButton buttonWithType:UIButtonTypeCustom];
    Btn1.backgroundColor = [UIColor whiteColor];
    Btn1.frame = frame;
    Btn1.layer.cornerRadius= 5;
    Btn1.layer.masksToBounds= YES;
    Btn1.layer.borderWidth= 1.2;
    Btn1.layer.borderColor= Color_70AEE1.CGColor;
    Btn1.titleLabel.font= [UIFont systemFontOfSize:15];
    Btn1.tag = tag;
    [Btn1 setTitle:title forState:UIControlStateNormal];
    [Btn1 setTitleColor:Color_F44336 forState:UIControlStateNormal];
    [Btn1 addTarget:self action:@selector(myBtnClick:) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:Btn1];

}
- (void)myBtnClick:(UIButton *)Btn{
    
}


#pragma mark 存入本地信息: Object
+ (void)setObject:(id)object forKey:(NSString*)mykey
{
    [[NSUserDefaults standardUserDefaults] setObject:object forKey:mykey];
    [[NSUserDefaults standardUserDefaults] synchronize]; //同步保存数据
}
#pragma mark 读取一个本地信息: Object
+ (id)getObjectForKey:(NSString *)mykey
{
    return [[NSUserDefaults standardUserDefaults] objectForKey:mykey];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
@end

