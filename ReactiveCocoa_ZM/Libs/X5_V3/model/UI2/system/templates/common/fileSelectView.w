<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"
    style="height:auto;top:12px;left:20px;"> 
    <div component="$UI/system/components/justep/data/data" xid="fileSelectData"
      idColumn="colValue"> 
      <column name="colValue" type="String" label="查询结果"/> 
    </div> 
  </div>  
  <div style=" margin-left:12px;margin-right:12px;"> 
    <div class="row file-select-navbar" style="margin-top:12px;"> 
      <div class="col-xs-4"> 
        <input component="$UI/system/components/justep/input/input" class="form-control"
          id="queryInput" placeholder="请输入要选择的文件关键字" bind-keydown="input1Keydown"/> 
      </div>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        xid="queryButton" bind-click="queryButtonClick">查询</a> 
    </div>  
    <div xid="grids"> 
      <div component="$UI/system/components/designerCommon/grid/grid" data="fileSelectData"
        editable="false" xid="grid" style="margin:12px 0px 12px 0px;display:none;"> 
        <column ref="colValue" label="查询结果"/> 
      </div>
    </div>  
    <div class="box" style="overflow:auto;margin:12px 0px 12px 0px;" id="jqxTreeFile"/> 
  </div> 
</div>
