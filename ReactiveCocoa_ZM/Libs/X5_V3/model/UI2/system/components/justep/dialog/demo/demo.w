<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="Dialog组件"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">Dialog组件</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <span component="$UI/system/components/justep/dialog/dialog" xid="dialog"
      style="top:20px;left:164px;" onOpen="dialogOpen"/>  
    <div class="x-panel-content" xid="content1"> 
      <div xid="dialogDemo" style="font-weight:bold;font-size:16px;color:#000000">Dialog Demo
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="源码" xid="source" style="color:#000000" onClick="showMessageDialogSource"> 
          <i xid="sou"/>  
          <span>源码</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="js" xid="jsSource" style="color:#000000" onClick="showJsDialogSource"> 
          <i xid="jsSou"/>  
          <span>js</span> 
        </a>  
        <div style="margin-top: 20px;"> 
          <!-- 
	    <span component="$UI/system/components/justep/messageDialg/messageDialg" xid="messageDialg1"/>
	     -->  
          <a component="$UI/system/components/justep/button/button" class="btn btn-info"
            onClick="open" xid="testButton" label="open"> 
            <i/>  
            <span>open</span> 
          </a>  
          <div component="$UI/system/components/justep/output/output" xid="output"
            class="x-output"/> 
        </div>  
        <div xid="dialog"/> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"/> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/>
</div>
