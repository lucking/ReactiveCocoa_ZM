<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/window/window">
	<div component="$UI/system/components/model/model" xid="model"
		style="height:auto;top:158px;left:348px;" onLoad="modelLoad">
		<!-- <div component="$UI/system/components/data/data" auto-load="true" 
			xid="data1" columns="name,code" data-type="json"/> -->
	</div>

	<label xid="label1" style="width:74px;height:22px;">属性值</label>
	<input type="text" value="" xid="input1" style="height:40px;width:424px;"
		id="prop"></input>
	<a component="$UI/system/components/button/button" class="xui-button"
		label="button" xid="button2" onClick="button2Click"></a>
</div>
 