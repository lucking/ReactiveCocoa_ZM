<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:40px;top:44px;"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="menu"> 
        <div class="x-titlebar-left" xid="div1"/>  
        <div class="x-titlebar-title" xid="div2">menu</div>  
        <div class="x-titlebar-right reverse" xid="div3"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-android-more" onClick="button1Click"> 
            <i xid="i1" class="icon-android-more"/>  
            <span xid="span1"/> 
          </a> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"/>  
    <div class="x-panel-bottom" xid="bottom1"/>  
    <!-- 
    <div component="$UI/system/components/justep/menu/menu" class="x-menu">
    	<div class="x-menu-item">
          <a component="$UI/system/components/justep/button/button" class="btn btn-link" xid="button1" icon="">
          	... 
          </a>
    	</div>
    	<div class="x-menu-item">
          <a component="$UI/system/components/justep/button/button" class="btn btn-link" xid="button2" icon="">
          	... 
          </a>
    	</div>
    	<div class="x-menu-spec"></div>
    	<div class="x-menu-item">
          <a component="$UI/system/components/justep/button/button" class="btn btn-link" xid="button3" icon="">
          	... 
          </a>
    	</div>
    </div>
     --> 
  </div> 
<div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu" xid="popMenu1" anchor="button1" dismissible="true" opacity="0.1">
   <div class="x-popMenu-overlay" xid="div4"></div>
   <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content" xid="menu1"><li class="x-menu-item" xid="item1">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="button1" xid="button2" onClick="button2Click" icon="icon-android-earth">
    <i xid="i2" class="icon-android-earth"></i>
    <span xid="span2">button1</span></a> </li>
  
  <li class="x-menu-item" xid="item3">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="button2" xid="button4" icon="icon-ios7-calendar-outline">
    <i xid="i4" class="icon-ios7-calendar-outline"></i>
    <span xid="span4">button2</span></a> </li>
  <li class="x-menu-divider divider" xid="divider1"></li>
  <li class="x-menu-item" xid="item2">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="button3" xid="button3">
    <i xid="i3"></i>
    <span xid="span3">button3</span></a> </li><li class="x-menu-item" xid="item4">
   <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="button" xid="button5">
    <i xid="i5"></i>
    <span xid="span5">button</span></a> </li></ul></div></div>
