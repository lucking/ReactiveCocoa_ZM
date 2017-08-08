<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="output"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">output</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" xid="outputStyle"> 
        <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">output</h3>  
          
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="js" onClick="showJsSource"> 
          <i/>  
          <span>js</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" onClick="showOutpSource" bind-visible="isVisible"> 
          <i />  
          <span>源码</span> 
        </a><p>output：输出组件
          <br/>1、用于显示其他组件的内容，例output输出input的内容
          <br/>2、渲染输出，例根据range的值output输出不同的内容
        </p>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label15"
          xid="labelInput1"> 
          <label class="x-label" xid="label1"><![CDATA[input与output:]]></label>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="assignment" onChange="inputWriteOutputValue"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label15"
          xid="labelOutput2"> 
          <label class="x-label" xid="label6"><![CDATA[输出input]]></label>  
          <div component="$UI/system/components/justep/output/output" class="x-output x-edit"
            xid="outputInput"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label15"
          xid="labelEdit1"> 
          <label class="x-label" xid="label2"><![CDATA[range与output:]]></label>  
          <div class="x-edit" xid="div4"> 
            <input component="$UI/system/components/justep/input/range" xid="range"
              min="1" max="10" onChange="rangeWriteOutputValue"/> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label15"
          xid="labelEdit2"> 
          <label class="x-label" xid="label3"><![CDATA[outputRender]]></label>  
          <div class="x-edit" xid="div5"> 
            <div component="$UI/system/components/justep/output/output" class="x-output"
              xid="output" onRender="outputRender"/> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/>  
  <div id="aler"/> 
</div>
