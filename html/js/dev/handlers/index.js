import { config } from '../../config/index.js';

/**
 * @param {NuiHandoverData} handoverData
 * @param {HTMLInputElement} element
 * @param {(element: HTMLInputElement) => void} initial
 * @param {(element: HTMLInputElement) => void} update
 * @param {HTMLButtonElement} [button]
 */
export function createInputHandler(
    handoverData,
    element,
    initial,
    update,
    button,
) {
    initial(element);
    (button || element).addEventListener(
        typeof button !== 'undefined' ? 'click' : 'input',
        () => {
            update(element);
            config(handoverData);
        },
    );
}

/**
 * @param {NuiHandoverData} handoverData
 * @param {HTMLInputElement} element
 * @param {string} initial
 * @param {(value: string) => void} update
 * @param {HTMLButtonElement} [button]
 */
export function createInputValueHandler(
    handoverData,
    element,
    initial,
    update,
    button,
) {
    return createInputHandler(
        handoverData,
        element,
        (e) => (e.value = initial),
        (e) => update(e.value),
        button,
    );
}

/**
 * @param {NuiHandoverData} handoverData
 * @param {HTMLInputElement} element
 * @param {boolean} initial
 * @param {(checked: boolean) => void} update
 * @param {HTMLButtonElement} [button]
 */
export function createInputCheckedHandler(
    handoverData,
    element,
    initial,
    update,
    button,
) {
    return createInputHandler(
        handoverData,
        element,
        (e) => (e.checked = initial),
        (e) => update(e.checked),
        button,
    );
}

import { setupDevConfigHandlers } from './config.js';
import { setupDevEventHandlers } from './events.js';
import { setupDevVariableHandlers } from './variables.js';

/**
 * @param {NuiHandoverData} handoverData
 */
export function setupDevHandlers(handoverData) {
    setupDevVariableHandlers(handoverData);
    setupDevConfigHandlers(handoverData);
    setupDevEventHandlers();
}
