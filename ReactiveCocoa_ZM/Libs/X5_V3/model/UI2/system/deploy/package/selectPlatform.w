<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:34px;left:522px;"
    onLoad="modelLoad"/>  
  
  
  
  <div xid="div1" style="padding:8px"><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="androidCheckbox" checked="true"></span><img src="img/android.png" alt="" xid="androidImage" bind-click="androidImageClick" style="cursor:pointer"></img><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="iosCheckbox"></span><img src="img/apple.png" alt="" xid="iosImage" bind-click="iosImageClick" style="cursor:pointer"></img>
  
  <div xid="div2" style="padding-top:32px"><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="compileUI" label="重新编译使用到的UI资源" checked="true"></span></div>
  <div xid="div3" style="padding-top:8px"><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="useAppBuilderServer" label="使用应用打包服务器生成本地应用。通过服务方式可以使用自定义的扩展插件和生成可发布的应用包" onChange="useAppBuilderServerChange"></span></div>
  <div xid="appBuilderServerDiv" style="padding-top:8px;display:none"><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="releaseMode" label="发布模式。用于打最终对外发布包，执行性能更优，不支持Chrome/Safari调试；如需开发调试请去掉本选项" checked="true"></span>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20" xid="appBuilderServerInput">
   <label class="x-label" xid="label2"><![CDATA[应用打包服务器：]]></label>
   <div class="x-edit" xid="div4"><div class="input-group" xid="inputGroup1">
   <input type="text" class="form-control" component="$UI/system/components/justep/input/input" xid="appBuilderServer" placeHolder="http://ip:port/app-builder"></input>
  <div class="input-group-btn" xid="div5">
   <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="连接测试" xid="testServerButton" onClick="testServerButtonClick">
    <i xid="i1"></i>
    <span xid="span1">连接测试</span></a> </div></div></div></div></div></div>
  </div>
