<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:270px;top:238px;">
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="data1" idColumn="col0">
      <column label="col0" name="col0" type="String" xid="default1"/>  
      <column label="col1" name="col1" type="String" xid="default2"/>  
      <column label="col2" name="col2" type="String" xid="default3"/>  
      <data xid="default4">[{"col0":"11","col1":"111","col2":"111"},{"col0":"222","col1":"333","col2":"444"}]</data>
    </div>
  </div>  
  <a component="$UI/system/components/justep/button/button" class="btn btn-default"
    label="添加" xid="button2" icon="icon-android-add" style="width:88px;"> 
    <i xid="i2" class="icon-android-add"/>  
    <span xid="span2">添加</span> 
  </a>  
  <a component="$UI/system/components/justep/button/button" class="btn btn-danger"
    label="删除" xid="button4" icon="icon-android-remove"> 
    <i xid="i4" class="icon-android-remove"/>  
    <span xid="span4">删除</span> 
  </a>
  <div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu"
    xid="popMenu1"> 
    <div class="x-popMenu-overlay" xid="div1"/>  
    <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content"
      xid="menu1"/> 
  </div>  
  <div component="$UI/system/components/justep/list/list" class="x-list" xid="list1" data="data1"> 
<!--     <ul class="x-list-template" xid="listTemplateUl1">  -->
<!--       <li xid="li1"> -->
         <table class="table table-bordered table-hover table-striped" component="$UI/system/components/bootstrap/table/table"
          xid="table1"> 
          <thead xid="thead1"> 
            <tr xid="tr1"> 
              <th xid="col1">#</th>  
              <th xid="col2">Column heading</th>  
              <th xid="col3">Column heading</th>  
              <th xid="col4">Column heading</th>
            </tr> 
          </thead>  
          <tbody xid="tbody1" class="x-list-template"> 
            <tr xid="tr2"> 
              <td xid="td1" bind-text="ref('col2')">1</td>  
              <td xid="td2" bind-text="ref('col0')"/>  
              <td xid="td3" bind-text="ref('col2')"/>  
              <td xid="td4"/>
            </tr> 
          </tbody> 
        </table>
<!--       </li> -->
<!--     </ul>  -->
  </div>
 </div>
