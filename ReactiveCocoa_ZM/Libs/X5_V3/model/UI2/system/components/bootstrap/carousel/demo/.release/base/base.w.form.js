define(function(require){
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/bootstrap/carousel/carousel');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/button/button');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/components/bootstrap/carousel/demo/base'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam=true;
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='fe54436efa2830e2ec9d3059605dcd6b';
	this.callParent(contextUrl);
}}); 
return __result;});