<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">
  <div class="panel panel-primary cordova-testunit">
    <div class="panel-heading cordova-testunit">
      <div class="panel-title text-center">
        <span style="position: absolute;left: 5px;" data-bind="click:backHome">
          <i xid="i1" class="glyphicon glyphicon-chevron-left"/>
        </span>
        <span>Compass</span>
      </div>
    </div>
    <div class="panel-content"/>
  </div>  
  <div id="info"> 
    <b>Status:</b>  
    <span id="compass_status">Stopped</span>  
    <table class="table" width="100%">
      <tr> 
        <td width="33%">Heading: 
          <span id="compassHeading"></span>
        </td> 
      </tr>
    </table> 
  </div>  
  <h2>Action</h2>  
  <div class="btn btn-default btn-default getCompass">Get Compass</div>  
  <div class="btn btn-default btn-default watchCompass">Start Watching Compass</div>  
  <div class="btn btn-default btn-default stopCompass">Stop Watching Compass</div> 
</div>
