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
	            color: "red",
	            number: 2
	        },
	        {
	            color: "red",
	            number: 7
	        },
	        {
	            color: "red",
	            number: 9
	        },
	        {
	            color: "red",
	            number: 0
	        },
	        {
	            color: "red",
	            number: 4
	        },
	        {
	            color: "red",
	            number: 9
	        },
	        {
	            color: "red",
	            number: 8
	        },
	        {
	            color: "red",
	            number: 4
	        },
	        {
	            color: "red",
	            number: 10
	        },
	        {
	            color: "red",
	            number: 5
	        },
	        {
	            color: "red",
	            number: 3
	        },
	        {
	            color: "red",
	            number: 7
	        },
	        {
	            color: "red",
	            number: 4
	        },
	        {
	            color: "red",
	            number: 6
	        },
	        {
	            color: "red",
	            number: 1
	        },
	        {
	            color: "red",
	            number: 9
	        }
	    ]
	});
	document.querySelector("body").appendChild(wheelView.element);


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
	                bgColor: "#999",
	                wheelMargin: 10,
	                sectionMargin: 10,
	                innerRadius: 50
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
	        var svg = this._element = SVG_1.SVG.createSvg({
	            width: 500,
	            height: 500
	        });
	        svg.appendChild(SVG_1.SVG.createCircle({
	            cx: 250,
	            cy: 250,
	            r: 250,
	            fill: this.bgColor
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
	})(SVG = exports.SVG || (exports.SVG = {}));


/***/ }
/******/ ]);
//# sourceMappingURL=WheelFortune.js.map