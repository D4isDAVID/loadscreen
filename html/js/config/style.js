import {
    loadingAction,
    logLine,
    logo,
    overlay,
    primaryBar,
    secondaryBar,
    style,
} from '../util/elements.js';
import { shouldShowBackgroundCSS } from '../util/handover.js';

/**
 * @param {HTMLInputElement} element
 */
export function setupInputRangeStyle(element) {
    if (element.type !== 'range') return;

    function update() {
        const min = parseFloat(element.min);
        const max = parseFloat(element.max);
        const num = parseFloat(element.value);

        element.style.setProperty(
            '--value',
            `${((num - min) / (max - min)) * 100}%`,
        );
    }

    element.addEventListener('input', update);
    update();
}

export function setupStyle() {
    document.querySelectorAll('input').forEach(setupInputRangeStyle);
}

/**
 * @param {NuiHandoverData} handoverData
 */
export function configStyle(handoverData) {
    const { paths, config } = handoverData;

    style.href = `./styles/${config.style}.css`;

    /** @type {{ property: string; value: string | null }[]} */
    const vars = [
        {
            property: '--background',
            value: shouldShowBackgroundCSS(handoverData)
                ? config.background
                : null,
        },
        { property: '--text-color', value: config.textColor },
        { property: '--primary-color', value: config.primaryColor },
        { property: '--secondary-color', value: config.secondaryColor },
        { property: '--shadow-color', value: config.shadowColor },
        { property: '--font-family', value: config.fontFamily },
    ];

    for (const { property, value } of vars) {
        document.documentElement.style.setProperty(property, value);
    }

    overlay.style.backdropFilter = `brightness(${config.backgroundBrightness})`;

    if (config.logo && typeof paths.logo !== 'undefined') {
        logo.src = paths.logo;
        logo.style.display = '';
    } else {
        logo.style.display = 'none';
    }

    primaryBar.style.display = config.primaryBar ? '' : 'none';
    secondaryBar.style.display = config.secondaryBar ? '' : 'none';
    loadingAction.style.display = config.loadingAction ? '' : 'none';
    logLine.style.display = config.logLine ? '' : 'none';
}
