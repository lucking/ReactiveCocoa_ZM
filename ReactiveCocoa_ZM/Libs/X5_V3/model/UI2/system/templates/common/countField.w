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
      xid="selectData" idColumn="id" confirmDelete="false" onValueChanged="selectDataIndexChanged"> 
      <column label="id" name="id" type="String" xid="default4"/>  
      <column label="统计字段" name="selectField" type="String" xid="default5"/>  
      <column label="统计函数" name="countFunction" type="String" xid="default8"/>
      <column label="countFunctionValue" name="countFunctionValue" type="String"></column>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="groupData" idColumn="id" confirmDelete="false"> 
      <column label="id" name="id" type="String" xid="default3"/>  
      <column label="gpfield" name="gpfield" type="String" xid="default6"/>  
    </div> 
  </div>  
  <span style="display:block">选择在哪个分组上进行统计
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
      xid="labelSelect1"> 
      <label class="x-label" xid="label1"><![CDATA[分组：]]></label>  
      <select component="$UI/system/components/justep/select/select" class="form-control x-edit"
        xid="groupField" bind-options="groupData" bind-optionsValue="gpfield" bind-optionsLabel="gpfield"/> 
    </div> 
  </span>  
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
        data="selectData" editable="true" width="240" height="400"> 
        <column ref="selectField"/>  
        <column ref="countFunction" type="dropdownlist" onCreateEditor="listFunctionType"/> 
      </div> 
    </div> 
  </div> 
</div>
