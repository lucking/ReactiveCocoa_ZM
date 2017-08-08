<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">
  <div class="panel panel-primary cordova-testunit">
    <div class="panel-heading cordova-testunit">
      <div class="panel-title text-center">
        <span style="position: absolute;left: 5px;" data-bind="click:backHome">
          <i xid="i1" class="glyphicon glyphicon-chevron-left"/>
        </span>
        <span>Camera</span>
      </div>
    </div>
    <div class="panel-content"/>
  </div>  
  <div id="info" style="white-space: pre-wrap"> 
    <b>Status:</b>  
    <div id="camera_status"/> img: 
    <img width="100" id="camera_image"/> canvas: 
    <canvas id="canvas" width="100px" height="auto"/> 
  </div>  
  <h2>Cordova Camera API</h2>  
  <div id="image-options"/>  
  <div class="btn btn-default btn-block getPicture">camera.getPicture()</div>  
  <h2>Native File Inputs</h2>  
  <div>input type=file 
    <input type="file" class="testInputTag"/> 
  </div>  
  <div>capture=camera 
    <input type="file" accept="image/*;capture=camera" class="testInputTag"/> 
  </div>  
  <div>capture=camcorder 
    <input type="file" accept="video/*;capture=camcorder" class="testInputTag"/> 
  </div>  
  <div>capture=microphone 
    <input type="file" accept="audio/*;capture=microphone" class="testInputTag"/> 
  </div>  
  <h2>Actions(only for FILE_URI)</h2>  
  <tabel class="table" width="100%"> 
    <tr> 
      <td> 
        <div class="btn btn-default btn-block getFileInfo">Get File Metadata</div> 
      </td> 
    </tr>  
    <tr> 
      <td> 
        <div class="btn btn-default btn-block readFile">Read with FileReader</div> 
      </td> 
    </tr>  
    <tr> 
      <td> 
        <div class="btn btn-default btn-block copyImage">Copy Image</div> 
      </td> 
    </tr>  
    <tr> 
      <td> 
        <div class="btn btn-default btn-block writeImage">Write Image</div> 
      </td> 
    </tr>  
    <tr> 
      <td> 
        <div class="btn btn-default btn-block uploadImage">Upload Image</div> 
      </td> 
    </tr>  
    <tr> 
      <td> 
        <div class="btn btn-default btn-block displayImageUsingCanvas">Draw Using Canvas</div> 
      </td> 
    </tr>  
    <tr> 
      <td> 
        <div class="btn btn-default btn-block removeImage">Remove Image</div> 
      </td> 
    </tr> 
  </tabel> 
</div>
