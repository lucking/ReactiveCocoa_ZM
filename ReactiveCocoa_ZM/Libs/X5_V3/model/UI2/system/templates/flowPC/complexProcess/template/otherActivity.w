 <div 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window"
  extends="{{parent}}" >
  {{#each keys}}
  <div xid="{{key_id}}" autoLoad="true" autoNew="false" xui:update-mode="merge"/> {{/each}}
  </div>