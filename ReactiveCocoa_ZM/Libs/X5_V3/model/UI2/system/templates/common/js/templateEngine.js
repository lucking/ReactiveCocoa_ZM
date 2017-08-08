define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var XML = require('$UI/system/lib/base/xml');
	var Handlebars = require("$UI/system/templates/common/js/handlebars-v1.3.0");
	var templateService = require("$UI/system/templates/common/js/templateService");

	var TemplateEngine = function(targetPath) {
		this.constructor(targetPath);
	};

	TemplateEngine.prototype = {
		_getRealTargetFile : function(templateFile, targetFileName) {
			var fileNames = templateFile.split("/");
			var exts = fileNames[fileNames.length - 1].split(".");
			return targetFileName + "." + exts[exts.length - 1];
		},

		_getTempleteFile : function(filePath, context) {
			var file = templateService.readFile(filePath);
			var template = Handlebars.compile(file);
			return template(context);
		},

		constructor : function(targetPath) {
			this.targetPath = targetPath;
		},

		resetTemplatePath : function(templatePath) {
			if (this.templatePath != templatePath) {
				this.templatePath = templatePath;
				delete this.config;
			}
		},

		/*
		 * config.items[n] 
		 * config.images[n] 
		 * config.context[templateFile]
		 * config.context[templateFile].targetFiles[targetFile] 
		 * config.current 当前配置信息，例如 mainData.concept mainData.reader 等
		 */
		getConfig : function() {
			if (!this.config) {
				this.config = {};
				var configXml = templateService.getTemplateConfig(this.templatePath);
				var root = $(XML.fromString(configXml).documentElement);
				// 目前选项中的并非全部可用，这里做一下标记
				this.config.notSupport = configXml == "";
				this.config.desc = root.attr("desc");
				this.config.custom = root.attr("custom");

				var templatePath = this.templatePath;
				var itemsE = root.children('items');
				var items = [];
				var context = {};
				if (itemsE) {
					var templateFile = itemsE.attr("file");
					if (templateFile) {
						context[templateFile] = {};
					}
					$("item", itemsE).each(function() {
						var $this = $(this);
						var realTemplateFile = $this.attr("file") || templateFile;
						if (!realTemplateFile) {
							throw "模版定义错误，获取模版文件名失败！模版目录：" + templatePath;
						}
						items.push({
							file : realTemplateFile,
							text : $this.attr("text"),
							configPage : $this.attr("configPage")
						});
						context[realTemplateFile] = {};
					});
				}
				this.config.items = items;
				this.config.context = context;

				var imagesE = root.children('images');
				var images = [];
				if (imagesE) {
					var templateFile = imagesE.attr("file");
					$("image", imagesE).each(function() {
						var $this = $(this);
						images.push($this.attr("src"));
					});
				}
				this.config.images = images;

			}
			;

			return this.config;
		},

		getTargetPath : function() {
			return this.targetPath;
		},

		setTargetFileName : function(targetFileName) {
			this.targetFileName = targetFileName;
		},

		addContext : function(templateFile, name, value, targetFile) {
			var config = this.getConfig();
			if (!targetFile) {
				targetFile = this.targetFileName + ".w";
			}
			if (!config.context[templateFile].targetFiles) {
				config.context[templateFile].targetFiles = {};
			}
			if (!config.context[templateFile].targetFiles[targetFile]) {
				config.context[templateFile].targetFiles[targetFile] = {};
			}
			config.context[templateFile].targetFiles[targetFile][name] = value;
		},

		removeContext : function(templateFile, targetFile, name) {
			var config = this.getConfig();
			if (!name) {
				delete config.context[filename].targetFiles[targetFile];
			} else {
				delete config.context[filename].targetFiles[targetFile][name];
			}
		},

		_createFile : function(templateFile, context, targetFile) {
			var file = this._getTempleteFile(this.templatePath + '/' + templateFile, context);
			templateService.writeFile(this.targetPath + "/" + targetFile, file);
		},

		_copyResourceFiles : function(excludeFiles) {
			templateService.copyResourceFiles(this.templatePath, this.targetPath, excludeFiles);
		},

		createFiles : function() {
			var context = this.getConfig().context;
			var excludeFiles = [];
			for ( var templateFile in context) {
				if (context[templateFile].targetFiles) {
					for ( var targetFile in context[templateFile].targetFiles) {
						this._createFile(templateFile, context[templateFile].targetFiles[targetFile], targetFile);
					}
				} else {
					this._createFile(templateFile, [], this._getRealTargetFile(templateFile, this.targetFileName));
				}
				excludeFiles.push(templateFile);
			}
			;

			this._copyResourceFiles(excludeFiles);
		}

	};

	return TemplateEngine;
});
