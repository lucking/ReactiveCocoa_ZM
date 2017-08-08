<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model"> 
    <div component="$UI/system/components/justep/data/data" xid="data1" idColumn="text"> 
      <column label="text" name="text" type="String" xid="default1"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="textarea"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">textarea</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">textarea</h3>
        <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="js" onClick="showJsSource"> 
          <i />  
          <span>js</span> 
        </a><a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="源码" onClick="showTextareaSource" bind-visible="isVisible"> 
          <i/>  
          <span>源码</span> 
        </a>  
         
        
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
        xid="textareaStyle"> 
        <label class="x-label" xid="label1" bind-text="data1.label('text')"/>  
        <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control x-edit"
          xid="textarea" bind-ref="data1.ref('text')" placeHolder="请输入......"/> 
      </div>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        label="获取textarea中的内容" xid="button2" onClick="getTextAreaValue"> 
        <i xid="i2"/>  
        <span xid="span2">获取textarea中的内容</span> 
      </a>  
      <br/>  
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        label="dynamicCreate" onClick="dynamicCreateTA"> 
        <i/>  
        <span>dynamicCreate</span> 
      </a>  
      <div xid="parent"/> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/>  
  <div id="aler"/> 
</div>
