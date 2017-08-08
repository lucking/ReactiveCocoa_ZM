<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:663px;top:128px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/bizData" xid="masterData"
      autoLoad="true" concept="DEMO_TABLE1" columns="DEMO_TABLE1,version,fString,fInteger,fFloat,fDecimal,fDate,fDateTime,fTime,fText"
      limit="5" onNewCreateParam="masterDataNewCreateParam"> 
      <reader action="/demo/components/logic/action/queryDEMO_TABLE1Action"/>  
      <writer action="/demo/components/logic/action/saveDEMO_TABLE1Action"/>  
      <creator action="/demo/components/logic/action/createDEMO_TABLE1Action"/>  
      <rule xid="rule6"> 
        <col name="fString" xid="ruleCol10"> 
          <required xid="required4"> 
            <expr xid="default27">js:true</expr>  
            <message xid="default28">请填写String</message> 
          </required> 
        </col>  
        <col name="fInteger" xid="ruleCol11"> 
          <constraint xid="constraint1"> 
            <expr xid="default29">js:val('fInteger')&gt;50</expr>  
            <message xid="default30">Integer必须大于50</message> 
          </constraint> 
        </col>  
        <col name="fDecimal" xid="ruleCol12"> 
          <readonly xid="readonly6"> 
            <expr xid="default31">js:true</expr> 
          </readonly>  
          <calculate xid="calculate8"> 
            <expr xid="default32">js:$model.slaveData?$model.slaveData.sum('fDecimal',$row):0</expr> 
          </calculate> 
        </col> 
      </rule>  
      </div>  
    <div component="$UI/system/components/justep/data/bizData" xid="slaveData"
      concept="DEMO_TABLE2" columns="DEMO_TABLE2,version,fString,fInteger,fFloat,fDecimal,fDate,fDateTime,fTime,fText,fParent,fString0,fString1"
      limit="5" autoLoad="true" onNewCreateParam="slaveDataNewCreateParam"> 
      <reader xid="default2" action="/demo/components/logic/action/queryDEMO_TABLE2Action"/>  
      <writer xid="default3" action="/demo/components/logic/action/saveDEMO_TABLE2Action"/>  
      <creator xid="default4" action="/demo/components/logic/action/createDEMO_TABLE2Action"/>  
      <master xid="default5" data="masterData" relation="fParent"/>  
      <rule xid="rule4"> 
        <col name="fDecimal" xid="ruleCol5"> 
          <calculate xid="calculate3"> 
            <expr xid="default14"><![CDATA[js:val('fFloat')*val('fInteger')]]></expr> 
          </calculate> 
        </col>  
        <col name="fString0" xid="ruleCol6"> 
          <readonly xid="readonly3"> 
            <expr xid="default15"><![CDATA[js:'color'==val('fString')]]></expr> 
          </readonly> 
        </col>  
        <col name="fString1" xid="ruleCol7"> 
          <readonly xid="readonly4"> 
            <expr xid="default16"><![CDATA[js:'fruit'==val('fString')]]></expr> 
          </readonly> 
        </col> 
      </rule> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="fruitData"
      idColumn="fValue" autoLoad="true"> 
      <rule xid="rule1"/>  
      <column label="显示名称" name="fName" type="String" xid="default6"/>  
      <column label="值" name="fValue" type="Integer" xid="default7"/>  
      <data xid="default8">[{"fName":"苹果","fValue":{"value":"apple"}},{"fName":"梨","fValue":{"value":"pear"}},{"fName":"西瓜","fValue":{"value":"watermelon"}},{"fName":"香蕉","fValue":{"value":"banana"}}]</data> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="colorData"
      idColumn="fValue" autoLoad="true"> 
      <column name="fValue" type="String" label="值" xid="column1"/>  
      <column name="fName" type="String" label="显示名称" xid="column2"/>  
      <data xid="default10">[{"fValue":"black","fName":"黑色"},{"fValue":"red","fName":"红色"},{"fValue":"green","fName":"绿色"},{"fValue":"blue","fName":"蓝色"},{"fValue":"orange","fName":"橙色"},{"fValue":"yellow","fName":"黄色"},{"fValue":"purple","fName":"紫色"},{"fValue":"gray","fName":"灰色"}]</data> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="Data"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            xid="button1" onClick="{operation:'window.close'}"> 
            <i xid="i1"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">Data</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div style="padding:6px 6px 6px 6px;"> 
        <h3  style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">特性说明:</h3>
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="masterData源码" xid="button10" onClick="showBizDataSource" bind-visible="isVisible"> 
            <i xid="i10"/>  
            <span xid="span12">masterData源码</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            label="fruitData源码" xid="button11" onClick="showDataSource" bind-visible="isVisible"> 
            <i xid="i11"/>  
            <span xid="span13">fruitData源码</span> 
          </a> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="js" xid="button12" onClick="showJsSource">
   <i xid="i12"></i>
   <span xid="span14">js</span></a>  
        <p>1、masterData中当String必填，提示“请填写String”
          <br/> 2、masterData中当Decimal=slaveData中Decimal的和
          <br/> 3 、masterData中当Integer必须大于50
          <br/> 4、slaveData是masterData的从data
          <br/> 5、slaveData中当String=='color'时颜色项只读，当String=='fruit'时水果项只读
          <br/> 6、slaveData中Decimal=Integer*Float
        </p> 
      </div>  
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="Master" xid="controlGroup1"> 
        <div class="x-control-group-title" xid="controlGroupTitle1"> 
          <span xid="span2">title</span> 
        </div>  
        <div xid="div4"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
            xid="button2" onClick="{operation:'masterData.new'}"> 
            <i xid="i2"/>  
            <span xid="span4">新增</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
            label="" xid="button3" onClick="{operation:'masterData.delete'}"> 
            <i xid="i3"/>  
            <span xid="span5"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
            label="" xid="button4" onClick="{operation:'masterData.refresh'}"> 
            <i xid="i4"/>  
            <span xid="span6"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
            label="" xid="button5" onClick="{operation:'masterData.save'}"> 
            <i xid="i5"/>  
            <span xid="span7"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
            label="" xid="button6" onClick="{operation:'masterData.firstRow'}"> 
            <i xid="i6"/>  
            <span xid="span8"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
            label="" xid="button7" onClick="{operation:'masterData.prevRow'}"> 
            <i xid="i7"/>  
            <span xid="span9"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
            label="" xid="button8" onClick="{operation:'masterData.nextRow'}"> 
            <i xid="i8"/>  
            <span xid="span10"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
            label="" xid="button9" onClick="{operation:'masterData.lastRow'}"> 
            <i xid="i9"/>  
            <span xid="span11"/> 
          </a> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput1"> 
          <label class="x-label" xid="label1" bind-text="masterData.label('fString')"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input1" bind-ref="masterData.ref('fString')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput2"> 
          <label class="x-label" xid="label2" bind-text="masterData.label('fInteger')"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input2" bind-ref="masterData.ref('fInteger')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput3"> 
          <label class="x-label" xid="label3" bind-text="masterData.label('fFloat')"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input3" bind-ref="masterData.ref('fFloat')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput4"> 
          <label class="x-label" xid="label4" bind-text="masterData.label('fDecimal')"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input4" bind-ref="masterData.ref('fDecimal')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput5"> 
          <label class="x-label" xid="label5" bind-text="masterData.label('fDate')"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input5" bind-ref="masterData.ref('fDate')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput6"> 
          <label class="x-label" xid="label6" bind-text="masterData.label('fDateTime')"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input6" bind-ref="masterData.ref('fDateTime')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelInput7"> 
          <label class="x-label" xid="label7" bind-text="masterData.label('fTime')"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input7" bind-ref="masterData.ref('fTime')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label20"
          xid="labelTextarea1"> 
          <label class="x-label" xid="label9" bind-text="masterData.label('fText')"/>  
          <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control x-edit"
            xid="textarea1" bind-ref="masterData.ref('fText')"/> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="Slave" xid="controlGroup2"> 
        <div class="x-control-group-title" xid="controlGroupTitle2"> 
          <span xid="span3">title</span> 
        </div>  
        <div xid="div5"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
            xid="button16" onClick="{operation:'slaveData.new'}"> 
            <i xid="i17"/>  
            <span xid="span18">新增</span> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
            label="" xid="button17" onClick="{operation:'slaveData.delete'}"> 
            <i xid="i16"/>  
            <span xid="span19"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
            label="" xid="button14" onClick="{operation:'slaveData.refresh'}"> 
            <i xid="i15"/>  
            <span xid="span16"/> 
          </a>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left"
            label="" xid="button15" onClick="{operation:'slaveData.save'}"> 
            <i xid="i14"/>  
            <span xid="span17"/> 
          </a> 
        </div>  
        <div component="$UI/system/components/justep/list/list" class="x-list"
          xid="list1" data="slaveData" disablePullToRefresh="true" disableInfiniteLoad="true"> 
          <ul class="x-list-template list-group-item" xid="listTemplateUl1" style="border-width:0px 0px 0px 0px;"> 
            <li xid="li1" style="border-right-width:0px;border-left-width:0px;border-radius:0;padding-right:0px;padding-left:0px;" class="list-group-item"> 
              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                class="x-label-edit x-label20" xid="labelInput9"> 
                <label class="x-label" xid="label10" bind-text="label('fString')"/>  
                <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                  xid="input9" bind-ref="ref('fString')"/> 
              </div>  
              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                class="x-label-edit x-label20" xid="labelRange1"> 
                <label class="x-label" xid="label11" bind-text="label('fInteger')"/>  
                <input component="$UI/system/components/justep/input/range" class="x-edit"
                  xid="range1" bind-ref="ref('fInteger')" min="-1000" max="1000"/> 
              </div>  
              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                class="x-label-edit x-label20" xid="labelInput10"> 
                <label class="x-label" xid="label12" bind-text="label('fFloat')"/>  
                <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                  xid="input10" bind-ref="ref('fFloat')"/> 
              </div>  
              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                class="x-label-edit x-label20" xid="labelOutput1"> 
                <label class="x-label" xid="label13" bind-text="label('fDecimal')"/>  
                <div component="$UI/system/components/justep/output/output"
                  class="x-output x-edit" xid="output1" bind-ref="ref('fDecimal')"/> 
              </div>  
              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                class="x-label-edit x-label20" xid="labelCheckboxGroup1"> 
                <label class="x-label" xid="label14"><![CDATA[颜色]]></label>  
                <span component="$UI/system/components/justep/select/checkboxGroup"
                  class="x-checkboxs x-edit" xid="checkboxGroup1" bind-ref="ref('fString0')"
                  bind-itemset="$model.colorData" bind-itemsetLabel="ref('fName')"
                  bind-itemsetValue="ref('fValue')"/> 
              </div>  
              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                class="x-label-edit x-label20" xid="labelRadioGroup1"> 
                <label class="x-label" xid="label8"><![CDATA[水果]]></label>  
                <span component="$UI/system/components/justep/select/radioGroup"
                  class="x-radios x-edit" xid="radioGroup2" bind-ref="ref('fString1')"
                  bind-itemset="$model.fruitData" bind-itemsetLabel="ref('fName')"
                  bind-itemsetValue="ref('fValue')"/> 
              </div> 
            </li> 
          </ul> 
        </div> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/>
</div>
