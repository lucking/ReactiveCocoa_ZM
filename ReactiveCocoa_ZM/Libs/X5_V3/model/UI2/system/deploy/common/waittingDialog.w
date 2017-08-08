<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="position:absolute;;left:248px;top:63px" onLoad="modelLoad"></div><div xid="infoDiv" style="padding:8px">
   <label xid="info" class="x-label"><![CDATA[正在执行，请稍候......]]></label>
  <div xid="div7"><label xid="detail" style="font-size:small;color:#0080FF;cursor:pointer;" bind-click="detailClick"><![CDATA[详细信息]]></label></div></div>
  
  
  <div xid="logDiv" style="display:none"><div xid="iframeDiv" style="padding-top:8px;height:100%;">
  
  </div><div xid="useServerDiv" style="padding-left:8px"><span component="$UI/system/components/justep/button/radio" class="x-radio" xid="logTypeRadio1" name="logType" label="日志" onChange="logTypeRadioChange" checked="true"></span>
  <span component="$UI/system/components/justep/button/radio" class="x-radio" xid="logTypeRadio2" name="logType" label="打包服务器日志" onChange="logTypeRadioChange"></span></div></div></div>
