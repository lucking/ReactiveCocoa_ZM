<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="window" component="$UI/system/components/justep/window/window"
  id="window1" style="height:6px;">  
  <div component="$UI/system/components/bootstrap/dialog/dialog" class="modal fade" xid="dialog2" onShow="dialog2Show" onHide="dialog2Hide">
   <div class="modal-dialog" xid="div6">
    <div class="modal-content" xid="div7">
     <div class="modal-header" xid="div8">
      <button type="button" class="close" data-dismiss="modal" xid="button4">
       <span aria-hidden="true" xid="span3">&amp;times;</span>
       <span class="sr-only" xid="span4">Close</span></button> 
      <h4 class="modal-title" xid="h42">Modal title</h4></div> 
     <div class="modal-body" xid="div9"><ul component="$UI/system/components/bootstrap/navs/navs" class="nav nav-tabs" xid="navs1">
   <li role="presentation" class="active" xid="li1">
    <a href="javascript:void(0)" xid="a1">Item</a></li> </ul></div>
     <div class="modal-footer" xid="div10">
      <button type="button" class="btn btn-default" data-dismiss="modal" xid="button5">Close</button>
      <button type="button" class="btn btn-primary" xid="button6">Save changes</button></div> </div> </div> </div>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="open" xid="openBtn" onClick='{"operation":"dialog2.open"}'>
   <i xid="i1"></i>
   <span xid="label1">open</span></a></div>
