 
var SVG_NS = "http://www.w3.org/2000/svg";

var justep = window.justep = (window.justep || {});
 
justep.svg = {};
 
/** ============= svg shape =================**/
justep.svg.Shape = function(config){
	if(!config)return;
	for(var p in config){
		this[p] = config[p]; //this.shape,this.fill,this.stroke;
	}
} 
justep.svg.Shape.prototype = {
		
	/**创建节点**/
	createRawNode:function(nodeName, style){  
		this.rawNode = document.createElementNS(SVG_NS,nodeName); 
//		this.rawNode.setAttribute("style", style);		
		//不适用style,改用属性
		var styles = style.split(";")
		for (var i=0;i<styles.length;i++) {
			var ss = styles[i];
			if(ss.indexOf(":")!=-1){ 
				ss = ss.split(":");
				this.rawNode.setAttribute(ss[0],ss[1]);
			}
		}
		this.parent.appendChild(this.rawNode);
		this.rawNode.ownerFigure = this;
		this.setShape(this.shape);
		this.setText(this.text);
	},
	
	/** 坐标点 * */
	setShape:function(shape){ 
		this.shape = shape; 
		this.rawNode.setAttribute("width", shape.w);
		this.rawNode.setAttribute("height", shape.h);
		this.rawNode.setAttribute("x", shape.x);
		this.rawNode.setAttribute("y", shape.y); 
		this.updateTextPos();
		return this;
	},
	/** 边框颜色,宽度* {color:'',weight:''}*/
	setStroke:function(stroke){
//		this.rawNode.style.stroke = stroke.color;
//		this.rawNode.style.strokeWidth = stroke.weight;
		this.rawNode.setAttribute("stroke",stroke.color);
		this.rawNode.setAttribute("stroke-width",stroke.weight);
	},
	/** 填充颜色* */
	setFill:function(config){
	    if(typeof config == 'string'){
	       this.rawNode.setAttribute("fill",config);
	       return;
	    }
//		this.rawNode.style.fill=color;
		if(config.color !==undefined){ 
			this.rawNode.setAttribute("fill",config.color);
		} 
		if(config.opacity !==undefined){
			this.rawNode.setAttribute("opacity",config.opacity);
		}

		return this;
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
		  return this.shape;
	   }
	},
	setText:function(text){
		this.text = text||"";
		this.text = this.text.replace(/@br@/gm, ""); 
		if(this.rawNode){ 
			if(!this.textNode){
				this.textColor = this.textColor ? this.textColor:"black";
				this.textNode = document.createElementNS(SVG_NS,"text");
				this.textNode.setAttribute("style","font-size:13px;fill: "+this.textColor+";")
				this.textNode.ownerFigure = this.rawNode.ownerFigure;
				this.parent.appendChild(this.textNode); 
			}

			while(this.textNode.firstChild){
				this.textNode.removeChild(this.textNode.firstChild);
			}
			if(text!=""){
				this.textNode.appendChild(document.createTextNode(this.text));
				this.updateTextPos();
			}
		}
	},
	getText:function(){
		return this.text.replace(/<br\/>/gm, "@br@"); 
	},
	setVisible:function(visible){
		var display = visible?"":"none";
		this.rawNode.style.display = display;
		if(this.textNode){
			this.textNode.style.display = display;
		}
	},
	setTextColor:function(color){
		this.textColor = color;
		if(this.textNode){
			this.textNode.setAttribute("style","fill: "+color+";")
		}
	},
	updateTextPos:function(){
		if(this.textNode){
			var bound = this.getBound();
			var textSize = this.calcTextSize();
			var w = textSize.w;
			var h = textSize.h;
			this.textNode.setAttribute("x",(bound.x+(bound.w-w)/2));
			this.textNode.setAttribute("y",(bound.y+(bound.h)/2)+3);
		}
	},
	
	calcTextSize : function(){
		var tempSpan = document.createElement("span");
   		tempSpan.style.position = "absolute";
   		tempSpan.style.top = "-100px";
   		tempSpan.style.fontSize="13px";
   		document.body.appendChild(tempSpan);
   		tempSpan.innerHTML=this.text;
		var w = tempSpan.offsetWidth;
		var h = tempSpan.offsetHeight;
		document.body.removeChild(tempSpan);
		return {w:w,h:h};
	},
	/** 销毁* */
	dispose:function(){
		this.parent.removeChild(this.rawNode);
		if(this.textNode){
			this.parent.removeChild(this.textNode);
		}
	}
}

