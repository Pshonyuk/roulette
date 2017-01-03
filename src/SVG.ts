const SVG_NS = "http://www.w3.org/2000/svg",
	XLINK = "http://www.w3.org/1999/xlink",
	hasOwn = Object.hasOwnProperty;


export module SVG {
	interface ISVGElementAttrs {
		width: string|number,
		height: string|number,
		viewBox?: string
	}

	interface  ISVGCircleAttrs {
		r: number|string,
		cx: number|string,
		cy: number|string,
		fill?: string,
		stroke?: string,
		"stroke-width"?: string|number
	}

	interface  ISVGCircleSectionAttrs {
		startAngle: number
		endAngle: number
		radius: number
		innerRadius: number,
		x0: number,
		y0: number,
		fill?: string
	}

	interface ISVGGearAttrs {
		x0: number,
		y0: number,
		count: number,
		radius: number,
		innerRadius: number,
		fill?: string
	}

	interface ISVGTextAttrs {
		x: number,
		y: number,
		text: string,
		fill?: string
		angle: number,
		fontSize?: number|string
	}


	export function createElement (type: string, attrs?:any): SVGElement {
		const svgEl: SVGElement = <SVGElement> document.createElementNS(SVG_NS, type);
		setAttributes(svgEl, attrs);
		return svgEl;
	}

	export function setAttributes(el:SVGElement, attrs?: any): void {
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

	export function createSvg(attrs: ISVGElementAttrs): SVGElement {
		return createElement("svg", attrs);
	}

	export function createCircle(attrs: ISVGCircleAttrs): SVGCircleElement {
		return <SVGCircleElement> createElement("circle", attrs);
	}

	export function createCircleSection(attrs: ISVGCircleSectionAttrs): SVGPathElement {
		const { startAngle, endAngle, radius, innerRadius } = attrs,
			outer = {
				x0: attrs.x0 + radius * Math.cos(startAngle),
				y0: attrs.y0 + radius * Math.sin(startAngle),
				x1: attrs.x0 + radius * Math.cos(endAngle),
				y1: attrs.y0 + radius * Math.sin(endAngle)
			},
			inner = {
				x0: attrs.x0 + innerRadius * Math.cos(startAngle),
				y0: attrs.y0 + innerRadius * Math.sin(startAngle),
				x1: attrs.x0 + innerRadius * Math.cos(endAngle),
				y1: attrs.y0 + innerRadius * Math.sin(endAngle)
			};

		return <SVGPathElement> createElement("path", {
			d: `
				M ${outer.x0} ${outer.y0}
				L ${inner.x0} ${inner.y0}
				A ${innerRadius} ${innerRadius} 0 0 1 ${inner.x1} ${inner.y1}
				L ${outer.x1} ${outer.y1}
				A ${radius} ${radius} 0 0 0 ${outer.x0} ${outer.y0} Z
			`,
			fill: attrs.fill
		});
	}

	export function createGear(attrs?: ISVGGearAttrs): SVGPolygonElement{
		const { x0, y0, radius, innerRadius } = attrs,
			sectionAngle = 2 * Math.PI / attrs.count;
		let points = "";

		for(let i = 0, l = attrs.count; i < l; i++) {
			const topX: number = +(x0 + radius * Math.cos(sectionAngle * i + sectionAngle / 2)).toFixed(2),
				topY: number = +(y0 + radius * Math.sin(sectionAngle * i + sectionAngle / 2)).toFixed(2),
				bottomX: number = +(x0 + innerRadius * Math.cos(sectionAngle * (i + 1))).toFixed(2),
				bottomY: number = +(y0 + innerRadius * Math.sin(sectionAngle * (i + 1))).toFixed(2);

			points += ` ${topX},${topY} ${bottomX},${bottomY}`;
		}

		return <SVGPolygonElement>createElement("polygon", {
			points,
			fill: attrs.fill
		});
	}

	export function createText(attrs: ISVGTextAttrs): SVGTextElement {
		const svgTextEl: SVGTextElement = <SVGTextElement>createElement("text", {
			x: 0,
			y: 0,
			transform: `translate(${attrs.x} ${attrs.y}) rotate(${attrs.angle * 180 / Math.PI})`,
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
}