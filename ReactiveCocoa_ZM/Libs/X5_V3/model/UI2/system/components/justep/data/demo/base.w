<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:663px;top:128px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="masterData" idColumn="FID"> 
      <column label="FID" name="FID" type="String" xid="default26"/>  
      <column label="fString" name="fString" type="String" xid="default27"/>  
      <column label="fInteger" name="fInteger" type="Integer" xid="default28"/>  
      <column label="fFloat" name="fFloat" type="Float" xid="default29"/>  
      <column label="fDate" name="fDate" type="Date" xid="default31"/>  
      <column label="fDateTime" name="fDateTime" type="DateTime" xid="default32"/>  
      <column label="fTime" name="fTime" type="Time" xid="default33"/>  
      <rule xid="rule4"> 
        <col name="fString" xid="ruleCol3"> 
          <required xid="required2"> 
            <expr xid="default38">js:true</expr>  
            <message xid="default39">请填写String</message> 
          </required> 
        </col>  
        <col name="fInteger" xid="ruleCol4"> 
          <constraint xid="constraint1"> 
            <expr xid="default40">js:val('fInteger')&gt;50</expr>  
            <message xid="default41">fInteger必须大于50</message> 
          </constraint> 
        </col> 
      </rule> 
    </div>  
    </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="Data"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            xid="button1" onClick="{operation:'window.close'}"> 
            <i xid="i1"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">Data</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div style="padding:6px 6px 6px 6px;"> 
        <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">特性说明:</h3>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="masterData源码" xid="button10" onClick="showBizDataSource" bind-visible="isVisible"> 
          <i xid="i10"/>  
          <span xid="span12">masterData源码</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="js" xid="button12" onClick="showJsSource"> 
          <i xid="i12"/>  
          <span xid="span14">js</span> 
        </a>  
        <p>1、masterData中当String必填，提示“请填写String”
          <br/>2、masterDate的数据从该目录下base.json中获取。
          <br/> 3 、masterData中当Integer必须大于50
        </p> 
      </div>  
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="Master" xid="controlGroup1"> 
        <div class="x-control-group-title" xid="controlGroupTitle1"> 
          <span xid="span2">title</span> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput1"> 
          <label class="x-label" xid="label1" bind-text="masterData.label('fString')"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input1" bind-ref="masterData.ref('fString')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput2"> 
          <label class="x-label" xid="label2" bind-text="masterData.label('fInteger')"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input2" bind-ref="masterData.ref('fInteger')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput3"> 
          <label class="x-label" xid="label3" bind-text="masterData.label('fFloat')"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input3" bind-ref="masterData.ref('fFloat')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput5"> 
          <label class="x-label" xid="label5" bind-text="masterData.label('fDate')"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input5" bind-ref="masterData.ref('fDate')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput6"> 
          <label class="x-label" xid="label6" bind-text="masterData.label('fDateTime')"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input6" bind-ref="masterData.ref('fDateTime')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput7"> 
          <label class="x-label" xid="label7" bind-text="masterData.label('fTime')"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input7" bind-ref="masterData.ref('fTime')"/> 
        </div>  
        </div>  
      </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/> 
</div>
