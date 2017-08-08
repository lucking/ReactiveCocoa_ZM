<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">
  <div class="panel panel-primary cordova-testunit">
    <div class="panel-heading cordova-testunit">
      <div class="panel-title text-center">
        <span style="position: absolute;left: 5px;" data-bind="click:backHome">
          <i xid="i1" class="glyphicon glyphicon-chevron-left"/>
        </span>
        <span>Battery</span>
      </div>
    </div>
    <div class="panel-content"/>
  </div>  
  <div id="info"> 
    <b>Status:</b>  
    <span id="battery_status"/>  
    <br/> Level: 
    <span id="level"/>  
    <br/> Plugged: 
    <span id="isPlugged"/>  
    <br/> Low: 
    <span id="low"/>  
    <br/> Critical: 
    <span id="crit"/>  
    <br/> 
  </div>  
  <h2>Action</h2>  
  <tabel class="table" width="100%"> 
    <tr> 
      <td> 
        <div class="btn btn-default btn-block addBattery">Add "batterystatus" listener</div> 
      </td> 
    </tr>  
    <tr> 
      <td> 
        <div class="btn btn-default btn-block removeBattery">Remove "batterystatus" listener</div> 
      </td> 
    </tr>  
    <tr> 
      <td> 
        <div class="btn btn-default btn-block addLow">Add "batterylow" listener</div> 
      </td> 
    </tr>  
    <tr> 
      <td> 
        <div class="btn btn-default btn-block removeLow">Remove "batterylow" listener</div> 
      </td> 
    </tr>  
    <tr> 
      <td> 
        <div class="btn btn-default btn-block addCritical">Add "batterycritical" listener</div> 
      </td> 
    </tr>  
    <tr> 
      <td> 
        <div class="btn btn-default btn-block removeCritical">Remove "batterycritical" listener</div> 
      </td> 
    </tr> 
  </tabel>  
  <h2/> 
</div>
