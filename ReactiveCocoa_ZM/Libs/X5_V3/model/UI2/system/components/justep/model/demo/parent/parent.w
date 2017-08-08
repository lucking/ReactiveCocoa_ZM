<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" class="parentWindow" 
	xid="parent"
	component="$UI/system/components/justep/window/window">
	<div component="$UI/system/components/justep/model/model"/>
		
	<div xid="container" component="$UI/system/components/justep/view/view">
		<h1>这是根Window</h1>
		<img src="parent.png" link-attr="parent.png" icon="img:parent.png|parent.png">来自parent.w</img>
		<img xid="replace" src="parent.png">这个图片将被子window替换</img>
	</div>
</div>
