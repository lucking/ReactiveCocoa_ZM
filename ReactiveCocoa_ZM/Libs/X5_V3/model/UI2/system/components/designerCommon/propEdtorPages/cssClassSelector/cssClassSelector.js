define(function(require){
	var $ = require("jquery"),
		bind = require("bind"),
		Radio = require("$UI/system/components/justep/button/radio"),
		Checkbox = require("$UI/system/components/justep/button/checkbox"),
		justep = require('$UI/system/lib/justep'),
		xuiService = require("../../js/xuiService");
	
	var Model = function(){
		this.callParent();
	};
	
	var NONE = '_none_',
		rowTemp = "<li>" + 
	    '<div class="x-row x-responsive-md">' + 
	      '<div class="x-col x-col-20"><span class="title-here">{0}<span></div>' +  
	      '<div class="x-col value-here"></div>' + 
	    "</div>" + 
    "</li>";

	Model.prototype.modelLoad = function(event){
		var initData = xuiService.getPageParams();// 获取初始化数据
		//初始化原始值
		this.initValue(initData.propValue);
		//初始化配置
		this.initConfig(initData.editorParameter);

		//依据配置画row
		for(var i in this.config){
			this.renderRow(i, this.config[i]);
		}
		
		//其它输入框的值, 这里this.values已经去掉了已经出现过的class
		this.comp("otherInput").val(Object.keys(this.values).join(' '));
	};
	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function(){
		var result = {};
		
		for(var i in this.config){
			var cfg = this.config[i];
			if(cfg.require && !cfg.singleSelect){
				for(var i in cfg.values){
					result[cfg.values[i]] = true;
				}
			}else if(cfg.singleSelect){
				var value; 
				$('.x-radio>input', cfg.el).each(function(){
					if(this.checked){
						value = $(this).val();
						return false;
					}
				});
				if(value && value != NONE)
					result[value] = true;
			}else{
				var value; 
				$('.x-checkbox>input', cfg.el).each(function(){
					if(this.checked){
						value = $(this).val();
						result[value] = true;
					}
				});
			}
		}

		var other = this.comp("otherInput").val();
		other = normal(other);
		justep.Util.apply(result, other);
		
		return Object.keys(result).join(' ');
	};
	Model.prototype.renderRow = function(name, cfg){
		var li = $(justep.String.format(rowTemp, cfg.label));
		justep.Bind.addNode($('#customized').parent().get(0), li.get(0), $('#customized').get(0));

		var valueHere = $('.value-here', li);
		
		if(cfg.singleSelect){//单选

			if(!cfg.require){
				//创建空选项
				var value = cfg.values[i];
				new Radio({parentNode: valueHere.get(0), value: NONE, name: name, label: 'none', checked: true});
			}

			for(var i in cfg.values){
				var value = cfg.values[i];
				new Radio({parentNode: valueHere.get(0), value: value, name: name, label: value, checked: !!this.values[value]});
				//删除已经出现的class
				delete this.values[value];
			}
			
			//这里记录了节点, 为了收集结果
			cfg.el = valueHere;
		}else{
			if(cfg.require){//必选
				valueHere.html(cfg.values.join(' '));
				for(var i in cfg.values){
					//删除已经出现的class
					delete this.values[cfg.values[i]];
				}
			}else{//可选
				for(var i in cfg.values){
					var value = cfg.values[i];
					new Checkbox({parentNode: valueHere.get(0), value: value, name: name, label: value, checked: !!this.values[value]});
					//删除已经出现的class
					delete this.values[value];
				}
				
				//这里记录了节点, 为了收集结果
				cfg.el = valueHere;
			}
		}	
	};
	
	function normal(value){
		var values = {}, temp = value.split(' ');
		temp.forEach(function(name){
			name = name.trim(); 
			if(name)
				values[name] = true;
		});
		return values;
	}
	
	Model.prototype.initValue = function(value){
		this.oldValue = value; //原始值
		this.values = normal(value); //原始值
	};
	
	Model.prototype.initConfig = function(data){
		var config = this.config = {};
		for(var i in data){
			var item = data[i];
			var cfg = config[i] = {};
			cfg.label = item.label;
			cfg.require = (item.require === undefined)? true : item.require;//默认是需要的
			if(item.value.indexOf('|')!=-1){
				cfg.singleSelect = true;
				cfg.values = item.value.split('|');
			}else if(item.value.indexOf(',')!=-1){
				cfg.multiSelect = true;
				cfg.values = item.value.split(',');
			}else	
				cfg.values = item.value.split(',');
		}
	};
	
	function createData(config){
	
	};
	function newData(config){
		return new Data(this,{xid:'mainData',defCols:{
			sValue : {
				type : 'String',
				label : 'value'
			}
		},
		idColumn : 'SA_Task'});
	}
	
	return Model;
});
