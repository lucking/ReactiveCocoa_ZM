<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:6px;height:auto;left:455px;" onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="data" idColumn="name" confirm-delete="false" confirm-refresh="false" onValueChange="dataValueChange"> 
      <column name="name" type="String" label="名称"/>  
      <column name="type" type="String" label="数据类型"/>  
      <column name="displayName" type="String" label="显示名称"/>  
      <column name="isIDColumn" type="Boolean" label="是否ID列"/>  
      </div> 
  </div>
  <div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group">
		  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="新增"
		    xid="add" onClick="addClick"><i/><span>新增</span></a>  
		  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="删除"
		    xid="delete" onClick="deleteClick"><i/><span>删除</span></a> 
		  <!-- 
		  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="上移"
		    xid="up"/>  
		  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="下移"
		    xid="down"/>  
		  -->   
	  <div style="margin-top:10px;" component="$UI/system/components/designerCommon/grid/grid" xid="grid" data="data" width="755" height="420" editable="true"> 
	    <column ref="name"/>  
	    <column ref="type" type="dropdownlist" onCreateEditor="gridColCreateEditor"/>  
	    <column ref="displayName" />
	    <column ref="isIDColumn" width="80" type="checkbox"/>  
	  </div> 
  </div>  
</div>
