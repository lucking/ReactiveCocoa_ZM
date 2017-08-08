<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:845px;top:64px;"> 
    <div component="$UI/system/components/justep/data/bizData" xid="bizData1"
      auto-load="true" concept="DEMO_TABLE1" columns="version,fString,fInteger,fFloat,fDecimal,fDate,fDateTime,fTime,fText"
      limit="2" autoLoad="true"> 
      <reader action="/demo/components/logic/action/queryDEMO_TABLE1Action"/>  
      <writer action="/demo/components/logic/action/saveDEMO_TABLE1Action"/>  
      <creator action="/demo/components/logic/action/createDEMO_TABLE1Action"/>  
      <calculate-relation relation="calcCheckBox"/>  
      <calculate-relation relation="recNO" type="Integer"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group"
    xid="controlGroup3" title="Input,Password,Range组件:"> 
    <div class="x-control-group-title"/>  
    <a component="$UI/system/components/justep/button/button" onClick="{operation:'bizData1.new'}"
      label="" class="btn btn-info"> 
      <i class="icon-plus"/>  
      <span/> 
    </a>  
    <a onClick="{operation:'bizData1.refresh'}" component="$UI/system/components/justep/button/button"
      class="btn btn-info"> 
      <i class="icon-refresh"/>  
      <span/> 
    </a>  
    <a onClick="{operation:'bizData1.delete'}" component="$UI/system/components/justep/button/button"
      class="btn btn-info"> 
      <i class="icon-minus"/>  
      <span/> 
    </a>  
    <a onClick="{operation:'bizData1.save'}" component="$UI/system/components/justep/button/button"
      class="btn btn-info"> 
      <i class="icon-save"/>  
      <span/> 
    </a>  
    <a component="$UI/system/components/justep/button/button" label="createInput"
      class="btn btn-info" onClick="createInput"> 
      <i/>  
      <span>createInput</span> 
    </a>  
    <a component="$UI/system/components/justep/button/button" class="btn btn-info"
      onClick="{operation:'bizData1.firstRow'}"> 
      <i/>  
      <span>&lt;&lt;</span> 
    </a>  
    <a component="$UI/system/components/justep/button/button" class="btn btn-info"
      onClick="{operation:'bizData1.prevRow'}"> 
      <i/>  
      <span>&lt;</span> 
    </a>  
    <a component="$UI/system/components/justep/button/button" class="btn btn-info btn-icon-right"
      onClick="{operation:'bizData1.nextRow'}"> 
      <i/>  
      <span>&gt;</span> 
    </a>  
    <a component="$UI/system/components/justep/button/button" class="btn btn-info btn-icon-right"
      onClick="{operation:'bizData1.lastRow'}"> 
      <i/>  
      <span>&gt;&gt;</span> 
    </a> 
  </div>  
  <div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group"
    title="当前行：" xid="controlGroup1"> 
    <div class="x-control-group-title" xid="div1">当前行：</div>  
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
      xid="labelInput1"> 
      <label class="x-label" xid="label1" bind-text="bizData1.label('fString')"/>  
      <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
        xid="input10" data="bizData1" bind-ref="bizData1.ref('fString')"/> 
    </div>  
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
      xid="labelInput9"> 
      <label class="x-label" xid="label12" bind-text="bizData1.label('fText')"/>  
      <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
        xid="input18" data="bizData1" bind-ref="bizData1.ref('fText')"/> 
    </div>  
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
      xid="labelInput8"> 
      <label class="x-label" xid="label11" bind-text="bizData1.label('fText')"/>  
      <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
        xid="input17" data="bizData1" bind-ref="bizData1.ref('fText')" onRender="input6Render"/> 
    </div>  
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
      xid="labelPassword1"> 
      <label class="x-label" xid="label2" bind-text="bizData1.label('fText')"/>  
      <input component="$UI/system/components/justep/input/password" class="form-control x-edit"
        xid="password1" bind-ref="bizData1.ref('fText')"/> 
    </div>  
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
      xid="labelRange1"> 
      <label class="x-label" xid="label3" bind-text="bizData1.label('fInteger')"/>  
      <input component="$UI/system/components/justep/input/range" xid="range1"
        class="x-edit" bind-ref="bizData1.ref('fInteger')" min="-10000" max="10000"
        onChange="input2Change"/> 
    </div>  
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
      xid="labelInput2"> 
      <label class="x-label" xid="label4" bind-text="bizData1.label('fInteger')"/>  
      <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
        xid="input11" data="bizData1" bind-ref="bizData1.ref('fInteger')"/> 
    </div>  
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
      xid="labelInput3"> 
      <label class="x-label" xid="label5" bind-text="bizData1.label('fFloat')"/>  
      <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
        xid="input12" data="bizData1" bind-ref="bizData1.ref('fFloat')"/> 
    </div>  
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
      xid="labelInput4"> 
      <label class="x-label" xid="label6" bind-text="bizData1.label('fDecimal')"/>  
      <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
        xid="input13" data="bizData1" bind-ref="bizData1.ref('fDecimal')"/> 
    </div>  
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
      xid="labelInput5"> 
      <label class="x-label" xid="label7" bind-text="bizData1.label('fDate')"/>  
      <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
        xid="input14" data="bizData1" bind-ref="bizData1.ref('fDate')"/> 
    </div>  
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
      xid="labelInput6"> 
      <label class="x-label" xid="label8" bind-text="bizData1.label('fDateTime')"/>  
      <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
        xid="input15" data="bizData1" bind-ref="bizData1.ref('fDateTime')"/> 
    </div>  
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
      xid="labelInput7"> 
      <label class="x-label" xid="label9" bind-text="bizData1.label('fTime')"/>  
      <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
        xid="input16" data="bizData1" bind-ref="bizData1.ref('fTime')"/> 
    </div>  
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
      xid="labelOutput1"> 
      <label class="x-label" xid="label10"><![CDATA[Ranger change:]]></label>  
      <div component="$UI/system/components/justep/output/output" class="x-output x-edit"
        xid="output2-1"/> 
    </div>  
    <div xid="create-input"/> 
  </div>  
  <div component="$UI/system/components/justep/controlGroup/controlGroup" class="x-control-group"
    xid="controlGroup2" title="全部数据:"> 
    <div class="x-control-group-title" xid="div2"/>  
    <div component="$UI/system/components/justep/list/list" class="x-list"
      xid="list1" data="bizData1"> 
      <div class="x-list-head" xid="div3"/>  
      <div class="x-list-content" xid="div4"> 
        <ul class="x-list-template" xid="listTemplate-ul1"> 
          <li xid="li1" bind-css="{ curRow:     $model.bizData1.currentRow.get() == $object }"
            style="border-bottom-style:dashed;border-bottom-width:2px;border-bottom-color:#C0C0C0;"> 
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit" xid="labelInput10"> 
              <label class="x-label" xid="label13" bind-text="label('fString')"/>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input1" bind-ref="ref('fString')"/> 
            </div>  
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit" xid="labelInput11"> 
              <label class="x-label" xid="label14" bind-text="label('fInteger')"/>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input2" bind-ref="ref('fInteger')"/> 
            </div>  
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit" xid="labelInput12"> 
              <label class="x-label" xid="label15" bind-text="label('fFloat')"/>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input3" bind-ref="ref('fFloat')"/> 
            </div>  
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit" xid="labelInput13"> 
              <label class="x-label" xid="label16" bind-text="label('fDate')"/>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input4" bind-ref="ref('fDate')"/> 
            </div>  
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit" xid="labelInput14"> 
              <label class="x-label" xid="label17" bind-text="label('fDateTime')"/>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input5" bind-ref="ref('fDateTime')"/> 
            </div>  
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit" xid="labelInput16"> 
              <label class="x-label" xid="label19" bind-text="label('fTime')"/>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input7" bind-ref="ref('fTime')"/> 
            </div>  
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit" xid="labelInput15"> 
              <label class="x-label" xid="label18" bind-text="label('fText')"/>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input6" bind-ref="ref('fText')"/> 
            </div> 
          </li> 
        </ul> 
      </div> 
    </div> 
  </div> 
</div>
