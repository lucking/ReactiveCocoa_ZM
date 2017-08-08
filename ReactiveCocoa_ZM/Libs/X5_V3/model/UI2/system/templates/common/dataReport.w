<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:864px;top:141px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" xid="mainData"
      idColumn="id" onValueChanged="mainDataValueChange"> 
      <column label="id" name="id" type="String" xid="default1"/>  
      <column label="数据集名称" name="dataId" type="String" xid="default2"/>  
      <column label="concept" name="concept" type="String" xid="default4"/>  
      <column label="writer" name="writer" type="String" xid="default5"/>  
      <column label="creator" name="creator" type="String" xid="default6"/>  
      <column label="reader" name="reader" type="String" xid="default8"/>  
      <column label="columns" name="columns" type="String" xid="default9"/>  
      <column label="dataType" name="dataType" type="String" xid="default10"/>  
      <column label="node-level-relation" name="nodeLevelRelation" type="String"
        xid="default13"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="typeData"
      idColumn="xid" autoLoad="true"> 
      <rule xid="rule2"/>  
      <column label="xid" name="xid" type="String" xid="default7"/>  
      <column label="dataType" name="dataType" type="String" xid="default11"/>  
      <data xid="default12">[{"xid":"1","dataType":"ksqlaction"},{"xid":"2","dataType":"action"}]</data> 
    </div> 
  </div>  
  <div class="row nav-row"> 
    <ul class="nav navbar-nav" style="margin-left:15px"> 
      <li/>  
      <li/> 
    </ul> 
  </div>  
  <div class="row"> 
    <div class="col-xs-9 " style=""> 
      <form class="form-horizontal data-form scroll" style="margin-right:12px"
        role="form"> 
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">数据集名称</label>  
          <div class="col-xs-9"> 
            <input component="$UI/system/components/justep/input/input" class="form-control"
              xid="dataId" data="mainData" bind-ref="mainData.ref('dataId')" bind-value="mainData.ref('dataId')"/> 
          </div> 
        </div>  
        <div class="form-group" style="display:none"> 
          <label for="text1" class="control-label col-xs-3">概念(concept)</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                xid="concept" data="mainData" bind-value="mainData.ref('concept')"/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectConceptBtnClick">选择</a> 
              </span> 
            </div> 
          </div> 
        </div>  
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">数据源类型</label>  
          <div class="col-xs-9"> 
            <select component="$UI/system/components/justep/select/select" class="form-control"
              xid="select1" bind-ref="mainData.ref('dataType')" bind-options="typeData"
              bind-optionsValue="dataType" bind-optionsLabel="dataType"/> 
          </div> 
        </div>  
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3"><![CDATA[action]]></label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                style="display:none" xid="reader" data="mainData" bind-value="mainData.ref('reader')"/>  
              <input component="$UI/system/components/justep/input/input" class="form-control"
                xid="action" data="mainData" readonly="true"/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectReaderBtnClick">选择</a>  
                </span> 
            </div> 
          </div> 
        </div>  
        <div class="form-group" style="display:none"> 
          <label for="text1" class="control-label col-xs-3">写入动作(writer)</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                xid="writer" data="mainData" bind-value="mainData.ref('writer')"/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectWriterBtnClick">选择</a> 
              </span> 
            </div> 
          </div> 
        </div>  
        <div class="form-group" style="display:none"> 
          <label for="text1" class="control-label col-xs-3">action</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                xid="creator" data="mainData" bind-value="mainData.ref('creator')"/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectCreatorBtnClick">选择</a> 
              </span> 
            </div> 
          </div> 
        </div>  
        <div class="form-group"> 
          <label for="text1" class="control-label col-xs-3">业务字段</label>  
          <div class="col-xs-9"> 
            <div class="input-group input-append"> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                xid="columns" data="mainData" bind-value="mainData.ref('columns')"
                onChange="columnsChange"/>  
              <span class="input-group-btn"> 
                <a class="btn btn-default" component="$UI/system/components/justep/button/button"
                  bind-click="selectRelationsBtnClick">选择</a> 
              </span> 
            </div> 
          </div> 
        </div> 
      </form> 
    </div> 
  </div> 
</div>
