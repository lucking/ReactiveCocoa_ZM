//
//  FirstViewController.h
//  ZM_UIAlertView
//
//  Created by tangdi on 15/1/13.
//  Copyright (c) 2015年 ZhangM. All rights reserved.
//

#import "BBaseViewController.h"
#import "Common.h"

@interface FirstViewController : BBaseViewController
{

}
@property (weak, nonatomic) UIImageView *imageView;

@property (retain, nonatomic) NSArray *urlArray;



@property (retain, nonatomic) IBOutlet UIButton *Btn1;
@property (retain, nonatomic) IBOutlet UIButton *Btn2;
- (IBAction)BtnClick:(id)sender;

@end
