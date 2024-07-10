import { getHandoverData } from "./util/handover.js";

const {
    serverName,
    config: { style, overlay, showLogo, backgroundColor },
} = getHandoverData();

const link = document.createElement("link");
link.href = `./styles/${style}.css`;
link.rel = "stylesheet";

document.getElementsByTagName("head")[0].appendChild(link);
document.documentElement.style.setProperty('--background-color', backgroundColor);

if (overlay) document.querySelector('#loadscreen-wrapper').classList.add('overlay');

if (showLogo) {
    document.querySelector('#logo img').style.display = 'block';
} else {
    const h1Element = document.querySelector('#logo h1');
    h1Element.style.display = 'block';
    h1Element.innerText = serverName;
}
