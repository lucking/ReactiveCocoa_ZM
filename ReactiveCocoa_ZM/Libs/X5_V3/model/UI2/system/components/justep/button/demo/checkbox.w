<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model1" style="position:absolute;;left:861px;top:154px"> 
    <div component="$UI/system/components/justep/data/data" xid="data1" idColumn="fName"
      autoLoad="true"> 
      <column label="col0" name="fName" type="String" xid="default1"/>  
      <rule xid="rule1"/>  
      <data><![CDATA[
      [{fName:'one'}, {fName:'two'}, {fName:'three'}]
      ]]></data> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="data2" idColumn="fValue"
      onValueChange="dataValueChange" autoLoad="true"> 
      <column label="col0" name="fValue" type="String" xid="default3"/>  
      <rule xid="rule2"/>  
      <data xid="default2">[{fValue:'one'}]</data> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="checkbox"> 
        <div class="x-titlebar-left" xid="div1" id="te"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="button20" icon="icon-chevron-left" onClick="returnMain"> 
            <i xid="i11" class="icon-chevron-left"/>  
            <span xid="span11"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">checkbox</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content2"> 
      <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">checkbox style</h3>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        label="源码" xid="button45" onClick="showStyleSource" bind-visible="isVisible"> 
        <i xid="i28"/>  
        <span xid="span28">源码</span> 
      </a>  
      <div xid="checkboxStyle"> 
        <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
          xid="checkbox7" name="agree" label="default" value="agree"/>  
        <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox x-checkbox-sm"
          xid="checkbox2" label="x-checkbox-sm"/>  
        <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox x-checkbox-xs"
          xid="checkbox3" label="x-checkbox-xs"/>  
        <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox x-checkbox-lg"
          xid="checkbox4" label="x-checkbox-lg"/>  
        <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
          xid="checkbox1" label="disabled" disabled="true"/> 
      </div>  
      <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">checkbox event
          
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="js" xid="button50" onClick="showJsSource"> 
          <i xid="i51"/>  
          <span xid="span50">js</span> 
        </a> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" xid="button47" onClick="showEventSource" bind-visible="isVisible"> 
          <i xid="i50" />  
          <span xid="span49">源码</span> 
        </a></h3>  
      <div xid="checkboxEvent"> 
        <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox "
          xid="checkboxVal" label="agree" onChange="checkboxChange" checkedValue="1"/>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="通过其他组件控制checkbox选中状态" xid="button1" onClick="controlCheckbox"> 
          <i xid="i1"/>  
          <span xid="span1">通过其他组件控制checkbox选中状态</span> 
        </a> 
      </div>  
      <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">checkboxGroup</h3>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        label="源码" xid="button51" onClick="showCheckboxGroupSource" bind-visible="isVisible"> 
        <i xid="i52"/>  
        <span xid="span51">源码</span> 
      </a>  
      <p>1、bind-ref感知data，继承data被感知部分的规则：如果该部分只读，则整个checkboxGroup只读</p>  
      <p>2、itemset感知data，继承data被感知部分的规则：如果该部分只读，只有对应选项只读</p>  
      <span component="$UI/system/components/justep/select/checkboxGroup" xid="showCheckboxGroup"
        class="x-checkbox-group" bind-ref="data2.ref('fValue')" bind-itemset="data1"
        bind-itemsetLabel="ref('fName')" bind-itemsetValue="ref('fName')"></span>  
      <div component="$UI/system/components/justep/output/output" class="x-output"
        xid="showValue"/> 
    </div>  
    <div id="aler"/> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/> 
</div>
