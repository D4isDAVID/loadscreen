import { devPlayerName, devServerName } from '../elements/variables.js';
import { createInputValueHandler } from './index.js';

/**
 * @param {NuiHandoverData} handoverData
 */
export function setupDevVariableHandlers(handoverData) {
    createInputValueHandler(
        handoverData,
        devPlayerName,
        handoverData.playerName,
        (v) => (handoverData.playerName = v),
    );
    createInputValueHandler(
        handoverData,
        devServerName,
        handoverData.serverName,
        (v) => (handoverData.serverName = v),
    );
}
