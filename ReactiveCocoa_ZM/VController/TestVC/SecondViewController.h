//
//  SecondViewController.h
//  ZM_ImageCaches
//
//  Created by tangdi on 16/4/17.
//  Copyright © 2016年 TD. All rights reserved.
//

#import "BBaseViewController.h"
#import <ReactiveCocoa/ReactiveCocoa.h>

@interface SecondViewController : BBaseViewController
{
    
}
@property (nonatomic, strong) RACSubject *delegateSignal;
@end
