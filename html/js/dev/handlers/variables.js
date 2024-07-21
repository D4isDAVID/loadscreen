import { devPlayerName, devServerName } from '../elements/variables.js';
import { createInputValueHandler } from './index.js';

/**
 * @param {NuiHandoverData} handoverData
 */
export function setupDevVariableHandlers(handoverData) {
    const { vars } = handoverData;

    createInputValueHandler(
        handoverData,
        devPlayerName,
        vars.playerName,
        (v) => (vars.playerName = v),
    );
    createInputValueHandler(
        handoverData,
        devServerName,
        vars.serverName,
        (v) => (vars.serverName = v),
    );
}
