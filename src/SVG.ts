const SVG_NS = "http://www.w3.org/2000/svg",
	XLINK = "http://www.w3.org/1999/xlink",
	hasOwn = Object.hasOwnProperty;


export module SVG {
	export function createElement (type: string, attrs?:Object): SVGElement {
		const svgEl: SVGElement = <SVGElement> document.createElementNS(SVG_NS, type);
		setAttributes(svgEl, attrs);
		return svgEl;
	}

	export function setAttributes(el:SVGElement, attrs?: Object): void {
		if(!attrs) return;

		for(let attrName in attrs) {
			if(hasOwn.call(attrs, attrName)) {
				let attrVal = "" + attrs[attrName];

				if(attrName.toLowerCase() === "href") {
					el.setAttributeNS(XLINK, attrName, attrVal);
				} else {
					el.setAttribute(attrName, attrVal);
				}
			}
		}
	}

	export function createSvg(attrs?: Object): SVGElement {
		return createElement("svg", attrs);
	}

	export function createCircle(attrs?: Object): SVGCircleElement {
		return <SVGCircleElement>createElement("circle", attrs);
	}
}