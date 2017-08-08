<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:201px;top:457px;"
    onunLoad="modelUnLoad" onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="fileData"
      idColumn="content" autoNew="true"> 
      <column label="col0" name="content" type="String" xid="default2"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="contentData"
      idColumn="title" autoNew="true"> 
      <column label="col0" name="title" type="String" xid="default1"/>  
      <column label="col1" name="x" type="String" xid="default3"/>  
      <column label="col2" name="y" type="String" xid="default4"/>  
      <column label="col3" name="z" type="String" xid="default5"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
    active="0" xid="contents1" wrap="false" swipe="false"> 
    <div class="x-contents-content" xid="main"> 
      <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
        xid="panel1"> 
        <div class="x-panel-top" xid="top1"> 
          <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
            xid="titleBar1" title="地图/地理定位"> 
            <div class="x-titlebar-left" xid="div1"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                label="" xid="backBtn" icon="icon-chevron-left" onClick="backBtnClick"> 
                <i xid="i2" class="icon-chevron-left"/>  
                <span xid="span1"/> 
              </a> 
            </div>  
            <div class="x-titlebar-title" xid="div2">地图/地理定位</div>  
            <div class="x-titlebar-right reverse" xid="div3"/> 
          </div> 
        </div>  
        <div class="x-panel-content" xid="content3"> 
          <div component="$UI/system/components/justep/controlGroup/controlGroup"
            class="x-control-group" title="title" xid="controlGroup1" style="height:459px;"> 
            <div xid="div7"> 
              <a component="$UI/system/components/justep/button/button" class="btn x-yellow device-button-white"
                label="地图" xid="mapBtn" onClick="mapBtnClick"> 
                <i xid="i3"/>  
                <span xid="span3">地图</span> 
              </a> 
            </div>  
            <div xid="div8" style="height:36px;" class="list-row"/>  
            <div xid="getAccDiv" class="list-row"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link device-button-black"
                label="获取设备位置信息" xid="getGeoBtn" onClick="getGeoBtnClick" disabled="true"> 
                <i xid="i4"/>  
                <span xid="span4">获取设备位置信息</span> 
              </a> 
            </div>  
            <div xid="listenDiv" class="list-row"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link device-button-black"
                label="监听设备位置信息" xid="listenBtn" onClick="listenBtnClick" disabled="true"> 
                <i xid="i5"/>  
                <span xid="span5">监听设备位置信息</span> 
              </a> 
            </div>  
            <div xid="stopDiv" class="list-row"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link device-button-black"
                label="停止监听" xid="stopBtn" onClick="stopBtnClick" disabled="true"> 
                <i xid="i6"/>  
                <span xid="span6">停止监听</span> 
              </a> 
            </div> 
          </div> 
        </div>  
        <div class="x-panel-bottom device-bottom" xid="bottom1" height="100"> 
          <div xid="contentDiv" style="padding:10px 10px 10px 10px;"> 
            <div id="titleDiv" xid="titleDiv" bind-text="contentData.ref('title')"/>  
            <div id="xDiv" xid="xDiv" bind-text="contentData.ref('x')"/>  
            <div id="yDiv" xid="yDiv" bind-text="contentData.ref('y')"/>  
            <div id="zDiv" xid="zDiv" bind-text="contentData.ref('z')"/> 
          </div> 
        </div> 
      </div> 
    </div>  
    <div class="x-contents-content" xid="map"> 
      <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
        xid="panel2"> 
        <div class="x-panel-top" xid="top2"> 
          <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
            xid="titleBar3" title="地图"> 
            <div class="x-titlebar-left" xid="div10"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                xid="yBackBtn" icon="icon-chevron-left" onClick="yBackBtnClick"> 
                <i xid="i1" class="icon-chevron-left"/>  
                <span xid="span2"/> 
              </a> 
            </div>  
            <div class="x-titlebar-title" xid="div11">地图</div>  
            <div class="x-titlebar-right reverse" xid="div12"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="button" xid="posBtn" icon="icon-location" onClick="posBtnClick" disabled="true">
   <i xid="i7" class="icon-location"></i>
   <span xid="span7"></span></a></div> 
          </div> 
        </div>  
        <div class="x-panel-content" xid="mapContent"> 
          </div> 
      </div> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver"
    xid="popOver1"> 
    <div class="x-popOver-overlay" xid="div5"/>  
    <div class="x-popOver-content" xid="div6"/> 
  </div> 
</div>
