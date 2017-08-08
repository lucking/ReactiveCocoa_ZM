<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="MessageDialog"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">MessageDialog</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" xid="MessageDialogSource" title="MessageDialog Demo"> 
          <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">MessageDialog</h3>
              
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="js" xid="jsSource" onClick="showJsSource"> 
              <i xid="jsSou"/>  
              <span xid="span2">js</span> 
            </a> 
           
        <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" xid="source" onClick="showMessageDialogSource" bind-visible="isVisible"> 
              <i xid="sou" />  
              <span xid="span2">源码</span> 
            </a><p>1、信息提示窗口</p>
        <p>2、选择MessageDialog的属性,并点击dynamicCreate按钮</p>  
        <div style="margin-top: 20px;"> 
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label25"> 
            <label class="x-label">type：</label>  
            <select class="x-edit form-control" bind-value="type"> 
              <option value="OK">OK</option>  
              <option value="OKCancel">OKCancel</option>  
              <option value="YesNo">YesNo</option>  
              <option value="YesNoCancel">YesNoCancel</option>  
              <option value="Prompt">Prompt</option> 
            </select> 
          </div>  
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label25"> 
            <label class="x-label">width：</label>  
            <input class="x-edit form-control" bind-value="width" placeholder="请输入弹出框的宽度..."
              xid="widthId" bind-change="widthIdChange"/> 
          </div>  
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label25"> 
            <label class="x-label">title：</label>  
            <input class="x-edit form-control" bind-value="title"/> 
          </div>  
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label25"> 
            <label class="x-label">message：</label>  
            <input class="x-edit form-control" bind-value="text"/> 
          </div>  
          <span component="$UI/system/components/justep/messageDialog/messageDialog"
            xid="messageDialg" style="top:15px;left:291px;" title="demo" message="通过组件方式创建MessageDialog,相关属性可以在组件中设置"/> 
        </div>  
        <div xid="buttons"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            onClick="show" xid="testButton" label="dynamicCreate"> 
            <i/>  
            <span>dynamicCreate</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="standardCreate" xid="button3" onClick="standardCreate"> 
            <i xid="i3"/>  
            <span xid="span3">standardCreate</span> 
          </a>  
          <div component="$UI/system/components/justep/output/output" xid="output"
            class="x-output"/> 
        </div> 
      </div> 
    </div>  
    </div>  
  <div id="aler"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w" style="left:335px;top:406px;"/> 
</div>
