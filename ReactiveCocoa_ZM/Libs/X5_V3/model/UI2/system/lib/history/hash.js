define(function(require) {
	var String = require("$UI/system/lib/base/string");
	var Hash = function(hash){
		this.hash = hash + "";
	};
	Hash.prototype.val = function(key, val){
	    if (!(typeof key == "string") || key == "") {
	        return;
	    }
	    var clearReg = new RegExp("(&" + key + "=[^&]*)|(\\b" + key + "=[^&]*&)|(\\b" + key + "=[^&]*)", "ig");
	    var getReg   = new RegExp("&*\\b" + key + "=[^&]*", "i");
	
	    //get
	    if (typeof val == "undefined") {
	        var result = this.hash.match(getReg);
	        return result ? decodeURIComponent(String.trim(result[0].split("=")[1])) : null;
	    }
	    //delet
	    else if (val === null) {
	    	this.hash = this.hash.replace(clearReg, "");
	    }
	    //set
	    else {
	    	if(this.hash.indexOf('#')!=0){
	    		this.hash = "#";
	    	}
	        val = val + "";
	        var temp = this.hash.replace(clearReg, "");
	        temp += ((temp.indexOf("=") != -1) ? "&" : "") + key + "=" + encodeURIComponent(val);
	        this.hash = temp;
	    }
	};
	Hash.prototype.toString = function(){
		return this.hash;
	};
	return Hash;
});