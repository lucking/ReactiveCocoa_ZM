//
//  SecondViewController.m
//  ZM_ImageCaches
//
//  Created by tangdi on 16/4/17.
//  Copyright © 2016年 TD. All rights reserved.
//

#import "SecondViewController.h"
#import "BaseHeader.h"
#import "UIView+ZMFrame.h"
#import <ReactiveCocoa/ReactiveCocoa.h>

@interface SecondViewController ()
{
    
}
@property (nonatomic, strong) UITextField *nameField;
@property (nonatomic, strong) UITextField *pwdField;
@property (nonatomic, strong) UILabel *titleLab;
@property (nonatomic, strong) UIButton *loginBtn;
@property (nonatomic, strong) UITextField *searchText;

@property (nonatomic) BOOL passwordIsValid;
@property (nonatomic) BOOL usernameIsValid;
@end

@implementation SecondViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title = @"SecondVC";
    
    NSString *title=@"";
    CGFloat width = 120;
    for (int i=1 ; i<11; i++) {
        
        title = [NSString stringWithFormat:@"case%d",i];
        if (i==3) {
            title= @"模仿登录";
        }
        [self addBtnTitle:title frame:CGRectMake(10, 50+ (35+10)*i, width, 35) Tag:i];
    }
    
    [self.view addSubview:self.nameField];
    [self.view addSubview:self.pwdField];
    [self.view addSubview:self.titleLab];
    [self.view addSubview:self.loginBtn];

}


