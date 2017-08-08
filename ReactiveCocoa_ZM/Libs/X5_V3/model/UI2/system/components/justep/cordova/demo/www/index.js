define(function(require) {
	var Model = function() {
		this.callParent();
		this.on('onLoad',function(){
			setTimeout(function(){
				// for histroy
				window.location.href = require.toUrl('$UI/system/components/justep/cordova/demo/www/demo.w?process=/SA/OPM/system/systemProcess&activity=mainActivity');
			});
		},600);
	};
	return Model;
});


