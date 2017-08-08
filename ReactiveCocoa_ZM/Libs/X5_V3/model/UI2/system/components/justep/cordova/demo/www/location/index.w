<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">
  <div class="panel panel-primary cordova-testunit">
    <div class="panel-heading cordova-testunit">
      <div class="panel-title text-center">
        <span style="position: absolute;left: 5px;" data-bind="click:backHome">
          <i xid="i1" class="glyphicon glyphicon-chevron-left"/>
        </span>
        <span>Location</span>
      </div>
    </div>
    <div class="panel-content"/>
  </div>  
  <div id="info"> 
    <b>Status:</b>  
    <span id="location_status">Stopped</span>  
    <table class="table" width="100%"> 
      <tr> 
        <td>
          <b>Latitude:</b>
        </td>  
        <td id="latitude"/>  
        <td>(decimal degrees) geographic coordinate [
          <a href="http://dev.w3.org/geo/api/spec-source.html#lat">#ref]</a>
        </td> 
      </tr>  
      <tr> 
        <td>
          <b>Longitude:</b>
        </td>  
        <td id="longitude"/>  
        <td>(decimal degrees) geographic coordinate [
          <a href="http://dev.w3.org/geo/api/spec-source.html#lat">#ref]</a>
        </td> 
      </tr>  
      <tr> 
        <td>
          <b>Altitude:</b>
        </td>  
        <td id="altitude"/>  
        <td>null if not supported;
          <br/> (meters) height above the [
          <a href="http://dev.w3.org/geo/api/spec-source.html#ref-wgs">WGS84</a>] ellipsoid. [
          <a href="http://dev.w3.org/geo/api/spec-source.html#altitude">#ref]</a>
        </td> 
      </tr>  
      <tr> 
        <td>
          <b>Accuracy:</b>
        </td>  
        <td id="accuracy"/>  
        <td>(meters; non-negative; 95% confidence level) the accuracy level of the latitude and longitude coordinates. [
          <a href="http://dev.w3.org/geo/api/spec-source.html#accuracy">#ref]</a>
        </td> 
      </tr>  
      <tr> 
        <td>
          <b>Heading:</b>
        </td>  
        <td id="heading"/> 
      </tr>  
      <tr> 
        <td>
          <b>Speed:</b>
        </td>  
        <td id="speed"/>  
        <td>null if not supported;
          <br/> (meters per second; non-negative) magnitude of the horizontal component of the hosting device's current velocity. [
          <a href="http://dev.w3.org/geo/api/spec-source.html#speed">#ref]</a>
        </td> 
      </tr>  
      <tr> 
        <td>
          <b>Altitude Accuracy:</b>
        </td>  
        <td id="altitude_accuracy"/>  
        <td>null if not supported;
          <br/>(meters; non-negative; 95% confidence level) the accuracy level of the altitude. [
          <a href="http://dev.w3.org/geo/api/spec-source.html#altitude-accuracy">#ref]</a>
        </td> 
      </tr>  
      <tr> 
        <td>
          <b>Time:</b>
        </td>  
        <td id="timestamp"/>  
        <td>(DOMTimeStamp) when the position was acquired [
          <a href="http://dev.w3.org/geo/api/spec-source.html#timestamp">#ref]</a>
        </td> 
      </tr> 
    </table> 
  </div>  
  <h2>Action</h2>  
  <h3>Use Built-in WebView navigator.geolocation</h3>  
  <a href="javascript:" class="btn btn-default btn-default getWebViewLocation">Get Location</a>  
  <a href="javascript:" class="btn btn-default btn-default watchWebViewLocation">Start Watching Location</a>  
  <a href="javascript:" class="btn btn-default btn-default stopWebViewLocation">Stop Watching Location</a>  
  <a href="javascript:" class="btn btn-default btn-default getWebViewLocation30">Get Location Up to 30 Seconds Old</a>  
  <h3>Use Cordova Geolocation Plugin</h3>  
  <a href="javascript:" class="btn btn-default btn-default getLocation">Get Location</a>  
  <a href="javascript:" class="btn btn-default btn-default watchLocation">Start Watching Location</a>  
  <a href="javascript:" class="btn btn-default btn-default stopLocation">Stop Watching Location</a>  
  <a href="javascript:" class="btn btn-default btn-default getLocation30">Get Location Up to 30 Seconds Old</a>  
  <h2/> 
</div>
