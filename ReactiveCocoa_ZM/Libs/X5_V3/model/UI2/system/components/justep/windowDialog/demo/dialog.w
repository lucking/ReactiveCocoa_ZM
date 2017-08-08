<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="window" component="$UI/system/components/justep/window/window">  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w" style="left:96px;top:29px;"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="windowReceiver"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="cancel"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">windowReceiver</div>  
        <div class="x-titlebar-right reverse" xid="div3"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button2" icon="icon-checkmark-round" onClick="ok"> 
            <i xid="i2" class="icon-checkmark-round"/>  
            <span xid="span2"/> 
          </a> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
       <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;"> windowReceiver</h3>
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="源码" xid="button3" onClick="showWindowRevSource" bind-visible="isVisible"> 
          <i xid="i3"/>  
          <span xid="span3">源码</span> 
        </a> 
        
        <p>1、onReceive事件接收父页面传来的数据</p>
        <p>2、点击左上角直接关闭本页面，点击右上角，关闭本页面，并返回当前事件(通过代码动态状态不返回任何信息)</p>
      <div style="margin-top: 20px;"> 
        <div component="$UI/system/components/justep/output/output" xid="output"
          class="x-output"/> 
      </div>  
      <span component="$UI/system/components/justep/windowReceiver/windowReceiver"
        xid="windowReceiver" style="left:161px;top:42px;" onReceive="windowReceiverReceive"/> 
    </div>  
    </div> 
</div>
