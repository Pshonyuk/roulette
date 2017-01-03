import { SVG } from "./SVG";

const extend = require("extend"),
    hasOwn = Object.hasOwnProperty;

interface IWheelViewSection {
    textFill?: string,
    fill: string,
    text: string
}

interface IWheelViewGear {
    count: number,
    radius: number,
    innerRadius: number,
    margin?: number
    fill?: string
}

interface IWheelViewOptions {
    sections: IWheelViewSection[]
    fill?: string,
    stroke?: string,
    wheelBorder?: number,
    sectionBorder?: number,
    innerRadius?: number,
    textGear?: IWheelViewGear
}


export class WheelView implements IWheelViewOptions{
    static get defaults(): IWheelViewOptions {
        return {
            sections: [],
            fill: "#fafbfd",
            stroke: "rgba(0,0,0,.2)",
            wheelBorder: 1.5,
            sectionBorder: 0.02,
            innerRadius: 9.4,
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
    public stroke: string;
    public wheelBorder: number;
    public sectionBorder: number;
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
        const { textGear, innerRadius, sectionBorder } = this,
            [x0, y0] = [50, 50],
            sectionAngle: number = 4 * Math.PI / this.sections.length,
            radius: number = x0 - this.wheelBorder,
            textGearDistance: number = radius - textGear.radius - textGear.margin,
            sectionOffset: { left: number, right: number } = {
                left: sectionBorder / 2 - sectionAngle / 4,
                right: sectionBorder / 2 + sectionAngle / 4
            },
            svg: SVGElement = this._element = SVG.createSvg({
                width: "100%",
                height: "100%",
                viewBox: "0 0 100 100"
            });

        svg.appendChild(SVG.createCircle({
            cx: x0,
            cy: y0,
            r: 50,
            fill: this.fill
        }));

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
                fontSize: Math.floor(textGear.innerRadius * 1.4),
                x: xMiddle,
                y: yMiddle
            }));

            svg.appendChild(group);
        });

        [35, 25, 15].forEach((r, i) => {
            svg.appendChild(SVG.createGear((<any>Object).assign({}, textGear, {
                x0,
                y0,
                count: 70,
                radius: r,
                innerRadius: r - 1,
                fill: `rgba(255, 255, 255, ${0.1 * (i + 1)})`
            })));
        });

        svg.appendChild(SVG.createCircle({
            cx: x0,
            cy: y0,
            r: 50,
            fill: "rgba(0,0,0,0)",
            "stroke-width": 0.1,
            stroke: this.stroke
        }));

        svg.appendChild( SVG.createCircle({
            cx: x0,
            cy: y0,
            r: radius - 0.25,
            fill: "rgba(0,0,0,0)",
            "stroke-width": 0.5,
            "stroke-dasharray": `11 1`,
            stroke: this.stroke
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