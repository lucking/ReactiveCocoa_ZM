<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:153px;top:149px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="tempData" autoNew="true" idColumn="foodCount"> 
      <column label="菜品总数" name="foodCount" type="String" xid="default19"/>  
      <column label="启用的菜品数" name="enabledFoodCount" type="String" xid="default20"/>  
      <column label="菜品数据集是否只读" name="foodDataReadonly" type="Boolean" xid="default21"/>  
      <rule xid="rule1"> 
        <col name="foodCount" xid="ruleCol1"> 
          <calculate xid="calculate1"> 
            <expr xid="default17">js:$model.comp('foodData').count()</expr> 
          </calculate> 
        </col>  
        <col name="enabledFoodCount" xid="ruleCol2"> 
          <calculate xid="calculate2"> 
            <expr xid="default18">js:$model.comp('foodData').count(function(e){return e.row.val('fStatus') == 1;})</expr> 
          </calculate> 
        </col> 
      </rule> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="foodData" idColumn="fID" confirmDelete="true"> 
      <column label="fID" name="fID" type="String" xid="default1"/>  
      <column label="名称" name="fName" type="String" xid="default2"/>  
      <column label="价格" name="fPrice" type="Float" xid="default3"/>  
      <column label="描述" name="fDescription" type="String" xid="default4"/>  
      <column label="图片" name="fImage" type="String" xid="default5"/>  
      <column label="日期" name="fDate" type="Date" xid="default8"/>  
      <column label="状态" name="fStatus" type="String" xid="default9"/>  
      <column label="价格" name="calcPriceText" type="String" xid="default6"/>  
      <column label="状态" name="calcStatusText" type="String" xid="default10"/>  
      <data xid="default11">[{"fID":"001","fName":"老北京炸酱面","fPrice":20,"fDescription":"苏格兰打卤面，大杯可乐","fImage":"1.jpg","fStatus":"1"},{"fID":"002","fName":"宫爆鸡丁","fPrice":25,"fDescription":"宫爆鸡丁一份，两碗米饭，蛋花汤","fImage":"2.jpg","fStatus":"0"},{"fID":"003","fName":"剁椒鱼头套餐","fPrice":36,"fDescription":"剁椒鱼头，白菜豆腐汤，四碗面条，可口凉菜","fImage":"3.jpg","fStatus":"1"},{"fID":"004","fName":"老北京烤鸭套餐","fPrice":45,"fDescription":"北京烤鸭，四碗米饭，大杯可乐四桶，鸡蛋汤","fImage":"4.jpg","fStatus":"0"},{"fID":"005","fName":"土豆炖牛肉套餐","fPrice":35,"fDescription":"土豆炖牛肉一份，米饭四碗，可口可乐，凉菜","fImage":"5.jpg","fStatus":"1"}]</data>  
      <rule xid="rule19"> 
        <readonly xid="readonly35"> 
          <expr xid="default149">js: $model.tempData.val('foodDataReadonly')</expr> 
        </readonly>  
        <col name="fPrice" xid="ruleCol69"> 
          <required xid="required14"> 
            <expr xid="default150">js:true</expr>  
            <message xid="default151">价格是必填的</message> 
          </required> 
        </col>  
        <col name="fDate" xid="ruleCol70"> 
          <readonly xid="readonly36"> 
            <expr xid="default152">js: $row.val("fPrice") &gt;30</expr> 
          </readonly>  
          <constraint xid="constraint18"> 
            <expr xid="default153"><![CDATA[js:!$val || $val  <  '2020-01-01']]></expr>  
            <message xid="default154">日期不能大于2020年</message> 
          </constraint> 
        </col>  
        <col name="calcPriceText" xid="ruleCol71"> 
          <calculate xid="calculate39"> 
            <expr xid="default155">js: $row.val('fPrice') ? '¥ ' + $row.val('fPrice') + '元' : ''</expr> 
          </calculate> 
        </col>  
        <col name="calcStatusText" xid="ruleCol72"> 
          <calculate xid="calculate40"> 
            <expr xid="default156">js: val('fStatus') == 1 ? '启用' : '禁用'</expr> 
          </calculate> 
        </col> 
      </rule> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="statusData" idColumn="code"> 
      <column label="code" name="code" type="String" xid="default12"/>  
      <column label="name" name="name" type="String" xid="default13"/>  
      <data xid="default14">[{"code":"1","name":"启用"},{"code":"0","name":"禁用"}]</data> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1"
    style="height:auto;"> 
    <div class="x-col" xid="col1"> 
      <div component="$UI/system/components/justep/list/list" class="x-list"
        xid="list1" data="foodData"> 
        <ul class="x-list-template" xid="listTemplateUl1"> 
          <li xid="li1" bind-css="{'bg-info':$index() %2 == 1 &amp;&amp; val('fID')!=data.val('fID'), 'bg-primary':val('fID')==data.val('fID')}"> 
            <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
              xid="row3"> 
              <div class="x-col" xid="col7"> 
                <input component="$UI/system/components/justep/input/input" class="form-control"
                  xid="input5" bind-ref="ref('fName')"/> 
              </div>  
              <div xid="col8" style="width:80px;" class="x-col x-col-fixed"> 
                <input component="$UI/system/components/justep/input/input" class="form-control"
                  xid="input6" bind-ref="ref('fPrice')"/> 
              </div>  
              <div xid="col14" class="x-col x-col-fixed" style="width:100px;"> 
                <input component="$UI/system/components/justep/input/input" class="form-control"
                  xid="input13" bind-ref="ref('calcPriceText')"/> 
              </div>  
              <div xid="col5" class="x-col x-col-fixed" style="width:80px;"> 
                <input component="$UI/system/components/justep/input/input" class="form-control"
                  xid="input1" bind-ref="ref('fStatus')"/> 
              </div>  
              <div xid="col25" class="x-col x-col-fixed" style="width:80px;"> 
                <input component="$UI/system/components/justep/input/input" class="form-control"
                  xid="input3" bind-ref="ref('calcStatusText')"/> 
              </div>  
              <div class="x-col x-col-fixed" xid="col19" style="width:auto;"> 
                <a component="$UI/system/components/justep/button/button"
                  class="btn btn-link btn-sm btn-only-icon " label="button" xid="deleteBtn"
                  icon="icon-android-remove" style="width:30px;" onClick="deleteBtnClick"> 
                  <i xid="i1" class="icon-android-remove text-danger"/>  
                  <span xid="span4"/> 
                </a> 
              </div> 
            </div> 
          </li> 
        </ul> 
      </div>  
      <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
        xid="row9"> 
        <div class="x-col" xid="col20"> 
          <span xid="span9"><![CDATA[菜品总数：]]></span> 
        </div>  
        <div class="x-col" xid="col21"> 
          <label xid="label3" bind-text="tempData.ref('foodCount')">label</label> 
        </div>  
        <div class="x-col" xid="col22"> 
          <span xid="span11"><![CDATA[启用菜品数：]]></span> 
        </div>  
        <div class="x-col" xid="col26"> 
          <label xid="label2" bind-text="tempData.ref('enabledFoodCount')">label</label> 
        </div>  
        <div class="x-col x-col-fixed" xid="col28" style="width:65px;"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="编辑" xid="editBtn" bind-text="tempData.val('foodDataReadonly') ? '编辑' : '只读'"
            onClick="editBtnClick"> 
            <i xid="i2"/>  
            <span xid="span12">编辑</span> 
          </a> 
        </div> 
      </div> 
    </div>  
    <div class="x-col" xid="col2"> 
      <div class="panel panel-default" style="height:auto;" xid="div3"> 
        <div class="panel-heading" bind-click="panelTopClick" style="padding: 5px;"
          xid="div4"> 
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row22" style="padding: 0px;"> 
            <div class="x-col" xid="col43"> 
              <h4 xid="h44">bind-ref、bind-labelRef</h4> 
            </div>  
            <div xid="col44"> 
              <label xid="label15">点击标题显示或隐藏</label> 
            </div> 
          </div> 
        </div>  
        <div class="panel-body" style="padding: 0px;height:auto;" xid="div5"> 
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row24"> 
            <div xid="col48" style="width:120px;"> 
              <span xid="span23"><![CDATA[绑定数值字段]]></span> 
            </div>  
            <div class="x-col" xid="col47"> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                xid="input12" bind-ref="foodData.ref('fPrice')"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row25"> 
            <div xid="col49" style="width:120px;"> 
              <span xid="span24"><![CDATA[绑定日期字段]]></span> 
            </div>  
            <div class="x-col" xid="col50"> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                xid="input16" bind-ref="foodData.ref('fDate')"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row11"> 
            <div xid="col24" style="width:120px;"> 
              <span xid="span1"><![CDATA[bind-labelRef]]></span> 
            </div>  
            <div class="x-col" xid="col23"> 
              <select component="$UI/system/components/justep/select/select" class="form-control"
                xid="select1" bind-ref="foodData.ref('fStatus')" bind-labelRef="foodData.ref('calcStatusText')"
                bind-options="statusData" bind-optionsLabel="name" bind-optionsValue="code"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row26"> 
            <div xid="col51" style="width:120px;"> 
              <span xid="span25">计算规则感知</span> 
            </div>  
            <div class="x-col" xid="col52"> 
              <input component="$UI/system/components/justep/input/input" class="form-control"
                xid="input17" bind-ref="foodData.ref('calcPriceText')"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row27"> 
            <div xid="col56"> 
              <span xid="span29"><![CDATA[只读规则感知：数值大于30则日期只读]]></span> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row"
            xid="row29"> 
            <div xid="col55"> 
              <span xid="span27">约束规则感知：日期不能大于2020年</span> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row"
            xid="row28"> 
            <div xid="col54"> 
              <span xid="span28">必填规则感知：价格不能为空</span> 
            </div> 
          </div> 
        </div> 
      </div>  
      <div class="panel panel-default" style="height:auto;" xid="div8"> 
        <div class="panel-heading" bind-click="panelTopClick" style="padding: 5px;"
          xid="div7"> 
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row15" style="padding: 0px;"> 
            <div class="x-col" xid="col29"> 
              <h4 xid="h43"><![CDATA[bind-value、bind-checked、bind-text]]></h4> 
            </div>  
            <div xid="col27"> 
              <label xid="label1">点击标题显示或隐藏</label> 
            </div> 
          </div> 
        </div>  
        <div class="panel-body" style="padding: 0px;height:auto;" xid="div6"> 
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row2"> 
            <div xid="col3" style="width:120px;"> 
              <span xid="span5">bind-value（ref）</span> 
            </div>  
            <div class="x-col" xid="col4"> 
              <input type="text" value="" xid="input10" bind-value="foodData.ref('fPrice')"
                style="width:100%;"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row4"> 
            <div xid="col9" style="width:120px;"> 
              <span xid="span6">bind-value（val）</span> 
            </div>  
            <div class="x-col" xid="col6"> 
              <input type="text" value="" xid="input11" bind-value="foodData.val('fPrice')"
                style="width:100%;"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row5"> 
            <div xid="col11" style="width:120px;"> 
              <span xid="span7">bind-text</span> 
            </div>  
            <div class="x-col" xid="col10"> 
              <span xid="span8" bind-text="foodData.ref('fPrice')"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row6"> 
            <div xid="col13" style="width:120px;"> 
              <span xid="span10">bind-checked</span> 
            </div>  
            <div class="x-col" xid="col12"> 
              <input type="radio" value="1" name="price" xid="radio1" bind-checked="foodData.ref('fStatus')"/>  
              <label xid="label10" for="{xid:radio1}">启用</label>  
              <input type="radio" value="0" name="price" xid="radio2" bind-checked="foodData.ref('fStatus')"/>  
              <label xid="label11" for="{xid:radio2}">禁用</label> 
            </div> 
          </div> 
        </div> 
      </div>  
      <div class="panel panel-default" style="height:auto;" xid="div1"> 
        <div class="panel-heading" bind-click="panelTopClick" style="padding: 5px;"
          xid="div9"> 
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row17" style="padding: 0px;"> 
            <div class="x-col" xid="col32"> 
              <h4 xid="h41"><![CDATA[bind-visible、bind-hasFocus、bind-enabled、bind-disabled]]></h4> 
            </div>  
            <div xid="col31"> 
              <label xid="label4">点击标题显示或隐藏</label> 
            </div> 
          </div> 
        </div>  
        <div class="panel-body" style="padding: 0px;height:auto;" xid="div10"> 
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row19"> 
            <div xid="col41" style="width:150px;"> 
              <span xid="span19">bind-visible（&gt;30）</span> 
            </div>  
            <div class="x-col" xid="col45"> 
              <input type="text" value="" xid="input8" bind-value="foodData.ref('fPrice')"
                style="width:100%;" bind-visible="foodData.val('fPrice') &gt; 30"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row20"> 
            <div xid="col40" style="width:150px;"> 
              <span xid="span21">bind-hasFocus（&gt;50）</span> 
            </div>  
            <div class="x-col" xid="col42"> 
              <input type="text" value="" xid="input9" bind-value="foodData.val('fPrice')"
                style="width:100%;" bind-hasFocus="foodData.val('fPrice') &gt; 50"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row18"> 
            <div xid="col38" style="width:150px;"> 
              <span xid="span20"><![CDATA[bind-enabled（状态）]]></span> 
            </div>  
            <div class="x-col" xid="col39"> 
              <input type="text" value="" xid="input14" bind-value="foodData.val('fPrice')"
                style="width:100%;" bind-enable="foodData.val('fStatus') == 1"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row23"> 
            <div xid="col58" style="width:150px;"> 
              <span xid="span22"><![CDATA[bind-disabled（状态）]]></span> 
            </div>  
            <div class="x-col" xid="col57"> 
              <input type="text" value="" xid="input15" bind-value="foodData.val('fPrice')"
                style="width:100%;" bind-disable="foodData.val('fStatus') != 1"/> 
            </div> 
          </div> 
        </div> 
      </div>  
      <div class="panel panel-default" style="height:auto;" xid="div12"> 
        <div class="panel-heading" bind-click="panelTopClick" style="padding: 5px;"
          xid="div11"> 
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row31" style="padding: 0px;"> 
            <div class="x-col" xid="col64"> 
              <h4 xid="h42"><![CDATA[bind-style、bind-css]]></h4> 
            </div>  
            <div xid="col63"> 
              <label xid="label7">点击标题显示或隐藏</label> 
            </div> 
          </div> 
        </div>  
        <div class="panel-body" style="padding: 0px;height:auto;" xid="div13"> 
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row33"> 
            <div xid="col70" style="width:150px;"> 
              <span xid="span30"><![CDATA[bind-style（>30）]]></span> 
            </div>  
            <div class="x-col" xid="col67"> 
              <input type="text" value="" xid="input22" bind-value="foodData.ref('fPrice')"
                style="width:100%;" bind-style="{'backgroundColor': foodData.val('fPrice') &gt; 30 ? 'red' : null, 'color' : foodData.val('fPrice') &gt; 30 ? 'yellow' : null}"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row34"> 
            <div xid="col69" style="width:150px;"> 
              <span xid="span33"><![CDATA[bind-css（>30）]]></span> 
            </div>  
            <div class="x-col" xid="col68"> 
              <input type="text" value="" xid="input21" bind-value="foodData.val('fPrice')"
                style="width:100%;" bind-css="{'text-danger': foodData.val('fPrice') &gt; 30}"/> 
            </div> 
          </div> 
        </div> 
      </div>  
      <div class="panel panel-default" style="height:auto;" xid="div15"> 
        <div class="panel-heading" bind-click="panelTopClick" style="padding: 5px;"
          xid="div16"> 
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row38" style="padding: 0px;"> 
            <div class="x-col" xid="col72"> 
              <h4 xid="h45"><![CDATA[bind-attr-xxx]]></h4> 
            </div>  
            <div xid="col71"> 
              <label xid="label8">点击标题显示或隐藏</label> 
            </div> 
          </div> 
        </div>  
        <div class="panel-body" style="padding: 0px;height:auto;" xid="div14"> 
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row37"> 
            <div xid="col76" style="width:150px;"> 
              <span xid="span35"><![CDATA[bind-attr-src]]></span> 
            </div>  
            <div class="x-col" xid="col75"> 
              <img src="about:blank" alt="" xid="image1" height="80px" style="width:120px;"
                bind-attr-src="toUrl('./img/' + foodData.val('fImage'))"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row36"> 
            <div xid="col74" style="width:150px;"> 
              <span xid="span34"><![CDATA[bind-attr-xxx]]></span> 
            </div>  
            <div class="x-col" xid="col73"> 
              <input type="text" value="" xid="input23" bind-value="foodData.val('fPrice')"
                style="width:100%;" bind-attr-xxx="foodData.val('fName')"/> 
            </div> 
          </div> 
        </div> 
      </div>  
      <div class="panel panel-default" style="height:auto;" xid="div18"> 
        <div class="panel-heading" bind-click="panelTopClick" style="padding: 5px;"
          xid="div17"> 
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row39" style="padding: 0px;"> 
            <div class="x-col" xid="col77"> 
              <h4 xid="h46"><![CDATA[bind-if、bind-ifnot、bind-with、bind-foreach]]></h4> 
            </div>  
            <div xid="col78"> 
              <label xid="label9">点击标题显示或隐藏</label> 
            </div> 
          </div> 
        </div>  
        <div class="panel-body" style="padding: 0px;height:auto;" xid="div19"> 
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row41"> 
            <div xid="col81" style="width:150px;"> 
              <span xid="span37"><![CDATA[bind-if（>30）]]></span> 
            </div>  
            <div class="x-col" xid="col82" bind-if="foodData.val('fPrice') &gt; 30"> 
              <input type="text" value="" xid="input25" bind-value="foodData.val('fPrice')"
                style="width:100%;"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row7"> 
            <div xid="col15" style="width:150px;"> 
              <span xid="span2"><![CDATA[bind-with（foodData）]]></span> 
            </div>  
            <div class="x-col" xid="col16" bind-with="foodData"> 
              <input type="text" value="" xid="input2" bind-value="xid+ '的数量：' + getCount()"
                style="width:100%;"/> 
            </div> 
          </div>  
          <div component="$UI/system/components/justep/row/row" class="x-row x-row-center"
            xid="row8"> 
            <div xid="col18" style="width:150px;"> 
              <span xid="span3"><![CDATA[bind-foreach]]></span> 
            </div>  
            <div class="x-col" xid="col17" bind-foreach="foodData.datas"> 
              <input type="text" value="" xid="input4" style="width:100%;" bind-value="$index() + val('fName')"/> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