- (void)case0 {
    
}
//例一：
- (void)case1 {
    // 通知代理：通知第一个控制器，告诉它，按钮被点了
    // 判断代理信号是否有值
    if (self.delegateSignal) {
        // 有值，才需要通知
        [self.delegateSignal sendNext:nil];
    }
}
//例二：
- (void)case2 {
    [self dismissViewControllerAnimated:YES completion:nil];

}
//例三： 模仿登录 控制变量、响应回调结果
- (void)case3 {
    
    // 5.监听文本框的文字改变
    [self.nameField.rac_textSignal subscribeNext:^(id x) {
        NSLog(@"文字改变了= %@",x);
    }];
    // 过滤信号 — Filter
    RACSignal *nameSourceSignal =
    [self.nameField.rac_textSignal filter:^BOOL(NSString *value) {
        return value.length > 3;
    }];
    [nameSourceSignal subscribeNext:^(id x) {
        NSLog(@"内容_文字大于3才输出 x= %@", x);
    }];
    //同上
    RACSignal *pwdSourceSignal =
    [self.pwdField.rac_textSignal filter:^BOOL(NSString *value) {
        return value.length > 6;
    }];
    [pwdSourceSignal subscribeNext:^(id x) {
        NSLog(@"内容_文字大于6才输出 x= %@", x);
    }];
    
    
//    [RACObserve(self, pwdField) subscribeNext:^(id x) {
//        //不起作用
//        NSLog(@"RACObserve_pwdField= %@",x);
//    }];

    
    
    // 控制变量
    [self.nameField addTarget:self
                       action:@selector(nameFieldChanged:)
                     forControlEvents:UIControlEventEditingChanged];
    [self.pwdField addTarget:self
                      action:@selector(pwdFieldChanged:)
                     forControlEvents:UIControlEventEditingChanged];
    self.nameField.backgroundColor =
    self.usernameIsValid ? [UIColor clearColor] : [UIColor yellowColor];
    self.pwdField.backgroundColor =
    self.passwordIsValid ? [UIColor clearColor] : [UIColor yellowColor];

    //以下：用信号 代替控制变量

    // 映射 — Map
    //    说明：把源信号内容映射成新的内容，简单点说就是将数据改成自己想要的数据。
    //    用法：还是用登录这个场景，我们需要关心用户名长度是否符合要求，比如字符长度超过3才进行下一步处理，如下：
    //1.创建信号
    RACSignal *validNameSignal =
    [self.nameField.rac_textSignal map:^id(NSString *value) {
        //NSLog(@"映射—Map value= %@", value);
        return @([self isValidUsername:value]);
    }];
    RACSignal *validPwdSignal =
    [self.pwdField.rac_textSignal map:^id(NSString *text) {
        return @([self isValidPassword:text]);
    }];
    //可以看到，上面的代码对每个输入框的rac_textSignal应用了一个map转换。输出是一个用NSNumber封装的布尔值。
    
    
    
    //2.订阅信号(接收信号)
    //下一步是转换这些信号，从而能为输入框设置不同的背景颜色。基本上就是，你订阅这些信号，然后用接收到的值来更新输入框的背景颜色。下面有一种方法：
//    [[validNameSignal map:^id(NSNumber *passwordValid){
//        return[passwordValid boolValue] ? [UIColor clearColor]:[UIColor yellowColor];
//    }]
//     subscribeNext:^(UIColor *color){
//         self.pwdField.backgroundColor = color;
//     }];
    //（不要使用这段代码，下面有一种更好的写法！）
    //从概念上来说，就是把之前信号的输出应用到输入框的backgroundColor属性上。但是上面的用法不是很好。
    //幸运的是，ReactiveCocoa提供了一个宏来更好的完成上面的事情。把下面的代码直接加到viewDidLoad中两个信号的代码后面：
    //同上：改变背景颜色
    RAC(self.nameField, backgroundColor) =
    [validNameSignal map:^id(NSNumber *nameValid){
        NSLog(@"[nameValid boolValue]= %d", [nameValid boolValue]);
         return[nameValid boolValue] ? [UIColor clearColor]:[UIColor yellowColor];
     }];
    RAC(self.pwdField, backgroundColor) =
    [validPwdSignal map:^id(NSNumber *pwdValid){
        NSLog(@"[pwdValid boolValue]= %d", [pwdValid boolValue]);
         return[pwdValid boolValue] ? [UIColor clearColor]:[UIColor yellowColor];
     }];
    //RAC宏：允许直接把信号的输出应用到对象的属性上。RAC宏有两个参数，第一个是需要设置属性值的对象，第二个是属性名。每次信号产生一个next事件，传递过来的值都会应用到该属性上。
    
    
    // 状态推导 — RAC（）
    //说明：用于给某个对象的某个属性绑定。
    //用法：比如只要文本框文字改变，就会修改label的文字
    RAC(self.titleLab,text) = _nameField.rac_textSignal;
    _titleLab.text = @"与 textField 绑定";

    //聚合信号
    //说明：聚合任意数量的信号，然后生成一个新的信号
    //用法：比如登录按钮只有当用户名和密码输入框的输入都有效时才能进行点击，现在要把这里改成响应式的。把下面的代码添加到viewDidLoad的末尾：
    @weakify(self)
    RACSignal *signUpActiveSignal =
    [RACSignal combineLatest:@[validNameSignal, validPwdSignal] reduce:^id(NSNumber *usernameValid, NSNumber *passwordValid){
        //NSLog(@"usernameValid= %@, passwordValid= %@", usernameValid, passwordValid);
        return @([usernameValid boolValue] && [passwordValid boolValue]);
    }];
    // 绑定按钮：这会把信号和按钮的enabled属性绑定。
    [signUpActiveSignal subscribeNext:^(NSNumber *signupActive) {
        @strongify(self)
        NSLog(@"---> enabled = %d \n ", [signupActive boolValue]);
        self.loginBtn.enabled = [signupActive boolValue];
    }];
    
    //绑定按钮响应
//    [[self.loginBtn rac_signalForControlEvents:UIControlEventTouchUpInside] subscribeNext:^(id x) {
//        NSLog(@"button clicked");
//    }];
    
    // Map（转换）： 点击登录按钮
//    [[[self.loginBtn rac_signalForControlEvents:UIControlEventTouchUpInside] map:^id(id value) {
//        @strongify(self)
//        NSLog(@"去登录");
//        return [self signInSignal];
//        
//    }] subscribeNext:^(id x) {
//        NSLog(@"----->11 Sign in result: %@", x);// X类型还是RACSignal
//    }];
//上面的代码使用map方法，把按钮点击信号转换成了登录信号。subscriber输出log。
//输出的这是个什么鬼？没错，你已经给subscribeNext:的block传入了一个信号，但传入的不是登录结果的信号。
//----->11 Sign in result: <RACDynamicSignal: 0x60800043ca60> name:
    
    
//    // FlattenMap：信号中的信号
//    [[[self.loginBtn rac_signalForControlEvents:UIControlEventTouchUpInside] flattenMap:^id(id x){
//          return[self signInSignal];
//      }]
//     subscribeNext:^(id x){
//     //subscribeNext:^(NSNumber*signedIn){
//         NSLog(@"----->22 Sign in result: %@", x);// X类型是NSNumber
//         BOOL success = [x boolValue];
//         if(success){
//             //登录成功：页面跳转
//             //[self performSegueWithIdentifier:@"signInSuccess" sender:self];
//             [self.navigationController popViewControllerAnimated:YES];
//         }
//
//     }];
//这个操作把按钮点击事件转换为登录信号，同时还从内部信号发送事件到外部信号。
//----->22 Sign in result: 1
    
    
    //添加附加操作（Adding side-effects）
    //把代码更新成下面的：
    [[[[self.loginBtn rac_signalForControlEvents:UIControlEventTouchUpInside]
       doNext:^(id x){
           self.loginBtn.enabled =NO;
           //self.signInFailureText.hidden =YES; //错误信息
           NSLog(@"doNext");
       }]
      flattenMap:^id(id x){
          return[self signInSignal];
      }]
     subscribeNext:^(NSNumber*signedIn){
         NSLog(@"subscribeNext");
         self.loginBtn.enabled =YES;
         BOOL success =[signedIn boolValue];
        // self.signInFailureText.hidden = success;
         if(success){
             NSLog(@"loginSucess");
             [self.navigationController popViewControllerAnimated:YES];
         }
     }];
//你可以看到doNext:是直接跟在按钮点击事件的后面。而且doNext: block并没有返回值。因为它是附加操作，并不改变事件本身。
//上面的doNext: block把按钮置为不可点击，隐藏登录失败提示。然后在subscribeNext: block里重新把按钮置为可点击，并根据登录结果来决定是否显示失败提示。
    
    
    
    //总结: 响应式的登录
    //分割：信号可以有很多subscriber，也就是作为很多后续步骤的源。注意上图中那个用来表示用户名和密码有效性的布尔信号，它被分割成多个，用于不同的地方。
    //聚合：多个信号可以聚合成一个新的信号，在上面的例子中，两个布尔信号聚合成了一个。实际上你可以聚合并产生任何类型的信号。

    //你已经知道了ReactiveCocoa框架是如何给基本UIKit控件添加属性和方法的了。目前你已经使用了rac_textSignal，它会在文本发生变化时产生信号。为了处理按钮的事件，现在需要用到ReactiveCocoa为UIKit添加的另一个方法，rac_signalForControlEvents。
    
    //注意：本教程为了简便使用了一个假的service，所以它不依赖任何外部API。但你现在的确遇到了一个问题，如何使用这些不是用信号表示的API呢？
    //注意：在异步操作执行的过程中禁用按钮是一个常见的问题，ReactiveCocoa也能很好的解决。RACCommand就包含这个概念，它有一个enabled信号，能让你把按钮的enabled属性和信号绑定起来。你也许想试试这个类。
    //ReactiveCocoa的主旨是让你的代码更简洁易懂，这值得多想想。我个人认为，如果逻辑可以用清晰的管道、流式语法来表示，那就很好理解这个应用到底干了什么了。
    
    
}


