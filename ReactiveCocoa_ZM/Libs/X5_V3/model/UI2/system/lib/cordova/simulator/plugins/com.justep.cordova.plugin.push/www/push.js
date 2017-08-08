cordova.define("com.justep.cordova.plugin.push", function(require, exports, module) {

var cordova = require('cordova'),
    exec = require('cordova/exec');


var Push = function() {
};



Push.prototype.connect = function() {
  this.connected = true;
  exec(null,null,"PushPlugin","connect",[]);
};



Push.prototype.onMessage = function(msg) {
  if(this.connected){
    alert(msg);
  }
};


Push.prototype.disconnect = function() {
  this.connected = false;
  exec(null,null,"PushPlugin","disconnect",[]);
};


var push = new Push();
module.exports = push;
});
