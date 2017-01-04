const SVG_NS = "http://www.w3.org/2000/svg",
	XLINK = "http://www.w3.org/1999/xlink",
	hasOwn = Object.hasOwnProperty;


export module SVG {
	interface IToDash {
		(str: string): string;
		regex: RegExp;
	}

	let toDash = <IToDash> function(str: string): string {
		return str.replace(toDash.regex, (match) =>
			`-${match.toLowerCase()}`
		)
	};
	toDash.regex = /([A-Z])/g;


	export interface ISVGElementAttrs {
		width: string | number;
		height: string | number;
		viewBox?: string;
	}

	export interface  ISVGCircleAttrs {
		r: number | string;
		cx: number | string;
		cy: number | string;
		fill?: string;
		filter?: string;
		stroke?: string;
		strokeWidth?: string | number;
		strokeOpacity?: string | number;
	}

	export interface  ISVGSectionAttrs {
		x0: number;
		y0: number;
		fill?: string;
		stroke?: string;
		radius: number;
		endAngle: number;
		startAngle: number;
		innerRadius: number;
		strokeWidth?: string | number;
	}

	export interface ISVGGearAttrs {
		x0: number;
		y0: number;
		fill?: string;
		count: number;
		radius: number;
		innerRadius: number;
		fillOpacity?: number | string;
	}

	export interface ISVGRotatedTextAttrs {
		x: number;
		y: number;
		text: string;
		fill?: string;
		angle: number;
		fontSize?: number | string;
	}


	export const INSET_SHADOW_ID: string = "inset-shadow";

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
					el.setAttributeNS(XLINK, toDash(attrName), attrVal);
				} else {
					el.setAttribute(toDash(attrName), attrVal);
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

	export function createSection(attrs: ISVGSectionAttrs): SVGPathElement {
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
			fill: attrs.fill,
			stroke: attrs.fill,
			strokeWidth: "0.6",
			strokeOpacity: "0.6"
		});
	}

	export function createGear(attrs?: ISVGGearAttrs): SVGPolygonElement {
		const { x0, y0, radius, innerRadius, fill, fillOpacity } = attrs,
			sectionAngle = 2 * Math.PI / attrs.count;
		let points = "";

		for(let i = 0, l = attrs.count; i < l; i++) {
			const topX: number = +(x0 + radius * Math.cos(sectionAngle * i + sectionAngle / 2)).toFixed(2),
				topY: number = +(y0 + radius * Math.sin(sectionAngle * i + sectionAngle / 2)).toFixed(2),
				bottomX: number = +(x0 + innerRadius * Math.cos(sectionAngle * (i + 1))).toFixed(2),
				bottomY: number = +(y0 + innerRadius * Math.sin(sectionAngle * (i + 1))).toFixed(2);

			points += ` ${topX},${topY} ${bottomX},${bottomY}`;
		}

		return <SVGPolygonElement> createElement("polygon", { fill, points, fillOpacity });
	}

	export function createRotatedText(attrs: ISVGRotatedTextAttrs): SVGTextElement {
		const svgTextEl: SVGTextElement = <SVGTextElement> createElement("text", {
			x: 0,
			y: 0,
			fill: attrs.fill,
			fontSize: attrs.fontSize,
			transform: `translate(${attrs.x} ${attrs.y}) rotate(${attrs.angle * 180 / Math.PI})`,
			fontFamily: "Verdana",
			fontWeight: "700",
			textAnchor: "middle",
			alignmentBaseline: "central"
		});

		svgTextEl.innerHTML = attrs.text;
		return svgTextEl;
	}

	export function createInsetDropShadow(attrs?: any): SVGDefsElement {
		const svgDefsEl: SVGDefsElement = <SVGDefsElement> createElement("defs");
		svgDefsEl.innerHTML = `
			<filter id="${ INSET_SHADOW_ID }" x="-50%" y="-50%" width="200%" height="200%">
				<feComponentTransfer in=SourceAlpha>
					<feFuncA type="table" tableValues="1 0" />
				</feComponentTransfer>
				<feGaussianBlur stdDeviation="3"/>
				<feOffset dx="-5" dy="-5" result="offsetblur"/>
				<feFlood flood-color="rgba(20, 0, 0, .4)" result="color"/>
				<feComposite in2="offsetblur" operator="in"/>
				<feComposite in2="SourceAlpha" operator="in" />
				<feMerge>
					<feMergeNode in="SourceGraphic" />
					<feMergeNode />
				</feMerge>
			</filter>
		`;
		return svgDefsEl;
	}
}