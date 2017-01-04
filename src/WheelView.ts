import { SVG } from "./SVG";

const extend = require("extend"),
    hasOwn = Object.hasOwnProperty;


export interface IWheelViewSection {
    textFill?: string;
    fill: string;
    text: string;
}

export interface IWheelViewGear {
    count: number;
    radius: number;
    innerRadius: number;
    margin?: number;
    fill?: string;
}

export interface IWheelViewOptions {
    sections: IWheelViewSection[];
    fill?: string;
    gears?: [number, number][]
    sectionMargin?: number;
    innerRadius?: number;
    textGear?: IWheelViewGear;
}


export class WheelView implements IWheelViewOptions {
    static get defaults(): IWheelViewOptions {
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
        }
    }

    private _element: SVGElement;
    public sections: IWheelViewSection[];
    public fill: string;
    public gears: [number, number][];
    public sectionMargin: number;
    public innerRadius: number;
    public textGear: IWheelViewGear;


    constructor(options: IWheelViewOptions) {
        this._readOptions(options);
        this._createElement();
    }

    private _readOptions(options: IWheelViewOptions): void {
        const defaults = WheelView.defaults,
            cloneOptions = Object.create(null);

        for(let optName in options){
            if(hasOwn.call(options, optName) && defaults[optName] !== void(0)) {
                cloneOptions[optName] = options[optName];
            }
        }

        extend(true, this, defaults, cloneOptions);
    }

    private _createElement(): void {
        const { textGear, innerRadius, sectionMargin } = this,
            [x0, y0] = [50, 50],
            radius: number = 50,
            fontSize: number = Math.floor(textGear.innerRadius * 1.4),
            sectionAngle: number = 4 * Math.PI / this.sections.length,
            textGearDistance: number = radius - textGear.radius - textGear.margin,
            sectionOffset: { left: number, right: number } = {
                left: sectionMargin / 2 - sectionAngle / 4,
                right: sectionMargin / 2 + sectionAngle / 4
            },
            svg: SVGElement = this._element = SVG.createSvg({
                width: "100%",
                height: "100%"
            });

        svg.setAttribute("viewBox", "0 0 100 100");

        this.sections.forEach((section, i) => {
            const startAngle: number = (i * sectionAngle - Math.PI) / 2 + sectionOffset.left,
                endAngle: number = ((i + 1) * sectionAngle - Math.PI) / 2 - sectionOffset.right,
                middleAngle: number = startAngle + (endAngle - startAngle) / 2,
                xMiddle = x0 + textGearDistance * Math.cos(middleAngle),
                yMiddle = y0 + textGearDistance * Math.sin(middleAngle),
                group: SVGGElement = <SVGGElement> SVG.createElement("g");

            group.appendChild(SVG.createSection({
                x0,
                y0,
                fill: section.fill,
                radius,
                endAngle,
                startAngle,
                innerRadius
            }));

            group.appendChild(SVG.createGear((<any>Object).assign({}, textGear, {
                x0: xMiddle,
                y0: yMiddle,
                fill: section.textFill || textGear.fill
            })));

            group.appendChild(SVG.createRotatedText({
                text: section.text,
                fill: section.fill,
                angle: middleAngle + Math.PI / 2,
                fontSize,
                x: xMiddle,
                y: yMiddle
            }));

            svg.appendChild(group);
        });

        this.gears.forEach((params) => {
            svg.appendChild(SVG.createGear({
                x0,
                y0,
                count: 70,
                fill: "#fff",
                radius: params[0],
                innerRadius: params[0] - 1,
                fillOpacity: params[1]
            }));
        });

        svg.appendChild(SVG.createInsetDropShadow());
        svg.appendChild(SVG.createCircle({
            cx: x0,
            cy: y0,
            r: innerRadius,
            fill: this.fill,
            filter: `url(#${ SVG.INSET_SHADOW_ID })`,
            stroke: "#000",
            strokeWidth: 0.2,
            strokeOpacity: 0.2
        }));
    }

    get element(): SVGElement {
        return this._element;
    }

    public destroy(): void {
        this.element.parentElement.removeChild(this.element);
        this._element = null;
    }
}