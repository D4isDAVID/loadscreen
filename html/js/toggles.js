import {
    loadingAction,
    logLine,
    primaryBar,
    secondaryBar,
} from './util/elements.js';
import { getHandoverData } from './util/handover.js';

const { config } = getHandoverData();

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
