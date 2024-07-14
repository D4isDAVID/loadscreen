import { getHandoverData } from './util/handover.js';

const {
    config: { style },
} = getHandoverData();

const link = document.createElement('link');
link.href = `./styles/${style}.css`;
link.rel = 'stylesheet';

/** @type {HTMLHeadElement} */ (
    document.getElementsByTagName('head')[0]
).appendChild(link);
