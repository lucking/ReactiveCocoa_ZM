<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="popMenu"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">popMenu</div>  
        <div class="x-titlebar-right reverse" xid="div3"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button6" onClick="show" label="click me"> 
            <i xid="i6"/>  
            <span xid="span6">click me</span> 
          </a> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="title" xid="controlGroup1"> 
          <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">popMenu</h3>
              
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="js" onClick="showJsSource"> 
              <i/>  
              <span>js</span> 
            </a>  
           
            <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" onClick="showPopMenuSource" bind-visible="isVisible"> 
              <i />  
              <span>源码</span> 
            </a><p> 1、菜单组件，用来存放菜单选项，页面不可视，结合可视组件使用</p>
            <p> 2、点击右上角按钮，取消点击其他地方即可</p>
      </div>  
      <div class="x-panel-bottom" xid="bottom1"/> 
    </div> 
     <div id="aler"/>
    <span component="$UI/system/components/justep/windowDialog/windowDialog"
      xid="windowDialog" src="$UI/system/components/justep/common/demo/dialog.w"/>  
    <div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu"
      xid="popMenu" anchor="button6" dismissible="true" opacity="0.1"> 
      <div class="x-popMenu-overlay" xid="div4"/>  
      <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content"
        xid="menu1"> 
        <li class="x-menu-item" xid="item1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="button1" xid="button2" onClick="click" icon="icon-android-earth"> 
            <i xid="i2" class="icon-android-earth"/>  
            <span xid="span2">button1</span> 
          </a> 
        </li>  
        <li class="x-menu-item" xid="item3"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="button2" xid="button4" icon="icon-ios7-calendar-outline"> 
            <i xid="i4" class="icon-ios7-calendar-outline"/>  
            <span xid="span4">button2</span> 
          </a> 
        </li>  
        <li class="x-menu-divider divider" xid="divider1"/>  
        <li class="x-menu-item" xid="item2"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="button3" xid="button3"> 
            <i xid="i3"/>  
            <span xid="span3">button3</span> 
          </a> 
        </li>  
        <li class="x-menu-item" xid="item4"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button5" icon="icon-android-contact" label="联系人"> 
            <i xid="i5" class="icon-android-contact"/>  
            <span xid="span5">联系人</span> 
          </a> 
        </li>  
        <li class="x-menu-item" xid="item5"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button7" icon="icon-android-calendar" label="日历"> 
            <i xid="i7" class="icon-android-calendar"/>  
            <span xid="span7">日历</span> 
          </a> 
        </li>  
        <li class="x-menu-item" xid="item6"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button8" icon="icon-chatbubble-working" label="消息"> 
            <i xid="i8" class="icon-chatbubble-working"/>  
            <span xid="span8">消息</span> 
          </a> 
        </li> 
      </ul> 
    </div> 
  </div> 
</div>
