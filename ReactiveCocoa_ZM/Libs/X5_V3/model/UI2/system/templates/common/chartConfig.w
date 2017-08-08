<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:-7px;top:62px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="publicData" idColumn="id"> 
      <column label="id" name="id" type="String" xid="default1"/>  
      <column label="configPage" name="configPage" type="String" xid="default2"/>  
      <column label="file" name="file" type="String" xid="default3"/>  
      <column label="require" name="require" type="String" xid="default4"/>  
      <data xid="default5">[{"id":"d_1","configPage":"$UI/system/templates/report/chart/config/public/title.w","file":"template/chartReport.w","require":"1"},{"id":"d_2","configPage":"$UI/system/templates/report/chart/config/public/detailTitle.w","file":"template/chartReport.w","require":"1"},{"id":"id_3","configPage":"1","file":"1","require":"1"}]</data> 
    </div> 
  </div>  
  <div id="index"> 
    <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1"> 
      <div class="x-col col-xs-2" xid="col1"> 
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row2"> 
          <div class="x-col" xid="col4"> 
            <div id="jqxTre" style="border:none"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/row/row" class="x-row"
          xid="row3"> 
          <div class="x-col" xid="col7"> 
            <div style="border: none;" id="showEle"/> 
          </div> 
        </div> 
      </div>  
      <div class="col-xs-10" xid="col2" style="padding:15px">
        <div xid="componseParent"/> 
      </div> 
    </div> 
  </div> 
</div>
