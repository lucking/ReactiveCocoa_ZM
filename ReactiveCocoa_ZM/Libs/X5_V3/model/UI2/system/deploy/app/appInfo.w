<div 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  extends="$UI/system/deploy/common/appInfo.w" >

    <div style="padding-top:8px" xid="div1_2" xui:parent="window" xui:update-mode="insert" >
<span checked="true" class="x-checkbox" component="$UI/system/components/justep/button/checkbox" label="完成后启动App生成向导" xid="startAppWiz" />
</div>
    <label class="x-label" style="color:#FF8000;" xid="label1_1" xui:parent="window" xui:update-mode="insert" >
<![CDATA[小提示：可参考目录下的“说明.txt”了解目录结构和查看常见问题]]>
</label>
   <div xid="labelOutput2" style="display:none"  xui:update-mode="merge"/>
<xu:modifications>
  <xu:remove select="//*[@xid='appInfoDiv']/@style"/>
</xu:modifications>

</div>