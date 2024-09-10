import { config } from '../config/index.js';
import {
    devBack,
    devCfgWrapper,
    devGeneratedCfg,
    devMenu,
    devOptions,
    devValueTemplate,
} from '../util/elements.js';

const CONVAR_PREFIX = 'loadscreen:';

/**
 * @param {string} t
 * @param {string} v
 * @param {boolean} c
 */
function toConvarValue(t, v, c) {
    switch (t) {
        case 'number':
            return `${v}`;
        case 'boolean':
            return `${c}`;
        default:
            return `"${v}"`;
    }
}

/**
 * @template {keyof NuiHandoverData} T
 * @template {keyof NuiHandoverData[T]} K
 * @typedef {Object} DevSpecialHandlers
 * @property {(value: NuiHandoverData[T][K]) => string} initial
 * @property {(value: string) => NuiHandoverData[T][K]} update
 */

/**
 * @template {keyof NuiHandoverData} T
 * @template {keyof NuiHandoverData[T]} K
 * @param {NuiHandoverData} handoverData
 * @param {T} sectionName
 * @param {HTMLElement} element
 * @param {Partial<Record<K, DevSpecialHandlers<T, K>>>} [specialHandlers]
 */
export function setupValueHandlers(
    handoverData,
    sectionName,
    element,
    specialHandlers = {},
) {
    const section = handoverData[sectionName];
    const cfg = sectionName === 'config';

    const parent = document.createElement('div');
    parent.id = 'dev-section';

    for (const [key, val] of Object.entries(section)) {
        const { initial, update } =
            specialHandlers[/** @type {keyof NuiHandoverData[T]} */ (key)] ??
            {};

        const clone = /** @type {HTMLDivElement} */ (
            devValueTemplate.content.cloneNode(true)
        );
        const title = /** @type {HTMLHeadingElement} */ (
            clone.querySelector('h4')
        );
        const input = /** @type {HTMLInputElement} */ (
            clone.querySelector('input')
        );

        const convarRegex = new RegExp(`${CONVAR_PREFIX}${key} .*`);
        const toConvar = () => {
            return `${CONVAR_PREFIX}${key} ${toConvarValue(typeof val, input.value, input.checked)}`;
        };

        title.innerText = key;
        input.value = initial ? initial(val) : val;

        switch (typeof val) {
            case 'string':
                input.type = 'text';
                break;
            case 'number':
                input.type = 'number';
                break;
            case 'boolean':
                input.type = 'checkbox';
                input.checked = val;
                break;
        }

        if (cfg) {
            if (devGeneratedCfg.value) devGeneratedCfg.value += '\n';
            devGeneratedCfg.value += `set ${toConvar()}`;
        }

        input.addEventListener('input', () => {
            if (input.type === 'checkbox') {
                //@ts-ignore too hard to check
                section[key] = input.checked;
            } else {
                //@ts-ignore too hard to check
                section[key] = update ? update(input.value) : input.value;
            }
            config(handoverData);
            devGeneratedCfg.value = devGeneratedCfg.value.replace(
                convarRegex,
                toConvar(),
            );
        });

        parent.append(clone);
    }

    element.addEventListener('click', () => {
        devBack.style.display = '';
        devOptions.style.display = 'none';
        if (!cfg) devCfgWrapper.style.display = 'none';
        devMenu.appendChild(parent);
    });
}
