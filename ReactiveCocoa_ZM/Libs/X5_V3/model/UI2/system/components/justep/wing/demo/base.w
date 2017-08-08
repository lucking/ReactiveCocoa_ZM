<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="root">  
  <div component="$UI/system/components/justep/model/model" xid="model1" style="height:auto;top:137px;left:30px;"> 
    <div component="$UI/system/components/justep/data/data" xid="displayValueData"
      idColumn="fName" autoLoad="true"> 
      <column name="fName" type="String" label="名称"/>  
      <rule xid="rule1"/>  
      <data><![CDATA[
      [{fName:'overlay'}, {fName:'reveal'}, {fName:'push'}]
      ]]></data> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="displayData" idColumn="fValue" onDataChange="displayDataDataChange" onValueChange="displayDataValueChange" autoLoad="true">
      <column name="fValue" type="String" label="名称"/>  
      <rule xid="rule1"/>  
      <data><![CDATA[
      [{fValue:'overlay'}]
      ]]></data> 
    </div>
  </div>  
  <div component="$UI/system/components/justep/wing/wing" class="x-wing" xid="wing1"
    animate="true" display="overlay" dismissible="true" swipeClose="true"> 
    <div class="x-wing-left" xid="wing#left" width="300" style="background:green;"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        label="hide" xid="button4" onClick="button4Click"> 
        <i xid="i4"/>  
        <span xid="span4">hide</span>
         
      </a>
    </div>  
    <div class="x-wing-content" xid="wing#content">
    	<div class="x-wing-backdrop"></div> 
      <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
        xid="panel1"> 
        <div class="x-panel-top" xid="panel#top1"> 
          <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
            xid="titleBar1" title="Welcome"> 
            <div class="x-titlebar-left" xid="div1"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-default"
                label="left" xid="button1" onClick="button1Click"> 
                <i xid="i1"/>  
                <span xid="span1">left</span> 
              </a> 
            </div>  
            <div class="x-titlebar-title" xid="div2">Welcome</div>  
            <div class="x-titlebar-right reverse" xid="div3"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-default"
                label="right" xid="button3" onClick="button3Click"> 
                <i xid="i3"/>  
                <span xid="span3">right</span> 
              </a> 
            </div> 
          </div> 
        </div>  
        <div class="x-panel-content" xid="panel#content1"> 
          <span component="$UI/system/components/justep/select/radioGroup" class="x-radio-group"
            xid="radioGroup1" bind-itemset="displayValueData" bind-itemsetLabel="ref('fName')"
            bind-itemsetValue="ref('fName')" bind-ref="displayData.ref('fValue')"/> 
        </div>  
        <div class="x-panel-bottom" xid="panel#bottom1"/> 
      </div> 
    </div>
    
      
    <div class="x-wing-right" xid="wing#right1" style="background:red;"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        label="hide" xid="button2" onClick="button2Click"> 
        <i xid="i2"/>  
        <span xid="span2">hide</span> 
      </a>
    </div> 
  </div> 
</div>
