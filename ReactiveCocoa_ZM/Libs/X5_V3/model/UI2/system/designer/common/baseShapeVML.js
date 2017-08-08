var XLINK_NS = "http://www.w3.org/1999/xlink";

if (typeof(justep)=='undefined'){
	justep = {};	
}

justep.vml = {};


/** ========= vml 基本图形 ============* */
justep.vml.Shape = function(config){
	if(!config)return;
	for(var p in config){
		this[p] = config[p]; //this.shape,this.fill,this.stroke;
	}
};
justep.vml.Shape.prototype = {
		_commonStyle:'Behavior: url(#default#VML);position:absolute;width:100;height:100;',
		
		/**创建vml节点*/
		createVmlElement:function(parent,tagName,style,attrs){
			var attrArray = [];
			var e;
			if($.browser.version == '7.0' || $.browser.version == '6.0'){
				for(var p in attrs){
					attrArray.push(p+"='"+attrs[p]+"'");
				}
				e = document.createElement("<"+tagName+" "+attrArray.join(" ")+" style='"+style+"'></"+tagName+">");
			}else{
				e = document.createElement(tagName); 
				if(style){
					e.style.cssText = style;
				}
				if(attrs){
					for(var p in attrs){
						e.setAttribute(p,attrs[p]);
					}
				}
			}
			if(parent){
				parent.appendChild(e);
			}
			return e;
		},
		
		/**创建节点**/
		createRawNode:function(tagName,style,attrs){ 
			this.rawNode = this.createVmlElement(this.parent, tagName, style, attrs);
			this.rawNode.ownerFigure = this;
			this.setShape(this.shape);
			this.setText(this.text);
		},
		/** 坐标点 * */
		setShape:function(shape){  
			if(!shape){
				return;
			}  
			this.shape = shape; 
			var jRawNode = $(this.rawNode);
			jRawNode.css({top:shape.y+"px",left:shape.x+"px",width:shape.w+"px",height:shape.h+"px"});
			if(jRawNode.width()>0){
				jRawNode.width(shape.w - (jRawNode.width()-shape.w));
				jRawNode.height(shape.h - (jRawNode.height()-shape.h));
			}
			this.updateTextPos();
		},
		/** 获取边框颜色、宽度**/
		getStroke:function(){
			return {color:this.rawNode.strokeColor,weight:this.rawNode.StrokeWeight};
		},
		/** 边框颜色,宽度* {color:'',weight:''}*/
		setStroke:function(stroke){ 
			if($.browser.version == '9.0'){
				this.rawNode.setAttribute("strokeColor",stroke.color);
			}
			this.rawNode.strokeColor = stroke.color||"";
			this.rawNode.StrokeWeight = stroke.weight||"1px";
			this.rawNode.stroked=(stroke.weight==0 || stroke.weight=="0")?"f":"t";
		},
		/** 填充颜色* */
		setFill:function(color){
			if(typeof(color)=="string"){
				this.rawNode.fillcolor = color||"white";
			}else{
				this.rawNode.fillcolor = color.color||"green";
				this.rawNode.style.filter ="alpha(opacity="+(color.opacity*100)||100+")";
			}
		},
		/** 移到最前面* */
		moveToFront:function(){
			this.rawNode.parentNode.appendChild(this.rawNode);
			return this;
		},
		getShape:function(){
			return this.shape;
		},
		getBound:function(){
		   if(this.rawNode){
			   var jObj = $(this.rawNode);
			   var pos = jObj.position();
			   return {x:pos.left,y:pos.top,w:jObj.outerWidth(),h:jObj.outerHeight()};
		   }
		},
		setText:function(text){
			this.text = text||"";
			this.text = this.text.replace(/@br@/gm, "<br\/>");
			if(this.rawNode){
				if(!this.textNode){
					this.textNode = document.createElement("span");
					this.textColor = this.textColor ? this.textColor:"black";
					$(this.textNode).css({cursor:'default',overflow:"auto",position:"absolute",font:"normal 12px 宋体, 'Arial Narrow', arial, serif",color:this.textColor});
					this.parent.appendChild(this.textNode);
					this.textNode.ownerFigure = this.rawNode.ownerFigure;
				} 
				this.textNode.innerHTML = this.text;
				this.updateTextPos();
			}
		},
		setVisible:function(visible){
			var display = visible?"":"none";
			this.rawNode.style.display = display;
			if(this.textNode){
				this.textNode.style.display = display;
			}
		},
		getText:function(){
			return this.text.replace(/<br\/>/gm, "@br@"); 
		},
		setTextColor:function(color){
			this.textColor = color;
			if(this.textNode){
				$(this.textNode).css({color:color});
			}
		},
		updateTextPos:function(){
			if(this.textNode){
				var bound = this.getShape();
				var textSize = this.calcTextSize(); 
				var w = textSize.w;
				var h = textSize.h;
				this.textNode.style.width = (w+1)+"px";
				this.textNode.style.left = (bound.x+(bound.w-w)/2)+"px" ;
				this.textNode.style.top = (bound.y+(bound.h-h)/2)+"px";
			}
		},
		
		calcTextSize : function(){
			var tempSpan = document.createElement("span");
	   		tempSpan.style.position = "absolute";
	   		tempSpan.style.top = "-100px";
	   		tempSpan.style.font = "normal 12px 宋体, 'Arial Narrow', arial, serif";
	   		document.body.appendChild(tempSpan);
	   		tempSpan.innerHTML=this.text;
			var w = tempSpan.offsetWidth;
			var h = tempSpan.offsetHeight;
			document.body.removeChild(tempSpan);
			return {w:w,h:h};
		},
		
		/** 销毁* */
		dispose:function(){
			if(this.textNode){
				this.textNode.ownerFigure = null;
			}
			this.parent.removeChild(this.rawNode);
			if(this.textNode){
				this.parent.removeChild(this.textNode);
			}
			for(var p in this){
				this[p] = null;
			}
		}	
};

