<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="window" component="$UI/system/components/justep/window/window"
  xid="window" style="height:6px;">  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="panel#top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="bar组件"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button3" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i3" class="icon-chevron-left"/>  
            <span xid="span3"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">bar组件</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="panel#content1"> 
      <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">bar style</h3> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="源码" onClick="showBarSource" bind-visible="isVisible"> 
          <i/>  
          <span>源码</span> 
        </a>
          
        <p>容器组件,一般放置button,buttonGroup等组件</p> 
       
    </div>  
    <div class="x-panel-bottom" xid="panel#bottom1"> 
      <div component="$UI/system/components/justep/bar/bar" class="x-bar" xid="demoBar"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="button" xid="button1" onClick="click2"> 
          <i xid="i1"/>  
          <span xid="span1">button</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="button" xid="button2"> 
          <i xid="i2"/>  
          <span xid="span2">button</span> 
        </a> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/>
</div>
