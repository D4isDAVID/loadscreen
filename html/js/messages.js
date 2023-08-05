import { finishingMessage, serverMessage } from "../config.js";

/** @type {HTMLHeadingElement} */
const serverMessageHeading = document.getElementById("server-message");
/** @type {HTMLHeadingElement} */
const finishingMessageHeading = document.getElementById("finishing-message");

/**
 * @param {string} str
 * @param {Record<string, string>} vars
 */
const replaceVariables = (str, vars) => {
    for (const [k, v] of Object.entries(vars))
        str = str.replace("${" + k + "}", v);
    return str;
};

const { playerName, serverName } = window.nuiHandoverData ?? {
    playerName: "Player",
    serverName: "Server",
};

serverMessageHeading.innerText = replaceVariables(serverMessage, {
    playerName,
    serverName,
});

finishingMessageHeading.innerText = finishingMessage;
