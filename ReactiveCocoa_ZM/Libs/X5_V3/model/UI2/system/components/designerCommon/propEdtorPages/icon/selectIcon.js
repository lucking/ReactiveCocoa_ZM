define(function(require) {
	var $ = require("jquery");
	var bind = require("bind");

	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");

	/**
	 * =========================== 与java端交互必须定义工具类以及接口
	 * end========================*
	 */

	var Model = function() {
		this.callParent();

		this.isImgIcon = bind.observable(false);
		this.icon = '';
		this.imgIcon = bind.observable('');
		this.disimgIcon = bind.observable('');
		this.style = 'block';

	};

	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	// Generate a pseudo-GUID by concatenating random hexadecimal.
	function guid() {
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	}

	Model.prototype.getIcon = function() {
		this.icon = this.getValue();
		return !this.isImgIcon.get() ? this.icon : ("img:" + this.imgIcon.get() + '|' + this.disimgIcon.get());
	};

	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function() {
		return this.getIcon(); // 用于同时返回多个属性值
	};

	Model.prototype.modelLoad = function(event) {
		// alert();
		// debugger;
		var initData = xuiService.getPageParams();// 获取初始化数据
		this.uiPath = initData.uiPath;
		this.bizPath = initData.bizPath;
		this.propName = initData.propName;
		this.propValue = initData.propValue;
		this._setIcon(this.propValue);
		this.icons = initData.editorParameter.icons.split(',');
		this.render();
		if (!this.isImgIcon.get())
			this.onSelect(this.icon);
	};

	Model.prototype.render = function() {
		var s = [], icons, container = $('.container'), id, had = {};
		container.html('');

		if (!this.icons)
			return;
		icons = this.icons;
		var j, icon;
		s.push('<div class="title">Facefont图标</div>');
		if (this.style == 'block') {
			s.push('<ul class="block">');
			for (j in icons) {
				id = guid();
				icon = icons[j];
				if (had[icon])
					continue;
				had[icon] = true;
				s.push('<li id="'
						+ id + '" icon="' + icon + '" title="' + icon + '"><label for="' + id + '-radio"><i class="icon36 ' + icon
						+ '"></i></label><br><input id="' + id + '-radio" type="radio" name="value" value="' + icon + '"/></li>');
			}
			s.push('</ul>');
		} else {
			s.push('<ul class="list">');
			for (j in icons) {
				id = guid();
				icon = icons[j];
				if (had[icon])
					continue;
				had[icon] = true;
				s.push('<li id="'
						+ id + '" icon="' + icon + '"><input id="' + id + '-radio" type="radio" name="value" value="' + icon + '"/><label for="' + id
						+ '-radio"><i class="' + icon + '"></i><span>&nbsp;' + icon + '</span></label></li>');
			}
			s.push('</ul>');
		}

		container.html(s.join(''));
		var me = this;
		container.on('click', 'li', function() {
			var icon = $(this).attr('icon');
			me.onSelect(icon);
		});
	};

	Model.prototype.getValue = function(icons) {
		return $("input[name='value']:checked").val();
	};

	Model.prototype.onSelect = function(name) {
		if (!name)
			return;
		this.icon = name;
		var current = $('li[icon=' + name + '] input[type=radio]').get(0);
		if (current)
			current.checked = true;
		$('.container li').removeClass('active');
		$('li[icon=' + name + ']').addClass('active');
	};

	Model.prototype._setIcon = function(icon) {// "icon-refresh"/"img:xxx.png|xxx.png"
		if (typeof (icon) == 'string' && 0 === icon.indexOf('img:')) {
			this.isImgIcon.set(true);
			var ipos = icon.indexOf('|');
			if (ipos < 0)
				ipos = icon.length;
			this.imgIcon.set(icon.slice(4, ipos));
			this.disimgIcon.set(icon.slice(ipos + 1, icon.length));
		} else {
			this.isImgIcon.set(false);
			this.icon = icon;
		}
		this.comp('image').val(this.isImgIcon.get());
		this.comp('facefont').val(!this.isImgIcon.get());
	};

	Model.prototype.facefontChanged = function(event) {
		this.isImgIcon.set(!event.checked);
	};

	Model.prototype.imageChanged = function(event) {
		this.isImgIcon.set(event.checked);
	};

	return Model;
});