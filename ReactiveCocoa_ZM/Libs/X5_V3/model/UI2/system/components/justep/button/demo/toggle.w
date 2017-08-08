<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="toggle"> 
        <div class="x-titlebar-left" xid="div1" id="te"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-icon-left"
            xid="button20" icon="icon-chevron-left" onClick="returnMain"> 
            <i xid="i11" class="icon-chevron-left"/>  
            <span xid="span11"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">toggle</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div id="aler"/>  
    <div class="x-panel-content" xid="content2"> 
      <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">toggle style</h3>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        label="源码" xid="button56" onClick="showStyleSource" bind-visible="isVisible"> 
        <i xid="i57"/>  
        <span xid="span56">源码</span> 
      </a>  
      <div xid="showToggleStyle"> 
        <span component="$UI/system/components/justep/button/toggle" class="x-toggle"
          xid="toggle3"/>  
        <span component="$UI/system/components/justep/button/toggle" class="x-toggle x-toggle-sm"
          xid="toggle5" OFF="sm" ON="sm"/>  
        <span component="$UI/system/components/justep/button/toggle" class="x-toggle x-toggle-xs"
          xid="toggle6" OFF="xs" ON="xs"/>  
        <span component="$UI/system/components/justep/button/toggle" class="x-toggle x-toggle-lg"
          xid="toggle7" OFF="lg" ON="lg"/>  
        <span component="$UI/system/components/justep/button/toggle" class="x-toggle"
          xid="toggle4" disabled="true" OFF="禁用"/> 
      </div>  
      <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">toggle event</h3>  
        
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        label="js" xid="button58" onClick="showJsSource"> 
        <i xid="i59"/>  
        <span xid="span58">js</span> 
      </a>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" xid="button57" onClick="showEventSource" bind-visible="isVisible"> 
        <i xid="i58" />  
        <span xid="span57">源码</span> 
      </a><div xid="toggleEvent"> 
        <span component="$UI/system/components/justep/button/toggle" class="x-toggle"
          xid="toggleVal" name="togg" ON="on" OFF="off" value="on" onChange="toggleChange"/>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="通过其他组件控制toggle的状态" xid="button1" onClick="controlToggle"> 
          <i xid="i1"/>  
          <span xid="span1">通过其他组件控制toggle的状态</span> 
        </a> 
      </div>  
      <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">toggleGroup</h3>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-link"
        label="源码" xid="button59" onClick="showToggleGroupSource" bind-visible="isVisible"> 
        <i xid="i60"/>  
        <span xid="span59">源码</span> 
      </a>  
      <div xid="showToggleGroup"> 
        <p>name相同为一组,type="checkbox"</p>  
        <span component="$UI/system/components/justep/button/toggle" class="x-toggle"
          xid="toggle10" ON="开" OFF="关" type="checkbox" name="togglecheckbox"/>  
        <span component="$UI/system/components/justep/button/toggle" class="x-toggle"
          xid="toggle11" ON="开" OFF="关" type="checkbox" name="togglecheckbox"/>  
        <p>name相同为一组,type="radio"</p>  
        <span component="$UI/system/components/justep/button/toggle" class="x-toggle"
          xid="toggle12" type="radio" name="radiocheckbox" checked="true"/>  
        <span component="$UI/system/components/justep/button/toggle" class="x-toggle"
          xid="toggle13" type="radio" name="radiocheckbox"/> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/> 
</div>
