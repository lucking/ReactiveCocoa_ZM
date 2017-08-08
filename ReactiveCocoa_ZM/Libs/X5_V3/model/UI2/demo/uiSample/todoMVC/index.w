<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:230px;top:119px;" onLoad="loadData"> 
    <div component="$UI/system/components/justep/data/data" xid="todoData"
      idColumn="id" autoLoad="false" confirmDelete="false" onValueChanged="saveData" onAfterNew="saveData" onAfterDelete="saveData"> 
      <column label="title" name="title" type="String" xid="default1"/>  
      <column label="completed" name="completed" type="Boolean" xid="default2"/>  
      <column label="id" name="id" type="String" xid="default3"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="tempData"
      idColumn="status" autoLoad="true" autoNew="false"> 
      <column label="status" name="status" type="String" xid="default24"/>  
      <column label="completedCount" name="completedCount" type="Integer" xid="default26"/>  
      <column label="allCompleted" name="allCompleted" type="Boolean" xid="default25"/>  
      <rule xid="rule3"> 
        <col name="completedCount" xid="ruleCol6"> 
          <calculate xid="calculate6"> 
            <expr xid="default23">js: $model.todoData.count(function(p){return p.row.val('completed')})</expr> 
          </calculate> 
        </col>  
        <col name="allCompleted" xid="ruleCol5"> 
          <calculate xid="calculate5"> 
            <expr xid="default22"><![CDATA[js:($model.todoData.getCount()>0) && ($model.tempData.val('completedCount')==$model.todoData.getCount())]]></expr> 
          </calculate> 
        </col> 
      </rule>  
      <data xid="default4">[{"status":"All"}]</data> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="todos"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            icon="icon-chevron-left" xid="backBtn1" onClick="{operation:'window.close'}"> 
            <i class="icon-chevron-left" xid="i8"/>  
            <span xid="span8"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">todos</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
        xid="row1" style="padding: 0px;"> 
        <div xid="col1" style="padding: 15px 10px;" class="split-line"> 
          <span component="$UI/system/components/justep/button/checkbox" class="x-checkbox"
            xid="allCompletedCheckbox" bind-ref="tempData.ref('allCompleted')" onChange="allCompletedCheckboxChange"/> 
        </div>  
        <div class="x-col" xid="col2"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="titleInput" bind-keydown="titleInputKeydown"/> 
        </div>  
        <div xid="col3"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-sm btn-only-icon"
            label="" xid="addBtn" icon="icon-android-add" style="color:#008000;" onClick="addTodo"> 
            <i xid="i2" class="icon-android-add"/>  
            <span xid="span2"/> 
          </a> 
        </div> 
      </div>  
      <div component="$UI/system/components/justep/list/list" class="x-list"
        xid="list1" data="todoData" filter="js:$model.tempData.val('status')=='All' || ($model.tempData.val('status')=='Active' &amp;&amp; !$row.val('completed')) || ($model.tempData.val('status')=='Completed' &amp;&amp; $row.val('completed'))"> 
        <ul class="x-list-template" xid="listTemplateUl1"> 
          <li xid="li1"> 
            <div component="$UI/system/components/justep/row/row" class="x-row x-row-center top-line"
              xid="row2" style="padding: 0px"> 
              <div xid="col4" style="padding: 10px 10px;" class="split-line"> 
                <span component="$UI/system/components/justep/button/checkbox"
                  class="x-checkbox" xid="checkbox1" bind-ref="ref('completed')"/> 
              </div>  
              <div class="x-col" xid="col5"> 
                <div component="$UI/system/components/justep/output/output"
                  class="x-output" xid="output1" bind-ref="ref('title')" bind-css="{'title-completed': val('completed')}"/> 
              </div>  
              <div xid="col6"> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link btn-sm btn-only-icon" label="" xid="deleteBtn"
                  icon="icon-android-close" style="color:#FF0000;" onClick="deleteBtnClick"> 
                  <i xid="i4" class="icon-android-close"/>  
                  <span xid="span4"/> 
                </a> 
              </div> 
            </div> 
          </li> 
        </ul> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row x-row-center top-line"
        xid="row3" bind-visible="$model.todoData.getCount() &gt; 0" style="height:35px;background-color:#D0D0FF;"> 
        <div class="x-col" xid="col7" bind-text="($model.todoData.getCount() - tempData.val('completedCount')) + ' items left'"/>  
        <div xid="col8"> 
          <span component="$UI/system/components/justep/button/radio" class="x-radio x-radio-sm"
            xid="radio2" name="statusRadio" checkedValue="All" bind-ref="tempData.ref('status')"
            label="All"/>  
          <span component="$UI/system/components/justep/button/radio" class="x-radio x-radio-sm"
            xid="radio3" name="statusRadio" label="Active" checkedValue="Active" bind-ref="tempData.ref('status')"/>  
          <span component="$UI/system/components/justep/button/radio" class="x-radio x-radio-sm"
            xid="radio4" name="statusRadio" label="Completed" bind-ref="tempData.ref('status')"
            checkedValue="Completed"/> 
        </div>  
        <div class="x-col" xid="col9"> 
          <a component="$UI/system/components/justep/button/button" class="btn x-yellow btn-sm"
            label="" xid="clearCompletedBtn" bind-text="'Clear completed (' + $model.tempData.val('completedCount') + ')'"
            style="float:right;" bind-visible="$model.tempData.val('completedCount') &gt; 0"
            bind-click="clearCompletedBtnClick"> 
            <i xid="i1"/>  
            <span xid="span1"/> 
          </a> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
