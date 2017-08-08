define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var menu = require("../config/demo.function");

	var Model = function(){
		this.callParent();
	};
	
	Model.prototype = {
		getFunctionTreeData: function(){
			return menu;
		},
		initFunctionTree: function(){
			var funcsData = this.getFunctionTreeData(),
				$content = this.comp('panel').$content,
				html = ['<div id="menu" class="portal-menu">'];
			
			
			function printTree(children){
				if(!children || !children.length) return;
				html.push('<dl>');
				for(var i in children){
					var child = children[i];
					html.push('<dt class="portal-menu-group"><h4>');
					html.push(child.label);
					html.push('</h4></dt>');
					html.push('<dd><div class="list-group">');
					printTree2(child.$children);
					html.push('</div></dd>');
				}
				html.push('</dl>');
			}
			
			function printTree2(children){
				if(!children || !children.length) return;
				for(var i in children){
					var child = children[i];
					if(child.url){
						var url = child.url;
						if(url[0] !== '$' && url[0] === '/')
							url = '$model' + url;
						html.push(justep.String.format('<a class="list-group-item" href="javascript:void(0)" url="{0}" process="{1}" activity="{2}">{3}</a>', 
							url, child.process, child.activity, child.label));
					}
					printTree2(child.$children);
				}
			}
			printTree(funcsData.$children);
			
			html.push('</div>');
			html = html.join('');
			$(html).appendTo($content).on('click', 'a', function(event){
				var url = $(this).attr('url'),
					options = {process: $(this).attr('process'), activity: $(this).attr('activity')}
				justep.Portal.openWindow(url, options);
			});
			
		}
	};

	Model.prototype.logoutClick = function(event){
		justep.Portal.logout();
	};

	Model.prototype.modelLoad = function(event){
		//init functree
		this.initFunctionTree();
	};

	return Model;
});