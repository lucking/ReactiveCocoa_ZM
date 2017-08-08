<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window takeout" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:186px;top:74px;"
    onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="foodData" idColumn="fID" confirmDelete="true"> 
      <column label="fID" name="fID" type="String" xid="default1"/>  
      <column label="fName" name="fName" type="String" xid="default2"/>  
      <column label="fPrice" name="fPrice" type="Float" xid="default3"/>  
      <column label="fDescription" name="fDescription" type="String" xid="default4"/>  
      <column label="fImage" name="fImage" type="String" xid="default5"/>  
      <column label="calcPriceText" name="calcPriceText" type="String" xid="default23"/>  
      <column label="calcImageURL" name="calcImageURL" type="String" xid="default24"/>  
      <data xid="default36">[{"fID":"001","fName":"老北京炸酱面","fPrice":20,"fDescription":"苏格兰打卤面，大杯可乐","fImage":"1.jpg"},{"fID":"002","fName":"宫爆鸡丁","fPrice":25,"fDescription":"宫爆鸡丁一份，两碗米饭，蛋花汤","fImage":"2.jpg"},{"fID":"003","fName":"剁椒鱼头套餐","fPrice":36,"fDescription":"剁椒鱼头，白菜豆腐汤，四碗面条，可口凉菜","fImage":"3.jpg"},{"fID":"004","fName":"老北京烤鸭套餐","fPrice":45,"fDescription":"北京烤鸭，四碗米饭，大杯可乐四桶，鸡蛋汤","fImage":"4.jpg"},{"fID":"005","fName":"土豆炖牛肉套餐","fPrice":35,"fDescription":"土豆炖牛肉一份，米饭四碗，可口可乐，凉菜","fImage":"5.jpg"}]</data>  
      <rule xid="rule2"> 
        <col name="calcPriceText" xid="ruleCol2"> 
          <calculate xid="calculate2"> 
            <expr xid="default30">js:'¥ ' + val('fPrice') + '元'</expr> 
          </calculate> 
        </col>  
        <col name="calcImageURL" xid="ruleCol7"> 
          <calculate xid="calculate7"> 
            <expr xid="default35"><![CDATA[js:$model.transURL('./img/'+val('fImage'))]]></expr> 
          </calculate> 
        </col> 
      </rule> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="orderData" idColumn="fID" confirmRefresh="false" confirmDelete="false"> 
      <column label="col6" name="fID" type="String" xid="default21"/>  
      <column label="col0" name="fCreateTime" type="DateTime" xid="default15"/>  
      <column label="col1" name="fContent" type="String" xid="default16"/>  
      <column label="col2" name="fSum" type="Float" xid="default17"/>  
      <column label="col3" name="fUserID" type="String" xid="default18"/>  
      <column label="col7" name="fUserName" type="String" xid="default22"/>  
      <column label="col5" name="fPhoneNumber" type="String" xid="default20"/>  
      <column label="col4" name="fAddress" type="String" xid="default19"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="userData" idColumn="fID" autoNew="false"> 
      <column label="col3" name="fID" type="String" xid="default13"/>  
      <column label="col0" name="fName" type="String" xid="default10"/>  
      <column label="col1" name="fPhoneNumber" type="String" xid="default11"/>  
      <column label="col2" name="fAddress" type="String" xid="default12"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="cartData" idColumn="fFoodID"> 
      <column label="col4" name="fFoodID" type="String" xid="default41"/>  
      <column label="col0" name="fName" type="String" xid="default37"/>  
      <column label="col1" name="fPrice" type="Float" xid="default38"/>  
      <column label="col2" name="fCount" type="Integer" xid="default39"/>  
      <column label="col3" name="calcMoney" type="Float" xid="default40"/>  
      <rule xid="rule4"> 
        <col name="calcMoney" xid="ruleCol4"> 
          <calculate xid="calculate4"> 
            <expr xid="default27">js:val('fPrice') * val('fCount')</expr> 
          </calculate> 
        </col> 
      </rule> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="statusData" autoNew="true" idColumn="calcCanSaveOrder"> 
      <column label="col0" name="calcCartSumMoneyText" type="String" xid="default9"/>  
      <column label="col1" name="calcCartCountText" type="String" xid="default25"/>  
      <column label="col0" name="calcCanSaveOrder" type="String" xid="default33"/>  
      <column label="col1" name="calcCanClearCart" type="String" xid="default34"/>  
      <rule xid="rule3"> 
        <col name="calcCartSumMoneyText" xid="ruleCol1"> 
          <calculate xid="calculate1"> 
            <expr xid="default26">js:'¥ ' + $model.comp('cartData').sum('calcMoney') + '元'</expr> 
          </calculate> 
        </col>  
        <col name="calcCartCountText" xid="ruleCol3"> 
          <calculate xid="calculate3"> 
            <expr xid="default28">js:($model.comp('cartData').count() &gt; 0) ? '购物车(' + $model.comp('cartData').count() + ')' : '购物车'</expr> 
          </calculate> 
        </col>  
        <col name="calcCanSaveOrder" xid="ruleCol5"> 
          <calculate xid="calculate5"> 
            <expr xid="default31">js:$model.comp('cartData').sum("calcMoney") &gt; 0</expr> 
          </calculate> 
        </col>  
        <col name="calcCanClearCart" xid="ruleCol6"> 
          <calculate xid="calculate6"> 
            <expr xid="default32">js:$model.comp('cartData').count() &gt; 0</expr> 
          </calculate> 
        </col> 
      </rule> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/messageDialog/messageDialog"
    xid="messageDialog" style="left:44px;top:243px;"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="X5 外卖" style="background-color:#FFA000;"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            label="" xid="backBtn" icon="icon-chevron-left" onClick="{&quot;operation&quot;:&quot;window.close&quot;}"
            bind-visible="justep.Portal.getPortal()"> 
            <i xid="i11" class="icon-chevron-left"/>  
            <span xid="span18"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">X5 外卖</div>  
        <div class="x-titlebar-right reverse" xid="div3"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
        active="0" xid="contents" slidable="false" swipe="true"> 
        <div class="x-contents-content" xid="foodContent"> 
          <div component="$UI/system/components/justep/list/list" class="x-list"
            xid="foodList" data="foodData" style="margin:5px;"> 
            <ul class="x-list-template" xid="listTemplateUl1"> 
              <li xid="li1" class="x-flex takeout-list-row"> 
                <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
                  xid="row1"> 
                  <div xid="col1" style="width:120px;"> 
                    <img data-bind="attr:{src:val('calcImageURL')}" alt=""
                      xid="image1" style="border-radius:10px;width:100%;height:80px;"/> 
                  </div>  
                  <div class="x-col" xid="col3"> 
                    <div component="$UI/system/components/justep/row/row" class="x-row"
                      xid="row2"> 
                      <div class="x-col" xid="col5"> 
                        <div component="$UI/system/components/justep/output/output"
                          class="x-output" xid="output1" bind-ref="ref('fName')" style="font-weight:bold;font-size:large;"/> 
                      </div> 
                    </div>  
                    <div component="$UI/system/components/justep/row/row" class="x-row"
                      xid="row3"> 
                      <div class="x-col" xid="col9"> 
                        <div component="$UI/system/components/justep/output/output"
                          class="x-output" xid="output2" bind-ref="ref('fDescription')"
                          style="margin-top: 3px;"/> 
                      </div> 
                    </div>  
                    <div component="$UI/system/components/justep/row/row" class="x-row"
                      xid="row4"> 
                      <div class="x-col" xid="col11"> 
                        <div component="$UI/system/components/justep/output/output"
                          class="x-output" xid="output3" style="color:#FF0000;font-weight:bold;margin-left:5px;"
                          bind-ref="ref('calcPriceText')"/> 
                      </div>  
                      <div xid="col12"> 
                        <a component="$UI/system/components/justep/button/button"
                          class="btn x-green btn-sm" label="加入购物车" xid="addCartBtn"
                          onClick="addCartBtnClick"> 
                          <i xid="i1"/>  
                          <span xid="span2">加入购物车</span> 
                        </a> 
                      </div> 
                    </div> 
                  </div> 
                </div> 
              </li> 
            </ul> 
          </div> 
        </div>  
        <div class="x-contents-content" xid="cartContent"> 
          <div component="$UI/system/components/justep/list/list" class="x-list"
            xid="list1" data="cartData" style="margin: 5px;"> 
            <ul class="x-list-template" xid="listTemplateUl2"> 
              <li xid="li2" class="takeout-list-row"> 
                <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
                  xid="row5"> 
                  <div class="x-col" xid="col2"> 
                    <div component="$UI/system/components/justep/output/output"
                      class="x-output" xid="output4" bind-ref="ref('fName')" style="font-weight:bold;"/> 
                  </div>  
                  <div xid="col4"> 
                    <span xid="span5"><![CDATA[单价：]]></span> 
                  </div>  
                  <div xid="col17" class="x-col x-col-10"> 
                    <div component="$UI/system/components/justep/output/output"
                      class="x-output" xid="output11" bind-ref="ref('fPrice')"/> 
                  </div>  
                  <div xid="col6"> 
                    <span xid="span10"><![CDATA[份数：]]></span> 
                  </div>  
                  <div xid="col7" style="text-align:center;"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn x-green btn-xs btn-only-icon" label="button" xid="reduceCountBtn"
                      icon="icon-android-remove" onClick="reduceCountBtnClick"> 
                      <i xid="i3" class="icon-android-remove"/>  
                      <span xid="span3"/> 
                    </a> 
                  </div>  
                  <div xid="col8"> 
                    <div component="$UI/system/components/justep/output/output"
                      class="x-output" xid="output5" bind-ref="ref('fCount')" style="text-align:center;margin-right:10px;margin-left:10px;"/> 
                  </div>  
                  <div xid="col10"> 
                    <a component="$UI/system/components/justep/button/button"
                      class="btn x-green btn-xs btn-only-icon" label="button" xid="addCountBtn"
                      icon="icon-android-add" onClick="addCountBtnClick"> 
                      <i xid="i4" class="icon-android-add"/>  
                      <span xid="span4"/> 
                    </a> 
                  </div> 
                </div> 
              </li> 
            </ul> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row"
            xid="row6" style="color:#FF0000;"> 
            <div class="x-col" xid="col14"/>  
            <div xid="col15"> 
              <span xid="span11" style="font-weight:bold;"><![CDATA[合计：]]></span> 
            </div>  
            <div xid="col16"> 
              <div component="$UI/system/components/justep/output/output" class="x-output"
                xid="output6" style="margin-right:10px;margin-left:10px;font-weight:bold;"
                bind-ref="statusData.ref('calcCartSumMoneyText')"/> 
            </div> 
          </div>  
          <div xid="div5" style="margin:10px;padding:10px;border:solid 1px #E0E0E0;background-color:#E0E0FF;"> 
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit" xid="labelInput1"> 
              <label class="x-label" xid="label1" style="width:50px;">姓名*</label>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input1" bind-ref="userData.ref('fName')"/> 
            </div>  
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit" xid="labelInput2"> 
              <label class="x-label" xid="label2" style="width:50px;">电话*</label>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input2" bind-ref="userData.ref('fPhoneNumber')"/> 
            </div>  
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit" xid="labelInput3"> 
              <label class="x-label" xid="label3" style="width:50px;">地址*</label>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input3" bind-ref="userData.ref('fAddress')"/> 
            </div> 
          </div>  
          <div xid="div4" style="height:40px; padding-top: 5px;"> 
            <a component="$UI/system/components/justep/button/button" class="btn x-orange btn-sm"
              label="下单" xid="saveOrderBtn" onClick="saveOrderBtnClick" bind-enable="statusData.ref('calcCanSaveOrder')"
              style="float: right; margin-right:10px;width:100px;"> 
              <i xid="i9"/>  
              <span xid="span12">下单</span> 
            </a>  
            <a component="$UI/system/components/justep/button/button" class="btn x-green btn-sm"
              label="清空购物车" xid="cleanCartBtn" onClick="cleanCartBtnClick" style="float: right; margin-right:10px;width:100px;"
              bind-enable="statusData.ref('calcCanClearCart')"> 
              <i xid="i10"/>  
              <span xid="span13">清空购物车</span> 
            </a> 
          </div> 
        </div>  
        <div class="x-contents-content" xid="orderContent"> 
          <span xid="span19" style="margin-left: 5px; color: red;" bind-visible="$model.comp('orderData').count() == 0"><![CDATA[没有新订单！]]></span>  
          <div component="$UI/system/components/justep/list/list" class="x-list"
            xid="list2" data="orderData" style="margin: 5px;"> 
            <ul class="x-list-template" xid="listTemplateUl3"> 
              <li xid="li3" class="takeout-list-row"> 
                <div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row7"> 
                  <div xid="col13"> 
                    <span xid="span14" style="font-weight:bold;"><![CDATA[订餐时间：]]></span> 
                  </div>  
                  <div class="x-col" xid="col18"> 
                    <div component="$UI/system/components/justep/output/output"
                      class="x-output" xid="output7" bind-ref="ref('fCreateTime')"/> 
                  </div> 
                </div>  
                <div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row8"> 
                  <div xid="col20"> 
                    <span xid="span15" style="margin-left:5px;color:#FF8040;"><![CDATA[订餐内容：]]></span> 
                  </div>  
                  <div class="x-col" xid="col21"> 
                    <div component="$UI/system/components/justep/output/output"
                      class="x-output" xid="output8" bind-ref="ref('fContent')"/> 
                  </div> 
                </div>  
                <div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row9"> 
                  <div xid="col23"> 
                    <span xid="span16" style="margin-left:5px;color:#FF8040;"><![CDATA[配送信息：]]></span> 
                  </div>  
                  <div class="x-col" xid="col24"> 
                    <div component="$UI/system/components/justep/output/output"
                      class="x-output" xid="output9" bind-text="val('fUserName') + '，' + val('fPhoneNumber') + '，' + val('fAddress')"/> 
                  </div> 
                </div>  
                <div component="$UI/system/components/justep/row/row" class="x-row"
                  xid="row10"> 
                  <div xid="col26" style="margin-left:5px;color:#FF8040;"> 
                    <span xid="span17"><![CDATA[合计金额：]]></span> 
                  </div>  
                  <div class="x-col" xid="col27"> 
                    <div component="$UI/system/components/justep/output/output"
                      class="x-output" xid="output10" bind-text="'¥ ' + val('fSum') + '元'"
                      style="color:#FF0000;font-weight:bold;"/> 
                  </div> 
                </div> 
              </li> 
            </ul> 
          </div> 
        </div>  
        <div class="x-contents-content" xid="ownContent"> 
          <div xid="photoDiv" style="height:128px;width:128px;margin:5px auto;">
            <img src="about:blank" alt="" xid="photoImage" height="100%" style="width:100%;"/>
          </div>
          <div xid="div6" style="margin:10px;padding:10px;border:solid 1px #E0E0E0;background-color:#E0E0FF;"> 
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit" xid="labelInput9"> 
              <label class="x-label" xid="label4" style="width:50px;">姓名*</label>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input9" bind-ref="userData.ref('fName')"/> 
            </div>  
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit" xid="labelInput8"> 
              <label class="x-label" xid="label5" style="width:50px;">电话*</label>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input8" bind-ref="userData.ref('fPhoneNumber')"/> 
            </div>  
            <div component="$UI/system/components/justep/labelEdit/labelEdit"
              class="x-label-edit" xid="labelInput7"> 
              <label class="x-label" xid="label6" style="width:50px;">地址*</label>  
              <input component="$UI/system/components/justep/input/input" class="form-control x-edit"
                xid="input7" bind-ref="userData.ref('fAddress')"/> 
            </div> 
          </div>  
          <div xid="div7" style="text-align:right;padding-right:10px;"> 
            <a component="$UI/system/components/justep/button/button" class="btn x-orange btn-sm"
              label="修改用户信息" xid="saveUserBtn" onClick="saveUserBtnClick"> 
              <i xid="i2"/>  
              <span xid="span1">修改用户信息</span> 
            </a> 
          </div>  
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group btn-group-justified"
        tabbed="true" xid="buttonGroup1" selected="foodBtn"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top"
          label="菜单" xid="foodBtn" icon="icon-beer" target="foodContent"> 
          <i xid="i5" class="icon-beer"/>  
          <span xid="span6">菜单</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top"
          xid="cartBtn" icon="icon-ios7-cart" target="cartContent" label="购物车" bind-style="{'color': $model.comp('cartData').count() &gt; 0 ? 'yellow' : ''}"> 
          <i xid="i6" class="icon-ios7-cart"/>  
          <span xid="span7" bind-text="statusData.ref('calcCartCountText')">购物车</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top"
          label="订单" xid="orderBtn" icon="icon-android-note" target="orderContent"> 
          <i xid="i7" class="icon-android-note"/>  
          <span xid="span8">订单</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top"
          label="我的" xid="ownBtn" icon="icon-android-contact" target="ownContent"> 
          <i xid="i8" class="icon-android-contact"/>  
          <span xid="span9">我的</span> 
        </a> 
      </div> 
    </div> 
  </div> 
</div>
