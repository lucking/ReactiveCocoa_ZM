define(function(require){
require('$model/UI2/system/components/bootstrap/accordion/accordion');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/bootstrap/panel/panel');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/bootstrap/navs/navs');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/components/bootstrap/accordion/demo/base'); 
require.css('$model/UI2/system/components/bootstrap/accordion/demo/base');
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam=true;
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='423b2f21a6c7cbf5b0fb9774d1c73e66';
	this.callParent(contextUrl);
}}); 
return __result;});