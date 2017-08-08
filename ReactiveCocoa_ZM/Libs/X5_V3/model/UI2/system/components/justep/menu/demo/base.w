<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:277px;top:35px;"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="menu组件"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="backBtn"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">menu组件</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        label="源码" xid="button3" onClick="showMenuSource" bind-visible="isVisible"> 
        <i xid="i3"/>  
        <span xid="span3">源码</span> 
      </a>  
      <p>菜单组件,可放置一组菜单选项</p>  
      <div> 
        <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu"
          style="display:block;top:auto" xid="demoMenu"> 
          <li class="x-menu-item" xid="item2"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="菜单一" xid="button2" icon="icon-loading-c"> 
              <i xid="i2" class="icon-loading-c"/>  
              <span xid="span2">菜单一</span> 
            </a> 
          </li>  
          <li class="x-menu-divider divider" xid="divider2"/>  
          <li class="x-menu-item" xid="item1"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="菜单二" xid="button5" icon="icon-android-folder"> 
              <i xid="i5" class="icon-android-folder"/>  
              <span xid="span5">菜单二</span> 
            </a> 
          </li>  
          <li class="x-menu-item" xid="item3"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="菜单三" xid="button4"> 
              <i xid="i4"/>  
              <span xid="span4">菜单三</span> 
            </a> 
          </li> 
        </ul> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/> 
</div>
