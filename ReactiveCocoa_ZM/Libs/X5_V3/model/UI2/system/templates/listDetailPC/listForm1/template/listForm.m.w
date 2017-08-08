<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:26px;height:auto;left:378px;"> 
    {{#each datas}}<div component="$UI/system/components/justep/data/bizData" xid="{{data_xid}}"
      directDelete="true" autoLoad="true" concept="{{data_concept}}" orderBy="{{data_orderBy}}" columns="{{data_relations}}"
      onSaveCommit="saveCommit"> 
      <reader action="{{data_reader}}"/>  
      <writer action="{{data_writer}}"/>  
      <creator action="{{data_creator}}"/>  
      <calculateRelation relation="calcCheckBox"/> 
    </div>{{/each}}
    <div component="$UI/system/components/justep/data/data" xid="controlData"
      idColumn="edit" autoLoad="true"> 
      <column name="edit" type="Integer"/>  
      <data><![CDATA[
      [{edit:0}]
      ]]></data> 
    </div> 
  </div>  
  <div> 
    <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
      active="0" slidable="false" xid="contents" wrap="fasle" swipe="false"> 
        <div class="x-contents-content active" xid="list"> 
          <div component="$UI/system/components/justep/panel/panel" 
            class="x-panel x-full" > 
              <div class="x-panel-top"> 
                <div component="$UI/system/components/justep/titleBar/titleBar" title="{{list_title}}"
                  class="x-titlebar">
                  <div class="x-titlebar-left"> 
                    <a component="$UI/system/components/justep/button/button"
                      label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
                      onClick="backBtnClick" xid="backBtn"> 
                      <i class="icon-chevron-left"/>  
                      <span></span> 
                    </a> 
                  </div>  
                  <div class="x-titlebar-title">{{list_title}}</div>  
                  <div class="x-titlebar-right reverse"> 
                    <a component="$UI/system/components/justep/button/button"
                      label="" class="btn btn-link btn-only-icon" icon="icon-plus"
                      onClick="addBtnClick" xid="addBtn"> 
                      <i class="icon-plus"/>  
                      <span></span> 
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      label="" class="btn btn-link btn-only-icon" icon="icon-edit"
                      onClick="editBtnClick" xid="editBtn"> 
                      <i class="icon-edit"/>  
                      <span></span> 
                    </a> 
                  </div>
                </div> 
              </div>  
              <div class="x-panel-content" refresh="true" load="true"> 
              	<div xid="mainList" class="x-list" component="$UI/system/components/justep/list/list"
                  data="{{list_data}}" limit="6"> 
                  <div class="x-list-head"/>  
                  <ul class="x-list-template"> 
                    <li> 
                        <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"> 
                          <div class="x-col" style="text-align: left;" bind-visible="$model.controlData.val('edit')==1"> 
                            <span component="$UI/system/components/justep/button/checkbox"
                              bind-ref="ref('calcCheckBox')" class="x-checkbox"/> 
                          </div>  
                          <div component="$UI/system/components/justep/row/row" class="x-col x-col-90" bind-click="showDetailClick"> 
                              {{#each list}}<div class="x-row" component="$UI/system/components/justep/row/row"> 
                                <div class="x-col"> 
                                  <span class="font-bold x-output" component="$UI/system/components/justep/output/output"
                                    data="{{list_data}}" bind-ref="ref('{{list_field1}}')"/> 
                                </div>
                                {{#if list_field2}}<div class="x-col" style="text-align:right;color:gray"> 
                                  <span class="x-output" component="$UI/system/components/justep/output/output"
                                    data="{{list_data}}" bind-ref="ref('{{list_field2}}')"/> 
                                </div>{{/if}}
                              </div>{{/each}}
                          </div>  
                          <div class="x-col font-gray" bind-click="showDetailClick"
                            style="text-align: right"> 
                            <a component="$UI/system/components/justep/button/button"
                              label="" class="btn btn-only-icon" icon="icon-chevron-right"
                              xid="editBtn"> 
                              <i class="icon-chevron-right"/>  
                              <span/> 
                            </a> 
                          </div> 
                        </div> 
                    </li> 
                  </ul> 
                </div> 
              </div>  
              <div class="x-panel-bottom" bind-visible="$model.controlData.val('edit')==1"> 
                <div class="btn-group-lg btn-group-justified" component="$UI/system/components/justep/button/buttonGroup"> 
                  <a component="$UI/system/components/justep/button/button"
                    label="删除" class="btn btn-default" onClick="okEditClick"> 
                    <i/>  
                    <span>删除</span> 
                  </a>  
                  <a component="$UI/system/components/justep/button/button"
                    label="取消" class="btn btn-default" onClick="cancelEditClick"> 
                    <i/>  
                    <span>取消</span> 
                  </a> 
                </div> 
              </div> 
          </div> 
        </div>  
        <div class="x-contents-content" xid="detail"> 
          <div component="$UI/system/components/justep/panel/panel"
            class="x-panel x-full"> 
              <div class="x-panel-top"> 
                <div component="$UI/system/components/justep/titleBar/titleBar" title="{{form_title}}"
                  class="x-titlebar"> 
                  <div class="x-titlebar-left"> 
                    <a component="$UI/system/components/justep/button/button"
                      label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
                      onClick="listBtnClick" xid="listBtn"> 
                      <i class="icon-chevron-left"/>
                      <span></span> 
                    </a> 
                  </div>  
                  <div class="x-titlebar-title">{{form_title}}</div>  
                  <div class="x-titlebar-right reverse"> 
                    <a component="$UI/system/components/justep/button/button"
                      label="" class="btn btn-link btn-only-icon" icon="icon-plus"
                      onClick="addBtnClick" xid="addBtn"> 
                      <i class="icon-plus"/>
                      <span></span> 
                    </a>  
                    <a component="$UI/system/components/justep/button/button"
                      label="" class="btn btn-link btn-only-icon" onClick="{operation:'{{form_data}}.save'}"
                      xid="saveBtn"> 
                      <i/>
                      <span></span> 
                    </a> 
                  </div> 
                </div> 
              </div>  
              <div class="x-panel-content"> 
                <div component="$UI/system/components/justep/controlGroup/controlGroup"
                  class="x-control-group" title="详细信息"> 
                  <div class="x-control-group-title">详细信息</div>  
                  {{#each form}}<div component="$UI/system/components/justep/labelEdit/labelEdit"
                    class="x-label-edit"> 
                    <label class="x-label left" bind-text="$model.{{form_data}}.label('{{form_field}}')"/>  
                    <div class="x-edit"> 
                    {{#if form_selectDataID}}<select class="form-control" component="$UI/system/components/justep/select/select"
                 		bind-ref="{{form_data}}.ref('{{form_refID}}')" bind-labelRef="{{form_data}}.ref('{{form_field}}')"
                 		bind-options="{{form_selectDataID}}" bind-optionsLabel="{{form_selectLabelName}}" bind-optionsValue="{{form_selectConcept}}"
                		bind-optionsCaption="请选择..."/>{{else}}{{#if form_password}}
                		<input component="$UI/system/components/justep/input/password" class="form-control x-edit"
   					     data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')"/>{{/if}}{{#if form_range}}
                		<input component="$UI/system/components/justep/input/range"
 					    class="x-edit" bind-ref="{{form_data}}.ref('{{form_field}}')" min="-10000" max="10000"/>{{/if}}{{#if form_output}}
 					    <span class="x-output" component="$UI/system/components/justep/output/output"
        	             data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')"/>{{/if}}{{#if form_textarea}}
 					   <textarea class="form-control" component="$UI/system/components/justep/textarea/textarea"
                  	  data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')"/> {{/if}}{{#if form_input}}
                  	  <input class="form-control" component="$UI/system/components/justep/input/input"
                  		data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')"/>{{/if}}{{/if}} 
                    </div> 
                  </div>{{/each}}  
                </div> 
              </div>  
              <div class="x-panel-bottom" bind-visible="false"/>
          </div> 
        </div> 
    </div> 
  </div> 
</div>
