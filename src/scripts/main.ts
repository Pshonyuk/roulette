require("../styles/main.scss");
import { WheelFortune } from "./wheel-fortune";

new WheelFortune({
    container: <HTMLElement> document.querySelector(".app"),
    wheelView: {
        sections: require("./wheel-sections.json")
    }
});