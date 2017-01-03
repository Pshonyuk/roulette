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
	var WheelView_1 = __webpack_require__(1);
	var wheelView = new WheelView_1.WheelView({
	    sections: [
	        {
	            fill: "#2a72c3",
	            text: "7"
	        },
	        {
	            fill: "#56c83b",
	            text: "<tspan baseline-shift='-30%' font-size='0.6em'>&#215;</tspan>2"
	        },
	        {
	            fill: "#3b3b3b",
	            text: "B"
	        },
	        {
	            fill: "#fee365",
	            text: "1"
	        },
	        {
	            fill: "#ac16c2",
	            text: "10"
	        },
	        {
	            fill: "#ff4b26",
	            text: "16"
	        },
	        {
	            fill: "#ff9631",
	            text: "2"
	        },
	        {
	            fill: "#2a72c3",
	            text: "12"
	        },
	        {
	            fill: "#56c83b",
	            text: "5"
	        },
	        {
	            fill: "#ac16c2",
	            text: "R"
	        },
	        {
	            fill: "#fee365",
	            text: "<tspan baseline-shift='-30%' font-size='0.6em'>&#215;</tspan>2"
	        },
	        {
	            fill: "#56c83b",
	            text: "14"
	        },
	        {
	            fill: "#ff9631",
	            text: "8"
	        },
	        {
	            fill: "#2a72c3",
	            text: "0"
	        },
	        {
	            fill: "#ff4b26",
	            text: "3"
	        },
	        {
	            fill: "#ac16c2",
	            text: "17"
	        },
	        {
	            textFill: "#3b3b3b",
	            fill: "#fafafa",
	            text: "="
	        },
	        {
	            fill: "#56c83b",
	            text: "15"
	        },
	        {
	            fill: "#ff9631",
	            text: "13"
	        },
	        {
	            fill: "#2a72c3",
	            text: "6"
	        },
	        {
	            fill: "#ac16c2",
	            text: "4"
	        },
	        {
	            fill: "#fee365",
	            text: "18"
	        },
	        {
	            fill: "#ff4b26",
	            text: "9"
	        },
	        {
	            fill: "#ff9631",
	            text: "11"
	        }
	    ]
	});
	document.querySelector(".wheel-view").appendChild(wheelView.element);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var SVG_1 = __webpack_require__(2);
	var hasOwn = Object.hasOwnProperty;
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
	                stroke: "rgba(0,0,0,.8)",
	                wheelBorder: 1.5,
	                sectionBorder: 0.02,
	                innerRadius: 9.4,
	                textGear: {
	                    count: 20,
	                    radius: 4.5,
	                    innerRadius: 4,
	                    margin: 2,
	                    fill: "#fafafa"
	                }
	            };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WheelView.prototype._readOptions = function (options) {
	        var defaults = WheelView.defaults;
	        for (var optName in defaults) {
	            if (hasOwn.call(defaults, optName)) {
	                this[optName] = options[optName] == null ? defaults[optName] : options[optName];
	            }
	        }
	    };
	    WheelView.prototype._createElement = function () {
	        var _a = this, textGear = _a.textGear, innerRadius = _a.innerRadius, sectionBorder = _a.sectionBorder, svg = this._element = SVG_1.SVG.createSvg({
	            width: "100%",
	            height: "100%",
	            viewBox: "0 0 100 100"
	        }), _b = [50, 50], x0 = _b[0], y0 = _b[1], sectionAngle = 4 * Math.PI / this.sections.length, radius = x0 - this.wheelBorder, textGearDistance = radius - textGear.radius - textGear.margin, sectionOffset = {
	            left: sectionBorder / 2 - sectionAngle / 4,
	            right: sectionBorder / 2 + sectionAngle / 4
	        };
	        svg.appendChild(SVG_1.SVG.createCircle({
	            cx: x0,
	            cy: y0,
	            r: 50,
	            fill: this.fill
	        }));
	        this.sections.forEach(function (section, i) {
	            var startAngle = (i * sectionAngle - Math.PI) / 2 + sectionOffset.left, endAngle = ((i + 1) * sectionAngle - Math.PI) / 2 - sectionOffset.right, middleAngle = startAngle + (endAngle - startAngle) / 2, group = SVG_1.SVG.createElement("g");
	            group.appendChild(SVG_1.SVG.createCircleSection({
	                x0: x0,
	                y0: y0,
	                fill: section.fill,
	                radius: radius,
	                endAngle: endAngle,
	                startAngle: startAngle,
	                innerRadius: innerRadius
	            }));
	            group.appendChild(SVG_1.SVG.createGear(Object.assign({}, textGear, {
	                x0: x0 + textGearDistance * Math.cos(middleAngle),
	                y0: y0 + textGearDistance * Math.sin(middleAngle),
	                fill: section.textFill || textGear.fill
	            })));
	            group.appendChild(SVG_1.SVG.createText({
	                text: section.text,
	                fill: section.fill,
	                angle: middleAngle + Math.PI / 2,
	                fontSize: Math.floor(textGear.innerRadius * 1.4),
	                x: x0 + textGearDistance * Math.cos(middleAngle),
	                y: y0 + textGearDistance * Math.sin(middleAngle)
	            }));
	            svg.appendChild(group);
	        });
	        [35, 25, 15].forEach(function (r, i) {
	            svg.appendChild(SVG_1.SVG.createGear(Object.assign({}, textGear, {
	                x0: x0,
	                y0: y0,
	                count: 70,
	                radius: r,
	                innerRadius: r - 1,
	                fill: "rgba(255, 255, 255, " + 0.1 * (i + 1) + ")"
	            })));
	        });
	        svg.appendChild(SVG_1.SVG.createCircle({
	            cx: x0,
	            cy: y0,
	            r: 50,
	            fill: "rgba(0,0,0,0)",
	            "stroke-width": 0.1,
	            stroke: this.stroke
	        }));
	        svg.appendChild(SVG_1.SVG.createCircle({
	            cx: x0,
	            cy: y0,
	            r: radius,
	            fill: "rgba(0,0,0,0)",
	            "stroke-width": 0.5,
	            stroke: this.stroke
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
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var SVG_NS = "http://www.w3.org/2000/svg", XLINK = "http://www.w3.org/1999/xlink", hasOwn = Object.hasOwnProperty;
	var SVG;
	(function (SVG) {
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
	                    el.setAttributeNS(XLINK, attrName, attrVal);
	                }
	                else {
	                    el.setAttribute(attrName, attrVal);
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
	    function createCircleSection(attrs) {
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
	            fill: attrs.fill
	        });
	    }
	    SVG.createCircleSection = createCircleSection;
	    function createGear(attrs) {
	        var x0 = attrs.x0, y0 = attrs.y0, radius = attrs.radius, innerRadius = attrs.innerRadius, sectionAngle = 2 * Math.PI / attrs.count;
	        var points = "";
	        for (var i = 0, l = attrs.count; i < l; i++) {
	            var topX = +(x0 + radius * Math.cos(sectionAngle * i + sectionAngle / 2)).toFixed(2), topY = +(y0 + radius * Math.sin(sectionAngle * i + sectionAngle / 2)).toFixed(2), bottomX = +(x0 + innerRadius * Math.cos(sectionAngle * (i + 1))).toFixed(2), bottomY = +(y0 + innerRadius * Math.sin(sectionAngle * (i + 1))).toFixed(2);
	            points += " " + topX + "," + topY + " " + bottomX + "," + bottomY;
	        }
	        return createElement("polygon", {
	            points: points,
	            fill: attrs.fill
	        });
	    }
	    SVG.createGear = createGear;
	    function createText(attrs) {
	        var svgTextEl = createElement("text", {
	            x: 0,
	            y: 0,
	            transform: "translate(" + attrs.x + " " + attrs.y + ") rotate(" + attrs.angle * 180 / Math.PI + ")",
	            fill: attrs.fill,
	            "font-family": "Verdana",
	            "font-weight": "700",
	            "font-size": attrs.fontSize,
	            "text-anchor": "middle",
	            "alignment-baseline": "central"
	        });
	        svgTextEl.innerHTML = attrs.text;
	        return svgTextEl;
	    }
	    SVG.createText = createText;
	})(SVG = exports.SVG || (exports.SVG = {}));


/***/ }
/******/ ]);
//# sourceMappingURL=WheelFortune.js.map