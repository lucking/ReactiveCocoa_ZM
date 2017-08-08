# ReactiveCocoa_ZM


ReactiveCocoa


1.demo 里面有有些基础使用的案例

2.安装pod时 报错：
导入pch文件报错：Connot create __weak reference in file using manual reference counting   
http://blog.csdn.net/sjcode/article/details/51014679
http://stackoverflow.com/questions/36147625/xcode-7-3-cannot-create-weak-reference-in-file-using-manual-reference-counting
解决方法：
点击工程启动文件 - TARGETS  -Build Settings - 在下方搜索框搜索weak  -  在Apple LLVM 7.1 - Language - Objective C选项下边 - 把Weak Reference in Manual Retain Release选项改成YES即可。


3.编程思想
ReactiveCocoa结合了几种编程风格：
函数式编程（Functional Programming）：使用高阶函数，例如函数用其他函数作为参数。
响应式编程（Reactive Programming）：关注于数据流和变化传播。
所以，你可能听说过ReactiveCocoa被描述为函数响应式编程（FRP）框架。
以后使用RAC解决问题，就不需要考虑调用顺序，直接考虑结果，把每一次操作都写成一系列嵌套的方法中，使代码高聚合，方便管理。

4.底层原理
      1、运用的是Hook（钩子）思想，Hook是一种用于改变API(应用程序编程接口：方法)执行结果的技术.
      2、Hook用处：截获API调用的技术。
      3、Hook原理：在每次调用一个API返回结果之前，先执行你自己的方法，改变结果的输出。


信号（signal）— RACSignal类
本质：是一种流（流是值的序列化的抽象）
说明：一般表示将来有数据传递，只要有数据改变，信号内部接收到数据，就会马上发出数据。
事件类型:
        next：发送数据到下一个管道
        error：发送数据失败
        completed：发送数据完成
用法：需要订阅不同的事件类型才能发挥作用，即调用下面这些实例方法
- (RACDisposable *)subscribeNext:(void (^)(id x))nextBlock;
- (RACDisposable *)subscribeError:(void (^)(NSError *error))errorBlock;
- (RACDisposable *)subscribeCompleted:(void (^)(void))completedBlock;
......
例子：ReactiveCocoa框架使用category来为很多基本UIKit控件添加signal。这样你就能给控件添加订阅了，text field的rac_textSignal就是这么来的。
[self.usernameTextField.rac_textSignal subscribeNext:^(id x) {
NSLog(@"x:%@",x);
}];

过滤 — Filter
说明：过滤信号，使用它可以获取满足条件的信号，举个形象的比喻就是一张可以自由设置网口大小的渔网，根据自己需要，对网口进行设置就可以捕到特定规格的鱼。
用法：在用户登录时，我们需要关心用户名长度是否符合要求，比如要求字符长度超过3，那么就可以使用Filter来达到这个目的，如下：
RACSignal *validUsernameSignal =
[self.usernameTextField.rac_textSignal filter:^BOOL(NSString *value) {
return value.length > 3;
}];
映射 — Map
说明：把源信号内容映射成新的内容，简单点说就是将数据改成自己想要的数据。
用法：还是用登录这个场景，我们需要关心用户名长度是否符合要求，比如字符长度超过3才进行下一步处理，如下：
RACSignal *usernameLengthSignal =
[[self.usernameTextField.rac_textSignal map:^id(NSString *value) {
return @(value.length);
}];




// RACSignal使用步骤：
// 1.创建信号 + (RACSignal *)createSignal:(RACDisposable * (^)(id<RACSubscriber> subscriber))didSubscribe
// 2.订阅信号,才会激活信号. - (RACDisposable *)subscribeNext:(void (^)(id x))nextBlock
// 3.发送信号 - (void)sendNext:(id)value

// RACSignal底层实现：
// 1.创建信号，首先把didSubscribe保存到信号中，还不会触发。
// 2.当信号被订阅，也就是调用signal的subscribeNext:nextBlock
// 2.2 subscribeNext内部会创建订阅者subscriber，并且把nextBlock保存到subscriber中。
// 2.1 subscribeNext内部会调用siganl的didSubscribe
// 3.siganl的didSubscribe中调用[subscriber sendNext:@1];
// 3.1 sendNext底层其实就是执行subscriber的nextBlock


RACSubscriber: 表示订阅者的意思，用于发送信号，这是一个协议，不是一个类，只要遵守这个协议，并且实现方法才能成为订阅者。通过create创建的信号，都有一个订阅者，帮助他发送数据。
RACDisposable: 用于取消订阅或者清理资源，当信号发送完成或者发送错误的时候，就会自动触发它
•	使用场景:不想监听某个信号时，可以通过它主动取消订阅信号。
•	RACReplaySubject:重复提供信号类，RACSubject的子类。
•	RACReplaySubject与RACSubject区别:
◦	RACReplaySubject可以先发送信号，在订阅信号，RACSubject就不可以。
•	使用场景一:如果一个信号每被订阅一次，就需要把之前的值重复发送一遍，使用重复提供信号类。
•	使用场景二:可以设置capacity数量来限制缓存的value的数量,即只缓充最新的几个值。

•	RACSubject和RACReplaySubject简单使用:



ReactiveCocoa
/*  
最快让你上手ReactiveCocoa之基础篇
http://www.jianshu.com/p/87ef6720a096

ReactiveCocoa结合了几种编程风格：
函数式编程（Functional Programming）：使用高阶函数，例如函数用其他函数作为参数。
响应式编程（Reactive Programming）：关注于数据流和变化传播。
以后使用RAC解决问题，就不需要考虑调用顺序，直接考虑结果，把每一次操作都写成一系列嵌套的方法中，使代码高聚合，方便管理。


ReactiveCocoa 讨论会
http://blog.devtang.com/2016/01/03/reactive-cocoa-discussion/

ReactiveCocoa 入门教程(一)
http://www.jianshu.com/p/a2c891979e85
http://www.cocoachina.com/ios/20150123/10994.html

Xcode8导入框架出现Use Legacy Swift Language Version的报错
http://blog.csdn.net/qq_24904667/article/details/52597175

怎样导入ReactiveCocoa
http://www.jianshu.com/p/a8ddabb218df

*/


