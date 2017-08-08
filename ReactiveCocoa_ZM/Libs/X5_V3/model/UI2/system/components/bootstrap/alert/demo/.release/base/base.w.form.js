define(function(require){
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/bootstrap/alert/alert');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/components/bootstrap/alert/demo/base'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam=true;
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='728afea2296e3db9738d50e480be12a7';
	this.callParent(contextUrl);
}}); 
return __result;});