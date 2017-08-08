<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model1" style="position:absolute;height:auto;left:376px;top:13px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="data"> 
      <column label="id" name="id" type="String" xid="default1"/>  
      <column label="fString" name="fString" type="String" xid="default2"/>  
      <column label="fInteger" name="fInteger" type="Integer" xid="default3"/>  
      <column label="fFloat" name="fFloat" type="Float" xid="default4"/>  
      <column label="fDecimal" name="fDecimal" type="String" xid="default5"/>  
      <column label="fDate" name="fDate" type="Date" xid="default6"/>  
      <column label="fText" name="fText" type="String" xid="default7"/>  
      <data xid="default8">[{"id":"1","fString":"test","fInteger":22,"fFloat":22.2,"fDecimal":"","fDate":"","fText":"test....."}]</data> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="input"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="backBtn"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">input</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div>  
      <div id="aler"/> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="title"> 
        <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">input style</h3>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="源码" xid="button2" onClick="showInpStyleSource" bind-visible="flag"> 
          <i xid="i2"/>  
          <span xid="span2">源码</span> 
        </a>  
        <div xid="controlGroupStyle"> 
          <input component="$UI/system/components/justep/input/input" class="form-control x-label-edit"
            xid="input1" placeHolder="input-default"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control input-lg x-label-edit"
            xid="input2" placeHolder="input-lg"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control input-sm x-label-edit"
            xid="input3" placeHolder="input-sm"/>  
          <input component="$UI/system/components/justep/input/password" class="form-control x-label-edit"
            xid="password1" placeHolder="password"/> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="title" xid="controlGroupUse"> 
        <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">input use</h3>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="源码" xid="button4" onClick="showInpUseSource" bind-visible="flag"> 
          <i xid="i4"/>  
          <span xid="span4">源码</span> 
        </a>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
          xid="labelInput1"> 
          <label class="x-label" xid="label1" style="width:20%;" bind-text="data.label('fString')"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input7" placeHolder="placeHolder......" bind-focus="attrExplain"
            bind-ref="data.ref('fString')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
          xid="labelInput2"> 
          <label class="x-label" xid="label2" bind-text="data.label('fInteger')"
            style="width:20%;"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input8" bind-ref="data.ref('fInteger')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
          xid="labelInput3"> 
          <label class="x-label" xid="label3" bind-text="data.label('fFloat')"
            style="width:20%;"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input9" bind-ref="data.ref('fFloat')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
          xid="labelInput4"> 
          <label class="x-label" xid="label4" bind-text="data.label('fDecimal')"
            style="width:20%;"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input10" bind-ref="data.ref('fDecimal')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
          xid="labelInput5"> 
          <label class="x-label" xid="label5" bind-text="data.label('fDate')"
            style="width:20%;"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input11" format="yyyy-MM-dd hh:mm" bind-ref="data.ref('fDate')"/> 
        </div>  
        <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit"
          xid="labelInput6"> 
          <label class="x-label" xid="label6" bind-text="data.label('fText')"
            style="width:20%;"/>  
          <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
            xid="input4" bind-ref="data.ref('fText')"/> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/controlGroup/controlGroup"
        class="x-control-group" title="title" xid="controlGroupEvent"> 
        <h3 style="height:48px;vertical-align: middle;padding: 8px;display: inline-block;">input event</h3>  
          
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="js" xid="button7" onClick="showJsSource"> 
          <i xid="i7"/>  
          <span xid="span7">js</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" xid="button6" onClick="showInpEvent" bind-visible="flag"> 
          <i xid="i6" />  
          <span xid="span6">源码</span> 
        </a><input component="$UI/system/components/justep/input/input" class="form-control x-label-edit"
          xid="input16" onChange="inputChange"/>  
        <p>onRender事件，下面例子中输入1显示蓝色，输入2显示红色，输入其他显示黄色</p>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-label-edit"
          xid="inpRender" onRender="inputRender" onChange="inpRenderChange"/>  
        <input component="$UI/system/components/justep/input/input" class="form-control x-label-edit"
          xid="getInputValue" placeHolder="获取该input的值 "/>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="dynamicCreate" onClick="dynamicCreateInput"> 
          <i/>  
          <span>dynamicCreate</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="getInpRenVal" xid="button8" onClick="getInpRenVal"> 
          <i xid="i8"/>  
          <span xid="span8">getInpRenVal</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="getInputVal" xid="button5" onClick="getInputVal"> 
          <i xid="i5"/>  
          <span xid="span5">getInputVal</span> 
        </a>  
        <div xid="parent"/> 
      </div> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    style="left:458px;top:183px;" src="$UI/system/components/justep/common/demo/dialog.w"/> 
</div>
