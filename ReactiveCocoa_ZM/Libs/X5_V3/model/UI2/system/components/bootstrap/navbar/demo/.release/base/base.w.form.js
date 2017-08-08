define(function(require){
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/bootstrap/navbar/navbar');
require('$model/UI2/system/components/bootstrap/navs/navs');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/components/bootstrap/navbar/demo/base'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam=true;
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='d2aa57dcd25aedc20e3c3c5d740dcee8';
	this.callParent(contextUrl);
}}); 
return __result;});