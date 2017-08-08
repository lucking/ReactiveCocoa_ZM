<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="root" class="root">  
  <resource xid="default1"> 
    <style type="text/css"/> 
  </resource>  
  <div component="$UI/system/components/bootstrap/accordion/accordion" class="panel-group"
  	tabbed="false" xid="accordion1" onShow="accordion1Show" onHide="accordion1Hide"> 
    <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel"
      xid="panel1"> 
      <div class="panel-heading" xid="heading1"> 
        <h4 class="panel-title" xid="h41"> 
          <a href="javascript:void(0)" xid="a1">Title</a> 
        </h4> 
      </div>
       <div class="panel-collapse collapse in">
	      <div class="panel-body collapse in" xid="body1"> 
	        <ul component="$UI/system/components/bootstrap/navs/navs" class="nav nav-tabs"
	          xid="navs1"> 
	          <li role="presentation" class="active" xid="li1"> 
	            <a href="javascript:void(0)" xid="a4">Item</a> 
	          </li> 
	        </ul> 
	      </div> 
       </div>  
    </div>  
    <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel"
      xid="panel2"> 
      <div class="panel-heading" xid="heading2"> 
        <h4 class="panel-title" xid="h42"> 
          <a href="javascript:void(0)" xid="a2">Title</a> 
        </h4> 
      </div>  
       <div class="panel-collapse collapse in">
      <div class="panel-body" xid="body2"/>
      </div> 
    </div>  
    <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel"
      xid="panel3"> 
      <div class="panel-heading" xid="heading3"> 
        <h4 class="panel-title" xid="h43"> 
          <a href="javascript:void(0)" xid="a3">Title</a> 
        </h4> 
      </div>  
       <div class="panel-collapse collapse in">
      <div class="panel-body" xid="body3"/>
      </div> 
    </div> 
  <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel" xid="panel4">
   <div class="panel-heading" xid="heading4">
    <h4 class="panel-title" xid="h44">
     <a href="javascript:void(0)" xid="a5">Title</a></h4> </div> 
   <div class="panel-collapse" xid="div1">
    <div class="panel-body" xid="div2"></div></div> </div></div>  
  <a component="$UI/system/components/justep/button/button" class="btn btn-default"
    label="button" xid="button1" onClick="{&quot;operation&quot;:&quot;accordion1.show&quot;, &quot;args&quot;: {&quot;index&quot;: 1}}"> 
    <i xid="i1"/>  
    <span xid="span1"/>
  </a>
<div component="$UI/system/components/justep/button/buttonGroup" class="btn-group" tabbed="true" xid="buttonGroup1"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="button" xid="button2">
   <i xid="i2"></i>
   <span xid="span2"></span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="button" xid="button3">
   <i xid="i3"></i>
   <span xid="span3"></span></a></div></div>
