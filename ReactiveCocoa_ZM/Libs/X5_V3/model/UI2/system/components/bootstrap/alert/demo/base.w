<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="window" component="$UI/system/components/justep/window/window"
  id="window1" style="height:6px;">  
  <a component="$UI/system/components/justep/button/button" class="btn btn-default"
    label="show success" xid="button3" onClick="button3Click"> 
    <i xid="i1"/>  
    <span xid="span6">show success</span>
  </a>
  <div class="alert alert-success" component="$UI/system/components/bootstrap/alert/alert"
    xid="alert2" autoHide="3000"> 
    <span>some text here</span>  
    <button type="button" class="close" xid="button2"> 
      <span aria-hidden="true" xid="span3">×</span>  
      <span class="sr-only" xid="span4">Close</span> 
    </button> 
  </div>
  <div class="alert alert-warning" component="$UI/system/components/bootstrap/alert/alert"
    xid="alert1"> 
    <button type="button" class="close" xid="button1"> 
      <span aria-hidden="true" xid="span1">×</span>  
      <span class="sr-only" xid="span2">Close</span> 
    </button>  
    <span xid="span5">some text here</span> 
  </div>
</div>
