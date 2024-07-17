import { errorLog, errorWrapper } from './util/elements.js';
import { getHandoverData } from './util/handover.js';

const { config } = getHandoverData();

if (config.errorLog) {
    window.addEventListener('error', (event) => {
        errorWrapper.style.display = '';
        errorLog.textContent = `${errorLog.textContent}${event.type}: ${event.message}\n`;
    });

    if (!('invokeNative' in window)) {
        errorWrapper.style.display = '';
    }
}
