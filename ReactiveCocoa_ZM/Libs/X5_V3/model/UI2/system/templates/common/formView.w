<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window">
	<div component="$UI/system/components/justep/model/model" xid="model" style="top:117px;height:auto;left:395px;" onLoad="modelLoad">
		<div component="$UI/system/components/justep/data/data" xid="formData"
			idColumn="name">
			<rule xid="rule1" />
			<column label="序号" name="index" type="String" xid="index1"/>
			<column label="关系名称" name="name" type="String" xid="default1"/>
			<column label="关系类型" name="data-type" type="String" xid="default2" />
			<column label="关系标签" name="labelName" type="String" xid="default3" />
			<column label="编辑器(*)" name="colEditor" type="String" xid="default4" />
			<column label="对应ID" name="refID" type="String" xid="default7" />
			<column label="关联dataID" name="selectDataID" type="String" xid="default6" />
			<column label="关联列名" name="selectLabelName" type="String" xid="default8" />
		</div>
	</div>

	<div class="row form-navbar1" style="margin-top:12px">
		<label for="text1" class="control-label col-xs-2" style="padding-top:10px;margin-left:15px">详细页标题：</label>
		<div class="col-xs-4">
			<input component="$UI/system/components/justep/input/input" class="form-control" xid="titleInput" placeholder="请输入标题" onChange="input1Change"/>
		</div>
	</div>
	<div class="row form-navbar2">
		<ul class="nav navbar-nav" style="margin-left:15px">
			<li>
				<a bind-click="addClick" href="#" role="button"><i class="glyphicon glyphicon-plus"></i>添加关系</a>
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
	
	<div component="$UI/system/components/designerCommon/grid/grid" xid="grid" data="formData"
		style="visibility:hidden;width:95%;" editable="true">
		<column ref="name"/>
		<column ref="data-type"/>
		<column ref="labelName"/>
		<column ref="colEditor" type="dropdownlist" onCreateEditor="gridColEditor"/>
		<column ref="refID" type="dropdownlist" onCreateEditor="gridColIsRefID"/>
		<column ref="selectDataID" type="dropdownlist" onCreateEditor="gridColIsSelectDataID"/>
		<column ref="selectLabelName" type="dropdownlist" onCreateEditor="gridColIsSelectLabelName"/>
		
	</div>
</div>
