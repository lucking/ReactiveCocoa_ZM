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
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="radio"> 
        <div class="x-titlebar-left" xid="div1" id="te"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="button20" icon="icon-chevron-left" onClick="returnMain"> 
            <i xid="i11" class="icon-chevron-left"/>  
            <span xid="span11"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">radio</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content2"> 
      <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">radio style</h3>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        label="源码" xid="button52" onClick="showStyleSource" bind-visible="isVisible"> 
        <i xid="i53"/>  
        <span xid="span52">源码</span> 
      </a>  
      <div xid="radioStyle"> 
        <span component="$UI/system/components/justep/button/radio" class="x-radio"
          xid="radio9" label="default"/>  
        <span class="x-radio fluid massive" component="$UI/system/components/justep/button/radio"
          name="radio" value="1" label="fluid massive"/>  
        <span component="$UI/system/components/justep/button/radio" class="x-radio x-radio-sm"
          xid="radio4" label="x-radio-sm"/>  
        <span component="$UI/system/components/justep/button/radio" class="x-radio x-radio-xs"
          xid="radio5" label="x-radio-xs"/>  
        <span component="$UI/system/components/justep/button/radio" class="x-radio x-radio-lg"
          xid="radio8" label="x-radio-lg"/>  
        <span component="$UI/system/components/justep/button/radio" class="x-radio"
          xid="radio3" label="disabled" disabled="true"/>  
        <span component="$UI/system/components/button/radio" class="x-radio mini"
          name="radio" value="3" label="选项----3"/> 
      </div>  
      <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">radio event</h3>  
        
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        label="js" xid="button55" onClick="showJsSource"> 
        <i xid="i56"/>  
        <span xid="span55">js</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" xid="button53" onClick="showEventSource" bind-visible="isVisible"> 
        <i xid="i54" />  
        <span xid="span53">源码</span> 
      </a><div xid="radioEvent"> 
        <span component="$UI/system/components/justep/button/radio" class="x-radio"
          xid="radioVal" label="i agree" value="1" name="radio1" onChange="radioChange"
          checkedValue="i agree"/>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="通过其他组件控制radio的状态" xid="button1" onClick="controlRadio"> 
          <i xid="i1"/>  
          <span xid="span1">通过其他组件控制radio的状态</span> 
        </a> 
      </div>  
      <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">radioGroup</h3>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        label="源码" xid="button54" onClick="showRadioGroupSource" bind-visible="isVisible"> 
        <i xid="i55"/>  
        <span xid="span54">源码</span> 
      </a>  
      <p>1、bind-ref感知data，继承data被感知部分的规则：如果该部分只读，则整个radioGroup只读</p>  
      <p>2、itemset感知data，继承data被感知部分的规则：如果该部分只读，只有对应选项只读</p>  
      <span component="$UI/system/components/justep/select/radioGroup" class="x-radio-group"
        xid="showRadioGroup" bind-ref="data2.ref('fValue')" bind-itemset="data1" bind-itemsetLabel="ref('fName')"
        bind-itemsetValue="ref('fName')"/>  
      <div component="$UI/system/components/justep/output/output" class="x-output"
        xid="showValue"/>  
      <div id="aler"/> 
    </div> 
  </div> 
</div>
