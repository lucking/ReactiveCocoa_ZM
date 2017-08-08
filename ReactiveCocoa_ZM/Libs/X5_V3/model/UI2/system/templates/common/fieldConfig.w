<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"
    style="height:auto;left:36px;top:125px;"> 
    <div component="$UI/system/components/justep/data/data" xid="data" confirm-delete="false"
      confirm-refresh="false" idColumn="id" onIndexChanged="dataIndexChanged" autoLoad="true" onIndexChanging="dataIndexChanging"> 
      <column name="id" type="String" label="id"/>  
      <column name="setting" type="String" label="配置项" xid="column1"/>  
      <column name="configPage" type="String" label="配置页"/>  
      <data xid="default1">[{"id":"1","setting":"显示项","configPage":"$UI/system/templates/common/reportField.w"},{"id":"2","setting":"分组","configPage":"$UI/system/templates/common/fieldGroup.w"},{"id":"3","setting":"统计项","configPage":"$UI/system/templates/common/countField.w"}]</data>
    </div> 
  </div>  
  <div id="index"> 
    <div class="row"> 
      <div class="col-xs-2 scroll "> 
        <ul class="nav cfg-nav" id="sidebar" bind-foreach="data.datas"> 
          <li> 
            <a href="#" bind-text="ref('setting')" bind-click="pageClick"/> 
          </li> 
        </ul> 
      </div>  
      <div class="col-xs-10"> 
        <div xid="composeParent"/> 
      </div> 
    </div> 
  </div> 
</div>
