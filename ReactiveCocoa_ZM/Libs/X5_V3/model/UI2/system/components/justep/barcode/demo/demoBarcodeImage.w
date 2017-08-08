<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model1" style="top:6px;height:auto;left:429px;"> 
    <div component="$UI/system/components/justep/data/data" xid="data1" idColumn="fName" autoLoad="true"> 
      <column name="fName" type="String" label="显示名称"/>  
      <column name="fAge" type="Integer" label="年龄"/>  
      <column name="itf14" type="Integer" label="itf14"/>  
      <column name="upca" type="Integer" label="upc-a"/>  
      <column name="upce" type="Integer" label="upc-e"/>  
      <column name="ean13" type="Integer" label="ean-13"/>  
      <column name="usps4cb" type="Integer" label="usps4cb"/>  
      <column name="qr" type="String" label="qr"/>  
      <column name="CN" type="String" label="CN"/>  
      <column name="description" type="String" label="描述"/>  
      <rule xid="rule1"/>  
      <data><![CDATA[
      [{description:' &nbsp  &nbsp  &nbsp描述：下面的条形码组件config全部为：{mw:0.6}，stretch全部为：true   二维码组件：stretch全部为：false',
      fName:'abcde',fAge:18,itf14:1234567890123,upca:12345678901,upce:1234567,ean13:123456789012,usps4cb:12345678901234567890,qr:'http://www.baidu.com',CN:'中华人民共和国'}]
      ]]></data> 
    </div> 
  </div>  
  <!--<input component="$UI/system/components/justep/input/input" placeHolder="请输入字符串" style="width:300px"
				xid="input1" class="input mini" data="data1" bind-ref="data1.ref('fName')" />
				<input component="$UI/system/components/justep/input/input" placeHolder="请输入时间"
						xid="input7" class="input" data="data1" bind-ref="data1.ref('fName')" />

