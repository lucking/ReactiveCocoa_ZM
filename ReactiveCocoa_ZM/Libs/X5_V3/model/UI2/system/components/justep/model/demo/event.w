<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" 
  	pro1="hello" pro2="123" pro3="true"
  	onModelConstruct="modelConstruct"
    onModelConstructDone="modelConstructDone" onLoad="load" onunLoad="unload" style="top:10px;height:64px;left:10px;"></div>  
  <div component="$UI/system/components/justep/view/view"> 
    <div> 
      <div>测试Window上的onModelConstruct, onModelConstructDone, onLoad, onunLoad事件</div> 
    </div>  
    <button class="btn_yellow" xid="btn1" bind-click="btn1Click">click me</button>  
    <div class="test"> 
      <div>样式加载的优先级别：风格一致; 默认 
      </div>  
      <div for="{xid:btn1}" hello="{ xid : container }">默认(event.css)：黄色</div>  
      <div>风格1(event_blue.css): 蓝色</div>  
      <div>风格2(event_red.css): 红色</div> 
    </div>  
    <div xid="container"> 
      <div xid="delete">子Window将删除的节点</div> 
    </div>  
    <div data-bind="foreach:items"> 
      <input xid="nameID" data-bind="value: name"/> 
    </div> 
  </div> 
</div>
