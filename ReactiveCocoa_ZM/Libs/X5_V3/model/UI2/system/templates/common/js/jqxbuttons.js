/*
jQWidgets v3.2.2 (2014-Mar-21)
Copyright (c) 2011-2014 jQWidgets.
License: http://jqwidgets.com/license/
*/


(function ($) {
    $.jqx.cssroundedcorners = function (value) {
        var cssMap = {
            'all': 'jqx-rc-all',
            'top': 'jqx-rc-t',
            'bottom': 'jqx-rc-b',
            'left': 'jqx-rc-l',
            'right': 'jqx-rc-r',
            'top-right': 'jqx-rc-tr',
            'top-left': 'jqx-rc-tl',
            'bottom-right': 'jqx-rc-br',
            'bottom-left': 'jqx-rc-bl'
        };

        for (prop in cssMap) {
            if (!cssMap.hasOwnProperty(prop))
                continue;

            if (value == prop)
                return cssMap[prop];
        }
    }

    $.jqx.jqxWidget("jqxButton", "", {});

    $.extend($.jqx._jqxButton.prototype, {
        defineInstance: function () {
            this.cursor = 'arrow';
            // rounds the button corners.
            this.roundedCorners = 'all';
            // enables / disables the button
            this.disabled = false;
            // sets height to the button.
            this.height = null;
            // sets width to the button.
            this.width = null;
            this.overrideTheme = false;
            this.enableHover = true;
            this.enableDefault = true;
            this.enablePressed = true;
            this.rtl = false;
            this._ariaDisabled = false;
            this._scrollAreaButton = false;
            this.aria =
            {
                "aria-disabled": { name: "disabled", type: "boolean" }
            };
        },

        createInstance: function (args) {
            var self = this;
            this._setSize();

            if (!this._ariaDisabled) {
                this.host.attr('role', 'button');
            }
            if (!this.overrideTheme) {
                this.host.addClass(this.toThemeProperty($.jqx.cssroundedcorners(this.roundedCorners)));
                if (this.enableDefault) {
                    this.host.addClass(this.toThemeProperty('jqx-button'));
                }
                this.host.addClass(this.toThemeProperty('jqx-widget'));
            }

            this.isTouchDevice = $.jqx.mobile.isTouchDevice();
            if (!this._ariaDisabled) {
                $.jqx.aria(this);
            }

            if (this.cursor != 'arrow') {
                if (!this.disabled) {
                    this.host.css({ cursor: this.cursor });
                }
                else {
                    this.host.css({ cursor: 'arrow' });
                }
            }

            var eventNames = 'mouseenter mouseleave mousedown focus blur';
            if (this._scrollAreaButton) {
                var eventNames = 'mousedown';
            }

            if (this.isTouchDevice) {
                this.addHandler(this.host, $.jqx.mobile.getTouchEventName('touchstart'), function (event) {
                    self.isPressed = true;
                    self.refresh();
                });
                this.addHandler($(document), $.jqx.mobile.getTouchEventName('touchend') + "." + this.element.id, function (event) {
                    self.isPressed = false;
                    self.refresh();
                });
            }

            this.addHandler(this.host, eventNames, function (event) {
                switch (event.type) {
                    case 'mouseenter':
                        if (!this.isTouchDevice) {
                            if (!self.disabled && self.enableHover) {
                                self.isMouseOver = true;
                                self.refresh();
                            }
                        }
                        break;
                    case 'mouseleave':
                        if (!this.isTouchDevice) {
                            if (!self.disabled && self.enableHover) {
                                self.isMouseOver = false;
                                self.refresh();
                            }
                        }
                        break;
                    case 'mousedown':
                        if (!self.disabled) {
                            self.isPressed = true;
                            self.refresh();
                        }
                        break;
                    case 'focus':
                        if (!self.disabled) {
                            self.isFocused = true;
                            self.refresh();
                        }
                        break;
                    case 'blur':
                        if (!self.disabled) {
                            self.isFocused = false;
                            self.refresh();
                        }
                        break;
                }
            });

            this.mouseupfunc = function (event) {
                if (!self.disabled) {
                    self.isPressed = false;
                    self.refresh();
                }
            }

            this.addHandler($(document), 'mouseup.button' + this.element.id, this.mouseupfunc);

            try {
                if (document.referrer != "" || window.frameElement) {
                    if (window.top != null && window.top != window.self) {
                        var parentLocation = '';
                        if (window.parent && document.referrer) {
                            parentLocation = document.referrer;
                        }

                        if (parentLocation.indexOf(document.location.host) != -1) {
                            var eventHandle = function (event) {
                                self.isPressed = false;
                                self.refresh();
                            };

                            if (window.top.document) {
                                this.addHandler($(window.top.document), 'mouseup', eventHandle);
                            }
                        }
                    }
                }
            }
            catch (error) {
            }
            
            this.propertyChangeMap['roundedCorners'] = function (instance, key, oldVal, value) {
                instance.host.removeClass(instance.toThemeProperty($.jqx.cssroundedcorners(oldVal)));
                instance.host.addClass(instance.toThemeProperty($.jqx.cssroundedcorners(value)));
            };
            this.propertyChangeMap['width'] = function (instance, key, oldVal, value) {
                instance._setSize();
                instance.refresh();
            };
            this.propertyChangeMap['height'] = function (instance, key, oldVal, value) {
                instance._setSize();
                instance.refresh();
            };
            this.propertyChangeMap['disabled'] = function (instance, key, oldVal, value) {
                if (oldVal != value) {
                    instance.host[0].disabled = value;
                    instance.host.attr('disabled', value);
                    instance.refresh();
                    if (!value) {
                        instance.host.css({ cursor: instance.cursor });
                    }
                    else {
                        instance.host.css({ cursor: 'default' });
                    }

                    $.jqx.aria(instance, "aria-disabled", instance.disabled);
                }
            };
            this.propertyChangeMap['rtl'] = function (instance, key, oldVal, value) {
                if (oldVal != value) {
                    instance.refresh();
                }
            };
            this.propertyChangeMap['theme'] = function (instance, key, oldVal, value) {
                instance.host.removeClass();

                instance.host.addClass(instance.toThemeProperty('jqx-button'));
                instance.host.addClass(instance.toThemeProperty('jqx-widget'));
                if (!instance.overrideTheme) {
                    instance.host.addClass(instance.toThemeProperty($.jqx.cssroundedcorners(instance.roundedCorners)));
                }
                instance._oldCSSCurrent = null;
                instance.refresh();
            };
            if (this.disabled) {
                this.element.disabled = true;
                this.host.attr('disabled', true);
            }
        }, // createInstance

        resize: function (width, height) {
            this.width = width;
            this.height = height;
            this._setSize();
        },

        val: function () {
            var input = this.host.find('input');
            if (input.length > 0) {
                if (arguments.length == 0 || typeof (value) == "object") {
                    return input.val();
                }
                input.val(value);
                this.refresh();
                return input.val();
            }

            if (arguments.length == 0 || typeof (value) == "object") {
                if (this.element.nodeName.toLowerCase() == "button") {
                    return $(this.element).text();
                }
                return this.element.value;
            }
            this.element.value = arguments[0];
            if (this.element.nodeName.toLowerCase() == "button") {
                $(this.element).text(arguments[0]);
            }

            this.refresh();
        },

        _setSize: function () {
            if (this.width != null && (this.width.toString().indexOf("px") != -1 || this.width.toString().indexOf("%") != -1)) {
                this.host.css('width', this.width);
            }
            else {
                if (this.width != undefined && !isNaN(this.width)) {
                    this.host.css('width', this.width);
                }
            }
            if (this.height != null && (this.height.toString().indexOf("px") != -1 || this.height.toString().indexOf("%") != -1)) {
                this.host.css('height', this.height);
            }
            else if (this.height != undefined && !isNaN(this.height)) {
                this.host.css('height', parseInt(this.height));
            }
        },

        _removeHandlers: function () {
            this.removeHandler(this.host, 'selectstart');
            this.removeHandler(this.host, 'click');
            this.removeHandler(this.host, 'focus');
            this.removeHandler(this.host, 'blur');
            this.removeHandler(this.host, 'mouseenter');
            this.removeHandler(this.host, 'mouseleave');
            this.removeHandler(this.host, 'mousedown');
            this.removeHandler($(document), 'mouseup.button' + this.element.id, this.mouseupfunc);
            if (this.isTouchDevice) {
                this.removeHandler(this.host, $.jqx.mobile.getTouchEventName('touchstart'));
                this.removeHandler($(document), $.jqx.mobile.getTouchEventName('touchend') + "." + this.element.id);
            }
            this.mouseupfunc = null;
            delete this.mouseupfunc;
        },

        focus: function()
        {
            this.host.focus();
        },

        destroy: function () {
            this._removeHandlers();
            var vars = $.data(this.element, "jqxButton");
            if (vars) {
                delete vars.instance;
            }
            this.host.removeClass();
            this.host.removeData();
            this.host.remove();
            delete this.set;
            delete this.get;
            delete this.call;
            delete this.propertyChangeMap['roundedCorners'];
            delete this.propertyChangeMap['width'];
            delete this.propertyChangeMap['height'];
            delete this.propertyChangeMap['disabled'];
            delete this.propertyChangeMap['rtl'];
            delete this.propertyChangeMap['theme'];
            delete this.propertyChangeMap;
            delete this.element;
            delete this.host;
        },

        render: function()
        {
            this.refresh();
        },

        refresh: function () {
            if (this.overrideTheme)
                return;

            var cssFocused = this.toThemeProperty('jqx-fill-state-focus');
            var cssDisabled = this.toThemeProperty('jqx-fill-state-disabled');
            var cssNormal = this.toThemeProperty('jqx-fill-state-normal');
            if (!this.enableDefault) {
                cssNormal = "";
            }

            var cssHover = this.toThemeProperty('jqx-fill-state-hover');
            var cssPressed = this.toThemeProperty('jqx-fill-state-pressed');
            var cssPressedHover = this.toThemeProperty('jqx-fill-state-pressed');
            if (!this.enablePressed) {
                cssPressed = "";
            }
            var cssCurrent = '';
            if (!this.host) {
                return;
            }

            this.host[0].disabled = this.disabled;

            if (this.disabled) {
                cssCurrent = cssDisabled;
            }
            else {
                if (this.isMouseOver && !this.isTouchDevice) {
                    if (this.isPressed)
                        cssCurrent = cssPressedHover;
                    else
                        cssCurrent = cssHover;
                }
                else {
                    if (this.isPressed)
                        cssCurrent = cssPressed;
                    else
                        cssCurrent = cssNormal;
                }
            }

            if (this.isFocused) {
                cssCurrent += " " + cssFocused;
            }

            if (cssCurrent != this._oldCSSCurrent) {
                if (this._oldCSSCurrent) {
                    this.host.removeClass(this._oldCSSCurrent);
                }
                this.host.addClass(cssCurrent);
                this._oldCSSCurrent = cssCurrent;
            }
            if (this.rtl) {
                this.host.addClass(this.toThemeProperty('jqx-rtl'));
                this.host.css('direction', 'rtl');
            }
        }
    });

    //// LinkButton
    $.jqx.jqxWidget("jqxLinkButton", "", {});

    $.extend($.jqx._jqxLinkButton.prototype, {
        defineInstance: function () {
            // enables / disables the button
            this.disabled = false;
            // sets height to the button.
            this.height = null;
            // sets width to the button.
            this.width = null;
            this.rtl = false;
            this.href = null;
        },

        createInstance: function (args) {
            var self = this;
            this.host.onselectstart = function () { return false; };
            this.host.attr('role', 'button');

            var height = this.height || this.host.height();
            var width = this.width || this.host.width();
            this.href = this.host.attr('href');
            this.target = this.host.attr('target');
            this.content = this.host.text();
            this.element.innerHTML = "";
            this.host.append("<input type='button' class='jqx-wrapper'/>");
            var wrapElement = this.host.find('input');
            wrapElement.addClass(this.toThemeProperty('jqx-reset'));
            wrapElement.width(width);
            wrapElement.height(height);
            wrapElement.val(this.content);
            this.host.find('tr').addClass(this.toThemeProperty('jqx-reset'));
            this.host.find('td').addClass(this.toThemeProperty('jqx-reset'));
            this.host.find('tbody').addClass(this.toThemeProperty('jqx-reset'));
            this.host.css('color', 'inherit');
            this.host.addClass(this.toThemeProperty('jqx-link'));

            wrapElement.css({ width: width });
            wrapElement.css({ height: height });
            var param = args == undefined ? {} : args[0] || {};
            wrapElement.jqxButton(param);

            if (this.disabled) {
                this.host[0].disabled = true;
            }

            this.propertyChangeMap['disabled'] = function (instance, key, oldVal, value) {
                instance.host[0].disabled = value;
                instance.host.find('input').jqxButton({ disabled: value });
            }

            this.addHandler(wrapElement, 'click', function (event) {
                if (!this.disabled) {
                    self.onclick(event);
                }
                return false;
            });
        },

        onclick: function (event) {
            if (this.target != null) {
                window.open(this.href, this.target);
            }
            else {
                window.location = this.href;
            }
        }
    });
    //// End of LinkButton

    //// RepeatButton
    $.jqx.jqxWidget("jqxRepeatButton", "jqxButton", {});

    $.extend($.jqx._jqxRepeatButton.prototype, {
        defineInstance: function () {
            this.delay = 50;
        },

        createInstance: function (args) {
            var self = this;

            var isTouchDevice = $.jqx.mobile.isTouchDevice();

            var up = !isTouchDevice ? 'mouseup.' + this.base.element.id : 'touchend.' + this.base.element.id;
            var down = !isTouchDevice ? 'mousedown.' + this.base.element.id : 'touchstart.' + this.base.element.id;

            this.addHandler($(document), up, function (event) {
                if (self.timeout != null) {
                    clearTimeout(self.timeout);
                    self.timeout = null;
                    self.refresh();
                }
                if (self.timer != undefined) {
                    clearInterval(self.timer);
                    self.timer = null;
                    self.refresh();
                }
            });

            this.addHandler(this.base.host, down, function (event) {
                if (self.timer != null) {
                    clearInterval(self.timer);
                }
 
                self.timeout = setTimeout(function () {
                    clearInterval(self.timer);
                    self.timer = setInterval(function (event) { self.ontimer(event); }, self.delay);
                }, 150);
            });

            this.mousemovefunc = function (event) {
                if (!isTouchDevice) {
                    if (event.which == 0) {
                        if (self.timer != null) {
                            clearInterval(self.timer);
                            self.timer = null;
                        }
                    }
                }
            }

            this.addHandler(this.base.host, 'mousemove', this.mousemovefunc);
        },

        destroy: function()
        {
            var isTouchDevice = $.jqx.mobile.isTouchDevice();
            var up = !isTouchDevice ? 'mouseup.' + this.base.element.id : 'touchend.' + this.base.element.id;
            var down = !isTouchDevice ? 'mousedown.' + this.base.element.id : 'touchstart.' + this.base.element.id;
            this.removeHandler(this.base.host, 'mousemove', this.mousemovefunc);
            this.removeHandler(this.base.host, down);
            this.removeHandler($(document), up);
            this.timer = null;
            delete this.mousemovefunc;
            delete this.timer;
            var vars = $.data(this.base.element, "jqxRepeatButton");
            if (vars) {
                delete vars.instance;
            }
            $(this.base.element).removeData();
            this.base.destroy();
            delete this.base;

        },

        stop: function () {
            clearInterval(this.timer);
            this.timer = null;
        },

        ontimer: function (event) {
            var event = new jQuery.Event('click');
            if (this.base != null && this.base.host != null) {
                this.base.host.trigger(event);
            }
        }
    });
    //// End of RepeatButton
    //// ToggleButton
    $.jqx.jqxWidget("jqxToggleButton", "jqxButton", {});

    $.extend($.jqx._jqxToggleButton.prototype, {
        defineInstance: function () {
            this.toggled = false;
            this.aria =
            {
                "aria-checked": { name: "toggled", type: "boolean" },
                "aria-disabled": { name: "disabled", type: "boolean" }
            };
        },

        createInstance: function (args) {
            var self = this;
            this.base.overrideTheme = true;
            this.isTouchDevice = $.jqx.mobile.isTouchDevice();
            $.jqx.aria(this);

            this.propertyChangeMap['toggled'] = function (instance, key, oldVal, value) {
                instance.refresh();
            };
            this.propertyChangeMap['disabled'] = function (instance, key, oldVal, value) {
                self.base.disabled = value;
                instance.refresh();
            };

            this.addHandler(this.base.host, 'click', function (event) {
                if (!self.base.disabled) {
                    self.toggle();
                }
            });

            if (!this.isTouchDevice) {
                this.addHandler(this.base.host, 'mouseenter', function (event) {
                    if (!self.base.disabled) {
                        self.refresh();
                    }
                });

                this.addHandler(this.base.host, 'mouseleave', function (event) {
                    if (!self.base.disabled) {
                        self.refresh();
                    }
                });
            }

            this.addHandler(this.base.host, 'mousedown', function (event) {
                if (!self.base.disabled) {
                    self.refresh();
                }
            });

            this.addHandler($(document), 'mouseup', function (event) {
                if (!self.base.disabled) {
                    self.refresh();
                }
            });
        },

        _removeHandlers: function () {
            this.removeHandler(this.base.host, 'click');
            this.removeHandler(this.base.host, 'mouseenter');
            this.removeHandler(this.base.host, 'mouseleave');
            this.removeHandler(this.base.host, 'mousedown');
            this.removeHandler($(document), 'mouseup');
        },

        toggle: function () {
            this.toggled = !this.toggled;
            this.refresh();
            $.jqx.aria(this, "aria-checked", this.toggled);
        },

        unCheck: function () {
            this.toggled = false;
            this.refresh();
        },

        check: function () {
            this.toggled = true;
            this.refresh();
        },

        refresh: function () {
            var cssDisabled = this.base.toThemeProperty('jqx-fill-state-disabled');
            var cssNormal = this.base.toThemeProperty('jqx-fill-state-normal');
            var cssHover = this.base.toThemeProperty('jqx-fill-state-hover');
            var cssPressed = this.base.toThemeProperty('jqx-fill-state-pressed');
            var cssPressedHover = this.base.toThemeProperty('jqx-fill-state-pressed');
            var cssCurrent = '';
            this.base.host[0].disabled = this.base.disabled;

            if (this.base.disabled) {
                cssCurrent = cssDisabled;
            }
            else {
                if (this.base.isMouseOver && !this.isTouchDevice) {
                    if (this.base.isPressed || this.toggled)
                        cssCurrent = cssPressedHover;
                    else
                        cssCurrent = cssHover;
                }
                else {
                    if (this.base.isPressed || this.toggled)
                        cssCurrent = cssPressed;
                    else
                        cssCurrent = cssNormal;
                }
            }

            if (this.base.host.hasClass(cssDisabled) && cssDisabled != cssCurrent)
                this.base.host.removeClass(cssDisabled);

            if (this.base.host.hasClass(cssNormal) && cssNormal != cssCurrent)
                this.base.host.removeClass(cssNormal);

            if (this.base.host.hasClass(cssHover) && cssHover != cssCurrent)
                this.base.host.removeClass(cssHover);

            if (this.base.host.hasClass(cssPressed) && cssPressed != cssCurrent)
                this.base.host.removeClass(cssPressed);

            if (this.base.host.hasClass(cssPressedHover) && cssPressedHover != cssCurrent)
                this.base.host.removeClass(cssPressedHover);

            if (!this.base.host.hasClass(cssCurrent))
                this.base.host.addClass(cssCurrent);
        }
    });
    //// End of ToggleButton

})(jQuery);
