<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">
  <div class="panel panel-primary cordova-testunit">
    <div class="panel-heading cordova-testunit">
      <div class="panel-title text-center">
        <span style="position: absolute;left: 5px;" data-bind="click:backHome">
          <i xid="i1" class="glyphicon glyphicon-chevron-left"/>
        </span>
        <span>Accelerometer</span>
      </div>
    </div>
    <div class="panel-content"/>
  </div>
  <div id="info"> 
    <div id="accel_status">Stopped</div>  
    <div> 
      <table class="table" width="100%"> 
        <tr> 
          <td width="20%">X:</td>  
          <td id="x"/> 
        </tr>  
        <tr> 
          <td width="20%">Y:</td>  
          <td id="y"/> 
        </tr>  
        <tr> 
          <td width="20%">Z:</td>  
          <td id="z"/> 
        </tr> 
      </table> 
    </div> 
  </div>  
  <h2>Action</h2>  
  <div class="btn btn-default btn-default getAccel">Get Acceleration</div>  
  <div class="btn btn-default btn-default watchAccel">Start Watch</div>  
  <div class="btn btn-default btn-default stopAccel">Clear Watch</div>  
  <h2/> 
</div>
