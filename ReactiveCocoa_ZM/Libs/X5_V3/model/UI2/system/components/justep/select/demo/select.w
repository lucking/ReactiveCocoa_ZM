<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:665px;top:219px;"> 
    <div component="$UI/system/components/justep/data/data" xid="itemData"
      idColumn="fValue" autoLoad="true"> 
      <column name="fValue" type="String" label="值"/>  
      <column name="fName" type="String" label="显示名称"/>  
      <data xid="default10">[{"fValue":"black","fName":"黑色"},{"fValue":"red","fName":"红色"},{"fValue":"green","fName":"绿色"},{"fValue":"blue","fName":"蓝色"},{"fValue":"orange","fName":"橙色"},{"fValue":"yellow","fName":"黄色"},{"fValue":"purple","fName":"紫色"},{"fValue":"gray","fName":"灰色"}]</data> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="mainData"
      idColumn="fID" autoLoad="true"> 
      <column label="ID" name="fID" type="String" xid="default4"/>  
      <column label="单选值" name="fSingleValue" type="String" xid="default5"/>  
      <column label="单选显示值" name="fSingleLabel" type="String" xid="default6"/>  
      <column label="多选值" name="fMultiValue" type="String" xid="default7"/>  
      <column label="多选显示值" name="fMultiLabel" type="String" xid="default8"/>  
      <data xid="default12">[{"fID":"1","fSingleValue":"black","fSingleLabel":"黑色","fMultiValue":"red"}]</data>
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="select"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">select</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="title" xid="controlGroup1"> 
        <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">select style</h3>
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button2" label="源码" onClick="showSelectStyleSource" bind-visible="isVisible"> 
            <i xid="i2"/>  
            <span xid="span2">源码</span> 
          </a> 
          
        <p>select组件支持option部分绑定data，options下的autoLoad=true时会在下拉选择数据时进行data数据加载（data没有加载数据时）</p>  
        <div xid="selectStyle"> 
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20" xid="labelSelect2"> 
            <label class="x-label" xid="label2"><![CDATA[sm]]></label>  
            <select component="$UI/system/components/justep/select/select" class="form-control input-sm x-edit"
              xid="select9" bind-options="itemData" bind-optionsLabel="fName" bind-optionsValue="fValue"/> 
          </div>  
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20" xid="labelSelect3"> 
            <label class="x-label" xid="label3"><![CDATA[default]]></label>  
            <select component="$UI/system/components/justep/select/select" class="form-control x-edit"
              xid="select10" bind-options="itemData" bind-optionsLabel="fName" bind-optionsValue="fValue"/> 
          </div>  
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20" xid="labelSelect4"> 
            <label class="x-label" xid="label4"><![CDATA[lg]]></label>  
            <select component="$UI/system/components/justep/select/select" class="form-control input-lg x-edit"
              xid="select11" bind-options="itemData" bind-optionsLabel="fName" bind-optionsValue="fValue"/> 
          </div> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="title" > 
        <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">select event</h3>
            
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="js" onClick="showJsSource"> 
            <i/>  
            <span>js</span> 
          </a> 
          
        <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" onClick="showSelectEventSource" bind-visible="isVisible"> 
            <i />  
            <span>源码</span> 
          </a><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="selectEvent"> 
          <label class="x-label" xid="label1"><![CDATA[颜色]]></label>  
          <select component="$UI/system/components/justep/select/select" class="form-control x-edit"
            xid="demoSelect" bind-options="itemData" bind-optionsLabel="fName" bind-optionsValue="fValue"
            bind-optionsCaption="请选择颜色..." onChange="selectChange" bind-ref="mainData.ref('fSingleValue')"
            bind-labelRef="mainData.ref('fSingleLabel')"/> 
        </div>  
        <div component="$UI/system/components/justep/output/output" class="x-output"
          xid="output"/> 
      </div>  
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/>  
  <div id="aler"/> 
</div>
