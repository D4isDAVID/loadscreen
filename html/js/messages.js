import { finishingMessage, serverMessage } from './util/elements.js';
import { getHandoverData } from './util/handover.js';

const {
    playerName,
    serverName,
    config: {
        serverMessage: serverMessageContent,
        finishingMessage: finishingMessageContent,
    },
} = getHandoverData();

/**
 * @param {string} str
 * @param {Record<string, string>} vars
 */
const replaceVariables = (str, vars) => {
    for (const [k, v] of Object.entries(vars))
        str = str.replace('${' + k + '}', v);
    return str;
};

serverMessage.innerText = replaceVariables(serverMessageContent, {
    playerName,
    serverName,
});

finishingMessage.innerText = finishingMessageContent;
