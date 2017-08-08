<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window" class="window">
	<div component="$UI/system/components/justep/model/model" xid="model"
		style="height:auto;top:55px;left:561px;" onLoad="modelLoad"></div>

	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
		<a class="navbar-brand" bind-text="$model.title"></a>
	</nav>
	
	<div xid="composeParent">
	</div>
	
	<nav class="navbar navbar-default navbar-fixed-bottom" role="navigation">
		<div class="navbar-buttons-container">
			<span style="display:inline-block;width:80px;">文件名：</span>
			<input component="$UI/system/components/justep/input/input" class="form-control" style="width:240px;display:inline" xid="fileName" value="mainActivity"/>
			<div class="btn-group-single pull-right" style="display:inline-block">
				<a component="$UI/system/components/justep/button/button" class='btn btn-default btn-dialog-back' bind-css="{hide: !$model.hasBackBtn.get()}" onClick="backBtnClick" xid="backBtn" label="上一步" ><i/><span>上一步</span></a>
				<a component="$UI/system/components/justep/button/button" class='btn btn-primary btn-dialog-next' bind-css="{hide: !$model.hasNextBtn.get()}" onClick="nextBtnClick" xid="nextBtn" label="下一步" ><i/><span>下一步</span></a>
				<a component="$UI/system/components/justep/button/button" class='btn btn-primary btn-dialog-finish' bind-css="{hide: !$model.hasFinishBtn.get()}" onClick="finishBtnClick" xid="finishBtn" label="完成" ><i/><span>完成</span></a>
				<a component="$UI/system/components/justep/button/button" class='btn btn-default btn-dialog-cancel' bind-css="{hide: !$model.hasCancelBtn.get()}" onClick="cancelBtnClick" xid="cancelBtn" label="取消" ><i/><span>取消</span></a>
			</div>
		</div>
	</nav>
		
</div>
