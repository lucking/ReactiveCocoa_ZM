<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:189px;top:180px;"
    onLoad="modelLoad"><div component="$UI/system/components/justep/data/data" xid="pluginsData" idColumn="id" autoLoad="false"><data xid="default9">[]</data>
  <column label="ID" name="id" type="String" xid="default5"></column>
  <column label="PluginName" name="name" type="String" xid="default6"></column>
  <column label="Dependency" name="dependency" type="String" xid="default7"></column></div></div>  
  
  
  
  
  
  <div xid="div3" style="padding-top:8px;padding-bottom:8px;"><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="autoSelectPlugins" label="自动选择使用到的Corodva插件" checked="true" onChange="checkbox2Change"></span></div><div xid="pluginsDiv" style="display:none">
  
  <div xid="div2" style="padding-top:8px;padding-bottom:16px"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="全选" xid="btnSelectAll" onClick="btnSelectAllClick">
   <i xid="i1"></i>
   <span xid="span1">全选</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="取消全择" xid="btnCancelAll" onClick="btnCancelAllClick">
   <i xid="i2"></i>
   <span xid="span2">取消全择</span></a>
  </div><span component="$UI/system/components/justep/select/checkboxGroup" class="x-checkbox-group" xid="plugins" bind-itemset="pluginsData" bind-itemsetLabel="ref('name')" style="margin-top:8px;width:100%;" bind-itemsetValue="ref('id')" itemStyle="width:160px;margin:4px 0"></span>
  </div>
  </div>
