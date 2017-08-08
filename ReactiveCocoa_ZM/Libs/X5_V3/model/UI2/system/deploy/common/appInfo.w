<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window" sysParam="false" xid="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:130px;top:265px;"
    onLoad="modelLoad"/>  
  
  
  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog" style="left:51px;top:256px;" src="./waittingDialog.w"></span><div xid="appInfoDiv" style="padding:8px;">
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelOutput2">
   <label class="x-label" xid="label2"><![CDATA[应用名：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="appName"></div></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelOutput3">
   <label class="x-label" xid="label3"><![CDATA[版本号：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="version"></div></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelOutput6">
   <label class="x-label" xid="label6"><![CDATA[应用包名：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="packageName"></div></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelOutput1">
   <label class="x-label" xid="label7"><![CDATA[服务地址：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="serverURL"></div></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelOutput5">
   <label class="x-label" xid="label5"><![CDATA[首页：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="indexURL"></div></div><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelOutput4">
   <label class="x-label" xid="label4"><![CDATA[包含UI资源：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="uiResDirs"></div></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelTextarea1">
   <label class="x-label" xid="label1"><![CDATA[本地插件：]]></label>
   <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control x-edit" xid="plugins" readonly="true"></textarea></div>
  <div xid="div2" style="padding-top:8px">
   <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="extBrowser" label="Andorid使用增强型浏览器" checked="true" disabled="true"></span>
  <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="resEncryption" label="资源加密" style="padding-left:16px" disabled="true"></span></div>
  </div>
  </div>
