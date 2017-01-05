import { WheelView, IWheelViewOptions } from "./WheelView";
const MAX_SPIN_VALUE: number = 1000,
    hasOwn = Object.hasOwnProperty;


export interface IWheelFortuneOptions {
    container: HTMLElement
    wheelView: IWheelViewOptions
}


export function getRotationAngle(el: HTMLElement): number {
    const st: CSSStyleDeclaration = window.getComputedStyle(el, null),
        tr: string = (st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") || "fail"),
        [a, b]: string[] = ((tr.split("(")[1] || "").split(")")[0] || "").split(",");
    return Math.round(Math.atan2(+b, +a) * (180 / Math.PI)) || 0;
}


export class WheelFortune {
    static template: string = `
        <div class="input-wrapper">
            <input class="spin-value" type="number" value="10" max="${MAX_SPIN_VALUE}">
            <button class="spin">Spin</button>
        </div>
        <span class="pointer">▼</span>
        <div class="wheel-view"></div>
    `;

    public container: HTMLElement;
    private _wheelView: WheelView;
    private _eventsList: any;


    constructor(params: IWheelFortuneOptions) {
        this.container = params.container;
        this.container.innerHTML = WheelFortune.template;
        this._createWheelView(params.wheelView);
        this._attachEvents();
    }

    private _createWheelView(params: IWheelViewOptions): void {
        this.container
            .querySelector(".wheel-view")
            .appendChild((this._wheelView = new WheelView(params)).element);
    }

    private _attachEvents(): void {
        this._eventsList = [];
        const eventsDescription = {
            "click .spin": this._spinAction
        };

        for(let key in eventsDescription) {
            if(hasOwn.call(eventsDescription, key)) {
                const keyParts = key.split(/\s+/),
                    type = keyParts[0],
                    target: HTMLElement = <HTMLElement> this.container.querySelector(keyParts[1]),
                    handler = eventsDescription[key].bind(this);

                target.addEventListener(type, handler);
                this._eventsList.push({ target, type, handler });
            }
        }
    }

    private _detachEvents(): void {
        this._eventsList.forEach((eventData) => {
            (<HTMLElement>eventData.target).removeEventListener(eventData.type, eventData.handler);
        });
        this._eventsList = null;
    }

    private _spinAction(): void {
        const spinValueEl: HTMLInputElement = <HTMLInputElement> this.container.querySelector(".spin-value");
        this.spin(+spinValueEl.value);
    }

    public spin(count: number): void {
        const sectionAngle: number = 360 / this._wheelView.sections.length,
            wheelEl: HTMLDivElement = <HTMLDivElement> this.container.querySelector(".wheel-view svg");

        count = Math.min(Math.max(+count || 0, 0), MAX_SPIN_VALUE);
        wheelEl.style.transform = `rotate(${getRotationAngle(wheelEl) + sectionAngle * count}deg)`;
    }

    public destroy(): void {
        this._detachEvents();
        this._wheelView.destroy();
        this.container.innerHTML = "";
    }
}
