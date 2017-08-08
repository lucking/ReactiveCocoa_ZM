//
//  ViewController.m
//  ReactiveCocoa_ZM
//
//  Created by ZM on 2017/4/28.
//  Copyright © 2017年 ZM. All rights reserved.
//

#import "ViewController.h"
#import <ReactiveCocoa/ReactiveCocoa.h>
#import "aaaaa.h"
#import "HTViewModelProtocolImpl.h"

@interface ViewController ()<HTViewModelProtocolImpl>

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    
    
}

- (RACSignal *)requestCityTravelDataSignal:(NSString *)requestUrl
{
    return [RACSignal createSignal:^RACDisposable * _Nullable(id<RACSubscriber>  _Nonnull subscriber) {
        
        return [RACDisposable disposableWithBlock:^{
            
        }];
    }];

}






@end
