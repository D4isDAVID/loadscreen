import { finishingMessage, serverMessage } from '../util/elements.js';

/**
 * @param {string} str
 * @param {Record<string, string>} vars
 */
function replaceVariables(str, vars) {
    for (const [k, v] of Object.entries(vars)) {
        str = str.replace('${' + k + '}', v);
    }

    return str;
}

/**
 * @param {NuiHandoverData} handoverData
 */
export function configMessages({ vars, config }) {
    serverMessage.innerText = replaceVariables(config.serverMessage, vars);

    finishingMessage.innerText = config.finishingMessage;
}
