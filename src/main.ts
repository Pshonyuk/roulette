import { WheelFortune } from "./wheel-fortune";

new WheelFortune({
    container: document.querySelector(".app"),
    wheelView: {
        sections:  require("./wheel-sections")
    }
});