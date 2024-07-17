import {
    loadingAction,
    logLine,
    logo,
    primaryBar,
    secondaryBar,
} from './util/elements.js';
import { getHandoverData } from './util/handover.js';

const { paths, config } = getHandoverData();

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
