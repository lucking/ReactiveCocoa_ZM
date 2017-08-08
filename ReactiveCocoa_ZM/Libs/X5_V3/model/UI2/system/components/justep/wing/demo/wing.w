<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:337px;top:350px;"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w" style="left:183px;top:108px;"/>  
  <div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu"
    xid="popMenu" direction="right-bottom" anchor="button7"> 
    <div class="x-popMenu-overlay" xid="div5"/>  
    <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content"
      xid="menu1"> 
      <li class="x-menu-item" xid="item1"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="源码" xid="button2" onClick="showWingSource" bind-visible="isVisible"> 
          <i xid="i2"/>  
          <span xid="span2">源码</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item2"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="js" xid="button4" onClick="showJsSource"> 
          <i xid="i4"/>  
          <span xid="span4">js</span> 
        </a> 
      </li> 
    </ul> 
  </div>  
  <div component="$UI/system/components/justep/wing/wing" class="x-wing" xid="wing"> 
    <div class="x-wing-left" xid="left1" style="background-color:white;width:40%;"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        label="hide" xid="button1" onClick="hideLeft"> 
        <i xid="i1"/>  
        <span xid="span1">hide</span> 
      </a>  
      <h2>left page</h2> 
    </div>  
    <div class="x-wing-content" xid="content1"> 
      <div class="x-wing-backdrop" xid="div1"/>  
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="wing"> 
        <div class="x-titlebar-left" xid="div2"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button5" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i5" class="icon-chevron-left"/>  
            <span xid="span5"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div3">wing</div>  
        <div class="x-titlebar-right reverse" xid="div4">
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="" xid="button7" icon="icon-android-note" onClick="showMenu"> 
            <i xid="i7" class="icon-android-note"/>  
            <span xid="span7"/>
          </a>
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1"
        style="width:100%;"> 
        <div class="x-col text-center" xid="col2" style="width:30%"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="showLeft" xid="button1" onClick="openLeft"> 
            <i xid="i1"/>  
            <span xid="span1">showLeft</span> 
          </a> 
        </div>  
        <div class="x-col"> 
          <h3>content page</h3> 
        </div>  
        <div class="x-col text-center" xid="col3" align="right"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="showRight" xid="button3" onClick="showRight"> 
            <i xid="i3"/>  
            <span xid="span3">showRight</span> 
          </a> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row" 
        style="width:100%;"> 
        <div class="x-col" />  
        <div class="x-col" style="width:30%"> 
          <p>1、容器组件，包含left、content、right三部分</p>  
          <p>2、左滑右滑可打开left、right部分</p>  
          <p>3、点击content部分，关闭打开的侧边部分</p> 
        </div>  
        <div class="x-col"/>
      </div> 
    </div>  
    <div class="x-wing-right" xid="right1" style="background-color:white;width:40%;"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        label="hide" xid="button1" onClick="hideRight"> 
        <i xid="i1"/>  
        <span xid="span1">hide</span> 
      </a>  
      <h2>right page</h2> 
    </div> 
  </div> 
</div>
