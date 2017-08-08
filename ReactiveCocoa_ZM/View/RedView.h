//
//  RedView.h
//  ReactiveCocoa_ZM
//
//  Created by ZM on 2017/5/2.
//  Copyright © 2017年 ZM. All rights reserved.
//

#import <UIKit/UIKit.h>


@class RedView;
@protocol RedViewDelegate <NSObject>
//@optional
// 取消按钮点击回调
- (void)btnClick:(UIButton *)Btn;
//- (void)redView:(RedView *)view btnClick:(UIButton *)Btn;
@end

@interface RedView : UIView
{
    
}
@property (nonatomic, strong) UIButton *payBtn;
@property (nonatomic, weak) id<RedViewDelegate> delegate;

@end
