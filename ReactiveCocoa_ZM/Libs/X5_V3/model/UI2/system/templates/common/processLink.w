<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:129px;top:373px;" onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="processData"
      idColumn="name"> 
      <rule/>  
      <column label="序号" name="index" type="String" xid="index1"/>  
      <column label="名称" name="name" type="String" xid="default1"/>  
      <column label="标识" name="identification" type="String"/>  
      <column label="生成文件" name="crefile" type="String"/> 
    </div> 
  </div>
  <div component="$UI/system/components/designerCommon/grid/grid" xid="grid" data="processData"
    style="width:95%;" editable="false"> 
    <column ref="name"/>  
    <column ref="identification"/>  
    <column ref="crefile"/> 
  </div> 
</div>
