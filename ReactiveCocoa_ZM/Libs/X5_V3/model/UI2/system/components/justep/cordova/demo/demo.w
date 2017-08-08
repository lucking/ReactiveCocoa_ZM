<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full"> 
      <div class="x-panel-top"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="Camera"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              class="btn btn-link btn-icon-left" icon="icon-chevron-left"
              onClick="backBtnClick" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">Camera</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content"><div component="$UI/system/components/justep/button/buttonGroup" class="btn-group" tabbed="false" xid="buttonGroup1">
  
  
  </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1">
   <div class="x-col" xid="col1"><a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left" xid="test1" style="width:180px;" label="test" onClick="test1Click">
   <i xid="i2"></i>
   <span xid="span2">test</span></a></div>
   <div class="x-col" xid="col2"></div>
   <div class="x-col" xid="col3"></div></div>
  <label xid="label1"><![CDATA[事件输出：]]></label><textarea component="$UI/system/components/justep/textarea/textarea" class="form-control" xid="logInfo" style="width:505px;height:54%;"></textarea></div>
  </div> 
<div component="$UI/system/components/justep/camera/camera" xid="cordova1" quality="50" targetWidth="100" targetHeight="100" cameraDirection="0" destinationType="1" sourceType="1" allowEdit="true" encodingType="0" correctOrientation="false" saveToPhotoAlbum="true" configAttrs="quality,targetWidth,targetHeight,cameraDirection,destinationType,sourceType,allowEdit,encodingType,correctOrientation,saveToPhotoAlbum" style="height:125px;width:117px;left:520px;top:172px;"></div></div>