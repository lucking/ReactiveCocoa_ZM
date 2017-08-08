<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <!-- 
  <div component="$UI/system/components/justep/controlGroup/controlGroup"
    class="x-control-group" title="基本样式" xid="controlGroup1">
    <div class="x-control-group-title" xid="div13">基本样式</div>  
    <div component="$UI/system/components/justep/labelEdit/labelEdit"
      class="x-label-edit" xid="labelInput1"> 
      <label class="x-label" xid="label3" bind-text="taskData.label('sName')"/>  
      <input component="$UI/system/components/justep/input/input"
        class="form-control x-edit" xid="input1" data="taskData" bind-ref="taskData.ref('sName')"/> 
    </div>  
  </div>  
  -->  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:285px;height:auto;left:163px;" onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="mainData"
      idColumn="fBase"> 
      <column name="fBase" type="String" label="名称" xid="column1"/>  
      <column name="fColor" type="String" xid="column2"/>  
      <column name="fSize" type="String" xid="column3"/>  
      <column name="fOther" type="String" xid="column4"/>  
      <data xid="default1">[{fBase:'btn',fColor:'btn-default',fSize:'',fOther:''}]</data>
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="data1" idColumn="fValue"> 
      <column name="fValue" type="String" label="值" xid="column5"/>  
      <data xid="default2">[{fValue:'btn-default'},{fValue:'btn-primary'},{fValue:'btn-success'},{fValue:'btn-info'},{fValue:'btn-warning'},{fValue:'btn-danger'},{fValue:'btn-link'}]</data>
    </div> 
    <div component="$UI/system/components/justep/data/data" xid="data2" idColumn="fValue"> 
      <column name="fValue" type="String" label="值" xid="column5"/>  
      <data xid="default2">[{fValue:'无'}, {fValue:'btn-xs'},{fValue:'btn-sm'},{fValue:'btn-lg'}]</data>
    </div> 
  </div>
  <ul class=""> 
    <li id="customized"> 
       <div component="$UI/system/components/justep/row/row" class="x-row x-responsive-md"> 
         <div class="x-col x-col-20"><span class="title-here">其它</span></div>  
         <div class="x-col">
           <input component="$UI/system/components/justep/input/input" class="form-control" xid="otherInput"/>
         </div> 
       </div> 
    </li> 
  </ul> 
</div>
