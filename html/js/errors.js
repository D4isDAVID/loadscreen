import { errorLog, errorWrapper } from './util/elements.js';

window.addEventListener('error', (event) => {
    errorWrapper.style.display = '';
    errorLog.textContent = `${errorLog.textContent}${event.type}: ${event.message}\n`;
});

if (!('invokeNative' in window)) {
    errorWrapper.style.display = '';
}
