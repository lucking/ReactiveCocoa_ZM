//
//  ThreeViewController.m
//  ZM_ImageCaches
//
//  Created by tangdi on 16/4/17.
//  Copyright © 2016年 TD. All rights reserved.
//

#import "ThreeViewController.h"

@interface ThreeViewController ()
{
	BOOL isflage;
}
@end

@implementation ThreeViewController

- (void)viewDidLoad {
    [super viewDidLoad];


    
    NSString *title=@"";
    CGFloat width = 120;
    for (int i=1 ; i<11; i++) {
        
        title = [NSString stringWithFormat:@"case%d",i];
        [self addBtnTitle:title frame:CGRectMake(10, 50+ (35+10)*i, width, 35) Tag:i];
    }
    
    //CGFloat yy = SSHEIGHT-90;
    //    [self addBtnTitle:@"attentionCase3_1" frame:CGRectMake(10, yy, width, 35) Tag:111];
    //    [self addBtnTitle:@"attentionCase3_2" frame:CGRectMake(10*2+width, yy, width, 35) Tag:222];
    //    [self addBtnTitle:@"solveCase3_1" frame:CGRectMake(10, yy+45, width, 35) Tag:333];
    
}
- (void)myBtnClick:(UIButton *)Btn{
    
    if (Btn.tag==1) {       [self case1];
    }else if (Btn.tag==2) { [self case2];
    }else if (Btn.tag==3) { [self case3];
    }else if (Btn.tag==4) { [self case4];
    }else if (Btn.tag==5) { [self case5];
    }else if (Btn.tag==6) { [self case6];
    }else if (Btn.tag==7) { [self case7];
    }else if (Btn.tag==8) { [self case8];
    }else if (Btn.tag==9) { [self case9];
        
    }
    
    if (Btn.tag==111) {
    }else if (Btn.tag==222) {
    }else if (Btn.tag==333) {
    }
}
//例一：
- (void)case1 {
    
}
//例二：
- (void)case2 {
    
}
//例三：
- (void)case3 {
    
}
//例四：
- (void)case4 {
    
}
//例五：
- (void)case5 {
    
}
//例六：
- (void)case6 {
    
}
//例七：
- (void)case7 {
    
}
//例八：
- (void)case8 {
    
}
//例九：
- (void)case9 {
    
}




#pragma mark - onClick
//触摸时：隐藏导航条
-(void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event{
	isflage=!isflage;
	[super.navigationController setNavigationBarHidden:isflage animated:TRUE];
	[super.navigationController setToolbarHidden:isflage animated:TRUE];
}



@end
