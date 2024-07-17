import { errorLog, errorWrapper } from './util/elements.js';
import { isBrowserEnv } from './util/env.js';
import { getHandoverData } from './util/handover.js';

const { config } = getHandoverData();

if (config.errorLog) {
    window.addEventListener('error', (event) => {
        errorWrapper.style.display = '';
        errorLog.textContent = `${errorLog.textContent}${event.type}: ${event.message}\n`;
    });

    if (isBrowserEnv()) {
        errorWrapper.style.display = '';
    }
}
