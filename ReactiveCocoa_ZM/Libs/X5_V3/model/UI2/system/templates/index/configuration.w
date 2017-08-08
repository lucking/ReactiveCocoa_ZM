<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:34px;left:522px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="data" confirm-delete="false"
      confirm-refresh="false" idColumn="id" onIndexChanged="dataIndexChanged"> 
      <column name="setting" type="String" label="配置项" xid="column1"/>  
      <column name="id" type="String" label="id"/>  
      <column name="configPage" type="String" label="配置页"/>  
      <column name="file" type="String" label="模板文件"/> 
    </div> 
  </div>  
  <div class="row"> 
    <div class="col-xs-2 scroll nav-container"> 
      <ul class="nav cfg-nav" id="sidebar" bind-foreach="data.datas"> 
        <li bind-css="{active: $model.data.currentRow.get() == $object}"> 
          <a href="#" bind-text="ref('setting')" bind-click="pageClick"/> 
        </li> 
      </ul> 
    </div>  
    <div class="col-xs-10"> 
      <div xid="composeParent"/> 
    </div> 
  </div> 
</div>
