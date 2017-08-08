define(function(require){
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/bootstrap/navbar/navbar');
require('$model/UI2/system/components/bootstrap/navs/navs');
require('$model/UI2/system/components/bootstrap/scrollSpy/scrollSpy');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/components/bootstrap/scrollSpy/demo/base'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam=true;
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='854a1c300959270b6722227acc589c60';
	this.callParent(contextUrl);
}}); 
return __result;});