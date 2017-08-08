<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="panel部分"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">panel部分</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div id="aler"/>  
      <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">panel demo</h3>
          
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="js" xid="jsSource" onClick="showJsSource"> 
          <i xid="jsSou"/>  
          <span xid="span2">js</span> 
        </a> 
        
      <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" xid="source" onClick="showPanelSource" bind-visible="isVisible"> 
          <i xid="sou" />  
          <span xid="span2">源码</span> 
        </a><p>1、面板：容器组件</p>  
      <p>2、panel包含top、content、bottom三部分</p>  
      <p>3、下面案例演示切换top，bottom部分的显示</p>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        label="toggle top" xid="button2" onClick="toggleTop"> 
        <i xid="i2"/>  
        <span xid="span2">toggle top</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        label="toggle bottom" xid="button3" onClick="toggleBottom"> 
        <i xid="i3"/>  
        <span xid="span3">toggle bottom</span> 
      </a>  
      <h3 align="center">content部分 </h3>
    </div>  
    <div class="x-panel-bottom" xid="bottom1" style="background-color:#CCCCCC;"> 
      <h3 align="center">bottom部分 </h3> 
      <span component="$UI/system/components/justep/windowDialog/windowDialog"
        xid="windowDialog" src="$UI/system/components/justep/common/demo/dialog.w"/> 
    </div> 
  </div> 
</div>
