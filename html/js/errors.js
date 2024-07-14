const errorWrapper = /** @type {HTMLDivElement} */ (
    document.getElementById('error-wrapper')
);
const errorLog = /** @type {HTMLTextAreaElement} */ (
    document.getElementById('error-log')
);

window.addEventListener('error', (event) => {
    errorWrapper.style.display = '';
    errorLog.textContent = `${errorLog.textContent}${event.type}: ${event.message}\n`;
});

if (!('invokeNative' in window)) {
    errorWrapper.style.display = '';
}
