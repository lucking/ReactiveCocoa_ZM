<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="testWindowContainer">  
  <div component="$UI/system/components/justep/model/model" style="height:auto;left:238px;top:239px;"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="WindowContainer"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">WindowContainer</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">WindowContainer组件</h3>  
        
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        label="js" xid="button3" onClick="showJsSource"> 
        <i xid="i3"/>  
        <span xid="span3">js</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" onClick="showWinConSource" bind-visible="isVisible"> 
        <i xid="i2" />  
        <span xid="span2">源码</span> 
      </a><div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group"> 
        <h5>1. 主页面静态嵌入“子页面1”；“子页面1”静态嵌入“子页面2”；</h5>  
        <br/>  
        <div xid="windowContainer" src="inner1.w" component="$UI/system/components/justep/windowContainer/windowContainer"/>  
        <br/>  
        <h5>2. 主页面动态嵌入“子页面3”；
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="（点我试试）" onClick="createWindowContainer"> 
            <i/>  
            <span>（点我试试）</span> 
          </a> 
        </h5>  
        <div xid="container"> 
          <h5 style="color:gray">将被“子页面3”替换。。。</h5> 
        </div> 
      </div> 
    </div>  
    </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/> 
</div>
