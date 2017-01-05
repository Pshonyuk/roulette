/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(6);
	var wheel_fortune_1 = __webpack_require__(1);
	new wheel_fortune_1.WheelFortune({
	    container: document.querySelector(".app"),
	    wheelView: {
	        sections: __webpack_require__(10)
	    }
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(2));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var WheelView_1 = __webpack_require__(3);
	var MAX_SPIN_VALUE = 1000, hasOwn = Object.hasOwnProperty;
	function getRotationAngle(el) {
	    var st = window.getComputedStyle(el, null), tr = (st.getPropertyValue("-webkit-transform") ||
	        st.getPropertyValue("-moz-transform") ||
	        st.getPropertyValue("-ms-transform") ||
	        st.getPropertyValue("-o-transform") ||
	        st.getPropertyValue("transform") || "fail"), _a = ((tr.split("(")[1] || "").split(")")[0] || "").split(","), a = _a[0], b = _a[1];
	    return Math.round(Math.atan2(+b, +a) * (180 / Math.PI)) || 0;
	}
	exports.getRotationAngle = getRotationAngle;
	var WheelFortune = (function () {
	    function WheelFortune(params) {
	        this.container = params.container;
	        this.container.innerHTML = WheelFortune.template;
	        this._createWheelView(params.wheelView);
	        this._attachEvents();
	    }
	    WheelFortune.prototype._createWheelView = function (params) {
	        this.container
	            .querySelector(".wheel-view")
	            .appendChild((this._wheelView = new WheelView_1.WheelView(params)).element);
	    };
	    WheelFortune.prototype._attachEvents = function () {
	        this._eventsList = [];
	        var eventsDescription = {
	            "click .spin": this._spinAction
	        };
	        for (var key in eventsDescription) {
	            if (hasOwn.call(eventsDescription, key)) {
	                var keyParts = key.split(/\s+/), type = keyParts[0], target = this.container.querySelector(keyParts[1]), handler = eventsDescription[key].bind(this);
	                target.addEventListener(type, handler);
	                this._eventsList.push({ target: target, type: type, handler: handler });
	            }
	        }
	    };
	    WheelFortune.prototype._detachEvents = function () {
	        this._eventsList.forEach(function (eventData) {
	            eventData.target.removeEventListener(eventData.type, eventData.handler);
	        });
	        this._eventsList = null;
	    };
	    WheelFortune.prototype._spinAction = function () {
	        var spinValueEl = this.container.querySelector(".spin-value");
	        this.spin(+spinValueEl.value);
	    };
	    WheelFortune.prototype.spin = function (count) {
	        var sectionAngle = 360 / this._wheelView.sections.length, wheelEl = this.container.querySelector(".wheel-view svg");
	        count = Math.min(Math.max(+count || 0, 0), MAX_SPIN_VALUE);
	        wheelEl.style.transform = "rotate(" + (getRotationAngle(wheelEl) + sectionAngle * count) + "deg)";
	    };
	    WheelFortune.prototype.destroy = function () {
	        this._detachEvents();
	        this._wheelView.destroy();
	        this.container.innerHTML = "";
	    };
	    return WheelFortune;
	}());
	WheelFortune.template = "\n        <div class=\"input-wrapper\">\n            <input class=\"spin-value\" type=\"number\" value=\"10\" max=\"" + MAX_SPIN_VALUE + "\">\n            <button class=\"spin\">Spin</button>\n        </div>\n        <span class=\"pointer\">\u25BC</span>\n        <div class=\"wheel-view\"></div>\n    ";
	exports.WheelFortune = WheelFortune;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var SVG_1 = __webpack_require__(4);
	var extend = __webpack_require__(5), hasOwn = Object.hasOwnProperty;
	var WheelView = (function () {
	    function WheelView(options) {
	        this._readOptions(options);
	        this._createElement();
	    }
	    Object.defineProperty(WheelView, "defaults", {
	        get: function () {
	            return {
	                sections: [],
	                fill: "#fafbfd",
	                sectionMargin: 0.03,
	                innerRadius: 9.4,
	                gears: [
	                    [35, 0.1],
	                    [25, 0.15],
	                    [15, 0.2]
	                ],
	                textGear: {
	                    fill: "#fafafa",
	                    count: 20,
	                    radius: 4.5,
	                    margin: 2,
	                    innerRadius: 4
	                }
	            };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WheelView.prototype._readOptions = function (options) {
	        var defaults = WheelView.defaults, cloneOptions = Object.create(null);
	        for (var optName in options) {
	            if (hasOwn.call(options, optName) && defaults[optName] !== void (0)) {
	                cloneOptions[optName] = options[optName];
	            }
	        }
	        extend(true, this, defaults, cloneOptions);
	    };
	    WheelView.prototype._createElement = function () {
	        var _a = this, textGear = _a.textGear, innerRadius = _a.innerRadius, sectionMargin = _a.sectionMargin, _b = [50, 50], x0 = _b[0], y0 = _b[1], radius = 50, fontSize = Math.floor(textGear.innerRadius * 1.4), sectionAngle = 4 * Math.PI / this.sections.length, textGearDistance = radius - textGear.radius - textGear.margin, sectionOffset = {
	            left: sectionMargin / 2 - sectionAngle / 4,
	            right: sectionMargin / 2 + sectionAngle / 4
	        }, svg = this._element = SVG_1.SVG.createSvg({
	            width: "100%",
	            height: "100%"
	        });
	        svg.setAttribute("viewBox", "0 0 100 100");
	        this.sections.forEach(function (section, i) {
	            var startAngle = (i * sectionAngle - Math.PI) / 2 + sectionOffset.left, endAngle = ((i + 1) * sectionAngle - Math.PI) / 2 - sectionOffset.right, middleAngle = startAngle + (endAngle - startAngle) / 2, xMiddle = x0 + textGearDistance * Math.cos(middleAngle), yMiddle = y0 + textGearDistance * Math.sin(middleAngle), group = SVG_1.SVG.createElement("g");
	            group.appendChild(SVG_1.SVG.createSection({
	                x0: x0,
	                y0: y0,
	                fill: section.fill,
	                radius: radius,
	                endAngle: endAngle,
	                startAngle: startAngle,
	                innerRadius: innerRadius
	            }));
	            group.appendChild(SVG_1.SVG.createGear(Object.assign({}, textGear, {
	                x0: xMiddle,
	                y0: yMiddle,
	                fill: section.textFill || textGear.fill
	            })));
	            group.appendChild(SVG_1.SVG.createRotatedText({
	                text: section.text,
	                fill: section.fill,
	                angle: middleAngle + Math.PI / 2,
	                fontSize: fontSize,
	                x: xMiddle,
	                y: yMiddle
	            }));
	            svg.appendChild(group);
	        });
	        this.gears.forEach(function (params) {
	            svg.appendChild(SVG_1.SVG.createGear({
	                x0: x0,
	                y0: y0,
	                count: 70,
	                fill: "#fff",
	                radius: params[0],
	                innerRadius: params[0] - 1,
	                fillOpacity: params[1]
	            }));
	        });
	        svg.appendChild(SVG_1.SVG.createInsetDropShadow());
	        svg.appendChild(SVG_1.SVG.createCircle({
	            cx: x0,
	            cy: y0,
	            r: innerRadius,
	            fill: this.fill,
	            filter: "url(#" + SVG_1.SVG.INSET_SHADOW_ID + ")",
	            stroke: "#000",
	            strokeWidth: 0.2,
	            strokeOpacity: 0.2
	        }));
	    };
	    Object.defineProperty(WheelView.prototype, "element", {
	        get: function () {
	            return this._element;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WheelView.prototype.destroy = function () {
	        this.element.parentElement.removeChild(this.element);
	        this._element = null;
	    };
	    return WheelView;
	}());
	exports.WheelView = WheelView;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var SVG_NS = "http://www.w3.org/2000/svg", XLINK = "http://www.w3.org/1999/xlink", hasOwn = Object.hasOwnProperty;
	var SVG;
	(function (SVG) {
	    var toDash = function (str) {
	        return str.replace(toDash.regex, function (match) {
	            return "-" + match.toLowerCase();
	        });
	    };
	    toDash.regex = /([A-Z])/g;
	    SVG.INSET_SHADOW_ID = "inset-shadow";
	    function createElement(type, attrs) {
	        var svgEl = document.createElementNS(SVG_NS, type);
	        setAttributes(svgEl, attrs);
	        return svgEl;
	    }
	    SVG.createElement = createElement;
	    function setAttributes(el, attrs) {
	        if (!attrs)
	            return;
	        for (var attrName in attrs) {
	            if (hasOwn.call(attrs, attrName)) {
	                var attrVal = "" + attrs[attrName];
	                if (attrName.toLowerCase() === "href") {
	                    el.setAttributeNS(XLINK, toDash(attrName), attrVal);
	                }
	                else {
	                    el.setAttribute(toDash(attrName), attrVal);
	                }
	            }
	        }
	    }
	    SVG.setAttributes = setAttributes;
	    function createSvg(attrs) {
	        return createElement("svg", attrs);
	    }
	    SVG.createSvg = createSvg;
	    function createCircle(attrs) {
	        return createElement("circle", attrs);
	    }
	    SVG.createCircle = createCircle;
	    function createSection(attrs) {
	        var startAngle = attrs.startAngle, endAngle = attrs.endAngle, radius = attrs.radius, innerRadius = attrs.innerRadius, outer = {
	            x0: attrs.x0 + radius * Math.cos(startAngle),
	            y0: attrs.y0 + radius * Math.sin(startAngle),
	            x1: attrs.x0 + radius * Math.cos(endAngle),
	            y1: attrs.y0 + radius * Math.sin(endAngle)
	        }, inner = {
	            x0: attrs.x0 + innerRadius * Math.cos(startAngle),
	            y0: attrs.y0 + innerRadius * Math.sin(startAngle),
	            x1: attrs.x0 + innerRadius * Math.cos(endAngle),
	            y1: attrs.y0 + innerRadius * Math.sin(endAngle)
	        };
	        return createElement("path", {
	            d: "\n\t\t\t\tM " + outer.x0 + " " + outer.y0 + "\n\t\t\t\tL " + inner.x0 + " " + inner.y0 + "\n\t\t\t\tA " + innerRadius + " " + innerRadius + " 0 0 1 " + inner.x1 + " " + inner.y1 + "\n\t\t\t\tL " + outer.x1 + " " + outer.y1 + "\n\t\t\t\tA " + radius + " " + radius + " 0 0 0 " + outer.x0 + " " + outer.y0 + " Z\n\t\t\t",
	            fill: attrs.fill,
	            stroke: attrs.fill,
	            strokeWidth: "0.6",
	            strokeOpacity: "0.6"
	        });
	    }
	    SVG.createSection = createSection;
	    function createGear(attrs) {
	        var x0 = attrs.x0, y0 = attrs.y0, radius = attrs.radius, innerRadius = attrs.innerRadius, fill = attrs.fill, fillOpacity = attrs.fillOpacity, sectionAngle = 2 * Math.PI / attrs.count;
	        var points = "";
	        for (var i = 0, l = attrs.count; i < l; i++) {
	            var topX = +(x0 + radius * Math.cos(sectionAngle * i + sectionAngle / 2)).toFixed(2), topY = +(y0 + radius * Math.sin(sectionAngle * i + sectionAngle / 2)).toFixed(2), bottomX = +(x0 + innerRadius * Math.cos(sectionAngle * (i + 1))).toFixed(2), bottomY = +(y0 + innerRadius * Math.sin(sectionAngle * (i + 1))).toFixed(2);
	            points += " " + topX + "," + topY + " " + bottomX + "," + bottomY;
	        }
	        return createElement("polygon", { fill: fill, points: points, fillOpacity: fillOpacity });
	    }
	    SVG.createGear = createGear;
	    function createRotatedText(attrs) {
	        var svgTextEl = createElement("text", {
	            x: 0,
	            y: 0,
	            fill: attrs.fill,
	            fontSize: attrs.fontSize,
	            transform: "translate(" + attrs.x + " " + attrs.y + ") rotate(" + attrs.angle * 180 / Math.PI + ")",
	            fontFamily: "Verdana",
	            fontWeight: "700",
	            textAnchor: "middle",
	            alignmentBaseline: "central"
	        });
	        svgTextEl.innerHTML = attrs.text;
	        return svgTextEl;
	    }
	    SVG.createRotatedText = createRotatedText;
	    function createInsetDropShadow(attrs) {
	        var svgDefsEl = createElement("defs");
	        svgDefsEl.innerHTML = "\n\t\t\t<filter id=\"" + SVG.INSET_SHADOW_ID + "\" x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\">\n\t\t\t\t<feComponentTransfer in=SourceAlpha>\n\t\t\t\t\t<feFuncA type=\"table\" tableValues=\"1 0\" />\n\t\t\t\t</feComponentTransfer>\n\t\t\t\t<feGaussianBlur stdDeviation=\"3\"/>\n\t\t\t\t<feOffset dx=\"-5\" dy=\"-5\" result=\"offsetblur\"/>\n\t\t\t\t<feFlood flood-color=\"rgba(20, 0, 0, .4)\" result=\"color\"/>\n\t\t\t\t<feComposite in2=\"offsetblur\" operator=\"in\"/>\n\t\t\t\t<feComposite in2=\"SourceAlpha\" operator=\"in\" />\n\t\t\t\t<feMerge>\n\t\t\t\t\t<feMergeNode in=\"SourceGraphic\" />\n\t\t\t\t\t<feMergeNode />\n\t\t\t\t</feMerge>\n\t\t\t</filter>\n\t\t";
	        return svgDefsEl;
	    }
	    SVG.createInsetDropShadow = createInsetDropShadow;
	})(SVG = exports.SVG || (exports.SVG = {}));


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	
	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}
	
		return toStr.call(arr) === '[object Array]';
	};
	
	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}
	
		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}
	
		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {/**/}
	
		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};
	
	module.exports = function extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}
	
		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];
	
					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}
	
							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);
	
						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							target[name] = copy;
						}
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "html, body {\n  height: 100%;\n  overflow: hidden; }\n\n.app {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  flex-direction: column; }\n  .app .input-wrapper {\n    margin-top: 15px;\n    display: flex;\n    height: 60px;\n    font-size: 42px;\n    box-shadow: 5px 5px 22px rgba(0, 0, 0, 0.4);\n    border: 1px solid black; }\n    .app .input-wrapper input {\n      border: none;\n      font-size: inherit;\n      width: 135px;\n      text-align: center; }\n      .app .input-wrapper input:focus {\n        outline: none; }\n    .app .input-wrapper button {\n      margin-left: 5px;\n      background-color: black;\n      border: none;\n      color: #fafafa;\n      padding: 0 25px;\n      font-weight: 700;\n      font-size: inherit; }\n  .app .pointer {\n    height: 30px; }\n    .app .pointer:after {\n      display: inline-block;\n      color: black;\n      text-shadow: 5px 5px 22px rgba(0, 0, 0, 0.4);\n      font-size: 44px;\n      padding: 0;\n      margin-bottom: 5px; }\n  .app .wheel-view {\n    width: 40%;\n    height: 40vw;\n    padding: 5px;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    border-radius: 50%;\n    box-shadow: 20px 20px 44px rgba(0, 0, 0, 0.4);\n    user-select: none; }\n", ""]);
	
	// exports


