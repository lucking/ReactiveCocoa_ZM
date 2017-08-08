//
//  AppDelegate.h
//  ReactiveCocoa_ZM
//
//  Created by ZM on 2017/4/28.
//  Copyright © 2017年 ZM. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreData/CoreData.h>
#import "RealReachability.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate>
{
    
}
@property (strong, nonatomic) UIWindow *window;
@property (readonly, strong) NSPersistentContainer *persistentContainer;
/**
 *  网络状态
 */
@property (assign , nonatomic , readonly) ReachabilityStatus  NetWorkStatus;

- (void)saveContext;
@end


/** ReactiveCocoa入门教程：第一部分 1/2
 //原文
 https://www.raywenderlich.com/62699/reactivecocoa-tutorial-pt1
 //翻译
 http://www.cocoachina.com/ios/20150123/10994.html
 
 
 ** ReactiveCocoa入门教程：第二部分 2/2
 //原文
 https://www.raywenderlich.com/62796/reactivecocoa-tutorial-pt2
 //翻译
 http://www.cocoachina.com/ios/20160211/15020.html
 
 
 //ReactiveCocoa 是一个框架，它允许你在你的iOS程序中使用函数响应式（FRP）技术。
 //第一部分的讲解，你将会学会如何使用信号量（对事件发出数据流）如何替代标准的动作和事件处理逻辑。你也会学到如何转换、分离和组合这些信号量。
 //第二部分里，你将会学到更多先进的ReactiveCocoa特性，包括：
 1、另外两个事件类型：error和completed
 2、Throttling（节流）
 3、Threading
 4、Continuations
 5、更多。。。
 
 
 
 */


