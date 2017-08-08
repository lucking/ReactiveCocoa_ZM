<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:6px;height:auto;left:455px;" onLoad="modelLoad"> 
  </div>
  <div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group">
	<a component="$UI/system/components/justep/button/button" class="btn btn-default" label="新增"
		    xid="add" onClick="addClick"><i/><span>新增</span></a>  
	<a component="$UI/system/components/justep/button/button" class="btn btn-default" label="删除"
		    xid="delete" onClick="deleteClick"><i/><span>删除</span></a>
  </div>
  <div xid="editGroup" component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group">
  </div>  
</div>