/** ============= svg 矩形 =================**/
justep.svg.Rect = function(config){
	justep.svg.Shape.call(this,config);
	this.createRawNode("rect","fill:#ffffff;stroke-width:1;stroke:#000000;");  
	this.rawNode.setAttribute("rx",5);
}
justep.svg.Rect.prototype = new justep.svg.Shape();

/** ============= svg 三角形 =================**/
justep.svg.Triangular = function(config){
	justep.svg.Shape.call(this,config);
	this.createRawNode("polyline", "fill:#ffffff;stroke-width:1;stroke:#000000;");
}
justep.svg.Triangular.prototype = new justep.svg.Shape();

justep.svg.Triangular.prototype.setShape = function(shape){
	this.shape = shape; 
	var x1 = shape.x;
	var x2 = shape.x + shape.w;
	var y1 = shape.y;
	var y2 = shape.y + shape.h;
	this.rawNode.setAttribute("points",[x1,y1,x2,y1,(x2+x1)/2,y2,x1,y1].join(" "));
	this.updateTextPos();
}

/** ============= svg 菱形 =================**/
justep.svg.Rhombus = function(config) {
	justep.svg.Shape.call(this,config);  
	this.createRawNode("polyline", "fill:#ffffff;stroke-width:1;stroke:#000000;");
}
justep.svg.Rhombus.prototype = new justep.svg.Shape();

justep.svg.Rhombus.prototype.setShape = function(shape){
	this.shape = shape; 
	var x1 = shape.x;
	var x2 = shape.x + shape.w;
	var y1 = shape.y;
	var y2 = shape.y + shape.h;
	this.rawNode.setAttribute("points",[x1,(y1+y2)/2,(x1+x2)/2,y1,x2,(y1+y2)/2,(x1+x2)/2,y2,x1,(y1+y2)/2].join(" "));
    this.updateTextPos();
}

/** ============= svg 圆形 =================**/
justep.svg.Circle = function(config) {
	justep.svg.Shape.call(this,config);  
	this.createRawNode("circle", "fill:#ffffff;stroke-width:1;stroke:#000000;");
	
}
justep.svg.Circle.prototype = new justep.svg.Shape();

justep.svg.Circle.prototype.setShape = function(shape){
	this.shape = shape;
	this.rawNode.setAttribute("cx",shape.x + shape.w/2);
	this.rawNode.setAttribute("cy",shape.y + shape.h/2);
	this.rawNode.setAttribute("r", shape.w<shape.h?shape.w/2:shape.h/2);
	 this.updateTextPos();
}

/** ============= svg 梯形 =================**/
justep.svg.Trapezoid = function(config) {
	justep.svg.Shape.call(this,config);  
	this.createRawNode("polyline", "fill:#ffffff;stroke-width:1;stroke:#000000;");
}
justep.svg.Trapezoid.prototype = new justep.svg.Shape();

justep.svg.Trapezoid.prototype.setShape = function(shape){
	this.shape = shape; 
	var x1 = shape.x;
	var x2 = shape.x + shape.w;
	var y1 = shape.y;
	var y2 = shape.y + shape.h;
	this.rawNode.setAttribute("points",[x1,y1,x2,y1,(x2-shape.w/4),y2,(x1+shape.w/4),y2,x1,y1].join(" "));
	 this.updateTextPos();
}

/** ============= svg path =================**/
justep.svg.Path = function(config){
	justep.svg.Shape.call(this,config);
	this.createRawNode("path","fill-opacity:0;stroke-width:1;stroke:#000000;");
	var self = this;
	setTimeout(function(){
		self.setStroke({color:'blue'});
	},5);
}
justep.svg.Path.prototype = new justep.svg.Shape();

