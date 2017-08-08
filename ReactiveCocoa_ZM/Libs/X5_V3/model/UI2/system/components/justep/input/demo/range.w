<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model"> 
    <div component="$UI/system/components/justep/data/data" xid="data1" idColumn="sex" autoLoad="true"> 
      <column label="sex" name="sex" type="String" xid="default5"/>  
      <column label="password" name="password" type="String" xid="default6"/>  
      <column label="range" name="range" type="Integer" xid="default7"/>  
      <column label="text" name="text" type="String" xid="default8"/>  
      <data xid="default9">[{"sex":"男","password":"123456","range":56,"text":""},{"sex":"女","password":"123456","range":89}]</data> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="data2" idColumn="fValue" autoLoad="true"> 
      <column name="fValue" type="String" label="值"/>  
      <column name="fName" type="String" label="显示名称"/>  
      <data><![CDATA[
      [{fValue:'male',fName:'男'},{fValue:'female',fName:'女'}]
      ]]></data> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="range"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">range</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">range</h3>
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          onClick="showJsSource" label="js"> 
          <i/>  
          <span>js</span> 
        </a> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="源码" onClick="showOutpSource" bind-visible="isVisible"> 
          <i/>  
          <span>源码</span> 
        </a>  
        
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label25"
        xid="formsStyle"> 
        <label class="x-label" xid="label1"><![CDATA[range组件]]></label>  
        <div class="x-edit" xid="div4"> 
          <input component="$UI/system/components/justep/input/range" xid="range1"
            onChange="rangeChange" min="0" max="100" bind-ref="data1.ref('range')"/> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label25"
        xid="labelOutput1"> 
        <label class="x-label" xid="label5"><![CDATA[output组件:]]></label>  
        <div component="$UI/system/components/justep/output/output" class="x-output x-edit"
          xid="output"/> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/> 
</div>
