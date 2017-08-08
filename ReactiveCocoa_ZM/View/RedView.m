//
//  RedView.m
//  ReactiveCocoa_ZM
//
//  Created by ZM on 2017/5/2.
//  Copyright © 2017年 ZM. All rights reserved.
//

#import "RedView.h"
#import "BaseHeader.h"

@interface RedView()
{
    CGFloat myWidth;
    CGFloat myHeight;
}
@end

@implementation RedView

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor = [UIColor clearColor];
        self.backgroundColor = [[UIColor lightGrayColor] colorWithAlphaComponent:0.1];
        myWidth = self.frame.size.width;
        myHeight = self.frame.size.height;
        
        [self addSubview:self.payBtn];
        self.payBtn.center = CGPointMake(myWidth/2, myHeight/2);
    }
    return self;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        myWidth = self.frame.size.width;
        myHeight = self.frame.size.height;
        
        [self addSubview:self.payBtn];
        self.payBtn.center = CGPointMake(myWidth/2, myHeight/2);
    }
    return self;
}


- (UIButton *)payBtn {
    if (_payBtn==nil) {
        _payBtn = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 100, 36)];
        _payBtn.backgroundColor = [UIColor redColor];
        _payBtn.layer.cornerRadius = 5;
        _payBtn.layer.masksToBounds= YES;
        [_payBtn setTitle:@"支付" forState:UIControlStateNormal];
        [_payBtn setTitleColor:White_COLOR forState:UIControlStateNormal];
        [_payBtn.titleLabel setFont:[UIFont systemFontOfSize:18]];
        [_payBtn addTarget:self action:@selector(BtnClick:) forControlEvents:UIControlEventTouchUpInside];
    }
    return _payBtn;
}
- (void)BtnClick:(UIButton *)Btn {
    if ([self.delegate respondsToSelector:@selector(btnClick:)]) {
        [self.delegate btnClick:Btn];
        NSLog(@"代理_按钮点击了");
    }
    
//    if ([self.delegate respondsToSelector:@selector(redView:btnClick:)]) {
//        [self.delegate redView:self btnClick:Btn];
//        NSLog(@"代理_按钮点击了");
//    }
}



@end