-->  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"><div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar1" title="barcodeImage">
   <div class="x-titlebar-left" xid="div2"><a component="$UI/system/components/justep/button/button" class="btn btn-link" xid="button1" icon="icon-chevron-left" onClick="backBtn">
   <i xid="i1" class="icon-chevron-left"></i>
   <span xid="span1"></span></a></div>
   <div class="x-titlebar-title" xid="div3">barcodeImage</div>
   <div class="x-titlebar-right reverse" xid="div4"></div></div></div>  
    <div class="x-panel-content" xid="content1"> 
      <div align="left">
        <div component="$UI/system/components/justep/row/row" class="x-row x-responsive-md"> 
          <div class="x-col">
          	<div component="$UI/system/components/justep/output/output" class="output"
          		xid="output2" bind-ref="data1.ref('description')" data="data1"/>
          </div>
         </div>
        
        <div component="$UI/system/components/justep/row/row" class="x-row x-responsive-md"
          xid="row1"> 
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:abcde</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="code39" templateName="templateName" xid="barcodeImage6"
              bind-ref="data1.ref('fName')" barcodeConfig="{mw:0.6}" stretch="true"/>  
            <div xid="div1" style="height:48px;">类型:code39
              <br/>取值范围：0-9 a-z - . $ / + %
            </div> 
          </div>  
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:abcde</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="code93" templateName="templateName" xid="barcodeImage7"
              barcodeConfig="{mw:0.6}" bind-ref="data1.ref('fName')"/>  
            <div xid="div1" style="height:48px;">类型:code93
              <br/>取值范围：0-9 a-z
            </div> 
          </div>  
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:abcde</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="code128" templateName="templateName"
              xid="barcodeImage8" bind-ref="data1.ref('fName')" barcodeConfig="{mw:0.6}"/>  
            <div xid="div1" style="height:48px;">类型:code128 
              <br/>取值范围：支持完整的7位ASCII码（US-ASCII）字符集
            </div> 
          </div>  
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:18</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="codabar" templateName="templateName"
              xid="barcodeImage9" bind-ref="data1.ref('fAge')" barcodeConfig="{mw:0.6}"/>  
            <div xid="div1" style="height:48px;">类型:codabar
              <br/>取值范围：0-9 - $ : / . +
            </div> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/row/row" class="x-row x-responsive-md"
          xid="row2"> 
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:18</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="intl2of5" templateName="templateName"
              xid="barcodeImage10" bind-ref="data1.ref('fAge')" barcodeConfig="{mw:0.6}"/>  
            <div xid="div1" style="height:60px;">类型:intl2of5
              <br/>取值范围：0-9
            </div> 
          </div>  
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:1234567890123</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="itf14" templateName="templateName" xid="barcodeImage11"
              barcodeConfig="{mw:0.6}" bind-ref="data1.ref('itf14')"/>  
            <div xid="div1" style="height:60px;">类型:itf14
              <br/> 取值范围：0-9，长度必须为13或14
            </div> 
          </div>  
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:12345678901</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="upc-a" templateName="templateName" xid="barcodeImage12"
              barcodeConfig="{mw:0.6}" bind-ref="data1.ref('upca')"/>  
            <div xid="div1" style="height:60px;">类型:upc-a 
              <br/>取值范围：0-9，长度必须为11或12
            </div> 
          </div>  
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:1234567</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="upc-e" templateName="templateName" xid="barcodeImage13"
              barcodeConfig="{mw:0.6}" bind-ref="data1.ref('upce')"/>  
            <div xid="div1" style="height:60px;">类型:upc-e 
              <br/>取值范围：0-9，长度必须为7或8
            </div> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/row/row" class="x-row x-responsive-md"
          xid="row3"> 
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:123456789012</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="ean-13" templateName="templateName" xid="barcodeImage14"
              barcodeConfig="{mw:0.6}" bind-ref="data1.ref('ean13')"/>  
            <div xid="div1" style="height:60px;">类型:ean-13
              <br/>取值范围：0-9，长度必须为12或13
            </div> 
          </div>  
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:1234567</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="ean-8" templateName="templateName" xid="barcodeImage15"
              barcodeConfig="{mw:0.6}" bind-ref="data1.ref('upce')"/>  
            <div xid="div1" style="height:60px;">类型:ean-8
              <br/>取值范围：0-9，长度必须为7或8
            </div> 
          </div>  
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:123456789012</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="ean-128" templateName="templateName"
              xid="barcodeImage16" barcodeConfig="{mw:0.6}" bind-ref="data1.ref('ean13')"/>  
            <div xid="div1" style="height:60px;">类型:ean-128
              <br/> 取值范围：完整的7位ASCII码（US-ASCII）字符集
            </div> 
          </div>  
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:18</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="postnet" templateName="templateName"
              xid="barcodeImage17" barcodeConfig="{mw:0.6}" bind-ref="data1.ref('fAge')"/>  
            <div xid="div1" style="height:60px;">类型:postnet 
              <br/>取值范围：0-9
            </div> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/row/row" class="x-row x-responsive-md"
          xid="row4"> 
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:1234567</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="royal-mail-cbc" templateName="templateName"
              xid="barcodeImage1" bind-ref="data1.ref('upce')" barcodeConfig="{mw:0.6}"/>  
            <div xid="div1" style="height:60px;">类型:royal-mail-cbc
              <br/>取值范围：0-9 a-z
            </div> 
          </div>  
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:12345678901234567890</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="usps4cb" templateName="templateName"
              xid="barcodeImage2" bind-ref="data1.ref('usps4cb')" barcodeConfig="{mw:0.6}"/>  
            <div xid="div1" style="height:60px;">类型:usps4cb 
              <br/>取值范围：0-9，长度至少20
            </div> 
          </div>  
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:abcde</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="pdf417" templateName="templateName" xid="barcodeImage3"
              bind-ref="data1.ref('fName')" barcodeConfig="{mw:0.6}"/>  
            <div xid="div1" style="height:60px;">类型:pdf417 
              <br/>取值范围：所有可打印的ASCII字符是有效字符
            </div> 
          </div>  
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:abcde</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="datamatrix" templateName="templateName"
              xid="barcodeImage4" barcodeConfig="{mw:2.0}" bind-ref="data1.ref('fName')"
              stretch="false"/>  
            <div xid="div1" style="height:60px;">类型:datamatrix 
              <br/>取值范围：所有的ISO-8859-1字符都是有效的信息字符
              <br/>stretch：false,config:{mw:2.0}
            </div> 
          </div> 
        </div>  
        <div component="$UI/system/components/justep/row/row" class="x-row x-responsive-md"
          xid="row5"> 
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:http://www.baidu.com</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="qr" templateName="templateName" xid="barcodeImage5"
              bind-ref="data1.ref('qr')" stretch="false" barcodeConfig="{mw:1.0}"/>  
            <div xid="div1" style="height:60px;">类型:qr
              <br/>取值范围：所有的utf-8字符都是有效的信息字符
              <br/>stretch：false,config:{mw:1.0}
            </div> 
          </div>  
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:中华人民共和国</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="qr" templateName="templateName" xid="barcodeImage18"
              bind-ref="data1.ref('CN') " barcodeConfig="{mw:1.0}" stretch="false"/>  
            <div xid="div1" style="height:60px;">类型:qr
              <br/>取值范围：所有的utf-8字符都是有效的信息字符
              <br/>stretch：false,config:{mw:1.0}
            </div> 
          </div>  
          <div class="x-col"> 
            <div xid="div1" style="height:30px;"> 
              <font color="red">值:abcde</font> 
            </div>  
            <div component="$UI/system/components/justep/barcode/barcodeImage"
              class="xui-barcodeImage" type="datamatrix" templateName="templateName"
              xid="barcodeImage19" stretch="false" bind-ref="data1.ref('fName')" barcodeConfig="{mw:2.0}"/>  
            <div xid="div1" style="height:60px;">类型:datamatrix 
              <br/>取值范围：所有的ISO-8859-1字符都是有效的信息字符
              <br/>stretch：false,config:{mw:2.0}
            </div> 
          </div> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"/>
  </div>
</div>
