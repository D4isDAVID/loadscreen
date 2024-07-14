import { getHandoverData } from './util/handover.js';

const {
    playerName,
    serverName,
    config: { serverMessage, finishingMessage },
} = getHandoverData();

const serverMessageHeading = /** @type {HTMLHeadingElement} */ (
    document.getElementById('server-message')
);
const finishingMessageHeading = /** @type {HTMLHeadingElement} */ (
    document.getElementById('finishing-message')
);

/**
 * @param {string} str
 * @param {Record<string, string>} vars
 */
const replaceVariables = (str, vars) => {
    for (const [k, v] of Object.entries(vars))
        str = str.replace('${' + k + '}', v);
    return str;
};

serverMessageHeading.innerText = replaceVariables(serverMessage, {
    playerName,
    serverName,
});

finishingMessageHeading.innerText = finishingMessage;
