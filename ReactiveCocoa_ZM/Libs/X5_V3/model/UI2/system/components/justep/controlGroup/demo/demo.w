<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:523px;top:619px;"> 
    <div component="$UI/system/components/justep/data/data" xid="mainData"
      idColumn="fName" autoLoad="true"> 
      <column name="fName" type="String" label="名称"/>  
      <column name="fAge" type="Integer" label="年龄"/>  
      <column name="fText" type="String" label="说明信息"/>  
      <column name="fSex" type="String" label="性别"/>  
      <rule xid="rule1"/>  
      <data><![CDATA[
      [{fName:'张三',fAge:18,fText:'自我介绍...'},{fName:'test',fAge:28,fText:'自我介绍...'}]
      ]]></data> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="data1" idColumn="fValue" autoLoad="true"> 
      <column name="fValue" type="String" label="值"/>  
      <column name="fName" type="String" label="显示名称"/>  
      <data><![CDATA[
      [{fValue:'1',fName:'男'},{fValue:'0',fName:'女'}]
      ]]></data> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="controlGroup"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button3" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i3" class="icon-chevron-left"/>  
            <span xid="span3"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">controlGroup</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <p>容器组件,用来放置一组组件或数据 <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="源码" xid="button1" onClick="showControlGroupStyle" bind-visible="isVisible"> 
          <i xid="i1"/>  
          <span xid="span1">源码</span> 
        </a> </p>  
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" xid="controlGroupStyle" title="demo controlGroup"> 
        <div class="x-control-group-title" xid="controlGroupTitle1"> 
          <span xid="span2">demo controlGroup</span>
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label25"> 
          <label class="x-label center" data="mainData" bind-text="mainData.label('fName')"/>  
          <div class="x-edit"> 
            <input component="$UI/system/components/justep/input/input" placeHolder="请输入名称"
              class="form-control" data="mainData" bind-ref="mainData.ref('fName')"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label25"> 
          <label class="x-label center" bind-text="mainData.label('fName')"/>  
          <div class="x-edit"> 
            <div component="$UI/system/components/justep/output/output" class="x-output"
              data="mainData" bind-ref="mainData.ref('fName')"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label25"> 
          <label class="x-label center" bind-text="mainData.label('fAge')"/>  
          <div class="x-edit"> 
            <input component="$UI/system/components/justep/input/input" placeHolder="请输入年龄"
              class="form-control" data="mainData" bind-ref="mainData.ref('fAge')"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label25"> 
          <label class="x-label center" bind-text="mainData.label('fAge')"/>  
          <div class="x-edit"> 
            <div component="$UI/system/components/justep/output/output" class="x-output"
              data="mainData" bind-ref="mainData.ref('fAge')"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label25"> 
          <label class="x-label center" bind-text="mainData.label('fText')"/>  
          <div class="x-edit"> 
            <textarea component="$UI/system/components/justep/textarea/textarea"
              class="form-control" data="mainData" bind-ref="mainData.ref('fText')"/> 
          </div> 
        </div> 
</div> 
    </div>  
    </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w" style="left:330px;top:394px;"/> 
</div>
