import { errorLog, errorWrapper } from '../util/elements.js';

function showErrorLog() {
    errorWrapper.style.display = '';
}

export function setupErrorLog() {
    window.addEventListener('error', (event) => {
        errorLog.textContent = `${errorLog.textContent}${event.type}: ${event.message}\n`;
    });
    window.addEventListener('unhandledrejection', (event) => {
        errorLog.textContent = `${errorLog.textContent}${event.type}: ${event.reason}\n`;
    });
}

/**
 * @param {NuiHandoverData} handoverData
 */
export function configErrorLog({ config }) {
    window.removeEventListener('error', showErrorLog);
    window.removeEventListener('unhandledrejection', showErrorLog);
    errorLog.textContent = '';
    errorWrapper.style.display = 'none';

    if (!config.errorLog) {
        return;
    }

    window.addEventListener('error', showErrorLog);
    window.addEventListener('unhandledrejection', showErrorLog);
}
