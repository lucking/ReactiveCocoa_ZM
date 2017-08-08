<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:545px;top:578px;"> 
    <div component="$UI/system/components/justep/data/bizData" xid="orderData"
      concept="DEMO_Order" limit="1" autoNew="true"> 
      <reader xid="default1" action="/demo/misc/logic/action/queryOrderForSocialAction"/>  
      <writer xid="default2" action="/demo/misc/logic/action/saveOrderAction"/>  
      <creator xid="default3" action="/demo/misc/logic/action/createOrderAction"/> 
    </div>  
    <div component="$UI/system/components/justep/data/bizData" xid="orderDetailData"
      concept="DEMO_OrderDetail" autoLoad="true"> 
      <reader xid="default4" action="/demo/misc/logic/action/queryOrder_DAction"/>  
      <writer xid="default5" action="/demo/misc/logic/action/saveOrder_DAction"/>  
      <creator xid="default6" action="/demo/misc/logic/action/createOrder_DAction"/>  
      <master xid="default7" data="orderData" relation="fOrderID"/> 
    </div> 
  </div>  
  <div xid="view"> 
    <nav class="navbar navbar-default" component="$UI/system/components/bootstrap/navbar/navbar"
      xid="navbar"> 
      <div class="container-fluid" xid="div1"> 
        <div class="navbar-header" xid="div2"/>  
        <div class="collapse navbar-collapse" xid="div3"> 
          <ul class="nav navbar-nav"> 
            <li> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                xid="saveBtn" onClick="{operation:'orderData.save'}"> 
                <i xid="i1"/>  
                <span xid="span1"/> 
              </a> 
            </li>  
            <li> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                xid="advanceBtn" onClick="{operation:'process.advance'}"> 
                <i xid="i2"/>  
                <span xid="span2">流转</span> 
              </a> 
            </li>  
            <li> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                xid="suspendBtn" onClick="{operation:'process.suspend'}"> 
                <i xid="i3"/>  
                <span xid="span3"/> 
              </a> 
            </li>  
            <li> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                xid="abortBtn" onClick="{operation:'process.abort'}"> 
                <i xid="i4"/>  
                <span xid="span4"/> 
              </a> 
            </li>  
            <li> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-link"
                xid="chartBtn" onClick="{operation:'process.showChart'}"> 
                <i xid="i5"/>  
                <span xid="span5"/> 
              </a> 
            </li> 
          </ul> 
        </div> 
      </div> 
    </nav>  
    <div xid="content"> 
      <h1 xid="h11" style="text-align:center;"><![CDATA[阳光集团销售审批单]]></h1>  
      <div class="form-horizontal" component="$UI/system/components/bootstrap/form/form"
        style="margin:30px 10px"> 
        <div class="form-group" xid="formGroup1">
   <div class="col-sm-2" xid="formGroupCol1" style="background-color:#99CCFF;"><label class="control-label" xid="controlLabel6">label</label></div>
   <div class="col-sm-10" xid="formGroupCol2"><input component="$UI/system/components/justep/input/input" class="form-control" xid="input1"></input></div>
   </div>
  <div class="form-group" xid="formGroup2">
   <div class="col-sm-2" xid="formGroupCol5" style="background-color:#99CCFF;"><label class="control-label" xid="controlLabel7">label</label></div>
   <div class="col-sm-4" xid="formGroupCol6"><input component="$UI/system/components/justep/input/input" class="form-control" xid="input2"></input></div>
   <div class="col-sm-2" xid="formGroupCol7" style="background-color:#99CCFF;"><label class="control-label" xid="controlLabel2">label</label></div>
   <div class="col-sm-4" xid="formGroupCol8"><input component="$UI/system/components/justep/input/input" class="form-control" xid="input10"></input></div></div>
  <div class="form-group" xid="formGroup3">
   <div class="col-sm-2" xid="formGroupCol9" style="background-color:#99CCFF;"><label class="control-label" xid="controlLabel8">label</label></div>
   <div class="col-sm-4" xid="formGroupCol10"><input component="$UI/system/components/justep/input/input" class="form-control" xid="input3"></input></div>
   <div class="col-sm-2" xid="formGroupCol11" style="background-color:#99CCFF;"><label class="control-label" xid="controlLabel3">label</label></div>
   <div class="col-sm-4" xid="formGroupCol12"><input component="$UI/system/components/justep/input/input" class="form-control" xid="input9"></input></div>
  </div>
  <div class="form-group" xid="formGroup4">
   <div class="col-sm-2" xid="formGroupCol13" style="background-color:#99CCFF;"><label class="control-label" xid="controlLabel9">label</label></div>
   <div class="col-sm-4" xid="formGroupCol14"><input component="$UI/system/components/justep/input/input" class="form-control" xid="input4"></input></div>
   <div class="col-sm-2" xid="formGroupCol15" style="background-color:#99CCFF;"><label class="control-label" xid="controlLabel4" style="background-color:#99CCFF;">label</label></div>
   <div class="col-sm-4" xid="formGroupCol16"><input component="$UI/system/components/justep/input/input" class="form-control" xid="input8"></input></div></div>
  <div class="form-group" xid="formGroup5">
   <div class="col-sm-2" xid="formGroupCol17" style="background-color:#99CCFF;"><label class="control-label" xid="controlLabel10">label</label></div>
   <div class="col-sm-10" xid="formGroupCol21"><input component="$UI/system/components/justep/input/input" class="form-control" xid="input5"></input></div></div>
  <div class="form-group" xid="formGroup6">
   <div class="col-sm-2" xid="formGroupCol18" style="background-color:#99CCFF;"><label class="control-label" xid="controlLabel11">label</label></div>
   <div class="col-sm-4" xid="formGroupCol19"><input component="$UI/system/components/justep/input/input" class="form-control" xid="input6"></input></div>
   <div class="col-sm-2" xid="formGroupCol20" style="background-color:#99CCFF;"><label class="control-label" xid="controlLabel5">label</label></div>
   <div class="col-sm-4" xid="formGroupCol22"><input component="$UI/system/components/justep/input/input" class="form-control" xid="input7"></input></div>
  </div>
  <div class="form-group" xid="formGroup7">
   <div class="col-sm-2" xid="formGroupCol3"><label class="control-label" xid="controlLabel1">label</label></div>
   <div class="col-sm-4" xid="formGroupCol4"></div>
   <div class="col-sm-2" xid="formGroupCol23"><label class="control-label" xid="controlLabel12">label</label>
  </div>
   <div class="col-sm-4" xid="formGroupCol24"></div></div>
  <div class="form-group" xid="formGroup8">
   <div class="col-sm-2" xid="col1"></div>
   <div class="col-sm-4" xid="col2"></div>
   <div class="col-sm-2" xid="col3"></div>
   <div class="col-sm-4" xid="col4"></div>
  </div>
  <div class="form-group" xid="formGroup9">
   <div class="col-sm-2" xid="col5"></div>
   <div class="col-sm-4" xid="col6"></div>
   <div class="col-sm-2" xid="col7"></div>
   <div class="col-sm-4" xid="col8"></div></div></div>  
      <!--  
      <div component="$UI/system/components/bootstrap/row/row" class="row form-horizontal"
        xid="row"> 
        <div class="col col-xs-2" xid="col1"> 
          <label class="control-label">订单编号</label> 
        </div>  
        <div class="col col-xs-4" xid="col2"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="input3"/> 
        </div>  
        <div class="col col-xs-2" xid="col3"> 
          <label class="control-label">订购日期</label> 
        </div>  
        <div class="col col-xs-4" xid="col4"> 
          <input component="$UI/system/components/justep/input/input" class="form-control"
            xid="input2"/> 
        </div> 
      </div>  
      <div component="$UI/system/components/bootstrap/row/row" class="row form-horizontal"
        xid="row"> 
        <div class="col col-xs-6" xid="col1"> 
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20" xid="labelInput1"> 
            <label class="x-label" xid="label2">订单</label>  
            <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
              xid="input4"/>
          </div>
        </div>  
        <div class="col col-xs-6" xid="col2"> 
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20" xid="labelInput2"> 
            <label class="x-label" xid="label3">订单</label>  
            <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
              xid="input5"/>
          </div>
        </div> 
      </div> 
      <div component="$UI/system/components/bootstrap/row/row" class="row form-horizontal"
        xid="row"> 
        <div class="col col-xs-6" xid="col1"> 
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20" xid="labelInput1"> 
            <label class="x-label" xid="label2">订单</label>  
            <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
              xid="input4"/>
          </div>
        </div>  
        <div class="col col-xs-6" xid="col2"> 
          <div component="$UI/system/components/justep/labelEdit/labelEdit"
            class="x-label-edit x-label20" xid="labelInput2"> 
            <label class="x-label" xid="label3">订单</label>  
            <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
              xid="input5"/>
          </div>
        </div> 
      </div>
      --> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/process/process" xid="process"
    data="orderData" style="height:24px;width:24px;left:9px;top:36px;"/> 
</div>
