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

	module.exports = __webpack_require__(1);


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
	


/***/ }
/******/ ]);
//# sourceMappingURL=WheelFortune.js.map