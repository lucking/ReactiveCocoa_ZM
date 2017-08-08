define(function(require){
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/bootstrap/pagination/pagination');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/components/bootstrap/pagination/demo/base'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam=true;
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='70566e0e6bde91f8d2c451659e33ee89';
	this.callParent(contextUrl);
}}); 
return __result;});