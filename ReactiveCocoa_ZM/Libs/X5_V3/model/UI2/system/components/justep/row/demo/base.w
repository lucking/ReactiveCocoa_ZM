<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="root">  
  <div component="$UI/system/components/justep/model/model" xid="model1" style="height:auto;left:99px;top:26px;"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w" style="left:409px;top:268px;"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="row"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button2" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i2" class="icon-chevron-left"/>  
            <span xid="span2"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">row</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="title" xid="controlGroup1"> 
        <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">row</h3>
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="源码" xid="button1" onClick="showRowSource" bind-visible="isVisible"> 
            <i xid="i1"/>  
            <span xid="span1">源码</span> 
          </a> 
          
        <p>容器组件：基于css3 flex实现，自适应分辨率，如电脑，手机，平板等</p> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="demoRow"
        style="height:150px"> 
        <div class="x-col x-col-top" xid="col1" style="background-color:#CCCCCC;height:50px;">x-col-top</div>  
        <div class="x-col x-col-center" xid="col2" style="background-color:#FFFFCC;height:50px;">x-col-center</div>  
        <div class="x-col x-col-bottom" xid="col3" style="background-color:#6699CC;height:50px;">x-col-bottom</div>  
        <div class="x-col" xid="col4" style="background-color:#eee;">default</div> 
</div> 
    </div> 
  </div> 
</div>
