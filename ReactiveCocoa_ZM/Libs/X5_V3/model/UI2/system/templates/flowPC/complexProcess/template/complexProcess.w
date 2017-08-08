<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:380px;top:216px;">{{#each datas}}
    <div component="$UI/system/components/justep/data/bizData" xid="{{data_xid}}"
      directDelete="true" autoLoad="false" concept="{{data_concept}}" orderBy="{{data_orderBy}}"
      columns="{{data_relations}}" onSaveCommit="saveCommit" autoNew="true" isTree="false"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/>  
      <calculateRelation relation="calcCheckBox"/>  
      <master xid="default1" data="{{masterData}}" relation="{{masterColumn}}"/> 
    </div>{{/each}}
  </div>  
  <div component="$UI/system/components/justep/process/process" xid="process"
    data="mainData" style="width:24px;height:5px;left:184px;top:769px;"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/luzs/test/main.w"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <nav class="navbar navbar-default" component="$UI/system/components/bootstrap/navbar/navbar"
        xid="navbar"> 
        <div class="container-fluid" xid="div1"> 
          <div class="navbar-header" xid="div2"/>  
          <div class="collapse navbar-collapse" xid="div3"> 
            <ul class="nav navbar-nav"> 
              <li> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link" xid="saveBtn" onClick="{operation:'{{detail_data}}.save'}"> 
                  <i xid="i1"/>  
                  <span xid="span1"/> 
                </a> 
              </li>  
              <li> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link" xid="advanceBtn" onClick="{operation:'process.advance'}"> 
                  <i xid="i2"/>  
                  <span xid="span2">流转</span> 
                </a> 
              </li>  
              <li> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link" xid="suspendBtn" onClick="{operation:'process.suspend'}"> 
                  <i xid="i3"/>  
                  <span xid="span3"/> 
                </a> 
              </li>  
              <li> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link" xid="abortBtn" onClick="{operation:'process.abort'}"> 
                  <i xid="i4"/>  
                  <span xid="span4"/> 
                </a> 
              </li>  
              <li> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link" xid="chartBtn" onClick="{operation:'process.showChart'}"> 
                  <i xid="i5"/>  
                  <span xid="span5"/> 
                </a> 
              </li> 
            </ul> 
          </div> 
        </div> 
      </nav> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      	<h1 style="text-align:center;margin-bottom:30px">{{form_title}}</h1>
      <div component="$UI/system/components/bootstrap/row/row" class="row"
        style="margin:0">{{#each form}}
        <div class="col-md-6"> 
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20"> 
            <label class="x-label left" bind-text="$model.{{form_data}}.label('{{form_field}}')"/>  
            <div class="x-edit">{{#if form_selectDataID}} 
              <select class="form-control" component="$UI/system/components/justep/select/select"
                bind-ref="{{form_data}}.ref('{{form_refID}}')" bind-labelRef="{{form_data}}.ref('{{form_field}}')"
                bind-options="{{form_selectDataID}}" bind-optionsLabel="{{form_selectLabelName}}"
                bind-optionsValue="{{form_selectConcept}}" bind-optionsCaption="请选择..."/>{{else}}{{#if form_password}}
              <input component="$UI/system/components/justep/input/password"
                class="form-control x-edit" data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')"/>{{/if}}{{#if form_range}}
              <input component="$UI/system/components/justep/input/range" class="x-edit"
                bind-ref="{{form_data}}.ref('{{form_field}}')" min="-10000" max="10000"/>{{/if}}{{#if form_output}}
              <span class="x-output" component="$UI/system/components/justep/output/output"
                data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')"/>{{/if}}{{#if form_textarea}}
              <textarea class="form-control" component="$UI/system/components/justep/textarea/textarea"
                data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')"/> {{/if}}{{#if form_input}}
              <input class="form-control" component="$UI/system/components/justep/input/input"
                data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')"/>{{/if}}{{/if}}
            </div> 
          </div> 
        </div> {{/each}}
      </div>  
      <div component="$UI/system/components/bootstrap/accordion/accordion"
        class="panel-group" xid="productAccordion"> 
        <div class="panel panel-info" component="$UI/system/components/bootstrap/panel/panel"
          xid="panel4"> 
          <div class="panel-heading" xid="heading4"> 
            <h4 class="panel-title" xid="h44"> 
              <a href="javascript:void(0)" xid="a9"><![CDATA[{{list_title}}]]></a> 
            </h4> 
          </div>  
          <div class="panel-body" xid="body4"> 
            <div component="$UI/system/components/justep/button/buttonGroup"
              class="btn-group" tabbed="false" xid="detailBar"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                xid="addBtn" icon="icon-plus" label="添加" onClick="addBtnClick"> 
                <i xid="i6" class="icon-plus"/>  
                <span xid="span10">添加</span> 
              </a>  
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                label="编辑" xid="editProductBtn" icon="icon-edit" onClick="{operation:'{{detail_data}}.edit'}"> 
                <i xid="i9" class="icon-edit"/>  
                <span xid="span13">编辑</span> 
              </a>  
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                xid="deleteBtn" onClick="{operation:'{{detail_data}}.delete'}"> 
                <i xid="i7"/>  
                <span xid="span11">删除</span> 
              </a>  
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                xid="firstRowBtn" onClick="{operation:'{{detail_data}}.firstRow'}"> 
                <i xid="i10"/>  
                <span xid="span22">首页</span> 
              </a>  
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                xid="preRowBtn" onClick="{operation:'{{detail_data}}.prevRow'}"> 
                <i xid="i11"/>  
                <span xid="span23">上页</span> 
              </a>  
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                xid="nextRowBtn" onClick="{operation:'{{detail_data}}.nextRow'}"> 
                <i xid="i12"/>  
                <span xid="span24"/> 
              </a>  
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                xid="lastRowBtn" onClick="{operation:'{{detail_data}}.lastRow'}"> 
                <i xid="i13"/>  
                <span xid="span25">尾页</span> 
              </a> 
            </div> 
          </div>  
          <div class="table-responsive" component="$UI/system/components/justep/list/list"
            data="{{detail_data}}"> 
            <table class="table table-bordered table-hover table-striped" component="$UI/system/components/bootstrap/table/table"
              xid="table2"> 
              <thead xid="thead2"> 
                <tr xid="tr3"> 
                  <th xid="col5">#</th> {{#each detail_list}} 
                  <th> 
                    <label bind-text="{{detail_data}}.label('{{list_field1}}')"/> 
                  </th> {{#if list_field2}}
                  <th> 
                    <label bind-text="{{detail_data}}.label('{{list_field2}}')"/> 
                  </th>{{/if}} {{/each}}
                </tr> 
              </thead>  
              <tbody class="x-list-template" xid="tbody2"> 
                <tr xid="tr4"> 
                  <td bind-text="$index()+1"/> {{#each detail_list}} 
                  <td> 
                    <div component="$UI/system/components/justep/output/output"
                      class="x-output" bind-ref="ref('{{list_field1}}')"/> 
                  </td> {{#if list_field2}}
                  <td> 
                    <div component="$UI/system/components/justep/output/output"
                      class="x-output" bind-ref="ref('{{list_field2}}')"/> 
                  </td> {{/if}} {{/each}}
                </tr> 
              </tbody> 
            </table> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