//例四：
- (void)case4 {
    
    [[self.searchText.rac_textSignal map:^id(NSString *text) {
          return [self isValidSearchText:text] ? [UIColor whiteColor] : [UIColor yellowColor];
    }]
     subscribeNext:^(UIColor *color) {
         self.searchText.backgroundColor = color;
     }];
    
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

- (BOOL)isValidSearchText:(NSString *)text {
    return text.length > 2;
}


- (BOOL)isValidUsername:(NSString *)name {
    if (name.length>3) {
        return YES;
    }else{
        return NO;
    }
}
- (BOOL)isValidPassword:(NSString *)pwd {
    if (pwd.length>3) {
        return YES;
    }else{
        return NO;
    }
}

typedef void (^RWSignInResponse)(BOOL);

- (void)signInWithUsername:(NSString *)username
                  password:(NSString *)password
                  complete:(RWSignInResponse)completeBlock
{
    completeBlock(YES);// 此输出的返回值（必须有返回值，否则没有输出）----->22 Sign in result:
    //completeBlock(NO);
}
// 创建信号
- (RACSignal *)signInSignal {
    
    @weakify(self)
    return [RACSignal createSignal:^RACDisposable *(id subscriber) {
        
        @strongify(self)
        NSLog(@"nameText= %@",self.nameField.text);
        NSLog(@"PwdText= %@ \n ",self.pwdField.text);
        
        [self signInWithUsername:self.nameField.text
                        password:self.pwdField.text
                        complete:^(BOOL success) {
                            //需要是发送 回调信号
                            [subscriber sendNext:@(success)];
                            // 必须创建完成时间
                            [subscriber sendCompleted];
                        }];
        //这个block的返回值是一个RACDisposable对象，它允许你在一个订阅被取消时执行一些清理工作。当前的信号不需要执行清理操作，所以返回nil就可以了。
        return nil;
    }];
    
}

- (void)nameFieldChanged:(UITextField *)textField{
}
- (void)pwdFieldChanged:(UITextField *)textField{
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
}
//用户名
- (UITextField *)nameField {
    if (!_nameField) {
        _nameField = [[UITextField alloc] init];
        _nameField.frame = CGRectMake(150, 80,150 , 50);
//        _nameField.backgroundColor = [UIColor orangeColor];
        _nameField.clearButtonMode = UITextFieldViewModeWhileEditing; //清空模式
        _nameField.borderStyle = UITextBorderStyleRoundedRect;
        _nameField.layer.cornerRadius = 5;
        _nameField.layer.masksToBounds= YES;
    }
    return _nameField;
}
//密码
- (UITextField *)pwdField {
    if (!_pwdField) {
        _pwdField = [[UITextField alloc] init];
        _pwdField.frame = CGRectMake(150, _nameField.bottom+20,150 , 50);
//        _pwdField.backgroundColor = [UIColor orangeColor];
        _pwdField.clearButtonMode = UITextFieldViewModeWhileEditing; //清空模式
        _pwdField.borderStyle = UITextBorderStyleRoundedRect;
        _pwdField.layer.cornerRadius = 5;
        _pwdField.layer.masksToBounds= YES;
    }
    return _pwdField;
}
// 标题
- (UILabel *)titleLab {
    if (_titleLab==nil) {
        _titleLab = [[UILabel alloc] initWithFrame:CGRectMake(150, _pwdField.bottom+20, 180, 30)];
        _titleLab.font = FFont(18);
        _titleLab.textColor = Black_COLOR;
        _titleLab.backgroundColor = Cyan_COLOR;
    }
    return _titleLab;
}
//登录
- (UIButton *)loginBtn {
    if (_loginBtn==nil) {
        _loginBtn = [[UIButton alloc] initWithFrame:CGRectMake(150, _titleLab.bottom+20, 150, 36)];
        _loginBtn.backgroundColor = [UIColor colorWithWhite:0.700 alpha:1.000];
        _loginBtn.layer.cornerRadius = 10;
        _loginBtn.layer.masksToBounds= YES;
        [_loginBtn setTitle:@"登录" forState:UIControlStateNormal];
        [_loginBtn setTitleColor:White_COLOR forState:UIControlStateNormal];
        [_loginBtn.titleLabel setFont:[UIFont systemFontOfSize:18]];
    }
    return _loginBtn;
}

//触摸时
-(void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event{
    [self.view endEditing:YES];
}

@end
