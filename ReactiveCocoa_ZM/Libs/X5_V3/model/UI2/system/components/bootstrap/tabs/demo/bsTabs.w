<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:291px;top:239px;"></div>  
  <!-- Nav tabs -->  
  <div component="$UI/system/components/bootstrap/tabs/tabs" xid="tabs1"> 
    <ul class="nav nav-pills" xid="tabNav1" > 
      <li class="active" xid="li1"> 
        <a content="tabContent1222" xid="tabItem1">tab1</a>
      </li>
      <li role="presentation" xid="li2"> 
        <a content="tabContent2" xid="tabItem2">tab2</a>
      </li>  
      <li xid="li3"> 
        <a content="tabContent3" xid="tabItem3">tab1</a>
      </li>
    </ul>  
    <div class="tab-content" xid="div1" style="padding-top:5px;"> 
      <div class="tab-pane active" xid="tabContent1222"> 
        </div>
      <div class="tab-pane" xid="tabContent2">
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="button" xid="button2"> 
          <i xid="i2"/>  
          <span xid="span2"/>
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="button" xid="button3"> 
          <i xid="i3"/>  
          <span xid="span3"/>
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="button" xid="button4"> 
          <i xid="i4"/>  
          <span xid="span4"/>
        </a>
      </div>  
      <div class="tab-pane" xid="tabContent3"><table class="table table-bordered table-hover table-striped" component="$UI/system/components/bootstrap/table/table" xid="table1">
   <thead xid="thead1">
    <tr xid="tr1">
     <th xid="col1">#</th>
     <th xid="col2">Column heading</th>
     <th xid="col3">Column heading</th>
     <th xid="col4">Column heading</th></tr> </thead> 
   <tbody class="x-list-template" xid="listTemplateTbody1">
    <tr xid="tr2">
     <td xid="td1">1</td>
     <td xid="td2"></td>
     <td xid="td3"></td>
     <td xid="td4"></td></tr> </tbody> </table></div>
    </div> 
  </div>
</div>
