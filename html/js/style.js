import { getHandoverData } from './util/handover.js';

const {
    config: {
        style,
        background,
        textColor,
        primaryColor,
        secondaryColor,
        shadowColor,
        fontFamily,
    },
} = getHandoverData();

const root = document.documentElement;

const link = document.createElement('link');
link.href = `./styles/${style}.css`;
link.rel = 'stylesheet';

document.head.appendChild(link);

if (!['image', 'video'].includes(background)) {
    root.style.setProperty('--background', background);
}

root.style.setProperty('--text-color', textColor);
root.style.setProperty('--primary-color', primaryColor);
root.style.setProperty('--secondary-color', secondaryColor);
root.style.setProperty('--shadow-color', shadowColor);
root.style.setProperty('--font-family', fontFamily);
