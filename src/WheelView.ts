import { SVG } from "./SVG";

const
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
        const defaults = WheelView.defaults;
        for(let optName in defaults){
            if(hasOwn.call(defaults, optName)) {
                this[optName] = options[optName] == null ? defaults[optName] : options[optName];
            }
        }
    }

    private _createElement(): void {
        const { textGear, innerRadius, sectionBorder } = this,
            svg: SVGElement = this._element = SVG.createSvg({
                width: "100%",
                height: "100%",
                viewBox: "0 0 100 100"
            }),
            [x0, y0] = [50, 50],
            sectionAngle: number = 4 * Math.PI / this.sections.length,
            radius: number = x0 - this.wheelBorder,
            textGearDistance: number = radius - textGear.radius - textGear.margin,
            sectionOffset = {
                left: sectionBorder / 2 - sectionAngle / 4,
                right: sectionBorder / 2 + sectionAngle / 4
            };

        svg.appendChild(SVG.createCircle({
            cx: x0,
            cy: y0,
            r: 50,
            fill: this.fill
        }));

        this.sections.forEach((section, i) => {
            const startAngle: number = (i * sectionAngle - Math.PI) / 2 + sectionOffset.left,
                endAngle: number = ((i + 1) * sectionAngle - Math.PI) / 2 - sectionOffset.right,
                middleAngle = startAngle + (endAngle - startAngle) / 2,
                group: SVGGElement = <SVGGElement>SVG.createElement("g");

            group.appendChild(SVG.createCircleSection({
                x0,
                y0,
                fill: section.fill,
                radius,
                endAngle,
                startAngle,
                innerRadius
            }));

            group.appendChild(SVG.createGear((<any>Object).assign({}, textGear, {
                x0: x0 + textGearDistance * Math.cos(middleAngle),
                y0: y0 + textGearDistance * Math.sin(middleAngle),
                fill: section.textFill || textGear.fill
            })));

            group.appendChild(SVG.createText({
                text: section.text,
                fill: section.fill,
                angle: middleAngle + Math.PI / 2,
                fontSize: Math.floor(textGear.innerRadius * 1.4),
                x: x0 + textGearDistance * Math.cos(middleAngle),
                y: y0 + textGearDistance * Math.sin(middleAngle)
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
            r: radius,
            fill: "rgba(0,0,0,0)",
            "stroke-width": 0.5,
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