<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="breadcrumb"> 
        <div class="x-titlebar-left" xid="div3"><a component="$UI/system/components/justep/button/button" class="btn btn-link" xid="button3" icon="icon-chevron-left" onClick="closeWin">
   <i xid="i3" class="icon-chevron-left"></i>
   <span xid="span3"></span></a></div>  
        <div class="x-titlebar-title" xid="div4">breadcrumb</div>  
        <div class="x-titlebar-right reverse" xid="div5"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="push" onClick="button1Click" xid="button1"> 
            <i xid="i2"/>  
            <span xid="span2">button</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="pop" onClick="button2Click" xid="button2"> 
            <i xid="i1"/>  
            <span xid="span1">button</span> 
          </a> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="title" xid="controlGroup1"> 
        <ul component="$UI/system/components/bootstrap/breadcrumb/breadcrumb"
          class="breadcrumb" xid="breadcrumb" onClick="breadcrumbClick"/>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput1"> 
          <label class="x-label" xid="label1" style="color:#000000;"><![CDATA[label：]]></label>  
          <div class="x-edit" xid="div1"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="inputLabel" bind-ref="label"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput2"> 
          <label class="x-label" xid="label2" style="color:#000000;"><![CDATA[value：]]></label>  
          <div class="x-edit" xid="div2"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="inputValue" bind-ref="value"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelEdit1"> 
          <label class="x-label" xid="label4"/>  
          <div class="x-edit" xid="div6"> 
            <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
              xid="checkbox1" label="导航模式" bind-checked="isNavigator"/> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
