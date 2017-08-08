//
//  FlagItem.m
//  ReactiveCocoa_ZM
//
//  Created by ZM on 2017/5/1.
//  Copyright © 2017年 ZM. All rights reserved.
//

#import "FlagItem.h"

@implementation FlagItem


-(instancetype)initWithDict:(NSDictionary *)dict{
    if (self=[super init]) {
        NSArray *arr = @[];
        if ([dict[@"ChinaName"] isEqual:arr]) {
            self.ChinaName = @"";
        }{
            self.ChinaName=dict[@"ChinaName"];
        }        
    }
    return self;
}


+ (FlagItem *)flagWithDict:(NSDictionary *)dict
{
    return [[self alloc] initWithDict:dict];
}


@end