justep.svg.Path.prototype.setShape = function(shape){
	this.shape = shape; 
	var path = ["M"];
	for(var i = 0,l=shape.length;i<l;i++){
		var x = parseInt(shape[i].x,10) ,y = parseInt(shape[i].y,10);
		if (i==0) {
			path.push(x+","+y);
		}else{
			path.push("L");
			path.push(x+","+y);
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
	this.rawNode.setAttribute("d",path.join(" "));
	this.updateArrowPos(this.endArrow);
	this.updateTextPos();  
	var self = this;
	
}

justep.svg.Path.prototype.getBound = function(){
	var x1=9999,y1=9999,x2=0,y2=0;
	for ( var i = 0; i < this.shape.length; i++) {
		var point = this.shape[i];
		x1 = Math.min(x1, point.x);
		y1 = Math.min(y1, point.y);
		x2 = Math.max(x2, point.x);
		y2 = Math.max(y2, point.y);
		if (point.attach) {
			var attachStrs = point.attach.split(' ');
			for ( var j = 0; j < attachStrs.length; j++) {
				var t = parseInt(attachStrs[j].replace("C",""));
				if(j%2==0){
					x1 = Math.min(x1, t);
					x2 = Math.max(x2, t);
				}else{
					y1 = Math.min(y1, t);
					y2 = Math.max(y2, t);
				}
			}
		}
	}
	return {x:x1,y:y1,w:x2-x1,h:y2-y1};
}

justep.svg.Path.prototype.updateTextPos = function(){
	if(this.textNode){
		var x1 = this.shape[0].x;
		var y1 = this.shape[0].y;
		var x2 = this.shape[1].x;
		var y2 = this.shape[1].y;
		var size = this.calcTextSize();
		var w = size.w;
		var h = size.h
		this.textNode.setAttribute("x",(x1+x2-w)/2);
		this.textNode.setAttribute("y",(y1+y2)/2);
	}
}


justep.svg.Path.prototype.paintEndArrow = function(){
	if(!this.endArrow){
		var arrow= document.createElementNS(SVG_NS,"path"); 
		this.parent.appendChild(arrow);
		this.endArrow = arrow;
		this.updateArrowPos(arrow);
	}
}
justep.svg.Path.prototype.updateArrowPos = function(arrow){
	if(!arrow){
		return;
	}
	var sl = this.shape.length;
	var x = this.shape[sl-1].x;
	var y = this.shape[sl-1].y;
	var x2 = this.shape[sl-2].x;
	var y2 = this.shape[sl-2].y;
	var pos = x==x2?(y2>y?"up":"down"):(x2>x?"left":"right");
	if(pos=="left"){
		arrow.setAttribute("d", "M"+x+" "+y+" L"+(x+10)+" "+(y-3)+" L"+(x+10)+" "+(y+3)+" Z");
	}else if(pos=="right"){
		arrow.setAttribute("d", "M"+x+" "+y+" L"+(x-10)+" "+(y-3)+" L"+(x-10)+" "+(y+3)+" Z");
	}else if(pos=="up"){
		arrow.setAttribute("d", "M"+x+" "+y+" L"+(x-3)+" "+(y+10)+" L"+(x+3)+" "+(y+10)+" Z");
	}else if(pos=="down"){
		arrow.setAttribute("d", "M"+x+" "+y+" L"+(x-3)+" "+(y-10)+" L"+(x+3)+" "+(y-10)+" Z");
	}
}

justep.svg.Path.prototype.setStroke = function(stroke){
//	this.rawNode.style.stroke = stroke.color;
//	this.rawNode.style.strokeWidth = stroke.weight;
	this.rawNode.setAttribute("stroke",stroke.color);
	this.rawNode.setAttribute("stroke-width",stroke.weight);
	if(this.endArrow){
//		this.endArrow.style.stroke = stroke.color;
//		this.endArrow.style.fill = stroke.color;
		this.endArrow.setAttribute("fill",stroke.color);
		this.endArrow.setAttribute("stroke",stroke.color);
		this.endArrow.setAttribute("stroke-width",stroke.weight);
	}
}

justep.svg.Path.prototype.dispose = function(stroke){
	this.parent.removeChild(this.rawNode);
	if(this.textNode){
		this.parent.removeChild(this.textNode);
	}
	if(this.endArrow){
		this.parent.removeChild(this.endArrow);
	}
}

