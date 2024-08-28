import { finishingMessage, logLine } from '../util/elements.js';

/**
 * @type {Record<string, Function>}
 */
const handlers = {};

export function setupCustomEvents() {
    window.addEventListener('message', ({ data }) =>
        handlers[/** @type {keyof typeof handlers} */ (data.customEvent)]?.(
            data,
        ),
    );
}

/**
 * @param {NuiHandoverData} handoverData
 */
export function configCustomEvents({ config }) {
    /**
     * @param {CustomEvents.FinishedLoading} data
     */
    handlers.finishedLoading = function ({}) {
        finishingMessage.innerText = config.finishedMessage;
        logLine.innerText = config.finishedLine;
    };
}
