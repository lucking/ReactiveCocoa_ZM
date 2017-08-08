define(function(require) {
	var $ = require("jquery"),
		Component = require("$UI/system/lib/base/component"),
		BindComponent = require("$UI/system/lib/base/bindComponent");
		require("../lib/js/bootstrap");
		
	var url = require.normalizeName("./breadcrumb");
	var ComponentConfig = require("./breadcrumb.config");
	
	var Breadcrumb = BindComponent.extend({
		getConfig: function(){
			return ComponentConfig;	
		},		//构造函数
    	constructor: function(options){
			this.callParent(options);
    	},
    	dispose: function(){
    		this.$domNode.off('click', 'li');
    		this.callParent();
    	},
    	
    	//动态创建组件
    	/*
		<ul class="breadcrumb">
		  <li><a href="#">Home</a> <span class="divider">/</span></li>
		  <li><a href="#">Library</a> <span class="divider">/</span></li>
		  <li class="active">Data</li>
		</ul>
    	 */
    	buildTemplate: function(config){
    		if (config){
        		if(!config['class'])config['class']='breadcrumb';
        		var content = "<ul class='"+config['class']+"' "
            		+ (config.style?(" style='"+config.style+"' "):"")
            		+ (config.xid?(" xid='"+config.xid+"' "):"")
            		+ " component='" + url + "' "
            		+ " ></ul>";
        		return content;
    		}
        },
        /*
         * data : {label:'',}
         */
        push: function(data){
        	var $li = this.$domNode.children('li:last');
        	$li.removeClass("active").html('<a>' + $li.text() + '</a>');
        	this.$domNode.append('<li>'+(data.label?data.label:'')+'</li>').children('li:last').addClass("active").prop("data",data);
        },
        /*
         * data弹出栈到=data前
         */
        popTo: function(data){
        	var ret = [];
        	while(data){
            	var $li = this.$domNode.children('li:last'), d = $li.prop('data');
            	if(data===d) return ret;
            	$li.removeProp('data').remove();
            	this.$domNode.children('li:last').addClass("active").html(data.label);
            	ret.push(d);
        	}
        	return ret;
        },
        pop: function(){
        	var $li = this.$domNode.children('li:last'), data = $li.prop('data');
        	$li.removeProp('data').remove();
        	this.$domNode.children('li:last').addClass("active").html(data.label);
        	return data;
        },
        getDatas: function(){
        	var ret = [];
        	this.$domNode.children('li').each(function(){
        		ret.push($(this).prop(data));
        	});
        	return ret;
        },
        getData: function(li){
        	return $(li).prop('data');
        },
        getActiveData: function(){
        	return this.$domNode.children('li.active').prop('data');
        },
        clear: function(){
        	this.$domNode.children('li').removeProp('data').remove();
        },
        setLabel: function(index,label){
        	var $li = this.$domNode.children('li:eq('+index+')'),data=$li.prop('data');
        	data.label = label;
        	if($li.hasClass('active')) $li.html(label);
        	else $li.html('<a>' + label + '</a>');
        },
        //组件初始化
        doInit: function(value, bindingContext){
	        this.callParent(value, bindingContext);
	        this.$domNode.on('click', 'li', {comp:this}, function(evt){evt.data.li=this;evt.data.comp._doClick(evt);});
        },
        _doClick: function(evt){
        	var $activeLi = this.$domNode.children('li.active'),data = this.getData(evt.data.li);
        	$activeLi.removeClass("active").html('<a>' + $activeLi.text() + '</a>');
        	$(evt.data.li).addClass("active").html(data.label);
        	this.fireEvent('onClick', {source:this, node:evt.data.li, data:data});
        },
        render: function(){
        	this.callParent();
        }
   	});
	
	Component.register(url, Breadcrumb);
	return Breadcrumb;
});