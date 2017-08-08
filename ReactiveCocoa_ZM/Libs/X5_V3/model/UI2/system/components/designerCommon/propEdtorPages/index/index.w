<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window" class="window">
	<div component="$UI/system/components/justep/model/model" xid="model"
		style="height:auto;left:544px;top:167px;" onLoad="modelLoad"></div>

	<div class="frameFix1" xid="composeParent">
	</div>
	
	<nav class="navbar navbar-default navbar-fixed-bottom" role="navigation">
		<div class="navbar-buttons-container">
			<div class="btn-group-single pull-right">
<!--				<a component="$UI/system/components/justep/button/button" class='btn btn-default btn-dialog-default' onClick="refreshBtnClick" xid="refreshBtn" label="刷新" ><i/><span>刷新</span></a>-->
				<a component="$UI/system/components/justep/button/button" class='btn btn-primary btn-dialog-finish' onClick="okBtnClick" xid="okBtn" label="完成" ><i/><span>完成</span></a>
				<a component="$UI/system/components/justep/button/button" class='btn btn-default btn-dialog-cancel' onClick="cancelBtnClick" xid="cancelBtn" label="取消" ><i/><span>取消</span></a>
			</div>
			
		</div>
	</nav>		
</div>
