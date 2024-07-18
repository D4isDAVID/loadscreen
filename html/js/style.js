import {
    loadingAction,
    logLine,
    logo,
    overlay,
    primaryBar,
    secondaryBar,
} from './util/elements.js';
import { getHandoverData } from './util/handover.js';

document.querySelectorAll('input').forEach((e) => {
    if (e.type !== 'range') return;

    const update = () => {
        const min = parseFloat(e.min);
        const max = parseFloat(e.max);
        const num = parseFloat(e.value);

        e.style.setProperty('--value', `${((num - min) / (max - min)) * 100}%`);
    };

    e.addEventListener('input', update);
    update();
});

const { paths, config } = getHandoverData();

const root = document.documentElement;

const link = document.createElement('link');
link.href = `./styles/${config.style}.css`;
link.rel = 'stylesheet';

document.head.appendChild(link);

if (!['image', 'video'].includes(config.background)) {
    root.style.setProperty('--background', config.background);
}

root.style.setProperty('--text-color', config.textColor);
root.style.setProperty('--primary-color', config.primaryColor);
root.style.setProperty('--secondary-color', config.secondaryColor);
root.style.setProperty('--shadow-color', config.shadowColor);
root.style.setProperty('--font-family', config.fontFamily);

overlay.style.backdropFilter = `brightness(${config.backgroundBrightness})`;

if (config.logo && paths.logo) {
    logo.src = paths.logo;
    logo.style.display = '';
}

if (!config.primaryBar) {
    primaryBar.style.display = 'none';
}

if (!config.secondaryBar) {
    secondaryBar.style.display = 'none';
}

if (!config.loadingAction) {
    loadingAction.style.display = 'none';
}

if (!config.logLine) {
    logLine.style.display = 'none';
}
