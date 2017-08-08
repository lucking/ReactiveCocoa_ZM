<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:143px;height:auto;left:348px;"> 
    <div component="$UI/system/components/justep/data/data" xid="tabsData"
      idColumn="xid"> 
      <column name="xid" type="String"/>  
      <column name="type" type="String"/>  
      <column name="fade" type="Boolean"/>  
      <column name="justified" type="Boolean"/>  
      <column name="stacked" type="Boolean"/>  
      <column name="activeTab" type="String"/>  
      <data><![CDATA[
      [{xid:'', type:'tab', fade:false, justified:false, stacked: false, activeTab:''}]
      ]]></data> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="tabData" idColumn="xid"> 
      <column name="xid" type="String"/>  
      <column name="label" type="String"/>  
      <column name="body" type="Boolean"/>  
      <data/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="booleanData"
      idColumn="name"> 
      <column name="name" type="String"/>  
      <column name="value" type="String"/>  
      <data><![CDATA[
      [{name:'true', value: 'true'}, {name:'false', value: 'false'}]
      ]]></data> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="typeData"
      idColumn="name"> 
      <column name="name" type="String"/>  
      <column name="value" type="String"/>  
      <data><![CDATA[
      [{name:'tab', value: 'tab'}, {name:'pill', value: 'pill'}]
      ]]></data> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1">
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="bsTabs组件"> 
        <div class="x-titlebar-left" xid="div4">
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button2" icon="icon-chevron-left" onClick="backBtn"> 
            <i xid="i2" class="icon-chevron-left"/>  
            <span xid="span2"/>
          </a>
        </div>  
        <div class="x-titlebar-title" xid="div6">bsTabs组件</div>  
        <div class="x-titlebar-right reverse" xid="div7"/>
      </div>
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div style="font-weight:bold;font-size:16px;color:#000000">bsTabs
  <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="源码" xid="button3" style="color:#000000" onClick="showBsTabsSource">
   <i xid="i3"></i>
   <span xid="span3">源码</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-link" label="js" xid="button4" style="color:#000000" onClick="showJsSource">
   <i xid="i4"></i>
   <span xid="span4">js</span></a></div>  
      <div component="$UI/system/components/bootstrap/tabs/tabs" xid="demoBsTabs"
        activeTab="li2"> 
        <ul class="nav nav-tabs" xid="ul1"> 
          <li xid="li1" onDeselect="li1Deselect" onSelect="li1Select" label="this is tab1"> 
            <a data-target="[xid='bsTabs1'] &gt; .tab-content &gt; .tab-pane:eq(0)"
              data-toggle="tab" xid="a1">this is tab1</a> 
          </li>  
          <li xid="li2" onDeselect="li2Deselect" onSelect="li2Select" class="active"> 
            <a data-target="[xid='bsTabs1'] &gt; .tab-content &gt; .tab-pane:eq(1)"
              data-toggle="tab" xid="bsTabs11"><![CDATA[tab2]]></a> 
          </li> 
        </ul>  
        <div class="tab-content" xid="div1"> 
          <div class="tab-pane" xid="div2"> 
            <input type="button" value="show tab2" xid="input_button1" bind-click="input_button1Click"/> 
          </div>  
          <div class="tab-pane active" xid="div3"> 
            <div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel"
              xid="bootstrap-panel1"> 
              <div class="panel-heading" xid="div3"> 
                <h3 xid="h33">动态创建Tabs组件</h3> 
              </div>  
              <div class="panel-body" xid="div5"> 
                <div component="$UI/system/components/justep/labelEdit/labelEdit"
                  class="x-label-edit" xid="labelInput1"> 
                  <label class="x-label" xid="xid"><![CDATA[唯一标识]]></label>  
                  <input component="$UI/system/components/justep/input/input"
                    class="form-control x-edit" xid="input1" data="tabsData" bind-ref="tabsData.ref('xid')"/> 
                </div>  
                <div component="$UI/system/components/justep/labelEdit/labelEdit"
                  class="x-label-edit" xid="labelSelect1"> 
                  <label class="x-label" xid="label1"><![CDATA[类型]]></label>  
                  <select component="$UI/system/components/justep/select/select"
                    class="form-control x-edit" xid="select1" bind-options="typeData"
                    bind-optionsLabel="name" bind-optionsValue="value" bind-ref="tabsData.ref('type')"/> 
                </div>  
                <div component="$UI/system/components/justep/labelEdit/labelEdit"
                  class="x-label-edit" xid="labelSelect2"> 
                  <label class="x-label" xid="label2"><![CDATA[是否自动适应]]></label>  
                  <select component="$UI/system/components/justep/select/select"
                    class="form-control x-edit" xid="select2" bind-ref="tabsData.ref('justified')"
                    bind-options="booleanData" bind-optionsLabel="name" bind-optionsValue="value"/> 
                </div>  
                <div component="$UI/system/components/justep/labelEdit/labelEdit"
                  class="x-label-edit" xid="labelSelect3"> 
                  <label class="x-label" xid="label3"><![CDATA[是否动画]]></label>  
                  <select component="$UI/system/components/justep/select/select"
                    class="form-control x-edit" xid="select3" bind-ref="tabsData.ref('fade')"
                    bind-options="booleanData" bind-optionsLabel="name" bind-optionsValue="value"/> 
                </div>  
                <div component="$UI/system/components/justep/labelEdit/labelEdit"
                  class="x-label-edit" xid="labelSelect4"> 
                  <label class="x-label" xid="label4"><![CDATA[是否堆叠]]></label>  
                  <select component="$UI/system/components/justep/select/select"
                    class="form-control x-edit" xid="select4" bind-ref="tabsData.ref('stacked')"
                    bind-options="booleanData" bind-optionsLabel="name" bind-optionsValue="value"/> 
                </div>  
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-default" label="创建Tabs组件" xid="button1"> 
                  <i xid="i1"/>  
                  <span xid="span1" bind-click="createTabs">创建Tabs组件</span> 
                </a>  
                <div xid="container"/> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"/> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/>
</div>
