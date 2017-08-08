<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:486px;top:185px;"
    onModelConstruct="modelModelConstruct" onModelConstructDone="modelModelConstructDone"
    onLoad="modelLoad" onunLoad="modelUnLoad"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="model"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">model</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div>
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="源码" onClick="showModelSource" bind-visible="isVisible"> 
            <i/>  
            <span>源码</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="js" onClick="showJsSource"> 
            <i/>  
            <span>js</span> 
          </a> 
          <p>以下分别是各事件的加载顺序,</p>
      </div>  
        <div component="$UI/system/components/justep/output/output" class="x-output text-center"
          xid="modelConstruct"/>  
        <div component="$UI/system/components/justep/output/output" class="x-output text-center"
          xid="modelConstructDone"/>  
        <div component="$UI/system/components/justep/output/output" class="x-output text-center"
          xid="modelLoad"/>
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/> 
</div>