/***/ },
/* 8 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = [
		{
			"fill": "#2a72c3",
			"text": "7"
		},
		{
			"fill": "#56c83b",
			"text": "<tspan baseline-shift='-30%' font-size='0.6em'>&#215;</tspan>2"
		},
		{
			"fill": "#3b3b3b",
			"text": "B"
		},
		{
			"fill": "#fee365",
			"text": "1"
		},
		{
			"fill": "#ac16c2",
			"text": "10"
		},
		{
			"fill": "#ff4b26",
			"text": "16"
		},
		{
			"fill": "#ff9631",
			"text": "2"
		},
		{
			"fill": "#2a72c3",
			"text": "12"
		},
		{
			"fill": "#56c83b",
			"text": "5"
		},
		{
			"fill": "#ac16c2",
			"text": "R"
		},
		{
			"fill": "#fee365",
			"text": "<tspan baseline-shift='-30%' font-size='0.6em'>&#215;</tspan>2"
		},
		{
			"fill": "#56c83b",
			"text": "14"
		},
		{
			"fill": "#ff9631",
			"text": "8"
		},
		{
			"fill": "#2a72c3",
			"text": "0"
		},
		{
			"fill": "#ff4b26",
			"text": "3"
		},
		{
			"fill": "#ac16c2",
			"text": "17"
		},
		{
			"textFill": "#3b3b3b",
			"fill": "#fafafa",
			"text": "="
		},
		{
			"fill": "#56c83b",
			"text": "15"
		},
		{
			"fill": "#ff9631",
			"text": "13"
		},
		{
			"fill": "#2a72c3",
			"text": "6"
		},
		{
			"fill": "#ac16c2",
			"text": "4"
		},
		{
			"fill": "#fee365",
			"text": "18"
		},
		{
			"fill": "#ff4b26",
			"text": "9"
		},
		{
			"fill": "#ff9631",
			"text": "11"
		}
	];

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map