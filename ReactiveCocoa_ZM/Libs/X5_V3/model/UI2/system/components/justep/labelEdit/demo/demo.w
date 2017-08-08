<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:21px;height:auto;left:561px;"> 
    <div component="$UI/system/components/justep/data/data" xid="mainData"
      idColumn="fName" autoLoad="true"> 
      <column name="fName" type="String" label="名称"/>  
      <column name="fAge" type="Integer" label="年龄"/>  
      <column name="fText" type="String" label="说明信息"/>  
      <column name="fSex" type="String" label="性别"/>  
      <rule xid="rule1"/>  
      <data><![CDATA[
      [{fName:'张三',fAge:18,fText:'请输入...'},{fName:'test',fAge:28,fText:'请输入...'}]
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
  <div/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="labelEdit"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">labelEdit</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="labelEdit组件"> 
          <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">labelEdit</h3>
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="源码" xid="button2" onClick="showLabelEditSource" bind-visible="isVisible"> 
              <i xid="i2"/>  
              <span xid="span2">源码</span> 
            </a> 
           
        <p>1、包含label部分和edit部分</p>
        <p>2、label部分：通过bind-text感知data数据</p> 
        <p>3、edit部分：通过bind-ref感知data数据</p> 
        <div xid="showLabelEdit"> 
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20"> 
            <label class="x-label x-center" bind-text="mainData.label('fName')"/>  
            <input component="$UI/system/components/justep/input/input" placeHolder="请输入名称"
              class="form-control x-edit" data="mainData" bind-ref="mainData.ref('fName')"/> 
          </div>  
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20"> 
            <label class="x-label x-center" bind-text="mainData.label('fName')"/>  
            <div component="$UI/system/components/justep/output/output" class="x-output x-edit"
              data="mainData" bind-ref="mainData.ref('fName')"/> 
          </div>  
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20"> 
            <label class="x-label x-center" bind-text="mainData.label('fAge')"/>  
            <input component="$UI/system/components/justep/input/input" placeHolder="请输入年龄"
              class="form-control x-edit" data="mainData" bind-ref="mainData.ref('fAge')"/> 
          </div>  
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20"> 
            <label class="x-label x-center" bind-text="mainData.label('fAge')"/>  
            <div component="$UI/system/components/justep/output/output" class="x-output x-edit"
              data="mainData" bind-ref="mainData.ref('fAge')"/> 
          </div>  
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20"> 
            <label class="x-label x-center" bind-text="mainData.label('fSex')"/>  
            <select component="$UI/system/components/justep/select/select" class="form-control x-edit"
              bind-ref="mainData.ref('fSex')" bind-options="data1" bind-optionsLabel="fName"
              bind-optionsValue="fValue" bind-optionsCaption="请选择性别..."/> 
          </div>  
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20"> 
            <label class="x-label x-center" bind-text="mainData.label('fSex')"/>  
            <div component="$UI/system/components/justep/select/radioGroup"
              class="x-radio-group x-edit" bind-itemset="data1.datas" bind-itemsetValue="ref('fValue')"
              bind-itemsetLabel="ref('fName')" bind-ref="mainData.ref('fSex')"/> 
          </div>  
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20"> 
            <label class="x-label x-center" bind-text="mainData.label('fSex')"/>  
            <div component="$UI/system/components/justep/select/checkboxGroup"
              class="x-checkbox-group x-edit" bind-itemset="data1.datas" bind-itemsetValue="ref('fValue')"
              bind-itemsetLabel="ref('fName')" bind-ref="mainData.ref('fSex')"/> 
          </div>  
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20"> 
            <label class="x-label x-center" bind-text="mainData.label('fSex')"/>  
            <span component="$UI/system/components/justep/button/toggle" class="x-toggle x-edit"
              type="checkbox" name="checkbox1" ON="男" OFF="女" bind-ref="mainData.ref('fSex')"
              checkedValue="1" checked="true"/> 
          </div>  
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20"> 
            <label class="x-label x-center" bind-text="mainData.label('fText')"/>  
            <textarea component="$UI/system/components/justep/textarea/textarea"
              class="form-control x-edit" data="mainData" bind-ref="mainData.ref('fText')"/> 
          </div> 
        </div> 
      </div> 
    </div>  
    </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/> 
</div>
