import { SVG } from "./SVG";
const hasOwn = Object.hasOwnProperty;

interface IWheelViewSection {
    color: string,
    number: number
}

interface IWheelViewOptions {
    sections: IWheelViewSection[]
    bgColor?: string,
    wheelMargin?: number,
    sectionMargin?: number,
    innerRadius?: number
}



export class WheelView implements IWheelViewOptions{
    static get defaults(): IWheelViewOptions {
        return {
            sections: [],
            bgColor: "#999",
            wheelMargin: 10,
            sectionMargin: 10,
            innerRadius: 50
        }
    }

    private _element: SVGElement;
    public sections: IWheelViewSection[];
    public bgColor: string;
    public wheelMargin: number;
    public sectionMargin: number;
    public innerRadius: number;


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
        const svg: SVGElement = this._element = SVG.createSvg({
            width: 500,
            height: 500
        });

        svg.appendChild(SVG.createCircle({
            cx: 250,
            cy: 250,
            r: 250,
            fill: this.bgColor
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

