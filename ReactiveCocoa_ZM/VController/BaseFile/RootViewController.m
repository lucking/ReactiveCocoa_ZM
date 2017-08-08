//
//  RootViewController.m
//  ZM_ImageCaches
//
//  Created by tangdi on 16/4/17.
//  Copyright © 2016年 TD. All rights reserved.
//

#import "RootViewController.h"
#import "BaseHeader.h"
#import "FirstViewController.h"
#import "SecondViewController.h"
#import "ThreeViewController.h"

@interface RootViewController ()<UITableViewDataSource,UITableViewDelegate>
{
	UITableView* ttableView;
}
@property (nonatomic, retain) NSArray* titleArray;

@end

@implementation RootViewController

- (void)viewDidLoad {
    [super viewDidLoad];
	self.view.backgroundColor = BgColor;
	self.title = @"Home";
//	self.navigationController.navigationBar.hidden = YES;

	NSArray* titleArray = @[@"FirstVC",@"SecondVC",@"ThreeVC",@"FourVC",@"FiveVC"];
	self.titleArray = titleArray;


	self.automaticallyAdjustsScrollViewInsets = NO;
	float yy = 74;
	ttableView= [[UITableView alloc]initWithFrame:CGRectMake(5, yy,SSWIDTH-10, SSHEIGHT-yy)];
	ttableView.backgroundColor = White_COLOR;
	ttableView.delegate = self;
	ttableView.dataSource= self;
	//ttableView.scrollEnabled= YES;
	//	ttableView.separatorStyle= UITableViewCellSeparatorStyleNone;
	[self.view addSubview:ttableView];

	[Common clearTableViewLine:ttableView];

	//ttableView.rowHeight= 44;


}
#pragma mark UITableView
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    // 刚选中又马上取消选中，格子不变色
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    //NSSLog(@"indexPath = %ld",(long)indexPath.row);
    
    if (indexPath.row == 0) {
        FirstViewController *firstVC = [[FirstViewController alloc]init];
        [self.navigationController pushViewController:firstVC animated:YES];
        
    }else if (indexPath.row == 1 ){
        SecondViewController *pushVC = [[SecondViewController alloc]init];
        [self.navigationController pushViewController:pushVC animated:YES];
        
    }else if (indexPath.row == 2 ){
        ThreeViewController *pushVC = [[ThreeViewController alloc]init];
        [self.navigationController pushViewController:pushVC animated:YES];
        
    }else if (indexPath.row == 3 ){
        
    }else if (indexPath.row == 4 ){
       
    }
    
}


#pragma mark ------"  UITableViewDataSource、UITableViewDelegate  "------
// rowHeight
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
	return 60;
}
// row
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
	return _titleArray.count;
}
// cell
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
	static NSString *cellId = @"Cell";
	UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellId];

	if (cell == nil){
		cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellId];
		[cell setSelectionStyle:UITableViewCellSelectionStyleNone];
	}
	for (UIView *subviews in [cell.contentView subviews]) {
		[subviews removeFromSuperview];
	}

	cell.textLabel.text = _titleArray[indexPath.row];


	return cell;
}


@end
