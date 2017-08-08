define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.menuBtnClick = function(event){
		justep.Portal.toggleMenu();
	};

	Model.prototype.openDemo = function(event){
		var url = '$UI' + event.source.$domNode.attr('url');
		justep.Portal.openWindow(url);
	};
	
	Model.prototype.carouselActiveChange = function(event){
		$(".portal-main .carousel-indicators li").removeClass('active');
		var to = parseInt(event.to);
		if(!isNaN(to)){
			var li = $(".portal-main .carousel-indicators li").eq(to);
			li.addClass('active');
		}
	};
	
	Model.prototype.modelLoad = function(event){
		var indicators = $('[xid="carousel"]>.carousel-indicators>li'),
			m = this;
		indicators.click(function(){
			var index = parseInt($(this).attr("index"));
			m.comp('carousel').to(index);
		});
	};
	
	return Model;
});