<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"
    style="height:auto;left:15px;top:489px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="columnData" idColumn="id"> 
      <column label="id" name="id" type="String" xid="default1"/>  
      <column label="columns" name="columns" type="String" xid="default2"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="mainData" idColumn="id"> 
      <column label="id" name="id" type="String" xid="default26"/>  
      <column label="chartType" name="chartType" type="String" xid="default31"/>  
      <column label="chartName" name="chartName" type="String" xid="default31"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="hrefData" idColumn="hrefModel"> 
      <column label="hrefModel" name="hrefModel" type="String" xid="default4"/>  
      <data xid="default5">[{"hrefModel":"window"},{"hrefModel":"dialog"},{"hrefModel":"replace"}]</data> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="data" idColumn="id" autoNew="false"> 
      <column label="id" name="id" type="String"/>  
      <column label="groupTitle" name="groupTitle" type="String"/>  
      <column label="groupID" name="groupID" type="String"/>  
      <column label="typeID" name="typeID" type="String"/>  
      <column label="numID" name="numID" type="String"/>  
      <column label="dataID" name="dataID" type="String"/>  
      <column label="chart_type" name="chart_type" type="String"/>  
      <column label="chart_name" name="chart_name" type="String"/>  
      <column label="metervalue" name="metervalue" type="String"/>  
      <column label="startTime" name="startTime" type="String"/>  
      <column label="endTime" name="endTime" type="String"/>  
      <column label="hrefAdr" name="hrefAdr" type="String"/>  
      <column label="hrefModel" name="hrefModel" type="String"/>  
      <column label="hrefTitle" name="hrefTitle" type="String"/>  
      <data xid="default7">[{"id":"1"}]</data>
    </div> 
  </div>  
  <div xid="index" bind-mousemove="setData"> 
    <div class="row"> 
      <div class="col-xs-4"> 
        <div class="scroll nav-container" style="border: none;" id="typeTree"/> 
      </div>  
      <div class="col-xs-8" id="descriptionDiv" style="padding-left:0"> 
        <div style="margin-top:12px;font-size:x-large;"/>  
        <div style="padding-right:12px"> 
          <h4 id="templateDesc" style="margin-top:12px;"/>  
          <div id="imgWindow" style="margin-top:12px;" bind-visible="$model.mainData.val('chartName')!= null"> 
            <span style="display:block;font-weight:bolder;">数据</span>  
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit x-label20" xid="labelOutput1"> 
              <label class="x-label" xid="label4"><![CDATA[数据源：]]></label>  
              <div component="$UI/system/components/justep/output/output" class="x-output x-edit"
                xid="dataid"/> 
            </div>  
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit x-label20" xid="labelInput2" bind-visible="$model._isVisiable($model.mainData.val('chartName')) == 'gantt'"> 
              <label class="x-label" xid="label2"><![CDATA[分组标题：]]></label>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="groupTitle" bind-ref="data.ref('groupTitle')"/> 
            </div>  
            <div id="e" bind-visible="$model._isVisiable($model.mainData.val('chartName')) != 'gantt'"> 
              <div id="d" bind-visible="$model._isVisiable($model.mainData.val('chartName')) != 'meter'"> 
                <div component="$UI/system/components/justep/labelEdit/labelEdit"
                  class="x-label-edit x-label20" xid="labelSelect3" bind-visible="$model._isVisiable($model.mainData.val('chartName')) != 'piechart'"> 
                  <label class="x-label" xid="label3"><![CDATA[分组条件：]]></label>  
                  <select component="$UI/system/components/justep/select/select"
                    class="form-control x-edit" xid="groupID" bind-options="columnData"
                    bind-optionsLabel="columns" bind-optionsValue="columns" bind-ref="data.ref('groupID')" bind-optionsCaption="选择分组条件"/> 
                </div>  
                <div component="$UI/system/components/justep/labelEdit/labelEdit"
                  class="x-label-edit x-label20" xid="labelSelect5"> 
                  <label class="x-label" xid="label6"><![CDATA[数据轴：]]></label>  
                  <select component="$UI/system/components/justep/select/select"
                    class="form-control x-edit" xid="numID" bind-options="columnData"
                    bind-optionsLabel="columns" bind-optionsValue="columns" bind-ref="data.ref('numID')" optionsAutoLoad="true" bind-optionsCaption="选择数据轴"/> 
                </div> 
              </div>  
              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                class="x-label-edit x-label20" bind-visible="$model._isVisiable($model.mainData.val('chartName')) == 'meter'"> 
                <label class="x-label"><![CDATA[数据值：]]></label>  
                <select component="$UI/system/components/justep/select/select"
                  class="form-control x-edit" xid="metervalue" bind-options="columnData"
                  bind-optionsLabel="columns" bind-optionsValue="columns" bind-ref="data.ref('metervalue')" bind-optionsCaption="选择数据值"/> 
              </div> 
            </div>  
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit x-label20" xid="labelSelect4" bind-visible="$model._isVisiable($model.mainData.val('chartName')) != 'meter'"> 
              <label class="x-label" xid="label5"><![CDATA[分类轴：]]></label>  
              <select component="$UI/system/components/justep/select/select" class="form-control x-edit"
                xid="typeID" bind-options="columnData" bind-optionsLabel="columns"
                bind-optionsValue="columns" bind-ref="data.ref('typeID')" bind-optionsCaption="选择分类轴"/> 
            </div>  
            <div bind-visible="$model._isVisiable($model.mainData.val('chartName')) == 'gantt'"> 
              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                class="x-label-edit x-label20"> 
                <label class="x-label"><![CDATA[开始时间：]]></label>  
                <select component="$UI/system/components/justep/select/select"
                  class="form-control x-edit" xid="startTime" bind-options="columnData"
                  bind-optionsLabel="columns" bind-optionsValue="columns" bind-ref="data.ref('startTime')" bind-optionsCaption="选择开始时间"/> 
              </div>  
              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                class="x-label-edit x-label20"> 
                <label class="x-label"><![CDATA[结束时间：]]></label>  
                <select component="$UI/system/components/justep/select/select"
                  class="form-control x-edit" xid="endTime" bind-options="columnData"
                  bind-optionsLabel="columns" bind-optionsValue="columns" bind-ref="data.ref('endTime')" bind-optionsCaption="选择结束时间"/> 
              </div> 
            </div>  
            <span style="display:block;font-weight:bolder;">图表链接</span>  
            <div> 
              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                class="x-label-edit x-label20" xid="labelInput1"> 
                <label class="x-label" xid="label1"><![CDATA[链接地址：]]></label>  
                <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                  xid="hrefAdr" bind-ref="data.ref('hrefAdr')"/> 
              </div>  
              <div component="$UI/system/components/justep/row/row" class="x-row"
                xid="row1"> 
                <div class="x-col" xid="col1"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label40" xid="labelSelect1"> 
                    <label class="x-label" xid="label7"><![CDATA[链接模式：]]></label>  
                    <select component="$UI/system/components/justep/select/select"
                      class="form-control x-edit" xid="hrefModel" bind-options="hrefData"
                      bind-optionsValue="hrefModel" bind-optionsLabel="hrefModel"
                      bind-ref="data.ref('hrefModel')"/> 
                  </div> 
                </div>  
                <div class="x-col" xid="col2"> 
                  <div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit x-label40" xid="labelInput3"> 
                    <label class="x-label" xid="label8"><![CDATA[链接标题：]]></label>  
                    <input component="$UI/system/components/justep/input/input"
                      class="form-control x-edit" xid="hrefTitle" bind-ref="data.ref('hrefTitle')"/> 
                  </div> 
                </div> 
              </div> 
            </div> 
          </div>  
          <a class="lr-btn arrow-left"/>  
          <a class="lr-btn arrow-right"/> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
