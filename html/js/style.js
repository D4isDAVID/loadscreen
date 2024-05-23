import { style } from "../config.js";

const link = document.createElement("link");
link.href = style;
link.rel = "stylesheet";

document.getElementsByTagName("head")[0].appendChild(link);
