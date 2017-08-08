<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:239px;top:557px;"/>  
  <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver"
    xid="demoPopOver" opacity="0.1" position="bottom" dismissible="true" anchor="button1"> 
    <div class="x-popOver-overlay" xid="div6"/>  
    <div class="x-popOver-content" xid="div7"> 
      <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"
        style="display: block; position: static;"> 
        <li role="presentation"> 
          <a role="menuitem" tabindex="0" bind-click="a1Click">Action</a> 
        </li>  
        <li role="presentation"> 
          <a role="menuitem" tabindex="0" bind-click="a1Click">Another action</a> 
        </li>  
        <li role="presentation"> 
          <a role="menuitem" tabindex="0" bind-click="a1Click">Something else here</a> 
        </li>  
        <li role="presentation" class="divider"/>  
        <li role="presentation"> 
          <a role="menuitem" tabindex="0" bind-click="a1Click" class="btn-warning">Cancel</a> 
        </li> 
      </ul> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="popOver"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button3" icon="icon-chevron-left" onClick="backBtn"> 
            <i xid="i3" class="icon-chevron-left"/>  
            <span xid="span3"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">popOver</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
        <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">popOver</h3>
            
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="js" xid="button4" onClick="showJsSource"> 
            <i xid="i4"/>  
            <span xid="span4">js</span> 
          </a> 
         
      <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" xid="button2" onClick="showPopOverSource" bind-visible="isVisible"> 
            <i xid="i2" />  
            <span xid="span2">源码</span> 
          </a><div> 
        <p>弹出一个遮罩层,里面可放置任意组件或者数据,页面不可视,结合可视组件使用</p> 
      </div>
      <div style="text-align:center">  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        xid="button1" onClick="showPopOver" label="click me"> 
        <i xid="i1"/>  
        <span xid="span1">click me</span> 
      </a> 
    </div>  
    </div>
    </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/> 
</div>
