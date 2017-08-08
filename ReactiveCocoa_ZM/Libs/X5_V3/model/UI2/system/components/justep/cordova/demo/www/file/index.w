<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">
  <div class="panel panel-primary cordova-testunit">
    <div class="panel-heading cordova-testunit">
      <div class="panel-title text-center">
        <span style="position: absolute;left: 5px;" data-bind="click:backHome">
          <i xid="i1" class="glyphicon glyphicon-chevron-left"/>
        </span>
        <span>File and File Transfer</span>
      </div>
    </div>
    <div class="panel-content"/>
  </div>  
  <h2>File</h2>  
  <div class="btn btn-default btn-default" id="downloadImgCDV">Download and display img (cdvfile)</div>  
  <div class="btn btn-default btn-default" id="downloadImgNative">Download and display img (native)</div>  
  <div class="ios platform"> 
    <h2>iOS Special URL handling</h2>  
    <div class="btn btn-default btn-default" id="testPrivateURL">Test /private/ URL (iOS)</div>  
    <h2>iOS Extra File Systems</h2>  
    <div class="btn btn-default btn-default resolveFs" data-fsname="library">Resolve library FS</div>  
    <div class="btn btn-default btn-default resolveFs" data-fsname="library-nosync">Resolve library-nosync FS</div>  
    <div class="btn btn-default btn-default resolveFs" data-fsname="documents">Resolve documents FS</div>  
    <div class="btn btn-default btn-default resolveFs" data-fsname="documents-nosync">Resolve documents-nosync FS</div>  
    <div class="btn btn-default btn-default resolveFs" data-fsname="cache">Resolve cache FS</div>  
    <div class="btn btn-default btn-default resolveFs" data-fsname="bundle">Resolve bundle FS</div>  
    <div class="btn btn-default btn-default resolveFs" data-fsname="root">Resolve root FS</div> 
  </div>  
  <div class="android platform"> 
    <h2>Android Extra File Systems</h2>  
    <div class="btn btn-default btn-default resolveFs" data-fsname="files">Resolve files FS</div>  
    <div class="btn btn-default btn-default resolveFs" data-fsname="files-external">Resolve files-external FS</div>  
    <div class="btn btn-default btn-default resolveFs" data-fsname="documents">Resolve documents FS</div>  
    <div class="btn btn-default btn-default resolveFs" data-fsname="sdcard">Resolve sdcard FS</div>  
    <div class="btn btn-default btn-default resolveFs" data-fsname="cache">Resolve cache FS</div>  
    <div class="btn btn-default btn-default resolveFs" data-fsname="cache-external">Resolve cache-external FS</div>  
    <div class="btn btn-default btn-default resolveFs" data-fsname="root">Resolve root FS</div> 
  </div>  
  <div id="log"/>  
  <div id="output"/> 
</div>
