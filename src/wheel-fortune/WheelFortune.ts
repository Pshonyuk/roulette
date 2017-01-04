import { WheelView, IWheelViewOptions } from "./WheelView";
const hasOwn = Object.hasOwnProperty;


export interface IWheelFortuneOptions {
    container: Element
    wheelView: IWheelViewOptions
}


export class WheelFortune {
    static getTemplate(max: number): string {
        return `
            <div class="wheel-view"></div>
            <div class="input-wrapper">
                <input type="number" value="0" max="${ max }">
                <button class="spin">Spin</button>
            </div>
        `
    };

    public container: Element;
    private _wheelView: WheelView;
    private _eventsList: any;


    constructor(params: IWheelFortuneOptions) {
        this.container = params.container;
        this.container.innerHTML = WheelFortune.getTemplate(params.wheelView.sections.length - 1);
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
            "click .spin": this._spin
        };

        for(let key in eventsDescription) {
            if(hasOwn.call(eventsDescription, key)) {
                const keyParts = key.split(/\s+/),
                    type = keyParts[0],
                    target: Element = this.container.querySelector(keyParts[1]),
                    handler = eventsDescription[key].bind(this);

                target.addEventListener(type, handler);
                this._eventsList.push({ target, type, handler });
            }
        }
    }

    private _detachEvents(): void {
        this._eventsList.forEach((eventData) => {
            (<Element>eventData.target).removeEventListener(eventData.type, eventData.handler);
        });
    }

    private _spin(): void {
        console.log("click");
    }

    public destroy() {
        this._detachEvents();
        this._wheelView.destroy();
        this.container.innerHTML = "";
    }
}
