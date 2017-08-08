/*
 RequireJS 2.1.10 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
 min from: http://closure-compiler.appspot.com/home
*/
var requirejs,require,define;
(function(ka){function M(b){return"[object Function]"===T.call(b)}function N(b){return"[object Array]"===T.call(b)}function x(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function aa(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));--d);}}function v(b,c){return qa.call(b,c)}function n(b,c){return v(b,c)&&b[c]}function G(b,c){for(var d in b)if(v(b,d)&&c(b[d],d))break}function ba(b,c,d,e){c&&G(c,function(c,g){if(d||!v(b,g))!e||"object"!==typeof c||!c||N(c)||M(c)||
c instanceof RegExp?b[g]=c:(b[g]||(b[g]={}),ba(b[g],c,d,e))});return b}function y(b,c){return function(){return c.apply(b,arguments)}}function la(b){throw b;}function ma(b){if(!b)return b;var c=ka;x(b.split("."),function(b){c=c[b]});return c}function I(b,c,d,e){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=e;d&&(c.originalError=d);return c}function ra(b){function c(a){if(window.isInDesigner)return window._$UI;if(a)if("/"==a.charAt(0))if(-1!==a.indexOf("$v")){a=
a.split("/");for(var b=0;b<a.length;b++)if(0==a[b].indexOf("$v")&&b+1<a.length)return a[b+1]}else{if(b=window.__ResourceEngine.contextPath,0===a.indexOf(b))return a.substring(b.length).split("/")[1]}else if(0==a.indexOf("$model")&&(a=a.split("/"),2<=a.length))return a[1];return null}function d(a,b,k,f){var p,d,q,ca,e,g,h=b&&b.split("/");d=h;var w=m.map,l=w&&w["*"];if((d=a)&&k&&(q=c(k))){var r=a.indexOf("$UI/");-1!=r&&(d=0==r?a.replace("$UI","$model/"+q):a.replace("$UI",q))}if(d&&-1!=d.indexOf("$UI"))throw Error("\u5904\u7406"+
a+"\u4e2d\u7684$UI\u65f6\u51fa\u9519, baseUrl: "+k);if((a=d)&&"."===a.charAt(0))if(b){d=h.slice(0,h.length-1);a=a.split("/");b=a.length-1;m.nodeIdCompat&&X.test(a[b])&&(a[b]=a[b].replace(X,""));b=a=d.concat(a);q=b.length;for(k=0;k<q;k++)if(d=b[k],"."===d)b.splice(k,1),--k;else if(".."===d)if(1!==k||".."!==b[2]&&".."!==b[0])0<k&&(b.splice(k-1,2),k-=2);else break;a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if(f&&w&&(h||l)){b=a.split("/");k=b.length;a:for(;0<k;--k){q=b.slice(0,k).join("/");
if(h)for(d=h.length;0<d;--d)if(f=n(w,h.slice(0,d).join("/")))if(f=n(f,q)){p=f;ca=k;break a}!e&&l&&n(l,q)&&(e=n(l,q),g=k)}!p&&e&&(p=e,ca=g);p&&(b.splice(0,ca,p),a=b.join("/"))}return(p=n(m.pkgs,a))?p:a}function e(a){D&&x(document.getElementsByTagName("script"),function(b){if(b.getAttribute("data-requiremodule")===a&&b.getAttribute("data-requirecontext")===h.contextName)return b.parentNode.removeChild(b),!0})}function H(a){var b=n(m.paths,a);if(b&&N(b)&&1<b.length)return b.shift(),h.require.undef(a),
h.require([a]),!0}function A(a){var b,c=a?a.indexOf("!"):-1;-1<c&&(b=a.substring(0,c),a=a.substring(c+1,a.length));return[b,a]}function z(a,b,c,f){var p,U,q=null,e=b?b.name:null,g=b?b.url:null,m=a,na=!0,w="";a||(na=!1,a="_@r"+(W+=1));a=A(a);q=a[0];a=a[1];q&&(q=d(q,e,g,f),U=n(u,q));a&&(q?w=U&&U.normalize?U.normalize(a,function(a){return d(a,e,g,f)}):d(a,e,g,f):(w=d(a,e,g,f),a=A(w),q=a[0],w=a[1],c=!0,p=h.nameToUrl(w)));c=!q||U||c?"":"_unnormalized"+(oa+=1);p&&(p=l.addVLS(p));return{prefix:q,name:w,
parentMap:b,unnormalized:!!c,url:p,originalName:m,isDefine:na,id:(q?q+"!"+w:w)+c}}function t(a){var b=a.id,c=n(r,b);c||(c=r[b]=new h.Module(a));return c}function B(a,b,c){var f=a.id,p=n(r,f);if(!v(u,f)||p&&!p.defineEmitComplete)if(p=t(a),p.error&&"error"===b)c(p.error);else p.on(b,c);else"defined"===b&&c(u[f])}function C(a,b){var c=a.requireModules,f=!1;if(b)b(a);else if(x(c,function(b){if(b=n(r,b))b.error=a,b.events.error&&(f=!0,b.emit("error",a))}),!f)g.onError(a)}function F(){Y.length&&(ta.apply(E,
[E.length,0].concat(Y)),Y=[])}function K(a){delete r[a];delete da[a]}function P(a,b,c){var f=a.map.id;a.error?a.emit("error",a.error):(b[f]=!0,x(a.depMaps,function(p,f){var d=p.id,e=n(r,d);!e||a.depMatched[f]||c[d]||(n(b,d)?(a.defineDep(f,u[d]),a.check()):P(e,b,c))}),c[f]=!0)}function L(){var a,b,c=(a=1E3*m.waitSeconds)&&h.startTime+a<(new Date).getTime(),f=[],p=[],d=!1,q=!0;if(!ea){ea=!0;G(da,function(a){var g=a.map,h=g.id;if(a.enabled&&(g.isDefine||p.push(a),!a.error))if(!a.inited&&c)H(h)?d=b=!0:
(f.push(h),e(h));else if(!a.inited&&a.fetched&&g.isDefine&&(d=!0,!g.prefix))return q=!1});if(c&&f.length)return a=I("timeout","Load timeout for modules: "+f,null,f),a.contextName=h.contextName,C(a);q&&x(p,function(a){P(a,{},{})});c&&!b||!d||!D&&!pa||fa||(fa=setTimeout(function(){fa=0;L()},50));ea=!1}}function O(a){v(u,a[0])||t(z(a[0],null,!0)).init(a[1],a[2])}function S(a){a=a.currentTarget||a.srcElement;var b=h.onScriptLoad;a.detachEvent&&!ga?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",
b,!1);b=h.onScriptError;a.detachEvent&&!ga||a.removeEventListener("error",b,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function T(){var a;for(F();E.length;){a=E.shift();if(null===a[0])return C(I("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));O(a)}}var ea,ha,h,Q,fa,m={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},r={},da={},ia={},E=[],u={},Z={},ja={},W=1,oa=1;Q={require:function(a){return a.require?a.require:a.require=h.makeRequire(a.map)},
exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?a.exports:a.exports=u[a.map.id]={}},module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return n(m.config,a.map.id)||{}},exports:Q.exports(a)}}};ha=function(a){this.events=n(ia,a.id)||{};this.map=a;this.shim=n(m.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};ha.prototype={init:function(a,b,c,f){f=f||{};if(!this.inited){this.factory=
b;if(c)this.on("error",c);else this.events.error&&(c=y(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=c;this.inited=!0;this.ignore=f.ignore;f.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,--this.depCount,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0;h.startTime=(new Date).getTime();var a=this.map;if(this.shim)h.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||
[],y(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=this.map.url;Z[a]||(Z[a]=!0,h.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;var f=this.exports,p=this.factory;if(!this.inited)this.fetch();else if(this.error)this.emit("error",this.error);else if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(M(p)){if(this.events.error&&
this.map.isDefine||g.onError!==la)try{f=h.execCb(c,p,b,f)}catch(d){a=d}else f=h.execCb(c,p,b,f);this.map.isDefine&&void 0===f&&((b=this.module)?f=b.exports:this.usingExports&&(f=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",C(this.error=a)}else f=p;this.exports=f;if(this.map.isDefine&&!this.ignore&&(u[c]=f,g.onResourceLoad))g.onResourceLoad(h,this.map,this.depMaps);K(c);this.defined=!0}this.defining=
!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}},callPlugin:function(){var a=this.map,b=a.id,c=z(a.prefix);this.depMaps.push(c);B(c,"defined",y(this,function(c){var p,k;k=n(ja,this.map.id);var q=this.map.name,e=this.map.parentMap?this.map.parentMap.name:null,l=this.map.parentMap?this.map.parentMap.url:null,H=h.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(c.normalize&&(q=c.normalize(q,function(a){return d(a,
e,l,!0)})||""),c=z(a.prefix+"!"+q,this.map.parentMap),B(c,"defined",y(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),k=n(r,c.id)){this.depMaps.push(c);if(this.events.error)k.on("error",y(this,function(a){this.emit("error",a)}));k.enable()}}else k?(this.map.url=h.nameToUrl(k),this.load()):(p=y(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),p.error=y(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];G(r,function(a){0===a.map.id.indexOf(b+
"_unnormalized")&&K(a.map.id)});C(a)}),p.fromText=y(this,function(c,f){var d=a.name,k=z(d),e=V;f&&(c=f);e&&(V=!1);t(k);v(m.config,b)&&(m.config[d]=m.config[b]);try{g.exec(c)}catch(q){return C(I("fromtexteval","fromText eval for "+b+" failed: "+q,q,[b]))}e&&(V=!0);this.depMaps.push(k);h.completeLoad(d);H([d],p)}),c.load(a.name,H,p,m))}));h.enable(c,this);this.pluginMaps[c.id]=c},enable:function(){da[this.map.id]=this;this.enabling=this.enabled=!0;x(this.depMaps,y(this,function(a,b){var c,d;if("string"===
typeof a){a=z(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=n(Q,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;B(a,"defined",y(this,function(a){this.defineDep(b,a);this.check()}));this.errback&&B(a,"error",y(this,this.errback))}c=a.id;d=r[c];v(Q,c)||!d||d.enabled||h.enable(a,this)}));G(this.pluginMaps,y(this,function(a){var b=n(r,a.id);b&&!b.enabled&&h.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=
this.events[a]=[]);c.push(b)},emit:function(a,b){x(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};h={config:m,contextName:b,registry:r,defined:u,urlFetched:Z,defQueue:E,Module:ha,makeModuleMap:z,nextTick:g.nextTick,onError:C,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=m.shim,c={paths:!0,bundles:!0,config:!0,map:!0};G(a,function(a,b){c[b]?(m[b]||(m[b]={}),ba(m[b],a,!0,!0)):m[b]=a});a.bundles&&G(a.bundles,function(a,b){x(a,
function(a){a!==b&&(ja[a]=b)})});a.shim&&(G(a.shim,function(a,c){N(a)&&(a={deps:a});!a.exports&&!a.init||a.exportsFn||(a.exportsFn=h.makeShimExports(a));b[c]=a}),m.shim=b);a.packages&&x(a.packages,function(a){var b;a="string"===typeof a?{name:a}:a;b=a.name;a.location&&(m.paths[b]=a.location);m.pkgs[b]=a.name+"/"+(a.main||"main").replace(ua,"").replace(X,"")});G(r,function(a,b){a.inited||a.map.unnormalized||(a.map=z(b))});(a.deps||a.callback)&&h.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;
a.init&&(b=a.init.apply(ka,arguments));return b||a.exports&&ma(a.exports)}},makeRequire:function(a,c){function k(d,f,e){var m,n;c.enableBuildCallback&&f&&M(f)&&(f.__requireJsBuild=!0);if("string"===typeof d){if(M(f))return C(I("requireargs","Invalid require call"),e);if(a&&v(Q,d))return Q[d](r[a.id]);if(g.get)return g.get(h,d,a,k);m=z(d,a,!1,!0);m=m.id;return v(u,m)?u[m]:C(I("notloaded",'Module name "'+m+'" has not been loaded yet for context: '+b+(a?"":". Use require([])")))}T();h.nextTick(function(){T();
n=t(z(null,a));n.skipMap=c.skipMap;n.init(d,f,e,{enabled:!0});L()});return k}c=c||{};var f=function(){function a(b){var c=!1,d=document.getElementsByTagName("link");x(d,function(a){if(a=a.getAttribute("include")){a=a.split(",");for(var d in a)if(a[d].toLowerCase()==b.toLowerCase())return c=!0,!1}});return c}function b(a){a=new RegExp("(^|&)"+a+"=([^&]*)(&|$)");a=window.location.search.substr(1).match(a);return null!=a?unescape(a[2]):null}var c=window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)/)||
0,d=!1,f=!0;c[1]||c[7]?d=6>parseInt(c[1])||9>=parseInt(c[7]):c[2]?f=!1:c[4]&&(d=18>parseInt(c[4]));var e,k,g=function(){e=document.createElement("style");J.appendChild(e);k=e.styleSheet||e.sheet},h=0,m=[],n,l=function(a){h++;32==h&&(g(),h=0);k.addImport(a);e.onload=r},r=function(){n();var a=m.shift();a?(n=a[1],l(a[0])):n=null},H=function(a,b){k&&k.addImport||g();if(k&&k.addImport)n?m.push([a,b]):(l(a),n=b);else{e.textContent='@import "'+a+'";';var c=setInterval(function(){try{e.sheet.cssRules,clearInterval(c),
b()}catch(a){}},10)}},sa=function(a,b){var c=document.createElement("link");c.type="text/css";c.rel="stylesheet";if(f)c.onload=function(){c.onload=function(){};setTimeout(b,7)};else var d=setInterval(function(){for(var a=0;a<document.styleSheets.length;a++)if(document.styleSheets[a].href==c.href)return clearInterval(d),b()},10);c.href=a;J.appendChild(c)};return function(c,f){c=this.normalizeName(c);if(a(c))f&&f();else{var e=this.toUrl(c+".css"),k=b("\\$skin");k&&(e+=(-1!=e.indexOf("?")?"&":"?")+"$skin="+
k);(d?H:sa)(e,function(){var a=document.getElementsByTagName("link");x(a,function(a){a.getAttribute("href")==e&&a.setAttribute("include",c)});f&&f()})}}}();ba(k,{isBrowser:D,toUrl:function(b){var c="",f=b.indexOf("?");-1!==f&&(c=b.substring(f+1),b=b.substring(0,f));var e,f=b.lastIndexOf("."),k=b.split("/")[0];-1!==f&&("."!==k&&".."!==k||1<f)&&(e=b.substring(f,b.length),b=b.substring(0,f));b=h.nameToUrl(d(b,a&&a.id,a&&a.url,!0),e,!0);b=l.addVLS(b);c&&(b=-1!==b.indexOf("?")?b+("&"+c):b+("?"+c));return b},
normalizeName:function(b){return d(b,a&&a.id,a&&a.url,!0)},css:f,defined:function(b){return v(u,z(b,a,!1,!0).id)},specified:function(b){b=z(b,a,!1,!0).id;return v(u,b)||v(r,b)},cordova:function(a){},w:function(a){return a},res:function(a){}});a||(k.undef=function(b){F();var c=z(b,a,!0),d=n(r,b);e(b);delete u[b];delete Z[c.url];delete ia[b];aa(E,function(a,c){a[0]===b&&E.splice(c,1)});d&&(d.events.defined&&(ia[b]=d.events),K(b))});return k},enable:function(a){n(r,a.id)&&t(a).enable()},completeLoad:function(a){var b,
c,d=n(m.shim,a)||{},e=d.exports;for(F();E.length;){c=E.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);O(c)}c=n(r,a);if(!b&&!v(u,a)&&c&&!c.inited)if(!m.enforceDefine||e&&ma(e))O([a,d.deps||[],d.exportsFn]);else return H(a)?void 0:C(I("nodefine","No define call for "+a,null,[a]));L()},nameToUrl:function(a,b,c){var d,e,l;(d=n(m.pkgs,a))&&(a=d);if(d=n(ja,a))return h.nameToUrl(d,b,c);if(g.jsExtRegExp.test(a))d=a+(b||"");else{d=m.paths;a=a.split("/");for(e=a.length;0<e;--e)if(l=a.slice(0,
e).join("/"),l=n(d,l)){N(l)&&(l=l[0]);a.splice(0,e,l);break}d=a.join("/");d+=b||(/^data\:|\?/.test(d)||c?"":".js");d=("$"===d.charAt(0)||"/"===d.charAt(0)||d.match(/^[\w\+\.\-]+:/)?"":m.baseUrl)+d}return m.urlArgs?d+((-1===d.indexOf("?")?"?":"&")+m.urlArgs):d},load:function(a,b){g.load(h,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||va.test((a.currentTarget||a.srcElement).readyState))R=null,a=S(a),h.completeLoad(a.id)},onScriptError:function(a){var b=
S(a);if(!H(b.id))return C(I("scripterror","Script error for: "+b.id,a,[b.id]))}};h.require=h.makeRequire();return h}function wa(){if(R&&"interactive"===R.readyState)return R;aa(document.getElementsByTagName("script"),function(b){if("interactive"===b.readyState)return R=b});return R}var g,B,J,K,O,P,R,S,A,W,xa=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ya=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,X=/\.js$/,ua=/^\.\//;B=Object.prototype;var T=B.toString,qa=B.hasOwnProperty,ta=Array.prototype.splice,
D=!("undefined"===typeof window||"undefined"===typeof navigator||!window.document),pa=!D&&"undefined"!==typeof importScripts,va=D&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,ga="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),F={},t={},Y=[],V=!1,L="Android;iPhone;iPad;iPod;Windows Phone;PC".split(";"),l={Meta:window.__justepMeta||null,deviceType:L[function(){for(var b=navigator.userAgent,c=0;c<L.length;c++)if(0<b.indexOf(L[c]))return c;return L.length-1}()],
isPC:function(){return"PC"===l.deviceType},isPhone:function(){return"Android"===l.deviceType||"iPhone"===l.deviceType||"Windows Phone"===l.deviceType},isPad:function(){return"iPad"===l.deviceType||"iPod"===l.deviceType},enabledVLS:function(){return-1!==window.location.href.indexOf("$v")},addVLS:function(b){if(!l.Meta||!l.enabledVLS()||!b||"/"!==b.charAt(0))return b;b=l._parse(b);l._updateVLS(b);return l._toUrl(b)},_updateVLS:function(b){var c=l._getAppVersion(b.path);if(null!==c&&void 0!==c){var d=
b.vls.indexOf("$",1);b.vls=-1===d?"$v"+c:"$v"+c+b.vls.substring(d)}},_getAppVersion:function(b){if(window.__isPackage)return"";b=b.split("/");return 2<b.length?l.Meta.versions["/"+b[1]+"/"+b[2]]:null},_toUrl:function(b){var c="";b.contextName&&(c="/"+b.contextName);b.vls&&(c+="/"+b.vls);b.path&&(c+=b.path);b.hash&&(c+="#"+b.hash);b.queryString&&(c+="?"+b.queryString);return c},_toRealUrl:function(b,c,d){b=b+c+d;return l.Meta.wList&&-1!==l.Meta.wList.indexOf(b)?b:null},_parse:function(b){var c={contextName:"",
vls:"",path:"",queryString:"",hash:"",isAUrl:!1},d=b.indexOf("?");-1!==d&&(c.queryString=b.substring(d+1),b=b.substring(0,d));d=b.indexOf("#");-1!==d&&(c.hash=b.substring(d+1),b=b.substring(0,d));c.isAUrl=".a"===b.substring(b.length-2);b=b.split("/");for(var e=!1,d=1;d<b.length;d++)e?c.path+="/"+b[d]:b[d]&&0===b[d].indexOf("$v")?(c.vls=b[d],e=!0):c.contextName=1===d?b[d]:c.contextName+("/"+b[d]);e||(c.contextName=b[1],c.path=(2<b.length?"/":"")+b.slice(2,b.length).join("/"));return c}};if("undefined"===
typeof define){if("undefined"!==typeof requirejs){if(M(requirejs))return;t=requirejs;requirejs=void 0}"undefined"===typeof require||M(require)||(t=require,require=void 0);g=requirejs=function(b,c,d,e){var l,t="_";N(b)||"string"===typeof b||(l=b,N(c)?(b=c,c=d,d=e):b=[]);l&&l.context&&(t=l.context);(e=n(F,t))||(e=F[t]=g.s.newContext(t));l&&e.configure(l);return e.require(b,c,d)};g.config=function(b){return g(b)};g.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};
require||(require=g);g.version="2.1.10";g.jsExtRegExp=/^\/|:|\?|\.js$/;g.isBrowser=D;B=g.s={contexts:F,newContext:ra};g({});x(["normalizeName","toUrl","undef","defined","specified"],function(b){g[b]=function(){var c=F._;return c.require[b].apply(c,arguments)}});D&&(J=B.head=document.getElementsByTagName("head")[0],K=document.getElementsByTagName("base")[0])&&(J=B.head=K.parentNode);g.onError=la;g.createNode=function(b,c,d){c=b.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):
document.createElement("script");c.type=b.scriptType||"text/javascript";c.charset="utf-8";c.async=!0;return c};g.load=function(b,c,d){var e=b&&b.config||{};if(D)return e=g.createNode(e,c,d),e.setAttribute("data-requirecontext",b.contextName),e.setAttribute("data-requiremodule",c),!e.attachEvent||e.attachEvent.toString&&0>e.attachEvent.toString().indexOf("[native code")||ga?(e.addEventListener("load",b.onScriptLoad,!1),e.addEventListener("error",b.onScriptError,!1)):(V=!0,e.attachEvent("onreadystatechange",
b.onScriptLoad)),window.isInDesigner&&".js"!=d.substring(d.length-3)&&(d+=".js"),e.src=d,S=e,K?J.insertBefore(e,K):J.appendChild(e),S=null,e;if(pa)try{importScripts(d),b.completeLoad(c)}catch(l){b.onError(I("importscripts","importScripts failed for "+c+" at "+d,l,[c]))}};D&&!t.skipDataMain&&aa(document.getElementsByTagName("script"),function(b){J||(J=b.parentNode);if(O=b.getAttribute("data-main"))return A=O,t.baseUrl||(P=A.split("/"),A=P.pop(),W=P.length?P.join("/")+"/":"./",t.baseUrl=W),A=A.replace(X,
""),g.jsExtRegExp.test(A)&&(A=O),t.deps=t.deps?t.deps.concat(A):[A],!0});define=function(b,c,d){var e,g;"string"!==typeof b&&(d=c,c=b,b=null);N(c)||(d=c,c=null);!c&&M(d)&&(c=[],d.length&&(d.toString().replace(xa,"").replace(ya,function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c)));V&&(e=S||wa())&&(b||(b=e.getAttribute("data-requiremodule")),g=F[e.getAttribute("data-requirecontext")]);(g?g.defQueue:Y).push([b,c,d])};define.amd={jQuery:!0};g.exec=function(b){return eval(b)};
g(t)}})(this);