<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:573px;top:186px;"
    onLoad="modelLoad"/>  
  
  
  
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelInput2">
   <label class="x-label" xid="label2"><![CDATA[版本号：]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="version" placeHolder="例：5.3.0，由点隔开的三部分构成"></input></div>
  
  
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelInput3">
   <label class="x-label" xid="label3"><![CDATA[应用包名：]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="packageName" placeHolder="例：com.justep.x5， ios的包名需要与证书中的BundleID一致"></input></div><div xid="div2" style="padding-top:8px"><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="extBrowser" label="增强型浏览器（基于Crosswalk，Andorid平台有效），使用更快速和更强的浏览器引擎，但生成的本地App文件会更大（多16MB），建议Android4.4以下版本的设备使用" checked="true"></span></div>
  <div xid="div1" style="padding-top:8px">
   <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="resEncryption" label="打包的资源进行加密（服务器打包模式有效），加密后应用运行将略多一点资源读取时间，但可以增强应用的安全性，使反编译无法直接获取资源"></span></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="labelInput1" style="display:none">
   <label class="x-label" xid="label1"><![CDATA[推送服务地址：]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="mqttServerURL" placeHolder="例：tcp://ip:port， android平台有效。注意需要选择推送插件"></input></div></div>
