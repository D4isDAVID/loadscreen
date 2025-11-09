import { finishingMessage, serverMessage } from '../util/elements.js';

const colorRegex = /\^[\d]/g;

/**
 * @param {string} str
 * @param {Record<string, string>} vars
 * @returns {string}
 */
function replaceVariables(str, vars) {
    for (const [k, v] of Object.entries(vars)) {
        str = str.replace('${' + k + '}', v);
    }

    return str;
}

/**
 * @param {string} message
 * @returns {string}
 */
function removeColors(message) {
    return message.replaceAll(colorRegex, '');
}

/**
 * @param {NuiHandoverData} handoverData
 */
export function configMessages({ vars, config }) {
    serverMessage.innerText = removeColors(
        replaceVariables(config.serverMessage, vars),
    );

    finishingMessage.innerText = removeColors(config.finishingMessage);
}
