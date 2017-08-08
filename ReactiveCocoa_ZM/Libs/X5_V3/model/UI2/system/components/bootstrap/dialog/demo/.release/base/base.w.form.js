define(function(require){
require('$model/UI2/system/components/bootstrap/dialog/dialog');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/bootstrap/navs/navs');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/components/bootstrap/dialog/demo/base'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam=true;
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='580ec26b2ad50e806ec49a91f6f39d2a';
	this.callParent(contextUrl);
}}); 
return __result;});