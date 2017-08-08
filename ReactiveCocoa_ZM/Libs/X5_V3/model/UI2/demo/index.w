<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"
    style="height:auto;left:275px;top:25px;"/>  
  <div component="$UI/system/components/justep/wing/wing" class="x-wing x-wing-xs"
    xid="portal" dismissible="true" display="push"> 
    <div class="x-wing-left" xid="left"/>  
    <div class="x-wing-content" xid="center"> 
      <div class="x-wing-backdrop"/>  
      <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
        active="0" xid="pages" wrap="false" slidable="false" swipe="false" onActiveChange="pagesActiveChange"> 
        <div class="x-contents-content" xid="main">
        </div> 
      </div>  
      <div id="debugBar" style="display:none;"> 
        <a component="$UI/system/components/justep/button/button" class="btn x-orange"
          xid="toggleLeft" onClick="toggleLeftClick" icon="icon-android-sort"> 
          <i xid="i2" class="icon-android-sort"/>  
          <span xid="span2"/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          xid="prev" icon="icon-chevron-left" onClick="prevClick"> 
          <i xid="i1" class="icon-chevron-left"/>  
          <span xid="span1"/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          xid="next" icon="icon-chevron-right" onClick="nextClick"> 
          <i xid="i3" class="icon-chevron-right"/>  
          <span xid="span3"/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          xid="clear" label="clear" onClick="clearClick"> 
          <i xid="i3"/>  
          <span xid="span3">clear</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          xid="refresh" icon="icon-refresh" onClick="refreshClick"> 
          <i xid="i3" class="icon-refresh"/>  
          <span xid="span3"/> 
        </a> 
      </div> 
    </div> 
  </div> 
</div>