/** ============= 1.vml 矩形 =================**/
justep.vml.Rect = function(config){  
	justep.vml.Shape.call(this,config);  
	this.createRawNode("v:RoundRect",this._commonStyle); 
};
justep.vml.Rect.prototype = new justep.vml.Shape();


/** ============= 2.vml 三角形 =================**/
justep.vml.Triangular = function(config) {  
	justep.vml.Shape.call(this,config); 
	this.createRawNode("v:shape",this._commonStyle,{coordsize:'100 100',path:'m 0,0 l 100,0,50,100,0,0 x e'});
};
justep.vml.Triangular.prototype = new justep.vml.Shape();

/** ============= 3.vml 菱形 =================**/
justep.vml.Rhombus = function(config) {
	justep.vml.Shape.call(this,config); 
	this.createRawNode("v:shape",this._commonStyle,{coordsize:'100 100',path:'m 0,50 l 50,0,100,50,50,100,0,50 x e'});
};
justep.vml.Rhombus.prototype = new justep.vml.Shape();

/** ============= 5.vml 圆形 =================**/
justep.vml.Circle = function(config) {
	justep.vml.Shape.call(this,config);  
	this.createRawNode("v:oval",this._commonStyle);
};
justep.vml.Circle.prototype = new justep.vml.Shape();

/** ============= 6.vml 梯形 =================**/
justep.vml.Trapezoid = function(config) {
	justep.vml.Shape.call(this,config);  
	this.createRawNode("v:shape",this._commonStyle,{coordsize:'100 100',path:'m 0,0 l 100,0,75,100,25,100,0,0 x e'});
};
justep.vml.Trapezoid.prototype = new justep.vml.Shape();


/** ============== 6.vml path ================**/
justep.vml.Path = function(config){
	justep.vml.Shape.call(this,config);
	this.createRawNode("v:shape",this._commonStyle+";display:inline-block;width:1px;height:1px;",{filled:'false',path:'m 0,0,0,0 x e',coordsize:'1 1'});
	this.arrow = document.createElement("v:stroke");
	this.arrow.style.cssText = "BEHAVIOR: url(#default#VML);DISPLAY: inline-block;";
	this.rawNode.appendChild(this.arrow);
};
justep.vml.Path.prototype = new justep.vml.Shape();

justep.vml.Path.prototype.setShape = function(shape){
	this.shape = shape;
	var path = ["M"];
	for(var i = 0,l=shape.length;i<l;i++){
		var x = parseInt(shape[i].x,10) ,y = parseInt(shape[i].y,10);
		if (i==0) {
			//path.push(x+","+y);
			path.push(x);
			path.push(y);
			
		}else{
			path.push("L");
			//path.push(x+","+y);
			path.push(x);
			path.push(y);
		}
		if (shape[i].attach) {
			var attachStr = shape[i].attach;
			var attachStrs = attachStr.split(' ');
			for(var j=0;j<attachStrs.length/8;j++){
				path.push("L");
				path.push(parseInt(attachStrs[0+j*8].replace("L",""),10)+","+parseInt(attachStrs[1+j*8],10));
				path.push("C");
				path.push(parseInt(attachStrs[2+j*8].replace("C",""),10)+","+parseInt(attachStrs[3+j*8],10));
				path.push(parseInt(attachStrs[4+j*8],10)+","+parseInt(attachStrs[5+j*8],10));
				path.push(parseInt(attachStrs[6+j*8],10)+","+parseInt(attachStrs[7+j*8],10));
			}
		}
	}
	
	if($.browser.version == '9.0'){
		var self = this;
		setTimeout(function(){
			self.rawNode.path=path.join(" ");
			self.updateTextPos();
		},1);
	}else{
		this.rawNode.path=path.join(" ");
		this.updateTextPos();
	}
};
 
justep.vml.Path.prototype.updateTextPos = function(){
	if(this.textNode && this.shape.length>1){
		var x1 = this.shape[0].x;
		var y1 = this.shape[0].y;
		var x2 = this.shape[1].x;
		var y2 = this.shape[1].y;
		var size = this.calcTextSize();
		var w = size.w;
		var h = size.h;
		this.textNode.style.left = (x1+x2-w)/2 +"px";
		this.textNode.style.top = (y1+y2-h)/2 +"px";
	}
};
justep.vml.Path.prototype.paintEndArrow = function(){
	if(!this.endArrow){ 
		this.arrow.setAttribute("EndArrow","Classic");//兼容ie9
		this.arrow["EndArrow"]= "Classic";//兼容ie8
		this.endArrow = true;
	}
};

justep.vml.Path.prototype.paintStartArrow = function(){
	if(!this.StartArrow){
		this.arrow.setAttribute("StartArrow","Classic");
		this.arrow["StartArrow"]= "Classic";
		this.startArrow = true;
	}
};
 
justep.vml.Path.prototype.removeEndArrow = function(){
	if(this.endArrow){
		this.arrow.setAttribute("EndArrow",undefined);//兼容ie9
		this.arrow["EndArrow"]= undefined;//兼容ie8
		this.endArrow = false;
	}
};

justep.vml.Path.prototype.removeStartArrow = function(){
	if(this.startArrow){
		this.arrow.setAttribute("StartArrow",undefined);//兼容ie9
		this.arrow["StartArrow"]= undefined;//兼容ie8
		this.startArrow = false;
	}
};
