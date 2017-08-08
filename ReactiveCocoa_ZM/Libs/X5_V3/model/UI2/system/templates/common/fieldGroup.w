<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:724px;top:324px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="data" idColumn="id" confirmDelete="false" onIndexChanged="dataIndexChanged"> 
      <column label="id" name="id" type="String" xid="default1"/>  
      <column label="可用字段" name="rep_field" type="String" xid="default2"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="groupData" idColumn="id" confirmDelete="false" onIndexChanged="groupDataIndexChanged"> 
      <column label="id" name="id" type="String" xid="default4"/>  
      <column label="分组字段" name="groupField" type="String" xid="default5"/> 
    </div> 
  </div>  
  <div id="index"/>  
  <div component="$UI/system/components/justep/row/row" class="x-row"> 
    <div class="x-col"> 
      <div component="$UI/system/components/designerCommon/grid/grid" xid="grid"
        data="data" editable="false" width="240" height="400"> 
        <column ref="rep_field"/> 
      </div> 
    </div>  
    <div class="x-col x-col-20 x-col-center"> 
      <br/>  
      <a class="btn btn-default" component="$UI/system/components/justep/button/button"
        onClick="addAll" style="width:46px;">&gt;&gt;</a>  
      <br/>  
      <a class="btn btn-default" component="$UI/system/components/justep/button/button"
        onClick="add" style="width:46px;">&gt;</a>  
      <br/>  
      <a class="btn btn-default" component="$UI/system/components/justep/button/button"
        onClick="del" style="width:46px;">&lt;</a>  
      <br/>  
      <a class="btn btn-default" component="$UI/system/components/justep/button/button"
        onClick="delAll" style="width:46px;">&lt;&lt;</a> 
    </div>  
    <div class="x-col"> 
      <div component="$UI/system/components/designerCommon/grid/grid" xid="grid"
        data="groupData" editable="false" width="240" height="400"> 
        <column ref="groupField"/> 
      </div> 
    </div> 
  </div> 
</div>
