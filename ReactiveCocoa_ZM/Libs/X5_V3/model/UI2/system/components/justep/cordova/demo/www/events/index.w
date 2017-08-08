<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">
  <div class="panel panel-primary cordova-testunit">
    <div class="panel-heading cordova-testunit">
      <div class="panel-title text-center">
        <span style="position: absolute;left: 5px;" data-bind="click:backHome">
          <i xid="i1" class="glyphicon glyphicon-chevron-left"/>
        </span>
        <span>Events</span>
      </div>
    </div>
    <div class="panel-content"/>
  </div>  
  <div id="info"> 
    <b>Results:</b>
    <br/>  
    <span id="results"/> 
  </div>  
  <input type="text" value="Type here to test events when fields are focused"/>  
  <h2>Action</h2>  
  <div class="btn btn-default btn-default interceptBackButton">Intercept backbutton</div>  
  <div class="btn btn-default btn-default stopInterceptOfBackButton">Stop intercept of backbutton</div>  
  <div class="btn btn-default btn-default interceptMenuButton">Intercept menubutton</div>  
  <div class="btn btn-default btn-default stopInterceptOfMenuButton">Stop intercept of menubutton</div>  
  <div class="btn btn-default btn-default interceptSearchButton">Intercept searchbutton</div>  
  <div class="btn btn-default btn-default stopInterceptOfSearchButton">Stop intercept of searchbutton</div>  
  <div class="btn btn-default btn-default interceptResume">Intercept resume</div>  
  <div class="btn btn-default btn-default stopInterceptOfResume">Stop intercept of resume</div>  
  <div class="btn btn-default btn-default interceptPause">Intercept pause</div>  
  <div class="btn btn-default btn-default stopInterceptOfPause">Stop intercept of pause</div>  
  <div class="btn btn-default btn-default interceptOnline">Intercept online</div>  
  <div class="btn btn-default btn-default stopInterceptOfOnline">Stop intercept of online</div>  
  <div class="btn btn-default btn-default interceptOffline">Intercept offline</div>  
  <div class="btn btn-default btn-default stopInterceptOfOffline">Stop intercept of offline</div> 
</div>
