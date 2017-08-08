define(function(require) {
	var $ = require("jqueryEx");
	var comConfig = window.componentConfig;// require("comConfig");
	var selectCls = "xui-hignlight-selected";
	var selectCls = "xui-hignlight-selected";
	var baseMode = require("$UI/system/lib/base/modelBase");
	var context = require("$UI/system/lib/base/context");
	var Component = require("$UI/system/lib/base/component");
	var bind = require("bind");
	var webSocket = require("$UI/system/components/designerCommon/js/webSocketMng");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var justep = require('$UI/system/lib/justep');

	// function rebuildUrl(url){
	// if(url.substring(0,4) != "http"){
	// if(url.indexOf(uiPath) !=-1){
	// var basePath = uiPath.substring(0,uiPath.lastIndexOf("/"));
	// var path = url.substring(basePath.length);
	// var idx = path.indexOf("/",2);
	// var UIDirName = path.substring(1,idx);
	// var version = getVersion(path,UIDirName);//必须加上版本号，否则jetty 对ajax的同步请求报错
	// url =
	// "/"+(webSocket.getRequestParameter("contextPathName")||"x5")+version+path;
	// }
	// return
	// "http://localhost:"+webSocket.getRequestParameter("UIServerPort")+url;
	// }
	// return url;
	// }

	/** 获取版本 */
	// function getVersion(path,UIDirName){
	// var version = "";
	// var url =
	// "http://localhost:"+webSocket.getRequestParameter("UIServerPort")+"/"+(webSocket.getRequestParameter("contextPathName")||"x5")+"/"+UIDirName+"/system/service/common/vls.j?path="+path;
	// $.ajax({
	// async : false,
	// dataType:'html',
	// type : 'GET',
	// url : url,
	// success : function(data) {
	// version = "/"+data;
	// },
	// error : function(xhr,status,err) {
	// concole.log("获取版本出错："+[status,xhr.readyState,err]);
	// }
	// });
	// return version;
	// }
	/**
	 * 重写ajax方法，所有ajax请求都执行UIServer
	 */
	// var tempAjax = $.ajax;
	// $.ajax = function(url,options){
	//		
	// if(typeof url == 'string'){
	// url = rebuildUrl(url);
	// }else if(typeof url == 'object' && url.url){
	// url.url = rebuildUrl(url.url);
	// }else if(options && options.url){
	// options.url = rebuildUrl(options.url);
	// }
	// return tempAjax(url,options);
	// };
	var DModel = baseMode.extend({
		constructor : function() {
			this.__context = new context({});
			this.callParent();
		}
		
	});
	var dModel = new DModel();

	Component.addComponent = function(parentElement, component, targetElement) {
		var currentElement = targetElement || (component?component.domNode:null);
		if(currentElement){
			var xid = currentElement.getAttribute("xid");
			if (xid) {
				currentElement.setAttribute("id", dModel.getContextID() + "_" + xid);
			}
		}

		bind.addComponent(parentElement, component, targetElement);

		if (component.setModel) {
			component.setModel(dModel);
		}

		if (component.init) {
			var result = component.init();
			if (component.inited && !(result && result['dependence'])) {
				component.inited();
			}
		}
	};
	function loadCSS(cssFile) {
		if (cssFile.substring(0, 1) == "/") {
			cssFile = "../../../../../model" + cssFile;
		}
		var html_doc = document.getElementsByTagName('head')[0];
		var childNodes = html_doc.childNodes;
		for ( var i = 0; i < childNodes.length; i += 1) {
			var childNode = childNodes[i];
			if (childNode.nodeType == 1 && childNode.tagName == 'LINK') {
				var href = childNode.getAttribute("href");
				if (href && href.indexOf(cssFile) != -1) {
					childNode.setAttribute('href', cssFile + "?version=" + new Date().getTime());
					return;
				}
			}
		}
		var css = document.createElement('link');
		css.setAttribute('rel', 'stylesheet');
		css.setAttribute('type', 'text/css');
		css.setAttribute('href', cssFile + "?version=" + new Date().getTime());
		html_doc.appendChild(css);
	}

	var SelectionBox = function(ownerElement, canvasElement) {
		this.color = 'red';
		this.borderType = 'solid';

		this.ownerElement = ownerElement;
		this.canvasElement = canvasElement;
		this.paint();
		ownerElement.selectionBox = this;
	}

	SelectionBox.prototype = {
		_paintLine : function(pe, cssText, isExsit) {
			var line = document.createElement("div");
			pe.appendChild(line);
			line.style.cssText = cssText;
			line.className = "selected-outerline";
			return line;
		},

		paint : function() {
			var offsetLeft = $(this.canvasElement).offset().left-6;
			var scale = 1;// this.ownerCom.canvas.currentScale;
			var bound = $(this.ownerElement).getBound();
			var containerOffset = $(this.canvasElement).offset();
			var l = bound.x + containerOffset.left - offsetLeft, t = bound.y + containerOffset.top, w = bound.w * scale, h = bound.h * scale;

			var color = this.color;
			var borderWidth = 1;
			var borderType = this.borderType;
			var commonStyle = ";opacity:0.5;overflow:visible;font-size:0px;z-index:12200;position:absolute;";
			var styles = [];// l,t,r,b
			h -= 1;
			w -= 1;
			var pe = document.body;
			if (!this.lines) {
				styles.push("top:" + t + "px;left:" + l + "px;width:1px;height:" + h + "px;line-height:0px;" + ";border-left:" + borderWidth + "px " + borderType + " " + color + commonStyle);// left

				styles.push("top:" + t + "px;left:" + l + "px;width:" + w + "px;height:1px;line-height:0px;" + ";border-top:" + borderWidth + "px " + borderType + " " + color + commonStyle);// top

				styles.push("top:" + (t) + "px;left:" + (l + w) + "px;width:1px;height:" + (h + borderWidth) + "px;line-height:0px;" + ";border-left:" + borderWidth + "px " + borderType + " " + color
						+ commonStyle);

				styles.push("top:" + (t + h) + "px;left:" + l + "px;width:" + w + "px;height:1px;line-height:0px;" + ";border-top:" + borderWidth + "px " + borderType + " " + color + commonStyle);
				this.lines = [];
				for ( var i = 0, l = styles.length; i < l; i++) {
					this.lines.push(this._paintLine(pe, styles[i]));
				}
			} else {
				$(this.lines[0]).css({
					top : t + "px",
					left : l + "px",
					height : h + "px"
				});
				$(this.lines[1]).css({
					top : t + "px",
					left : l + "px",
					width : w + "px"
				});
				$(this.lines[2]).css({
					top : t + "px",
					left : (l + w) + "px",
					height : (h + borderWidth) + "px"
				});
				$(this.lines[3]).css({
					top : (t + h) + "px",
					left : l + "px",
					width : w + "px"
				});
			}
			this.bound = bound;
		},

		setBound : function(bound) {
			this.paint(bound);
		},

		getBound : function() {
			return this.bound;
		},

		hide : function() {
			this.show(false);
		},

		show : function(visible) {
			var lines = this.lines, resizeBoxes = this.resizeBoxes;
			if (lines) {
				for ( var i = 0, v; v = lines[i]; i++) {
					v.style.display = (visible == false ? "none" : "");
				}
			}
			if (resizeBoxes) {
				for ( var i = 0, v; v = resizeBoxes[i]; i++) {
					v.style.display = (visible == false ? "none" : "");
				}
			}
		},

		dispose : function() {
			if (this.lines) {
				for ( var i = 0, l = this.lines.length; i < l; i++) {
					this.lines[i].parentNode.removeChild(this.lines[i]);
				}
			}
			if (this.resizeBoxes) {
				for ( var i = 0, l = this.resizeBoxes.length; i < l; i++) {
					this.resizeBoxes[i].ownerElement = null;
					this.resizeBoxes[i].parentNode.removeChild(this.resizeBoxes[i]);
				}
				this.resizeBoxes = null;
			}
			this.ownerElement.selectionBox = null;
			delete this.ownerElement.selectionBox;
			this.lines = null;
			this.ownerElement = null;
			this.parentElement = null;
		}
	}

	function findElement(id) {
		return $("*[d_id='" + id + "']")[0];
	}

	var XuiDesigner = function(options) {
		$.extend(this, options || {});
		this.ctx = {}; // 上下文信息
		this.dModel = dModel;
		this.paint();
		// this.dispatchEvent({event:'onload'});
	}

	XuiDesigner.prototype = {
		actionType : {
			READY_CREATE : 0,/* 创建 */
			CREATE : 1,/* 改变大小 */
			RESIZE : 2,/* 移动 */
			MOVE : 3,/* 选择 */
			SELECT : 4
		},// 对组件的操作类型

		/**
		 * 派发选择改变事件.
		 */
		dispatchSelectionChangedEvent : function() {
			var array = [], array1 = [];
			var selections = this.getSelections();
			for ( var i = 0, l = selections.length; i < l; i++) {
				array.push(selections[i].getAttribute("mappingTo") || selections[i].getAttribute("d_id"));
				array1.push(selections[i].getAttribute("componentName"));
			}
			var eventInfo = {
				event : "selectionChanged",
				selections : JSON.stringify(array),
				componentNames : JSON.stringify(array1)
			};
			this.dispatchEvent(eventInfo);
		},

		dispatchSaveEvent : function(actionType) {
			var eventInfo = {
				event : "save",
				actionType : actionType
			};
			this.dispatchEvent(eventInfo);
		},

		/**
		 * 派发右键菜单弹出事件.
		 */
		dispatchContextMenuEvent : function(eventInfo) {
			var array = [], array1 = [];
			var selections = this.getSelections();
			for ( var i = 0, l = selections.length; i < l; i++) {
				array.push(selections[i].getAttribute("mappingTo") || selections[i].getAttribute("d_id"));
				array1.push(selections[i].getAttribute("componentName"));
			}
			this.dispatchEvent({
				event : "contextmenu",
				selections : JSON.stringify(array),
				componentNames : JSON.stringify(array1)
			});
		},

		dispatchEvent : function(event) {
			// if(window.callJava){
			event.filePath = webSocket.getRequestParameter("filePath");
			webSocket.callJava(event);
			// }
		},

		// dispatchAfterInitEvent : function() {
		// var eventInfo = {
		// event : "afterInit"
		// };
		// this.dispatchEvent(eventInfo);
		// },

		dispatchCreateComponentEvent : function() {
			if (typeof this.insertPos == 'object') {
				var parent = this.insertPos.parent;
				var after = this.insertPos.after;
				var before = this.insertPos.before;
				var position = this.insertPos.position;
				var parentPath;
				if (!parent.getAttribute("d_id")) {
					if (!before) {
						parentPath = $(parent).getPath();
					}
					var comp = this.getOwnerComponent(parent);
					if (comp) {
						parent = comp.domNode;
					}
				}
	 
				var config = {
					event : 'createComponent',
					componentName : this.currentName,
					parentComponentId : parent ? parent.getAttribute("d_id") : "",
					parentElementId : parent ? parent.getAttribute("d_id") : "",
					parentPath : parentPath,
					after : after ? after.getAttribute("d_id") : "",
					before : before ? before.getAttribute("d_id") : "",
					position : position
				};
				if (position == 'absolute') {
					config.left = this.insertPos.left;
					config.top = this.insertPos.top;
				}
				var e;
				
				$(parentPath).trigger(e = $.Event('beforeAddChild', config));

				if (e.isDefaultPrevented()) return;
				
				var self = this;

				var currentConfig = comConfig[this.currentName];
				if (currentConfig) {
					var comClass = currentConfig["js-class"];
					if (comClass) {
						self.callBeforecreate(comClass, config);
						if (!config.cancel) {
							self.dispatchEvent(config);
						} else {
							self.endCreateComponent();
						}
					} else {
						var compPath = currentConfig["jsFilePath"] || currentConfig["owner-component"];
						if (compPath) {
							compPath = compPath.replace(window._$model, "$model");
							require([ compPath ], function() {
								window.regComponents(arguments[0]);
								comClass = currentConfig["js-class"];
								self.callBeforecreate(comClass, config);
								if (!config.cancel) {
									self.dispatchEvent(config);
								} else {
									self.endCreateComponent();
								}
							});
							return;
						} else {
							self.dispatchEvent(config);
						}
					}
				}
			}
		},

		callBeforecreate : function(comClass, config) {
			if (comClass && comClass.onBeforeCreate) {
				var templateText = xuiDoc.getCompTemplate(config.componentName);// 需要改成异步
				config.template = justep.XML.fromString(templateText).documentElement;
				comClass.onBeforeCreate(config);
				config.templateContent = typeof config.template == 'string' ? config.template : $(config.template).xml();
				delete config.template;
			}
		},

		dispatchAfterCreateEvent : function(id) {
			var eventInfo = {
				event : "afterCreate",
				id : id
			};
			this.dispatchEvent(eventInfo);
		},

		/**
		 * 派发组件样式改变事件.
		 */
		dispatchStyleChangedEvent : function() {
			var array = [], array1 = [];
			var selections = this.getSelections();
			for ( var i = 0, l = selections.length; i < l; i++) {
				var element = selections[i];
				array.push(element.getAttribute("d_id"));

				var style = element.style;
				var isAbsolute = element.style.position == 'absolute' ? true : false;
				array1.push({
					left : isAbsolute ? ((style.left || 0) + "") : '',
					top : isAbsolute ? ((style.top || 0) + "") : '',
					width : style.width + "",
					height : style.height + ""
				});
			}
			this.dispatchEvent({
				event : "boundChanged",
				selections : JSON.stringify(array),
				bound : JSON.stringify(array1)
			});
		},
		/**
		 * 派发删除当前选择的组件的事件.
		 */
		dispatchRemoveSelectionsEvent : function() {
			var array = this.getSelectionIds();
			var paths = this.getSelectionPaths();
			if (array.length == 0) {
				return;
			}
			var eventInfo = {
				event : "removeSelections",
				selections : array,
				clientPaths : paths
			};
			this.dispatchEvent(eventInfo);
		},

		dispatchLocationChangedEvent : function(oldClientPath) {
			var insertPos = this.ctx.cursorPos;
			if (insertPos) {
				var parent = insertPos.parent;
				var before = insertPos.before;
				var selections = this.getSelections();
				if (selections.length == 0) {
					return;
				}

				this.dispatchEvent({
					event : "locationChanged",
					d_id : selections[0].getAttribute("d_id"),
					oldClientPath : oldClientPath,
					newClientPath : $(selections[0]).getPath(),
					targetId : parent ? parent.getAttribute("d_id") : "",
					refId : before ? before.getAttribute("d_id") : ""// ,
				// rowIdx:rowIdx,
				// colIdx:colIdx,
				// oldRowIdx:oldRowIdx,
				// oldColIdx:oldColIdx
				});
			}
		},

		resetCtx : function() {
			this.ctx.isMouseDown = false;
			this.ctx.mouseDownPos = null;// 鼠标按下的位置
			this.ctx.mouseDownCom = null;// 鼠标按下时的组件
			this.ctx.action = null;
			this.ctx.currentCom = null;
			this.ctx.cursorPos = null;
			this.ctx.cursorRefE = null;
			this.ctx.selectedElement = null;

		},
		/**
		 * 初始化数据-解析当前window的布局信息为可视化模拟组件.
		 */
		initData : function(config) {
			this.isExtend = config.isExtend;
			var isMobile = config.filePath.indexOf(".mobile.w") != -1;
			this.element.parentNode.parentNode.className = isMobile ? "mobile-ui" : "pc-ui";
			 this.loadCSS(config);
			this.isInit = true;
			try {
				this.reset();
				this.element.innerHTML = "";
				var currentElement = $(config.template).appendTo(this.element)[0];
				var resolution = webSocket.getRequestParameter("resolution");//currentElement.getAttribute("resolution");
				this.setResolution(resolution);
				this.paintComponent({
					element : currentElement
				});

				// console.log(this.getAllOperation());
			} finally {
				this.isInit = false;
			}
			// this.dispatchAfterInitEvent();

		},
		
		setResolution : function(resolution){
			if(resolution){
				var items = resolution.split("x");
				if(items.length == 2){
					var w = parseInt(items[0],10);
					var h = parseInt(items[1],10);
					if(!isNaN(w) && !isNaN(h)){
						this.parentElement.style.cssText = "width:"+w+"px;height:"+h+"px;margin:auto;";						
					}
				}
			}else{
				this.parentElement.style.cssText = "";
			}
		},

		loadCSS : function(config) {
			var cssFilePaths = config.cssFilePaths;
			if (cssFilePaths) {
				for ( var i = 0; i < cssFilePaths.length; i += 1) {
					loadCSS( cssFilePaths[i]);
				}
			}
		},

		isSelected : function(element) {
			return $(element).hasClass(selectCls);
		},
		/**
		 * 双击工具箱的组件项创建组件
		 */
		dbClickCreateComponent : function() {
			if (this.currentName) {
				var selections = this.getSelections();
				for ( var i = 0, l = selections.length; i < l; i++) {
					var parent = selections[i];
					var com = this.getComponent(parent);
					if (com && com.insertValidate) {
						if (!com.insertValidate(parent, this.currentName)) {
							this.endCreateComponent();
							return 'false';
						}
					}

					if (!this.canAddChild(parent, this.currentName)) {
						this.endCreateComponent();
						return 'false';
					}
					var componentName = this.currentName;

					this.dispatchEvent({
						event : 'createComponent',
						componentName : componentName,
						parentComponentId : parent ? parent.getAttribute("d_id") : "",
						parentElementId : parent ? parent.getAttribute("d_id") : "",
					// position:pos?'absolute':undefined,
					// rowIdx:rowIdx,colIdx:colIdx,
					// isInCellLayout:isInCellLayout,
					// x : pos?pos.x:5,
					// y : pos?pos.y:5
					});
					this.endCreateComponent();

					return;
				}
			}
		},
		
		setCursorStyle : function(styleName) {
			this.element.style.cursor = styleName;
		},

		showSizeTip : function($targetElement) {
			if (!this.sizeTip) {
				this.sizeTip = $("<div style='position:absolute;height:14px;padding:2px;background:#FFFFB9;font-size:10px;'></div>").appendTo(this.element);
			}
			var offset = $targetElement.offset();
			var top = offset.top;
			var left = offset.left + $targetElement.width() / 2 - 14;

			this.sizeTip.css({
				top : top,
				left : left
			}).html($targetElement.css("width") + "," + $targetElement.css("height"));
		},

		showCompTip : function($targetElement) {
			if (!$targetElement) {
				this.clearCompTip();
				return;
			}

			var config = comConfig[$targetElement.attr("componentName")];
			if (!config || !$targetElement.canMove()) {//|| config["component-type"] != 'layout-container'
				this.clearCompTip();
				return;
			}
			if (!this.compTip) {
				this.compTip = $("<div class='comptip' style='position:absolute;height:16px;padding:2px;background:#CCCC33;font-size:10px;'></div>").appendTo(this.element);
			}
			this.compTip.attr("targetId", $targetElement.attr("d_id"));
			this.updateCompTip($targetElement);
		},

		clearCompTip : function() {
			if (this.compTip) {
				this.compTip.remove();
				this.compTip = null;
			}
		},

		updateCompTip : function($targetElement) {
			if (this.compTip) {
				$targetElement = $targetElement || $("*[d_id='" + this.compTip.attr("targetId") + "']:first");
			} else {
				return;
			}
			var offset = $targetElement.offset();

			var top = $targetElement.getParentScrollTop() + offset.top - 22;
			if (top < 0) {
				top = 0;
			}
			var offsetLeft = $(this.element).offset().left-6;
			var left = offset.left - 8 - offsetLeft;
			var compName = $targetElement.attr("componentName");
			if (compName) {
				var idx = compName.lastIndexOf("/");
				if (idx != -1) {
					compName = compName.substring(idx + 1);
				}
			} else {
				compName = $targetElement[0].tagName;
			}
			
			this.compTip.css({
				top : top,
				left : left
			}).html(compName);
		},

		mouseDown : function(event) {
			// this.element.focus();
			var srcE = event.target;
			var target = this.findSelectableElement(event.target);
			// debugger;

			// 记录上下文信息
			this.ctx.mouseDownPos = {
				x : event.clientX,
				y : event.clientY
			};// 鼠标按下的位置
			this.ctx.selectedElement = target;// 当前选中的元素
			this.ctx.mouseDownElement = srcE;// 鼠标按下时的元素
			this.isDrag = false;
			this.ctx.isMouseDown = true;
			// println(["===b===",target.outerHTML,event.whick,this.ctx.selectedElement,event.clientY]);
			if (this.ctx.action == null) {
				if (srcE == this.element) {
					return;
				}
				if (srcE.getAttribute('isResizeBox') == 'true') {
					this.executeResize(event, this);
					return;
				}
				if (!target) {
					this.clearSelections();
					this.clearResizeBoxes();
					return;
				}
				var overflow = $(target).css("overflow");
				if ((overflow != 'visible' && overflow != 'hidden') && (target.scrollWidth > target.offsetWidth || target.scrollHeight > target.offsetHeight)) {
					var scrollTop = $(target.parentNode).getParentScrollTop();
					var scrollLeft = $(target.parentNode).getParentScrollLeft();
					// debugger;
					if (!(target.tagName == 'TD' || target.tagName == 'SPAN' || ((event.clientY + scrollTop) <= target.clientHeight && (event.clientX + scrollLeft) <= target.clientWidth))) {
						return;
					}
				}

				this.executeSelect(event, target);
			}
			// /println(["======",event.target,event.whick,this.ctx.selectedElement,event.clientY]);
		},

		mouseUp : function(event) {
			if(event.button != 2){ 
				this.dispatchEvent({
					event : 'hideMenu'
				});
			}

			if (this.ctx.action == null) {
				if (event.button == 2) {
					this.dispatchContextMenuEvent();
				} else {
					this.executeSelect(event, event.target);
				}
			} else if (this.ctx.action == this.actionType.READY_CREATE) {
				if (event.button == 2) {
					this.endCreateComponent();
					return;
				}
				if (this.insertPos && typeof this.insertPos == 'object') {
					this.dispatchCreateComponentEvent();
					this.hideCursor();
				} else {
					this.endCreateComponent();
				}
			} else if (this.ctx.action == this.actionType.MOVE) {
				this.endMove(this);
			}
			this.resetCtx();
		},

		mouseMove : function(event) {
			var self = this;
			var currentE = event.target;
			if (this.ctx.action == this.actionType.RESIZE) {
				return;
			}

			if (this.ctx.action == this.actionType.READY_CREATE) {
//				console.log("===>"+event.ctrlKey);
				this.allowAllElementAddChild = event.ctrlKey;
				if (currentE.getAttribute("name") != 'cursor') {
					 
					this.insertPos = self.calcuInsertPos(this.currentName, currentE, event.clientX, event.clientY);
					if (!(typeof this.insertPos == 'object')) {
						this.insertPos == null;
						this.hideCursor();
					}
					this.setCursorStyle(this.insertPos ? "crosshair" : "not-allowed");
				}
			} else if (this.ctx.action == this.actionType.MOVE) {
				if (event.which == 1) {
					this.moving(event);
					// if(this.absTargets && this.absTargets.length>0){
					// for(var i = 0,l=this.absTargets.length;i<l;i+=1){
					// var target = this.absTargets[0];
					// var dx = event.clientX - this.ctx.mouseDownPos.x;
					// var dy = event.clientY - this.ctx.mouseDownPos.y;
					// target.$element.css("top",target.top +
					// dy).css("left",target.left+dx);
					// this.reSelect(target.$element[0]);
					// this.repaintResizeBoxes();
					// }
					// }else{
					// var offset = $(self.element).offset();
					// this.ctx.cursorPos =
					// self.calcuInsertPos(this.ctx.selectedElement,currentE,event.clientX,event.clientY);
					// if(!(typeof this.ctx.cursorPos == 'object')){
					// this.ctx.cursorPos = null;
					// this.hideCursor();
					// }
					// }
				} else {
					this.resetCtx();
					this.endMove(this);
				}
			} else if (event.which == 1 && this.ctx.selectedElement != null && (Math.abs(event.clientY - this.ctx.mouseDownPos.y) > 5 || Math.abs(event.clientX - this.ctx.mouseDownPos.x) > 5)
					&& $(this.ctx.selectedElement).canMove()) {
				this.startMove(event);
				// this.ctx.action = this.actionType.MOVE;
				// var selections = this.getSelections();
				// var absTargets = [];
				// for(var i = 0;i<selections.length;i+=1){
				// var $e = $(selections[i]);
				// if($e.css("position") == 'absolute' && $e.canMove()){
				// var top = parseInt($e.css("top"));
				// var left = parseInt($e.css("left"));
				// absTargets.push({$element:$e,top:isNaN(top)?0:top,left:isNaN(left)?0:left});
				// }
				// }
				// if(absTargets.length ==0){
				// self.element.style.cursor = "crosshair";
				// }
				// this.absTargets = absTargets;
			}
		},

		moving : function(event) {
			var absTargets = this.ctx.absTargets;
			if (absTargets.length > 0) {
				// 绝对位置下的移动
				var dx = event.clientX - this.ctx.mouseDownPos.x;
				var dy = event.clientY - this.ctx.mouseDownPos.y;
				var currentBound = this.ctx.currentBound;
				var currentParent = this.ctx.currentParent;
				var minX = currentBound.x, minY = currentBound.y;

				if (dx == 0 && dy == 0) {
					return;
				}

				if (currentParent) {
					currentBound.x = Math.max(minX + dx, 5); // 不允许拖出左边界或者上边界,最小坐标为5
					currentBound.y = Math.max(minY + dy, 5);
					// currentBound = this.autoAlign(currentBound,
					// otherBounds,currentParent);//执行自动对齐后返回新的坐标点
					// println(JSON.stringify(currentBound)+"=="+dx+"=="+dy);
				}

				for ( var i = 0, l = absTargets.length; i < l; i += 1) {
					var target = absTargets[i];
					var dx = event.clientX - this.ctx.mouseDownPos.x;
					var dy = event.clientY - this.ctx.mouseDownPos.y;

					// x = oldPos[i].x +(currentBound.x-minX);
					// y = oldPos[i].y +(currentBound.y-minY);

					target.$element.css("top", target.top + dy).css("left", target.left + dx);
					this.reSelect(target.$element[0], true);
				}
			} else {
				this.ctx.cursorPos = this.calcuInsertPos(this.ctx.selectedElement, event.target, event.clientX, event.clientY);
				if (!(typeof this.ctx.cursorPos == 'object')) {
					this.ctx.cursorPos = null;
					this.hideCursor();
				}
			}
		},

		startMove : function() {
			var selections = this.getSelections();
			var l = selections.length;
			var minX = 10000, minY = 10000, maxX = 0, maxY = 0;
			var isAbsPos;
			// var mostLeftElm;//记录最左边最上边的一个控件
			// var mostTopElm;//记录最上边最左边的一个控件
			var absTargets = [];
			var canMoveCount = 0;
			for ( var i = 0; i < l; i++) {
				var $e = $(selections[i]);
				if (!$e.canMove()) {
					return;
				}
				canMoveCount += 1;
				var bound = $e.getBound(true);
				if (isAbsPos !== false) {
					isAbsPos = $e.css("position") == 'absolute' && $e.canMove();
				}
				if (isAbsPos) {
					var top = parseInt($e.css("top"));
					var left = parseInt($e.css("left"));
					bound.x = left;
					bound.y = top;
					absTargets.push({
						$element : $e,
						top : top,
						left : left
					});
				}

				minX = Math.min(minX, bound.x);
				minY = Math.min(minY, bound.y);
				maxX = Math.max(maxX, bound.x + bound.w);
				maxY = Math.max(maxY, bound.y + bound.h);
			}

			var otherBounds;// 存储没有选择的组件的bound，主要是用于自动对齐
			var pe;
			if (isAbsPos) {
				otherBounds = [];
				pe = selections[0].parentNode;
				if (pe) {

					var childNodes = pe.childNodes;
					for ( var i = 0, ll = childNodes.length; i < ll; i++) {
						if (childNodes[i].nodeType == 1) {
							var $childNode = $(childNodes[i]);
							if (!$childNode.hasClass(selectCls) && $childNode.attr("d_id")) {
								var bound = $childNode.getBound(true);
								bound.y = parseInt($childNode.css("top"));
								bound.x = parseInt($childNode.css("left"));
								otherBounds.push(bound);
							}
						}
					}
				}
			}
			if (!isAbsPos && l > 1) {// 非绝对布局下一次只能移动一个组件
				return;
			}

			this.ctx.action = this.actionType.MOVE;
			this.ctx.currentBound = {
				x : minX,
				y : minY,
				w : maxX - minX,
				h : maxY - minY
			}; // 当前选择图形的区域信息

			this.ctx.otherBounds = otherBounds;
			this.ctx.currentParent = pe;
			this.ctx.absTargets = absTargets;
			if (absTargets.length == 0) {
				this.element.style.cursor = "crosshair";
			}

			// debugger;
		},

		keyDown : function(event) { 
			var selections = this.getSelections();
			var count = selections.length;
			if (count > 0) {
				switch (event.keyCode) {
				case 46:
					this.dispatchRemoveSelectionsEvent();// 按delete键删除
					return;
				case 27:
					this.resetCtx();
					this.endMove(this);
					this.upToSelectParent();// 按Esc键向上选择父组件
					return;
				}
			}

			if (event.ctrlKey) {
				if (event.keyCode == 89) {
					this.dispatchEvent({
						event : 'redo'
					});
				} else if (event.keyCode == 90) {
					this.dispatchEvent({
						event : 'undo'
					});
				} else if (event.keyCode == 83) {
					this.dispatchSaveEvent("save");
				} else if (event.keyCode == 67) {// copy
					this.dispatchEvent({
						event : 'copy'
					});
				} else if (event.keyCode == 88) {// cut
					this.dispatchEvent({
						event : 'cut'
					})
				} else if (event.keyCode == 86) {// paste
					this.dispatchEvent({
						event : 'paste'
					})
				}
			}
		},
		
		afterUndo : function(config){
			var ids = config.ids;
			if(ids){
				for(var i = 0;i<ids.length;i+=1){
					var $e = $("*[d_id='"+ids[i]+"']:first");
					if($e.length>0){
						$e.trigger($.Event('childUndoRedo'), {});
					}
				}
			}
		},
		
		afterRedo : function(config){
			this.afterUndo(config);
		},

		endMove : function(self) {
			if (this.ctx.absTargets && this.ctx.absTargets.length > 0) {
				// this.clearAlighLine(this.ctx.currentParent)
				this.ctx.action = null;
				this.ctx.currentBound = null; // 当前选择图形的区域信息
				this.ctx.otherBounds = null;
				this.ctx.currentParent = null;
				this.ctx.absTargets = null;
				this.dispatchStyleChangedEvent();
				return;
			}
			self.element.style.cursor = "default";
			var cursorPos = self.ctx.cursorPos;
			var target = self.ctx.selectedElement;
			if (cursorPos && typeof cursorPos == 'object') {
				var oldPath = $(target).getPath();
				target.parentNode.removeChild(target);
				if (cursorPos.before) {
					$(target).insertBefore($(cursorPos.before));
				} else if (cursorPos.after) {
					$(target).insertAfter($(cursorPos.after));
				} else {
					$(target).appendTo($(cursorPos.parent));
				}
				self.paintResizeBoxes(target);
				if (target.selectionBox) {
					target.selectionBox.paint();
				}

				self.dispatchLocationChangedEvent(oldPath);
			}
			self.hideCursor();
		},

		/**
		 * 改变父,主要是在撤销与重做的操作时调用.
		 */
		changeLocation : function(config) {
			var id = config.id;
			var targetId = config.targetId;
			var refId = config.refId;
			var clientPath = config.clientPath;
			var current = findElement(id);
			var target = findElement(targetId);
			var ref;

			if (current) {

				var parentE = current.parentNode;
				parentE.removeChild(current);
				if (clientPath) {
					ref = $(clientPath);
				} else if (refId) {
					ref = $(findElement(refId));
				}
				if (target && target.tagName == 'TD' && $(target).isEmptyNode()) {
					target.innerHTML = "";
				}

				if (ref && ref.length > 0) {
					ref.before(current);
				} else if (clientPath) {
					var idx = clientPath.lastIndexOf(">");
					clientPath = clientPath.substring(0, idx);

					$(clientPath)[0].appendChild(current);
				} else if (target) {
					target.appendChild(current);
				}
				if (current.selectionBox) {
					current.selectionBox.paint();
					this.repaintResizeBoxes();
				}
			}
		},

		/**
		 * 设置选择父组件 .
		 */
		upToSelectParent : function() {
			var selections = this.getSelections();
			var currentCom;
			var element = this.findSelectableElement(selections[0].parentNode);
			if (element) {
				this.setSelection(element);
				this.dispatchSelectionChangedEvent();
			}
		},

		/**
		 * 重新对画布进行初始设置.
		 */
		reset : function() {
			this.clearSelections();
			this.clearResizeBoxes();
			this.resetCtx();
		},

		startCreateComponent : function(params) {
			this.initParams = arguments;
			this.ctx.action = this.actionType.READY_CREATE;
			this.currentName = params.componentName;
			this.element.style.cursor = "crosshair";
		},

		setSelectionByIds : function(config) {
			var ids = config.ids;
			var targetElements = [];
			var i;
			for ( i = 0; i < ids.length; i++) {
				var e = $("*[d_id='" + ids[i] + "'][d_selectable='true']")[0];// document.getElementById(ids[i]);
				if (e) {
					targetElements.push(e);

				}
			}
			if (targetElements.length > 0) {
				this.clearSelections();
				this.clearResizeBoxes();
				for ( i = 0; i < targetElements.length; i += 1) {
					this.addSelection(targetElements[i]);
				}
			}
		},

		executeSelect : function(event, element) {
			element = this.findSelectableElement(element);
			if (!element) {
				return;
			}
			var count = $("." + selectCls).length;
			var isSelected = $(element).hasClass(selectCls);
			if (event.type == 'mousedown') {
				if (!event.ctrlKey) {
					if (!isSelected) {
						// *非Ctrl键的单选*/
						this.setSelection(element);
						this.dispatchSelectionChangedEvent();
					} else if (event.button != 2) {
						var self = this;
						setTimeout(function() {
							self.setSelection(element);
						}, 200);
					}
				}
			} else {
				if (event.ctrlKey) {
					if (isSelected) {
						this.unSelection(element);
						this.dispatchSelectionChangedEvent();
					} else {
						// *按下Ctrl键进行多选*/
						this.addSelection(element);
						this.dispatchSelectionChangedEvent();
					}
				} else if (count > 1) {
					if (event.button == 2) { // 右键
						if (isSelected) {
							return;
						}
					}
					this.setSelection(element);
					this.dispatchSelectionChangedEvent();
				}
			}
		},

		findSelectableElement : function(currentElement) {
			if (currentElement.className == 'comptip') {
				return $("*[d_id='" + currentElement.getAttribute("targetId") + "']:first")[0];
			}
			if (!currentElement || currentElement.nodeType != 1) {
				return;
			}
			var refId = currentElement.getAttribute("refId");
			if (refId) {
				currentElement = $("*[d_id='" + refId + "']")[0];
			}
			if (currentElement.getAttribute("d_selectable") == 'true') {
				return currentElement;
			} else {
				var e = this.findSelectableElement(currentElement.parentNode);
				if (e) {
					return e;
				}
			}
		},

		/** 动态调用设计器或者组件方法* */
		executeMethod : function(methodName, params) {
			
			var methodType = params.methodType;
			if (methodType == "0") { // 执行画布的方法
				if (this[methodName]) {
					return this[methodName](params);
				} else {
					alert("方法" + methodName + "不存在");
				}
			} else {
				var d_id = params["d_id"];
				var element = findElement(d_id);
				if (element) {
					var com = this.getComponent(element);
					if (com) {
						if (com && com[methodName]) {
							com[methodName](params);
							this.reSelect(element, true);
						}
					}else{
						var comName = element.getAttribute("componentName");
						if(comName){
							var cfg = comConfig[comName];
							if(cfg){
								var owner = cfg.owner;
								if(owner){
									var ownerElement = $(element).closest("*[componentName='"+owner+"']")[0];
									if(ownerElement){
										com = this.getComponent(ownerElement);
										if (com && com[methodName]) {
											com[methodName](params);
											this.reSelect(element, true);
										}
									}
								}
							}
						}
					}
				}
			}
		},

		endCreateComponent : function() {
			var self = this;
			setTimeout(function() {
				self.element.style.cursor = 'default';
				self.hideCursor();
				self.insertPos = null;
				self.resetCtx();

			}, 300);
			self.scrollHandler();
		},

		scrollHandler : function() {
			var selections = this.getSelections();
			for ( var i = 0; i < selections.length; i += 1) {
				if (selections[i].selectionBox) {
					selections[i].selectionBox.paint();
				}
			}
			this.repaintResizeBoxes();
		},

		getComponent : function(element) {
			if (!element) {
				return;
			}
			if (element.componentObj) {
				return element.componentObj;
			}
			return Component.getComponent(element);
		},

		getOwnerCompName : function(element) {
			var owner = element.getAttribute("owner");
			if (owner) {
				return owner;
			}
			var compName = element.getAttribute("componentName");
			if (compName) {
				var config = comConfig[compName];
				if (config) {
					return config.owner;
				}
			}
		},

		getOwnerComponent : function(element, ownerCompName) {
			var com = this.getComponent(element);
			if (com) {
				return com;
			}

			if (!ownerCompName) {
				ownerCompName = this.getOwnerCompName(element);
			}

			// if(!ownerCompName){
			// return;
			// }

			var p = element.parentNode;
			while (p && p.nodeType == 1) {
				com = this.getComponent(p);
				if (com) {
					if (!ownerCompName) {
						return com;
					}
					var targetConfig = com.dConfig;
					if (targetConfig && targetConfig.name == ownerCompName) {
						return com;
					}
				}
				p = p.parentNode;
			}
		},
		selectTimeout : null,

		paintComponent : function(config) {
			var self = this;
			if (config.requireList && config.requireList.length > 0) {
				for ( var i = 0; i < config.requireList.length; i += 1) {
					config.requireList[i] = config.requireList[i].replace(window._$model, "$model");
				}
				require(config.requireList, function() {
					for ( var i = 0; i < arguments.length; i += 1) {
						window.regComponents(arguments[i]);
					}
					delete config.requireList;
					self.paintComponent(config);
				});
				return;
			}

			var element = config.element || config.template;
			var parentElementId = config.parentElementId;
			var before = config.before;
			var clientPath = config.clientPath;

			var parentElement = config.parentElement;
			if (clientPath) {
				before = $(clientPath)[0];
				if (before) {
					parentElement = before.parentNode;
				} else {
					parentElement = $(clientPath.substring(0, clientPath.lastIndexOf(">")))[0];
				}
			}
			// debugger;
			if (typeof element == 'string') {
				element = $(element)[0];
			}

			// if(!element.getAttribute("d_id") ||
			// element.getAttribute("ownerId")){
			// this.paintChildComponent(element);
			// return;
			// }

			if (!parentElement && parentElementId) {
				var parentE;
				$("*[d_id='" + parentElementId + "']").each(function() {
					var canAddChild = this.getAttribute("d_canAddChild");
					if (canAddChild == 'true' || self.allowAllElementAddChild) {
						parentE = this;
						return false;
					} else if (!canAddChild) {
						parentE = this;
					}

				});
				parentElement = parentE;// $("*[d_id='"+parentElementId+"'][d_canAddChild='true']")[0];
			}
			var parentPath = config.parentPath;
			if (parentPath) {
				parentElement = $(parentPath)[0];
			}
			if (before && typeof before == 'string') {
				before = $("*[d_id='" + before + "']")[0];
			}
			if (before) {
				$(before).before(element);
			} else if (parentElement) {
				parentElement.appendChild(element);
			}
			if (element.tagName == "DIV") {
				element.onscroll = function() {

				}
			}
			if (element.tagName == 'INPUT') {
				var type = element.getAttribute("type");

				// if(type == 'radio' || type=='checkbox'){
				// element.setAttribute("disabled","disabled");
				// }else{
				// element.setAttribute("readonly","readonly");
				// }
			}
			var componentName = element.getAttribute("componentName");
			var xid = element.getAttribute("xid");
			if (xid) {

				element.setAttribute("id", this.dModel.getContextID() + "_" + xid);
			}
			var currentConfig = comConfig[componentName];
			if (currentConfig) {
				var comClass = currentConfig["js-class"];
				if (currentConfig["resizable"] == 'false') {
					$(element).resizable(false);
				}
				if (currentConfig["can-add-child"] == 'false') {
					$(element).canAddChild(false);
				}
				if (currentConfig["can-move"] == 'false') {
					$(element).canMove(false);
				}

				if (comClass) {
					//element.setAttribute("tabindex", "1");  
					element.onfocus = function(e){
						console.log("----------->onfocus");
						e.preventDefault(); 
						e.stopPropagation(); 
					}
					var com = new comClass({
						templateNode : element
					});
					com.dConfig = currentConfig;
					com.ownerDesigner = this;
					com.xuiDoc = xuiDoc;
					if (com.setModel) {
						com.setModel(this.dModel);
					}

					if (com.init) {
						var result = com.init();
						if (com.inited && !(result && result['dependence'])) {
							com.inited();
						}
					}
					// if(!(com instanceof Component)){
					element.componentObj = com;
					// }
					element = com.domNode || element;
					element.onscroll = function() {
						self.scrollHandler();
					};
				} else {
					// var componentPath = element.getAttribute("component");
					// if(componentPath){
					// require([componentPath],function(){
					// regComponents(arguments[0]);
					// comClass = currentConfig["js-class"];
					// self.callBeforecreate(comClass,config);
					// if(!config.cancel){
					// self.dispatchEvent(config);
					// }else{
					// self.endCreateComponent();
					// }
					// });
					// return;
					// }

					var xid1 = element.getAttribute("xid");
					if ((!this.isExtend || this.isExtend != 'false') && !xid1) {
						element.setAttribute("d_resizable", "false");
					}
					if (element.tagName == "div") {
						element.setAttribute("tabindex", "1");
					}//else if(element.tagName == 'img'){

					element.setAttribute("d_isHtmlTag", "true");
					element.removeAttribute("onclick");
					//element.removeAttribute("onClick");

				}
			}

			this.paintChildComponent(element);
			
			this.endCreateComponent();
			if (config.autoSelect) {
				setTimeout(function() {
					self.setSelection(element);
					self.dispatchSelectionChangedEvent();
				}, 100);
				$(element).trigger($.Event('childChanged'), {
					target : element,
					type : 'add'
				});
			}
		},

		paintChildComponent : function(element) {
			var childNode = element.firstChild;
			while (childNode) {
				if (childNode.nodeType == 1) {
					this.paintComponent({
						element : childNode
					});
				}
				childNode = childNode.nextSibling;
			}
		},

		repaintComponent : function(config) {
			var d_id = config["d_id"];

			config.autoSelect = true;
			var je = $("*[d_id='" + d_id + "']");
			this.clearResizeBoxes();
			this.unSelection(je[0]);
			config.clientPath = je.getPath();
			je.remove();
			this.paintComponent(config);

			var element = findElement(d_id);
			if (element) {
				this.setSelection(element);
			}
			element.focus();
		},

		onBuildMenu : function(event) {
			var target = event.target;
			if ("false" == target.getAttribute("d_canRemove")) {
				event.enableStatus = {
					cut : false,
					removeSelections : false
				};
			}
		},

		onRemove : function(event) {
			var target = event.target;
			if ("false" == target.getAttribute("d_canRemove")) {
				event.cancel = true;
			}
		},

		/**
		 * 设置组件属性值.
		 */
		setProperty : function(config) {
			var componentId = config.componentId;
			var name = config.name;
			var v = config.value;
			var self = this;
			if (name == 'resolution') {
				this.setResolution(v);
				var self = this;
				setTimeout(function(){
					self.reSelectAll();					
				},100);
			}else if (name == 'device' || name == '$skin') {
				this.dispatchEvent({
					event : 'reload'
				});
				return ;
			}
			var element = $("*[d_id='" + componentId + "']")[0];
			if (element) {
				if (name == "xid") {
					var oldValue = element.getAttribute("xid");
					var obj = dModel.__components[oldValue];
					if (obj) {
						delete dModel.__components[oldValue];
						dModel.__components[v] = obj;
					}  
					element.setAttribute("xid", v);
				}
				if (name == 'style') {
					element.style.cssText = v;
					this.reSelect(element, true);
					$(element).trigger($.Event('childChanged'), $.extend({
						target : element,
						type : 'styleChanged'
					}, config));
					return;
				}
				if (name == 'class') {
					element.className = v;
					this.reSelect(element, true);
					$(element).trigger($.Event('childChanged'), $.extend({
						target : element,
						type : 'styleChanged'
					}, config));
					return;
				}

				if (config.isStyle == 'true') {
					$(element).css(name, v);
					this.reSelect(element, true);
					$(element).trigger($.Event('childChanged'), $.extend({
						target : element,
						type : 'styleChanged'
					}, config));
					return;
				}

				if (element.getAttribute("d_isHtmlTag") == 'true') {
					if (name == 'text') {
						element.innerHTML = v;
					} else {
						element.setAttribute(name, v);
					}
					self.reSelectAll();
					$(element).trigger($.Event('childChanged'), $.extend({
						target : element,
						type : 'styleChanged'
					}, config));
					return;
				}
				var params = {};
				params[name] = v;

				var com = this.getComponent(element);
				if (com && com.set) {
					com.set(params);
				} else {
					var componentObj = element.componentObj;
					if (componentObj && componentObj.set) {
						componentObj.set(params);
					}
				}
				this.reSelect(element, true);
				$(element).trigger($.Event('childChanged'), $.extend({
					target : element,
					type : 'propertyChanged'
				}, config));
				// var component = element.component;
				// if (component) {
				// if (''+config.isStyle == 'true') {
				// component.setCss(name, v);
				// component.updateSelectionBox();
				// } else {
				// component.setProperty(name, v, config.isStyle);
				// if(component.ownerComponent){
				// component.ownerComponent.innerComponentPropertyChanged(component.componentName,name,v);
				// }
				// }
				// component.updateSelectionBox();
				// }
				// this.updateComTip();
			}
		},

		newPage : function() {
			var template = comConfig.getTemplate("window");
			var node = $.parseXml(template);
			this.paintUI(node);
		},

		showCursor : function(x, y,height) { 
			//console.log("------------height:"+height)
			height = height || 20;
			var offset = $(this.element).offset();
			if (!this.jCursorE) {
				
				this.jCursorE = $(
						"<input name='cursor' style='display:none;top:0;left:0;position:absolute;background:red;z-index:93000;padding:0px;margin:0px;width:3px;height:"+height+"px;border:1px solid red'>")
						.appendTo(document.body);
			}
			var parentNode = this.jCursorE[0].parentNode;
			var scrollTop = this.getParentScrollTop(parentNode);
			var scrollLeft = this.getParentScrollLeft(parentNode);
			this.jCursorE.css({
				top : y + scrollTop+offset.top,
				left : x + scrollLeft + offset.left,
				height:height
			}).show();
		},
		getParentScrollTop : function(e) {
			var v = 0;
			while (e && e.nodeType == 1) {
				if (e.scrollTop) {
					v += e.scrollTop;
				}
				e = e.parentNode;
			}
			return v;
		},
		getParentScrollLeft : function(e) {
			var v = 0;
			while (e && e.nodeType == 1) {
				if (e.scrollTop) {
					v += e.scrollLeft;
				}
				e = e.parentNode;
			}
			return v;
		},
		setSelection : function(element) {

			// if(margintop>0){
			// alert([margintop,marginleft,marginright,marginbottom]);
			// }
			this.clearSelections();
			this.addSelection(element);
		},

		reSelect : function(element, repaintResizeBoxes) {
			if (element.selectionBox) {
				element.selectionBox.paint();
			}
			if (repaintResizeBoxes) {
				this.repaintResizeBoxes();
			}
			element.focus();
		},

		reSelectAll : function() {
			var selections = this.getSelections();
			for ( var i = 0; i < selections.length; i += 1) {
				this.reSelect(selections[i], true);
			}
			this.repaintResizeBoxes();
		},

		clearSelections : function() {
			$(".xui-hignlight-selected").each(function() {
				var e = $(this)[0];
				if (e.selectionBox) {
					e.selectionBox.dispose();
				}
			}).removeClass("xui-hignlight-selected");
			$(".selected-outerline").remove();
		},

		addSelection : function(element) {
			if (!element) {
				return;
			}
			var self = this;
			this.showCompTip($(element));
			var com = this.getComponent(element);
			if (!com) {
				com = this.getOwnerComponent(element);
			}
			if (com && com.onAfterSelect) {
				com.onAfterSelect({
					target : element
				});
				setTimeout(function() {
					self.reSelect(element);
					element.focus();
					// self.setFocus();
				}, 500);
			}// else{
			var je = $(element);
			$(element).addClass("xui-hignlight-selected");
			if ($(element).is(':visible')) {
				new SelectionBox(element, self.element);
				self.paintResizeBoxes(element);
			}

			self.setFocus();
			// }
			element.focus();
		},

		unSelection : function(element) {
			$(element).removeClass("xui-hignlight-selected");
			if (element.selectionBox) {
				element.selectionBox.dispose();
			}
			this.clearResizeBoxes();
			this.clearCompTip();
		},

		getSelections : function() {
			var list = [];
			$(".xui-hignlight-selected").each(function() {
				list.push($(this)[0]);
			});
			return list;
		},

		showDraggingTip : function() {

		},

		getSelectionIds : function() {
			var list = [];
			var selections = this.getSelections();
			for ( var i = 0; i < selections.length; i += 1) {
				list.push(selections[i].getAttribute("mappingTo") || selections[i].getAttribute("d_id"));
			}
			return JSON.stringify(list);
		},

		getSelectionPaths : function(config) {
			var list = [];
			if (config && config.ids) {
				var ids = config.ids;
				for ( var i = 0, l = ids.length; i < l; i += 1) {
					list.push($("*[d_id='" + ids[i] + "']").getPath());
				}
				return JSON.stringify(list);
			}

			var selections = this.getSelections();
			for ( var i = 0; i < selections.length; i += 1) {
				list.push($(selections[i]).getPath());
			}
			return JSON.stringify(list);
		},

		repaintResizeBoxes : function() {
			this.paintResizeBoxes(this.currentResizeElement);
		},

		/**
		 * 删除选择的组件.
		 */
		removeSelections : function(config) {
			var pCom;
			var self = this;
			var com;
			var ids = config.ids;
			var i,l;
			if (ids) {
				var pCom = null;
				// this.clearSelections();
				var removeCount = 0;
				l = ids.length;
				for ( i = 0; i < l; i++) {
					var je = $("*[d_id='" + ids[i] + "']");// +ids[i]);
					if (je.length == 0) {
						continue;
					}
					self.unSelection(je);
					var com = this.getComponent(je[0]);
					je[0].componentObj = null;
					$("*", je).each(function() {
						this.componentObj = null;
						self.beforeRemove(this);
					});
					if (com && com.dispose) {
						com.dispose();
					}
					self.beforeRemove(je[0]);
					je.remove();
					removeCount += 1;
				}

			} else {
				var selections = this.selections;
				this.clearSelections();
				l = selections.length;
				for ( i = 0; i < l; i++) {
					var e = selections[i];
					self.unSelection(e);
					var parent = e.parentNode;
					com = this.getComponent(e);
					e.componentObj = null;
					$("*", e).each(function() {
						this.componentObj = null;
						self.beforeRemove(this);
					});
					if (com && com.dispose) {
						com.dispose();
					}
					self.beforeRemove(e);
					parent.removeChild(e);
				}
				this.selections = [];
				// this.clearResizeBoxes();
			}

			this.ctx.mouseDownCom = null;
			this.scrollHandler();
		},

		setFocus : function() {
//			var self = this;
//			if (self.focusable === false) {
//				return;
//			}
//			setTimeout(function() {
//				// self.element.focus();
//			}, 100)
		},

		beforeRemove : function(element) {
			if (!element) {
				return;
			}
			if (element.selectionBox) {
				element.selectionBox.dispose();
			}
			var cls = this.getComponentClass(element);
			if (cls && cls.beforeRemove) {
				cls.beforeRemove(element);
			}
		},

		getOwnerComponentObj : function() {

		},

		paintResizeBoxes : function(element) {
			this.updateCompTip();
			if (!element || element.getAttribute("d_resizable") == 'false') {
				this.clearResizeBoxes();
				return;
			}
			// var currentConfig =
			// comConfig[element.getAttribute("componentName")];
			this.currentResizeElement = element;
			var bound = $(element).getBound();
			var containerOffset = $(this.element).offset();
			var scale = 1;// this.ownerCom.canvas.currentScale;
			// if(this.ownerCom.element.style.position == 'absolute'){
			// scale = 1;
			// }
			var offsetLeft = $(this.parentElement).offset().left-6;
			var l = bound.x + containerOffset.left - 2 - offsetLeft, t = bound.y + containerOffset.top - 2, w = bound.w * scale-1, h = bound.h * scale-1;
			var p = [ [ l + w / 2, t ]/* 北 */, [ l + w, t ]/* 东北 */, [ l + w, t + h / 2 ]/* 东 */, [ l + w, t + h ]/* 东南 */, [ l + w / 2, t + h ]/* 南 */, [ l, t + h ]/* 西南 */, [ l, t + h / 2 ]/* 西 */,
					[ l, t ] /* 西北 */];
			if (!this.resizeBoxes || this.resizeBoxes.length === 0) {
				var pe = document.body;
				var html = [];
				var showResizeBox = [ true, true, true, true, true, true, true, true ];// 北、东北、东、东南、南、西南、西、西北、
				html.push(this._buildResizBoxHtml(p[0], "n", "n-resize", showResizeBox[0]));// 北
				html.push(this._buildResizBoxHtml(p[1], "ne", "ne-resize", showResizeBox[1]));// 东北
				html.push(this._buildResizBoxHtml(p[2], "e", "e-resize", showResizeBox[2]));// 东
				html.push(this._buildResizBoxHtml(p[3], "es", "nw-resize", showResizeBox[3]));// 东南
				html.push(this._buildResizBoxHtml(p[4], "s", "s-resize", showResizeBox[4]));// 南
				html.push(this._buildResizBoxHtml(p[5], "sw", "ne-resize", showResizeBox[5]));// 西南
				html.push(this._buildResizBoxHtml(p[6], "w", "w-resize", showResizeBox[6]));// 西
				html.push(this._buildResizBoxHtml(p[7], "wn", "nw-resize", showResizeBox[7]));// 西北

				this.resizeBoxes = [];
				var self = this;

				$(html.join("")).appendTo(pe).each(function(idx, domE) {
					self.resizeBoxes.push(domE);
				}).bind("mousedown", function(event) {
					self.executeResize(event);
				});
			} else {
				for ( var i = 0, ll = this.resizeBoxes.length; i < ll; i++) {
					$(this.resizeBoxes[i]).css('top', p[i][1]).css('left', p[i][0]);
				}
			}
		},

		_buildResizBoxHtml : function(p, direction, cursor, visible) {
			var posStyle = "top:" + p[1] + "px;left:" + p[0] + "px;";
			return "<div class='select-box' isResizeBox='true'  direction='" + direction + "' cursor='" + cursor + "' style='cursor:" + cursor + ";display:" + (visible ? "block" : "none")
					+ ";z-index:13500;" + posStyle + "'></div>";
		},

		executeResize : function(event, canvas) {
			var self = this;
			self.ctx.action = self.actionType.RESIZE;
			var targetE = event.target;
			// justep.design.Util.setCapture(targetE);
			var startX = event.clientX, startY = event.clientY;
			var direction = targetE.getAttribute('direction');
			// document.body.style.cursor = targetE.style.cursor;
			// println("--->"+targetE.style.cursor);
			var selections = this.getSelections();
			var ids = [];
			var l = selections.length;
			var d = document;

			var vLine, hLine;

			// 记录旧的大小位置信息
			var oldBounds = [], newSelections = [];
			var oldStyles = [];

			for ( var i = 0; i < l; i++) {
				var element = selections[i];

				if (element.getAttribute("d_resizable") == 'false') {
					continue;
				}
				var bound = element.selectionBox.getBound();
				oldBounds.push($.extend({}, $(element).getInnerBound()));
				var comStyle = element.style || {};
				oldStyles.push({
					top : comStyle.top,
					left : comStyle.left,
					width : comStyle.width,
					height : comStyle.height
				});
				newSelections.push(element);
			}

			var newLength = newSelections.length;
			var $currentResizeElement = $(self.currentResizeElement);
			var mousemove = function(event) {
				
				var dx = event.clientX - startX;
				var dy = event.clientY - startY;
				var offsetV = 2, offsetH = 2;
				for ( var i = 0; i < newLength; i++) {
					var element = newSelections[i];

					var oldBound = oldBounds[i];
					var bound = $.extend({}, oldBound);
					switch (direction) {
					case 'e':
						bound.w += dx;
						// offsetV = 3;
						break;
					case 'w':
						bound.x += dx;
						bound.w -= dx;
						break;
					case 's':
						bound.h += dy;
						// offsetH = 3;
						break;
					case 'n':
						bound.y += dy;
						bound.h -= dy;
						break;
					case 'wn':
						bound.x += dx;
						bound.y += dy;
						bound.w -= dx;
						bound.h -= dy;
						break;
					case 'ne':
						bound.y += dy;
						bound.w += dx;
						bound.h -= dy;
						// offsetV = 3;
						break;
					case 'es':
						bound.w += dx;
						bound.h += dy;
						// offsetV = 2;
						// offsetH = 3;
						break;
					case 'sw':
						bound.x += dx;
						bound.h += dy;
						bound.w -= dx;
						// offsetH = 3;
					}
					if (bound.x < 0) {
						bound.x = 0;
					}
					if (bound.y < 0) {
						bound.y = 0;
					}
					if (bound.w < 5) {
						bound.w = 5;
					}
					if (bound.h < 5) {
						bound.h = 5;
					}
					var newBound = bound;

					bound.x += element.parentNode.scrollLeft;
					bound.y += element.parentNode.scrollTop;
					var flag1 = false, flag2 = false;
					if (oldBound.w != newBound.w) {
						flag1 = true;
						var w = oldStyles[i].width;
						if (w && w.indexOf('%') != -1) {
							newBound.w = self.calcuScale(w, oldBound.w, newBound.w);
						}
					}
					if (oldBound.h != newBound.h) {
						flag2 = true;
						var h = oldStyles[i].height;
						if (h && h.indexOf('%') != -1) {
							newBound.h = self.calcuScale(h, oldBound.h, newBound.h);
						}
					}

					if (flag1 || flag2) {
						$(element).setBound(newBound);
						if (element.selectionBox) {
							element.selectionBox.paint();
						}
					}
					var pos = $(targetE).position();
					var htmlE = document.body.parentNode;
					if (!vLine) {
						var p = targetE.parentNode;
						vLine = $(
								"<div style='z-index:12500;position:absolute;font-size:0;border-left:1px dotted green;top:0;width:0;height:100%;top:" + htmlE.scrollTop + "px;left:"
										+ (pos.left + offsetV) + "px'>&nbsp;</div>").appendTo(targetE.parentNode);
						hLine = $(
								"<div style='z-index:12500;position:absolute;font-size:0;border-top:1px dotted green;left:0;width:100%;line-height:0;height:0;left:" + htmlE.scrollLeft + "px;top:"
										+ (pos.top + offsetH) + "px'>&nbsp;</div>").appendTo(targetE.parentNode);
					} else {
						vLine.css("left", (pos.left + offsetV) + "px");
						hLine.css("top", (pos.top + offsetH) + "px");
					}
				}
				self.paintResizeBoxes(self.currentResizeElement);
				self.showSizeTip($currentResizeElement);
			};

			var mouseup = function(event) {
				self.ctx.action = null;
				if (self.sizeTip) {
					self.sizeTip.remove();
					self.sizeTip = null;
				}
				$(d).unbind("mousemove", mousemove).unbind("mouseup", mouseup);

				self.element.style.cursor = 'default';
				self.dispatchStyleChangedEvent();
				newSelections = null;
				if (vLine) {
					vLine.remove().empty();
					hLine.remove().empty();
					vLine = null;
				}
			};
			$(d).bind("mousemove", mousemove).bind("mouseup", mouseup);
		},

		calcuScale : function(currentScale/* 当前百分比 */, oldV/* 旧值 */, newV/* 新值 */) {
			oldV = oldV === 0 ? 1 : oldV;
			currentScale = (parseInt(currentScale.substring(0, currentScale.length - 1), 10) / 100);
			var v = Math.round(currentScale * (1 - ((oldV - newV) / oldV)) * 100);
			if (v < 1) {
				v = 1;
			}
			return v + "%";
		},

		isAllCanAddChild : function(target){
			if(target && target.tagName =='INPUT'){
				return false;
			}
			return this.allowAllElementAddChild;
		},
		/**
		 * 粘贴校验.
		 */
		pasteValidate : function(config) {
			var parentId = config.parentId;
			var path = config.path;
			var element = $("*[d_id='" + parentId + "']")[0];
			if (!element && path) {
				element = $(path)[0];
			}
			if (!element) {
				return 'false';
			}
			if(this.isAllCanAddChild(element)){
				return 'true';
			}
			var names = config.componentNames;
			var com = this.getComponent(element);

			for ( var i = 0; i < names.length; i++) {
				if (com && com.insertValidate) {
					if (!com.insertValidate(element, names[i])) {
						return 'false';
					}
				}
				if (!this.canAddChild(element, names[i])) {
					return 'false';
				}
			}
			// var currentConfig =
			// comConfig[element.getAttribute("componentName")];
			// if(currentConfig){
			// var comClass = currentConfig["component-class"];
			// if(comClass){
			// if(comClass.insertValidate){
			// var names = config.componentNames;
			// for(var i = 0;i<names.length;i++){
			// if(comClass.insertValidate(element,names[i]) != 'true'){
			// return 'false';
			// }
			// }
			// }
			// }
			// if(currentConfig["component-type"] == 'layout-container'){
			// return 'true';
			// }
			// }
			// if(element.getAttribute("d_canAddChild") == 'false'){
			// return 'false';
			// }
			return 'true';
		},

		getComponentClass : function(element) {
			var currentConfig = comConfig[element.getAttribute("componentName")];
			if (currentConfig) {
				return currentConfig["component-class"];
			}
		},

		clearResizeBoxes : function() {
			if (this.resizeBoxes) {
				for ( var i = 0, l = this.resizeBoxes.length; i < l; i++) {
					$(this.resizeBoxes[i]).remove();
				}
				this.resizeBoxes = null;
			}
			this.currentResizeElement = null;
		},

		/** 隐藏光标* */
		hideCursor : function() {
			if (this.jCursorE) {
				this.jCursorE.hide();
			}
		},

		getAllOperation : function() {
			var self = this;
			var operationList = [];
			$("*[componentName]", this.element).each(function(idx) {
				var com = self.getComponent(this);
				if (com && com.getOperationDefs) {
					var operations = com.getOperationDefs();
					if (operations) {
						var optConfig = {
							xid : com.domNode.getAttribute("xid")
						};
						var buf = [];
						optConfig.operations = buf;
						for ( var p in operations) {
							var operationBody = operations[p];
							buf.push({
								name : p,
								label : operationBody.label,
								icon : operationBody.icon,
								argsDef : operationBody.argsDef
							});
						}
						operationList.push(optConfig);
					}
				}
			});
			return JSON.stringify(operationList);
		},

		canAddChild : function(targetElement, currentElementOrComName) {
			if (this.isExtend == 'true' && !targetElement.getAttribute("xid")) { // 继承情况下没有xid的不允许添加子
				return false;
			}
			var canAddChild = targetElement.getAttribute("d_canAddChild");
			if (canAddChild != 'true' && !targetElement.getAttribute("d_id")) {// 没有内部id不允许添加子
				return false;
			}
			
			if(this.isAllCanAddChild(targetElement)){
				return true;
			}

			if (typeof currentElementOrComName != 'string') {
				currentElementOrComName = currentElementOrComName.getAttribute("componentName");
			}
			var i;
			var componentName = targetElement.getAttribute("componentName");
			var currentConfig = comConfig[componentName];
			if (currentConfig) {
				var childRange = currentConfig["child-range"];
				if (childRange && currentElementOrComName) {
					var isInRange = false;
					var rangeItems = childRange.split(",");
					for ( i = 0; i < rangeItems.length; i += 1) {
						if (rangeItems[i] == currentElementOrComName) {
							isInRange = true;
							break;
						}
					}
					if (!isInRange) {
						return false;
					} else {
						return true;
					}
				}
				if ((canAddChild + "") != 'false' && (canAddChild + "") != 'true') {
					canAddChild = currentConfig["canAddChild"];
				}
			}

			var config = comConfig[currentElementOrComName];
			var parentRange = targetElement.getAttribute("parent-range") || (config ? config["parent-range"] : null);
			if (parentRange) {
				// var parentRange = config["parent-range"];
				if (parentRange && componentName) {
					var rangeItems1 = parentRange.split(",");
					var isInRange1 = false;
					for ( i = 0; i < rangeItems1.length; i += 1) {
						if (rangeItems1[i] == componentName) {
							isInRange1 = true;
							break;
						}
					}
					if (!isInRange1) {
						return false;
					} else {
						return true;
					}
				}
			}
			if (canAddChild == 'true') {
				return true;
			} else if (canAddChild == 'false') {
				return false;
			}
			if (currentConfig) {
				return currentConfig["component-type"] == 'layout-container';
			}
			return false;
		},

		getConfigItem : function(domNodeOrCompName, itemName) {
			if (typeof domNodeOrCompName != 'string') {
				domNodeOrCompName = domNodeOrCompName.getAttribute("componentName");
			}
			var config = comConfig[domNodeOrCompName];
			if (config) {
				return config[itemName];
			}
		},

		/** 计算组件的插入位置* */
		calcuInsertPos : function(currentElementOrComName, targetElement, clientX, clientY) { 
			var p = targetElement;
			while (p && p.nodeType == 1) {
				if (p == currentElementOrComName) {
					this.hideCursor();
					return 1;
				}
				p = p.parentNode;
			}
			// var canAddChild = targetElement.getAttribute("d_canAddChild");
			var parentE,offset;
			if (this.canAddChild(targetElement, currentElementOrComName)) {
				var childNodes = targetElement.childNodes;
				var refenceE = $(targetElement).lastElement();// childNodes[childNodes.length-1];
				if (this.jCursorE && refenceE == this.jCursorE[0]) {
					refenceE = childNodes[childNodes.length - 2];
				}
				// println(refenceE.outerHTML);
				for ( var i = 0, l = childNodes.length; i < l; i += 1) {
					if (childNodes[i].nodeType == 1 && childNodes[i] != currentElementOrComName && this.jCursorE && childNodes[i] != this.jCursorE[0]) {
						var jNode = $(childNodes[i]);
						offset = jNode.offset();
						if (offset.top < clientY && (offset.top + jNode.outerHeight()) > clientY && offset.left < clientX && (offset.left + jNode.outerWidth()) > clientX) {// println(childNodes[i].outerHTML+"-->"+childNodes[i].getAttribute("name"));
							refenceE = childNodes[i];
							break;
						}
					}
				}
				if (this.jCursorE && refenceE == this.jCursorE[0]) {
					refenceE = null;
				}
				parentE = targetElement;
				var containerOffset = $(this.element).offset();
				if (refenceE && refenceE.nodeType == 1) {
					var jChildE = $(refenceE);
					if (jChildE[0] == currentElementOrComName) {
						this.hideCursor();
						return 2;
					}
					var offset1 = jChildE.offset();

					// println(refenceE.outerHTML+"------11-------->"+offset.left);
					this.showCursor(offset1.left + jChildE.outerWidth() - containerOffset.left, offset1.top - containerOffset.top - 1,jChildE.outerHeight());
					// debugger;

					return {
						position : this.getConfigItem(currentElementOrComName, "position"),
						left : clientX,
						top : clientY,
						parent : targetElement,
						before : refenceE ? refenceE.nextSibling : null,
						pos : 1
					};
				} else {
					var offset2 = $(targetElement).offset();// println("-------------->"+offset.left);
					this.showCursor(offset2.left - containerOffset.left + 1, offset2.top - containerOffset.top - 1);
					return {
						position : this.getConfigItem(currentElementOrComName, "position"),
						left : clientX,
						top : clientY,
						parent : targetElement,
						pos : 2
					};
				}
			} else {
				var refenceE1 = targetElement;
				var p1 = targetElement.parentNode;
				var containerOffset1 = $(this.element).offset();
				while (p1 && p1.nodeType == 1) {
					// var canAddChild = p.getAttribute("d_canAddChild");
					if (this.canAddChild(p1, currentElementOrComName)) {
						var jRefenceE = $(refenceE1);
						offset = $(refenceE1).offset();
						var x1 = offset.left, x2 = x1 + jRefenceE.outerWidth() / 2;
						if (clientX < x2) {
							if (refenceE1.previousSibling == currentElementOrComName) {
								this.hideCursor();
								return 3;
							}
							this.showCursor(offset.left - containerOffset1.left - 2, offset.top - containerOffset1.top - 1,jRefenceE.outerHeight());
							return {
								position : this.getConfigItem(currentElementOrComName, "position"),
								left : clientX,
								top : clientY,
								parent : p1,
								before : refenceE1,
								pos : 3
							};
						} else {
							if (refenceE1.nextSibling == currentElementOrComName) {
								this.hideCursor();
								return 4;
							}
							this.showCursor(offset.left + jRefenceE.outerWidth() - containerOffset1.left, offset.top - containerOffset1.top - 1,jRefenceE.outerHeight());
							return {
								position : this.getConfigItem(currentElementOrComName, "position"),
								left : clientX,
								top : clientY,
								parent : p1,
								before : refenceE1 ? refenceE1.nextSibling : null,
								pos : 4
							};
						}
					} else {
						refenceE1 = p1;
					}
					p1 = p1.parentNode;
				}
			}
			return 5;
		},

		paint : function() {
			if (this.element) {
				return;
			}

			var self = this;
			this.element = $("<div class='xui-designer border-box-sizing;' tabindex='1'  ></div>").appendTo(this.parentElement)[0];
			this.element.onscroll = function() {
				self.scrollHandler();
			};
			if (this.style) {
				this.element.style.cssText = this.style;
			}
			this.installListener(this, this.element);
		},

		installListener : function(self, designerE) {
			$(designerE).bind({
				mousedown : function(event) {
					self.mouseDown.call(self, event);
				},
				mouseup : function(event) {
					self.mouseUp.call(self, event);
				},
				mousemove : function(event) {
					self.mouseMove.call(self, event);
				},
				keydown : function(event) {
					self.keyDown.call(self, event);
				}
			});

			document.ondragstart = function stopEvent() {
				event.returnValue = false;
			};

			$(window).bind("resize", function() {
				self.reSelectAll();
			});

			// var url =
			// "http://localhost:8080/x5/UI2/system/service/common/vls.j?path=33";
			// $.ajax({
			// async : false,
			// // dataType:'JSONP',
			// dataType: 'jsonp',
			// // crossDomain: true,
			// type : 'POST',
			// data:'{"name":"ddf"}',
			// url : url,
			// success : function(data) {
			// alert(data);
			// },
			// error : function(xhr,status,err) {
			// concole.log("获取版本出错："+[status,xhr.readyState,err]);
			// }
			// });
		}

	};

	return new XuiDesigner({
		parentElement : document.getElementById("designerContainer")
	});// {newInstance:function(config){return new XuiDesigner(config);}};
});