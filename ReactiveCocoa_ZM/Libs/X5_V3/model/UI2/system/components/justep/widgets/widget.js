/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	
	var Component = require("$UI/system/lib/base/component"),
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		url = require.normalizeName("./widget");
	var ComponentConfig = require("./widget.config");
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var re = /^(http|https):/;
	
    var Widget = ViewComponent.extend({
		constructor: function(config){
			this.title = '';
			this.url = '';
			this.process = '';
			this.activity = '';
			this.callParent(config);
		},
    	buildTemplate: function(config){
    		config.xid = config.xid || '';
    		config.title = config.title || '';
    		
		    var html = Str.format('<div component="$model/UI2/system/components/justep/widgets/widget" class="x-widget ibox"' + 
		    	'url="{1}">' + 
		        '<div class="ibox-title">' +
		        	'<h5>{0}</h5>' + 
		          '<div class="ibox-tools">' + 
		            '<a component="$UI/system/components/justep/button/button" class="btn btn-link x-widget-toggle" ' +
		              'label="" icon="icon-chevron-up">'  +
		              '<i xid="i1" class="icon-chevron-up"/>' +  
		              '<span xid="span1"/>'  +
		            '</a>'   +
		            '<a component="$UI/system/components/justep/button/button" class="btn btn-link x-widget-refresh"' +
		              'label="" icon="icon-refresh">'  +
		              '<i xid="i1" class="icon-refresh"/>' +  
		              '<span xid="span1"/>'  +
		            '</a>'   +
		            '<a component="$UI/system/components/justep/button/button" class="btn btn-link x-widget-close"' +
		              'label="" icon="icon-close">'  +
		              '<i xid="i1" class="icon-close"/>' +  
		              '<span xid="span1"/>'  +
		            '</a>'   +
		          '</div>'  +
		        '</div>'   +
		        '<div class="ibox-content"/>' + 
		      '</div>', config.title, config.url);
    		
    		this.url = config.url;
    		this.process = config.process;
    		this.activity = config.activity;
    		this.owner = config.owner;
    		this.xid = config.xid;
    		this.widgetID = config.id;
    		return html;
    	},
		init: function(value, bindingContext){
			//TODO:
			this.owner = Component.getComponent(this.$domNode.parent().get(0));
			//注册到owner
			this.$el = $(this.domNode);
			if(this.widgetID)
				this.$el.attr({'widgetID': this.widgetID});
			this.$title = $('>.ibox-title>h5', this.domNode);
			this.$content = $('>.ibox-content', this.domNode);
			this.$toggle = $('>.ibox-title .x-widget-toggle', this.domNode);
			this.$refresh = $('>.ibox-title .x-widget-refresh', this.domNode);
			this.$close = $('>.ibox-title .x-widget-close', this.domNode);
			this.callParent(value, bindingContext);
			var me = this;
			justep.Bind.utils.domNodeReady.addReadyCallback(this.domNode, function(){
				function bind(el, event, fn){
					var node = el.get(0);
					if(node){
						var obj = me.getModel().comp(node);
						obj && obj.on(event, fn);
					}
				}
				bind(me.$toggle, 'onClick', function(){

				});
				bind(me.$close, 'onClick', function(){
					
				});
			});
			if(this.url){
				this.load();
				this.$refresh.on('click', function(){
					me.refresh();
				})
			}
		},
		getConfig: function(){
			return ComponentConfig;
		},
		setTitle: function(value){
			this.$title.html(value);
		},
		
		propertyChangedHandler: function(key, oldValue, value){
			switch(key){
			case 'title':
				this.setTitle(value);
				break;
			default:
				this.callParent(key, oldValue, value);
			}
		},
		load: function(fn){
			var me = this;
			if(re.test(this.url)){
				//外部url
				this.$content.addClass('frame');
				this.$content.html('<iframe src="' + this.url +'"/>');
				this.$frame = $('>iframe', this.$content);
			}else{
				var compose = this.compose = new WindowContainer({
					parentNode: this.$content.get(0), 
					src: require.toUrl('$model' + this.url),
					process: this.process,
					activity: this.activity,
					onLoad: function(){
						fn && fn();
						me.on("onActive", function(){
							if(compose.getInnerModel())
								compose.getInnerModel().fireEvent('onActive');
						})
					},
					onLoadError: function(err){
						fn && fn(err);
					}
				});
			}
		},
		refresh: function(){
			if(this.compose){
				this.compose.refresh();
			}else if(this.$frame){
				//this.$frame
			}
		},
		dispose: function(){
			//TODO
			//this.owner.remove(this);
			this.owner = null;
		}
	});

    Component.register(url, Widget);

    return Widget;
});