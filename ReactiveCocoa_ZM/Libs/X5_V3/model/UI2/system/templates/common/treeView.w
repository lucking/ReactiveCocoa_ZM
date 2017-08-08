<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad" style="height:auto;left:218px;top:72px;"> 
    <div component="$UI/system/components/justep/data/data" xid="treeData"
      idColumn="xid" autoNew="false"> 
      <column label="xid" name="xid" type="String" xid="xid1"/>  
      <column label="根节点标签" name="rootNodeLable" type="String" xid="default5"/>  
      <column label="树节点名称(*)" name="treeNodeName" type="String" xid="default6"/>
      <rule xid="rule1"> 
        <col name="treeNodeName" xid="ruleCol2"> 
          <required> 
            <expr><![CDATA[js:true]]></expr>  
            <message xid="default2"><![CDATA[树节点名称(*):不能为空，]]></message> 
          </required> 
        </col> 
      </rule> 
    <data xid="default1">[{}]</data></div>  
    <div component="$UI/system/components/justep/data/data" xid="canSelectData"
      idColumn="xid"> 
      <rule xid="rule2"/>  
      <column label="xid" name="xid" type="String" xid="xid2"/>  
      <column label="可选择数据名称" name="name" type="String" xid="default7"/> 
    </div> 
  </div>  
  <div class="row"  style="margin:12px 12px"> 
    <form class="form-horizontal data-form" role="form"> 
      <div class="form-group"> 
        <label for="text1" class="control-label col-xs-3"><![CDATA[根节点标签]]></label>  
        <div class="col-xs-9"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            data="treeData" bind-ref="treeData.ref('rootNodeLable')" bind-value="treeData.ref('rootNodeLable')"/> 
        </div> 
      </div>  
      <div class="form-group"> 
        <label for="text1" class="control-label col-xs-3">树节点名称(*)</label>  
        <div class="col-xs-9"> 
          <select class="form-control" component="$UI/system/components/justep/select/select"
            bind-ref="treeData.ref('treeNodeName')" bind-labelRef="treeData.ref('treeNodeName')"
            bind-options="canSelectData" bind-optionsValue="name" bind-optionsCaption=""
            bind-click="select6Click"/> 
        </div> 
      </div> 
    </form> 
  </div> 
</div>
