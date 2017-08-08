<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="windowDialog"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">windowDialog</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <span component="$UI/system/components/justep/windowDialog/windowDialog"
        xid="sourceDialog" src="$UI/system/components/justep/common/demo/dialog.w"/>  
      <span component="$UI/system/components/justep/windowDialog/windowDialog"
        xid="windowDialog" style="top:107px;left:200px;" src="$UI/system/components/justep/windowDialog/demo/dialog.w" onReceive="windowDialogReceive"/>  
      <div xid="dialog"/>  
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="title" xid="controlGroup1"> 
        <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">windowDialog</h3>
            
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="js" xid="button5" onClick="showJsSource"> 
            <i xid="i5"/>  
            <span xid="span5">js</span> 
          </a>
          
          <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" xid="button4" onClick="showWindowDialogSource" bind-visible="isVisible"> 
            <i xid="i4" />  
            <span xid="span4">源码</span> 
          </a><p>打开对话框，在windowDialog的src上指定打开路径</p> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="dynamicCreateWindowDialog" xid="button2" onClick="dynamicCreateWindowDialog"> 
          <i xid="i2"/>  
          <span xid="span2">dynamicCreateWindowDialog</span> 
        </a>    
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="standardOpenWindowDialog" xid="button3" onClick="standardOpenWindowDailog" style="left:50px;"> 
          <i xid="i3"/>  
          <span xid="span3">standardOpenWindowDialog</span> 
        </a> 
      </div>  
      <div component="$UI/system/components/justep/output/output" class="x-output"
        xid="output"/> 
    </div>  
    </div> 
</div>
