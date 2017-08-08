//
//  FlagItem.h
//  ReactiveCocoa_ZM
//
//  Created by ZM on 2017/5/1.
//  Copyright © 2017年 ZM. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FlagItem : NSObject
{
    
}
@property (nonatomic, copy) NSString* ChinaName;//中文名

+ (FlagItem *)flagWithDict:(NSDictionary *)dict;

@end
