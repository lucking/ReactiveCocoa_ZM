define(function(require) {
	var $ = require("jquery");
	function mnpXml(opCode, xmlStr) {
		return this.each(function() {
			if (typeof xmlStr != "string")
				return;
			if (!$.isXMLDoc(this))
				return;
			var node = $.parseXml(xmlStr).firstChild.cloneNode(true);
			switch (opCode) {
			case "append":
				this.appendChild(node);
				break;
			case "prepend":
				if (this.childNodes.length > 0)
					this.insertBefore(node, this.firstChild);
				else
					this.appendChild(node);
				break;
			case "after":
				if (this.nextSibling)
					this.parentNode.insertBefore(node, this.nextSibling);
				else
					this.parentNode.appendChild(node);
				break;
			case "before":
				this.parentNode.insertBefore(node, this);
				break;
			}
		});
	}

	$.fn.extend({
		firstChild : function() {
			return this.children().first();
		},
		firstElement : function() {
			return this.children()[0];
		},
		lastChild : function() {
			return $(this).children().last();
		},
		lastElement : function() {
			return $(this).children().last().get(0);
		},
		prevElement : function() {
			return $(this).prev().get(0);
		},
		nextElement : function() {
			return $(this).next().get(0);
		},
		findChildByPath : function(path) {// 仅仅支持标签名路径
			var pathItems = path.split("/");
			var currentNode = $(this)[0];
			if (!currentNode) {
				return;
			}

			for ( var i = 0; i < pathItems.length; i += 1) {
				var pathItem = pathItems[i];
				var childNodes = currentNode.childNodes;
				var flag = false;
				for ( var j = 0; j < childNodes.length; j += 1) {
					if (childNodes[j].tagName == pathItem) {
						currentNode = childNodes[j];
						flag = true;
						break;
					}
				}
				if (!flag) {
					return;
				}
			}
			return currentNode;
		},
		getBound : function(isPosition) {
			var je = $(this);
			var w = je.outerWidth();
			var h = je.outerHeight();

			var margintop = parseInt(je.css("margin-top"), 10);
			var marginleft = parseInt(je.css("margin-left"), 10);
			var marginright = parseInt(je.css("margin-right"), 10);
			var marginbottom = parseInt(je.css("margin-bottom"), 10);

			var position = isPosition ? je.position() : je.offset();// isOffset?je.offset():je.position();
			var left = position.left;
			var top = position.top;
			if (left !== 0 && !left) {
				left = je[0].offsetLeft;
			}
			if (top !== 0 && !top) {
				top = je[0].offsetTop;
			}
			// debugger;

			return {
				x : parseInt(left) - 6,
				y : parseInt(top) - 6,
				w : w,
				h : h
			};
		},

		getInnerBound : function(isOffset) {
			var $e = $(this);
			var w = $e.width();// .offsetWidth;
			var h = $e.height();// e.offsetHeight;
			// if(e.tagName == "LABEL"){
			// h -=2;
			// }
			if (this.tagName == 'IMG' || this.tagName == 'IMAGE') {
				// w = parseInt(e.style.width||e.offsetWidth);
				// h = parseInt(e.style.height||e.offsetHeight);
			}
			var position = isOffset ? $e.offset() : $e.position();
			// var p1 = $(e).offsetParent();

			return {
				x : parseInt(position.left || this.offsetLeft),
				y : parseInt(position.top || this.offsetTop),
				w : w,
				h : h
			};
		},
		setBound : function(bound) {
			var e = $(this)[0];
			if (e) {
				if (e.style.position == 'absolute') {
					if (bound.y) {
						e.style.top = bound.y + "px";
					}
					if (bound.x) {
						e.style.left = bound.x + "px";
					}
				}

				if (bound.w && ("" + bound.w).indexOf("%") != -1) {
					e.style.width = bound.w;
				} else if (bound.w && $(e).width() != bound.w) {
					$(e).width((bound.w < 1 ? 1 : bound.w));
					var offset = $(e).outerWidth() - $(e).width();
					if (offset > 0) {
						if ($(e).width() < bound.w) {
							$(e).width(bound.w + offset);
						}
					}
				}
				if (bound.h && ("" + bound.h).indexOf("%") != -1) {
					e.style.height = bound.h;
				} else if (bound.h && $(e).height() != bound.h) {
					$(e).height((bound.h < 1 ? 1 : bound.h));
					var offset = $(e).outerHeight() - $(e).height();
					if (offset > 0) {
						if ($(e).height() < bound.h) {
							$(e).height(bound.h + offset);
						}
					}
				}
			}

		},

		getParentScrollTop : function() {
			var e = this[0];
			var v = 0;
			while (e) {
				if (e.scrollTop) {
					v += e.scrollTop;

				}
				e = e.parentNode;
			}
			return v;
		},

		getParentScrollLeft : function() {
			var e = this[0];
			var v = 0;
			while (e) {
				if (e.scrollLeft) {
					v += e.scrollLeft;
				}
				e = e.parentNode;
			}
			return v;
		},
		isEmptyNode : function() {
			var node = this;
			if (node.innerText && node.innerText != '&nbsp') {
				return false;
			}
			var childNodes = node.childNodes;
			if (childNodes == null || childNodes.length == 0) {
				return true;
			}
			for ( var i = 0; i < childNodes.length; i++) {
				if (childNodes[i].nodeType == 1) {
					return false;
				}
			}
			return true;
		},

		canMove : function(canMove) {
			var element = $(this)[0];
			if (canMove !== undefined && canMove != null) {
				element.setAttribute("d_canMove", canMove);
			}

			if (element.getAttribute("d_canMove") == 'false') {
				return false;
			}
			if (element.getAttribute("d_isHtmlTag") == 'true' || element.getAttribute("component")) {
				// alert([element.getAttribute("d_isHtmlTag") ,
				// element.getAttribute("componentName")]);
				return true;
			}
			return true;
		},

		selectable : function(selectable) {
			var element = $(this)[0];
			if (selectable !== undefined && selectable != null) {
				element.setAttribute("d_selectable", selectable);
			}
			return element.getAttribute("d_selectable") != 'false';
		},

		bindEx : function(eventName, callback) {

		},

		resizable : function(resizable) {
			var element = $(this)[0];
			if (resizable !== undefined && resizable != null) {
				element.setAttribute("d_resizable", resizable);
			}
			return element.getAttribute("d_resizable") != 'false';
		},
		canAddChild : function(canAddChild) {
			var element = $(this)[0];
			if (canAddChild !== undefined && canAddChild != null) {
				element.setAttribute("d_canAddChild", canAddChild);
			}
			return element.getAttribute("d_canAddChild") != 'false';
		},
		getCData : function() {
			var currentNode = $(this)[0];
			if (!currentNode) {
				return "";
			}
			var nodes = currentNode.childNodes
			var text = [];
			for ( var i = 0; i < nodes.length; i += 1) {
				if (nodes[i].nodeType == 4) {
					text.push(nodes[i].nodeValue);
				}
			}
			return text.join("\n");
		},

		getPath : function() {
			var element = $(this)[0];
			if (!element) {
				return "";
			}
			var pathItems = [];
			var parent = element.parentNode;
			while (parent && parent.nodeType == 1) {
				var item = parent.tagName;
				if (parent.getAttribute("d_id")) {
					item = item + "[d_id='" + parent.getAttribute("d_id") + "']";
				} else {
					item = "*" + ":eq(" + $(parent).index() + ")";
				}
				pathItems.splice(0, 0, item + ">");
				if (parent.getAttribute("d_id")) {
					break;
				}
				parent = parent.parentNode;
			}
			pathItems.push("*:eq(" + $(this).index() + ")");
			return pathItems.join("");
		},

		appendXml : function(s) {
			return mnpXml.call(this, "append", s);
		},
		prependXml : function(s) {
			return mnpXml.call(this, "prepend", s);
		},
		afterXml : function(s) {
			return mnpXml.call(this, "after", s);
		},
		beforeXml : function(s) {
			return mnpXml.call(this, "before", s);
		},
		xml : function() {
			var elem = this[0];
			return elem.xml || (new XMLSerializer()).serializeToString(elem);
		},
		innerXml : function() {
			var s = this.xml();
			var i = s.indexOf(">"), j = s.lastIndexOf("<");
			if (j > i)
				return s.substring(i + 1, j);
			else
				return "";
		}
	});

	$.extend($, {
		createElement : function(html, currentConfig, parentElement, before) {
			var je;
			if (before) {
				je = $(html);
				$(before).before(je);
				return je[0];
			} else if (parentElement) {
				je = $(html).appendTo(parentElement);
				if (currentConfig.resizable) {
					je.resizable(currentConfig.resizable + "");
				}
				if (currentConfig.canAddChild) {
					je.canAddChild(currentConfig.canAddChild + "");
				}
				if (currentConfig.selectable) {
					je.selectable(currentConfig.selectable + "");
				} else {
					je.selectable("true");
				}
				return je[0];
			}
		},

		parseXml : function(xmlStr) {
			try {
				var xd = new DOMParser().parseFromString(xmlStr, "text/xml");
				return xd;
			} catch (e) {
				var xd = new ActiveXObject("Microsoft.XMLDOM");
				xd.async = false;
				xd.loadXML(xmlStr);
				return xd;
			}
		},

		toXml : function(obj, nodeName, useAttr) {
			var x = $($.parseXml("<" + nodeName + " />"));
			var n = x.find(":first");
			for ( var p in obj) {
				if (useAttr)
					n.attr(p, obj[p]);
				else
					n.appendXml("<" + p + " />").find(p).text(obj[p]);
			}
			return x[0];
		},

		getUrlParam : function(paramName) {
			var url = decodeURI(window.location.href);
			var idx = url.indexOf("?");
			var params = url.substring(idx + 1);
			if (params) {
				params = params.split("&");
				for ( var i = 0; i < params.length; i += 1) {
					var param = params[i].split("=");
					if (param[0] == paramName) {
						return param[1];
					}
				}
			}
		},
		loadCss : function(cssFile) {
			if (cssFile.substring(0, 1) == "/") {
				cssFile = "../../../../../model" + cssFile;
			}
			var html_doc = document.getElementsByTagName('head')[0];
			var css = document.createElement('link');
			css.setAttribute('rel', 'stylesheet');
			css.setAttribute('type', 'text/css');
			css.setAttribute('href', cssFile + "?version=" + new Date().getTime());
			html_doc.appendChild(css);
		},
		justep : {
			extend : function() {
				var io = function(o) {
					for ( var m in o) {
						this[m] = o[m];
					}
				};
				var oc = Object.prototype.constructor;

				return function(sb, sp, overrides) {
					if (typeof sp == 'object') {
						overrides = sp;
						sp = sb;
						sb = overrides.constructor != oc ? overrides.constructor : function() {
							sp.apply(this, arguments);
						};
					}
					var F = function() {
					}, sbp, spp = sp.prototype;
					F.prototype = spp;
					sbp = sb.prototype = new F();
					sbp.constructor = sb;
					sb.superclass = spp;
					if (spp.constructor == oc) {
						spp.constructor = sp;
					}
					sb.override = function(o) {
						$.justep.override(sb, o);
					};
					sbp.override = io;
					$.justep.override(sb, overrides);
					return sb;
				};
			}(),

			override : function(origclass, overrides) {
				if (overrides) {
					var p = origclass.prototype;
					for ( var method in overrides) {
						p[method] = overrides[method];
					}
				}
			}
		}
	});
	return $;
});