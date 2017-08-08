<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:11px;top:284px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="data" idColumn="id"> 
      <column label="id" name="id" type="String" xid="default1"/>  
      <column label="可用字段" name="useField" type="String" xid="default2"/>  
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="cellData" idColumn="id" confirmDelete="false"> 
      <column label="id" name="id" type="String" xid="default4"/>  
      <column label="列字段" name="cellField" type="String" xid="default5"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="rowData" idColumn="id" confirmDelete="false"> 
      <column label="id" name="id" type="String" xid="default6"/>  
      <column label="行字段" name="rowField" type="String" xid="default7"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="countData" idColumn="id" confirmDelete="false" onValueChanged="countDataValueChanged"> 
      <column label="id" name="id" type="String" xid="default10"/>  
      <column label="统计字段" name="countField" type="String" xid="default11"/>  
      <column label="countType" name="countType" type="String" xid="default12"/>  
      <column label="countTypeValue" name="countTypeValue" type="String" xid="default13"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/row/row" class="x-row" style="height:43px;"> 
    <div class="x-col"/>  
    <div class="x-col x-col-20"/>  
    <div class="x-col">列字段:
      <a class="btn btn-default" component="$UI/system/components/justep/button/button"
        onClick="cellFieldDel">删除</a> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1"> 
    <div class="x-col" xid="col1"> 
      <div component="$UI/system/components/designerCommon/grid/grid" xid="grid"
        data="data" editable="false" width="250" height="180"> 
        <column ref="useField"/> 
      </div> 
    </div>  
    <div class="x-col x-col-20 x-col-bottom" xid="col2"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        xid="button1" icon="icon-arrow-right-c" onClick="addCell" style="display:block;width:40px;"> 
        <i xid="i1" class="icon-arrow-right-c"/>  
        <span xid="span1"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        xid="button2" icon="icon-arrow-down-c" onClick="addRow"> 
        <i xid="i2" class="icon-arrow-down-c"/>  
        <span xid="span2"/> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        xid="button3" icon="icon-android-arrow-down-right" onClick="addCount"> 
        <i xid="i3" class="icon-android-arrow-down-right"/>  
        <span xid="span3"/> 
      </a> 
    </div>  
    <div class="x-col" xid="col3"> 
      <div component="$UI/system/components/designerCommon/grid/grid" xid="grid"
        data="cellData" editable="false" width="250" height="180"> 
        <column ref="cellField"/> 
      </div> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/row/row" class="x-row" style="height:43px;"> 
    <div class="x-col">行字段：
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        label="删除" xid="rowDel" onClick="rowFieldDel"> 
        <i xid="i4"/>  
        <span xid="span4">删除</span> 
      </a> 
    </div>  
    <div class="x-col x-col-20"/>  
    <div class="x-col">统计字段:
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        label="删除" xid="countDel" onClick="countFieldDel"> 
        <i xid="i5"/>  
        <span xid="span5">删除</span> 
      </a> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3"> 
    <div class="x-col" xid="col8"> 
      <div component="$UI/system/components/designerCommon/grid/grid" xid="grid"
        data="rowData" editable="false" width="250" height="180"> 
        <column ref="rowField"/> 
      </div> 
    </div>  
    <div class="x-col x-col-20" xid="col9"/>  
    <div class="x-col" xid="col10"> 
      <div component="$UI/system/components/designerCommon/grid/grid" xid="grid"
        data="countData" editable="true" width="250" height="180"> 
        <column ref="countField"/>  
        <column ref="countType" type="dropdownlist" onCreateEditor="listFunctionType"/> 
      </div> 
    </div> 
  </div>  
  <div class="text-center"> 
    <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
      xid="rowCount" label="根据行字段求和统计" checkedValue="true"/>  
    <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
      xid="cellCount" label="根据列字段求和统计" checkedValue="true"/> 
  </div> 
</div>
