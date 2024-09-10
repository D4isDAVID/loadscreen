import { setupInputRangeStyle } from '../config/style.js';
import {
    devBack,
    devCfgWrapper,
    devEventParamTemplate,
    devEventTemplate,
    devMenu,
    devOptions,
} from '../util/elements.js';

/**
 * @typedef {Object} DevEventParam
 * @property {string} name
 * @property {'text' | 'number' | 'range' | 'checkbox'} type
 * @property {string} [value]
 * @property {string} [min]
 * @property {string} [max]
 * @property {string} [step]
 * @property {boolean} [checked]
 */

/**
 * @typedef {Object} DevEvent
 * @property {string} name
 * @property {DevEventParam[]} [params]
 */

/**
 * @typedef {Object} DevEventParamHandler
 * @property {string} name
 * @property {() => unknown} getValue
 */

/**
 * @param {string} field
 * @param {DevEvent[]} events
 * @param {HTMLElement} element
 */
export function setupEventHandlers(field, events, element) {
    const parent = document.createElement('div');
    parent.id = 'dev-section';

    for (const { name, params } of events) {
        const clone = /** @type {HTMLDivElement} */ (
            devEventTemplate.content.cloneNode(true)
        );
        const wrapper = /** @type {HTMLDivElement} */ (
            clone.querySelector('div')
        );
        const title = /** @type {HTMLHeadingElement} */ (
            clone.querySelector('h4')
        );
        const button = /** @type {HTMLButtonElement} */ (
            clone.querySelector('button')
        );

        title.innerText = name;

        const inputHandlers = /** @type {DevEventParamHandler[]} */ ([]);
        for (const { name, type, value, min, max, step, checked } of params ??
            []) {
            const clone = /** @type {HTMLDivElement} */ (
                devEventParamTemplate.content.cloneNode(true)
            );
            const title = /** @type {HTMLHeadingElement} */ (
                clone.querySelector('h5')
            );
            const input = /** @type {HTMLInputElement} */ (
                clone.querySelector('input')
            );

            title.innerText = name;
            input.type = type;
            if (typeof value !== 'undefined') input.value = value;
            if (typeof min !== 'undefined') input.min = min;
            if (typeof max !== 'undefined') input.max = max;
            if (typeof step !== 'undefined') input.step = step;
            if (typeof checked !== 'undefined') input.checked = checked;

            let getValue;
            switch (type) {
                case 'checkbox':
                    getValue = () => input.checked;
                    break;
                case 'number':
                    getValue = () => parseInt(input.value);
                    break;
                case 'range':
                    getValue = () => parseFloat(input.value);
                    break;
                default:
                    getValue = () => input.value;
                    break;
            }

            if (type === 'range') {
                input.addEventListener('input', () => {
                    title.innerText = `${name} - ${input.value}`;
                });
                setupInputRangeStyle(input);
                input.dispatchEvent(new Event('input'));
            }

            inputHandlers.push({ name, getValue });
            wrapper.insertBefore(clone, button);
        }

        button.addEventListener('click', () => {
            const data = /** @type {Record<string, unknown>} */ ({});
            data[field] = name;

            for (const { name, getValue } of inputHandlers) {
                data[name] = getValue();
            }

            window.postMessage(data);
        });

        parent.append(clone);
    }

    element.addEventListener('click', () => {
        devBack.style.display = '';
        devOptions.style.display = 'none';
        devCfgWrapper.style.display = 'none';
        devMenu.appendChild(parent);
    });
}
