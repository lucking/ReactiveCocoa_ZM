<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="panel#top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar" title="titlrBar组件"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" style="font-size: 24px;" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">titlrBar组件</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="panel#content1"> 
      <div style="font-weight:bold;font-size:16px;color:#000000">用来存放标题的组件容器,一般放在panel的top中</div>
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        label="源码" xid="button2" onClick="showTitleBarSource" style="color:#000000"> 
        <i xid="i2"/>  
        <span xid="span2">源码</span> 
      </a> 
    </div>  
    <div class="x-panel-bottom" xid="panel#bottom1"/> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/> 
</div>
