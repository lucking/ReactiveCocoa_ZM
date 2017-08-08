<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window">
	<div component="$UI/system/components/justep/model/model" xid="model" style="top:117px;height:auto;left:395px;" onLoad="modelLoad">
		<div component="$UI/system/components/justep/data/data" xid="listData"
			idColumn="xid">
			<rule xid="rule1" />
			<column label="xid" name="xid" type="String" xid="xid1" />
			<column label="序号" name="index" type="String" xid="index1"/>
			<column label="关系名" name="name" type="String" xid="default1"/>
			<column label="关系类型" name="data-type" type="String" xid="default2" />
			<!-- label 变成 labelName -->
			<column label="列名" name="labelName" type="String" xid="default3" />
			<column label="列编辑器" name="colEditor" type="String" xid="default4" />
			<column label="是否显示" name="isVisible" type="String" xid="default5" />
		</div>
	</div>

	<div class="row middle list-navbar1" style="margin-top:12px">
		<label for="text1" class="control-label col-xs-2" style="padding-top:10px;;margin-left:15px">列表页标题：</label><div class="col-xs-4">
		<input component="$UI/system/components/justep/input/input" class="form-control" xid="titleInput" placeholder="请输入标题" /></div>
	</div>
	<div class="row list-navbar2">
		<ul class="nav navbar-nav" style="margin-left:15px">
			<li>
				<a bind-click="addClick" href="#" role="button"><i class="glyphicon glyphicon-plus"></i>新增</a>
			</li>
			<li>
				<a bind-click="deleteClick" href="#" role="button"><i class="glyphicon glyphicon-minus"></i>删除</a>
			</li>
			
			<li>
				<a bind-click="upClick" href="#" role="button"><i class="glyphicon glyphicon-arrow-up"></i>上移</a>
			</li>
			
			<li>
				<a bind-click="downClick" href="#" role="button"><i class="glyphicon glyphicon-arrow-down"></i>下移</a>
			</li>
		</ul>
	</div>
	
	<div component="$UI/system/components/designerCommon/grid/grid" xid="grid" data="listData"
		style="width:95%;visibility:hidden;" editable="true">
		<column ref="name"/>
		<column ref="data-type"/>
		<column ref="labelName"/>
		<column ref="colEditor" type="dropdownlist" onCreateEditor="gridColEditor"/>
		<column ref="isVisible" type="dropdownlist" onCreateEditor="gridColIsVisible"/> 
	</div>
</div>
