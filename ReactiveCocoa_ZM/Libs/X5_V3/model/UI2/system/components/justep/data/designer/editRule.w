<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:107px;top:110px;" onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="data" idColumn="name"> 
      <column name="name" type="String" label="名称" xid="column1"/>  
      <column name="type" type="String" label="类型" xid="column2"/>  
      <column name="displayName" type="String" label="显示名称" xid="column3"/>  
      <column name="readonly" type="String" label="只读规则" xid="column4"/>  
      <column name="calculate" type="String" label="计算规则" xid="column5"/>  
      <column name="required" type="String" label="必填规则" xid="column6"/>  
      <column name="requiredMessage" type="String" label="必填规则提示信息" xid="column7"/>  
      <column name="constraint" type="String" label="约束规则" xid="column8"/>  
      <column name="constraintMessage" type="String" label="约束规则提示信息" xid="column9"/>
    </div> 
  </div>  
  <div style="padding-left:8px;padding-top:8px;" class="form-inline"> 
    <label>Data只读：</label>  
    <input component="$UI/system/components/justep/input/input" 
      class="form-control" xid="dataReadonly" placeHolder="只读表达式" style="width:610px;"/>  
    <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="设置"
      xid="dataReadonlyExpr" onClick="readonlyExprClick"><i/><span>设置</span></a> 
  </div>  
  <div class="container"> 
    <div class="sidebar"> 
      <ul xid="ul0"> 
        <li xid="li0">列：</li>  
        <li xid="li"> 
          <div component="$UI/system/components/designerCommon/grid/grid" data="data" width="300"
            height="390" style="margin: 10px 0;" editable="false"> 
            <column ref="name" width="120"/>  
            <column ref="displayName" width="160"/> 
          </div> 
        </li> 
      </ul> 
    </div>  
    <div class="content form-inline"> 
      <ul xid="ul1"> 
        <li xid="li1">只读：</li>  
        <li xid="li2"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="readonly" placeHolder="只读表达式" style="width:370px;" data="data" bind-ref="data.ref('readonly')"/>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="设置" xid="readonlyExpr" onClick="readonlyExprClick"><i/><span>设置</span></a> 
        </li>  
        <li xid="li3">计算：</li>  
        <li xid="li4"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="calculate" placeHolder="计算表达式" style="width:370px;" data="data" bind-ref="data.ref('calculate')"/>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="设置" xid="calculateExpr" onClick="calculateExprClick"><i/><span>设置</span></a>
        </li>  
        <li xid="li5">必填：</li>  
        <li xid="li6"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="required" placeHolder="必填规则表达式" style="width:370px;" data="data"
            bind-ref="data.ref('required')"/>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="设置" xid="requiredExpr" onClick="requiredExprClick"><i/><span>设置</span></a> 
        </li>  
        <li> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="required_message" placeHolder="必填规则提示信息" style="width:370px;" data="data"
            bind-ref="data.ref('requiredMessage')"/> 
        </li>  
        <li xid="li7">约束：</li>  
        <li xid="li8"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="constraint" placeHolder="约束规则表达式" style="width:370px;" data="data"
            bind-ref="data.ref('constraint')"/>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="设置" xid="constraintExpr" onClick="constraintExprClick"><i/><span>设置</span></a> 
        </li>  
        <li> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="constraint_message" placeHolder="约束规则提示信息" style="width:370px;" data="data"
            bind-ref="data.ref('constraintMessage')"/> 
        </li> 
      </ul> 
    </div> 
  </div>  
  <resource xid="default1">
    <link rel="stylesheet" type="text/css" xid="htmlLink1" href="editRule.css"/>
  </resource>
</div>
