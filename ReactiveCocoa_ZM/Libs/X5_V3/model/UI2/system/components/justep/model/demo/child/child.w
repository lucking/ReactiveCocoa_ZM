<div 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  class="childWindow"
  xid="child"
  extends="../parent/parent.w" >

    <div xui:parent="container" xui:update-mode="insert" >
		<img src="child.png" link-attr="child.png" icon="img:child.png|child.png">来自child.w</img>		
	</div>
   	<img xid="replace" src="child.png"  xui:update-mode="merge"/>

</div>