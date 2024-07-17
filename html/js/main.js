import {
    finishingWrapper,
    loadingAction,
    loadscreenWrapper,
    logLine,
    primaryBar,
    secondaryBar,
    secondaryBarWrapper,
} from './util/elements.js';
import { isBrowserEnv } from './util/env.js';

/**
 * @typedef {Object} LoadingAction
 * @property {boolean} startedDataFiles
 * @property {string | null} initFunctionType
 * @property {string | null} initFunction
 * @property {string | null} dataFile
 * @property {string | null} map
 * @property {() => string} toString
 */

/** @type {LoadingAction} */
const currentLoadingAction = {
    startedDataFiles: false,
    initFunctionType: null,
    initFunction: null,
    dataFile: null,
    map: null,
    toString() {
        return [
            this.initFunctionType,
            this.initFunction,
            this.dataFile,
            this.map,
        ]
            .filter((s) => s !== null)
            .join(': ');
    },
};

/**
 * @param {number} max
 */
function showSecondaryBar(max) {
    secondaryBar.value = 0;
    secondaryBar.max = max;
    secondaryBarWrapper.style.display = '';
}

function updateLoadingAction() {
    loadingAction.innerText = currentLoadingAction.toString();
}

function hideSecondaryBar() {
    secondaryBarWrapper.style.display = 'none';
    loadingAction.innerText = '';
}

const handlers = {
    /**
     * @param {{ eventName: 'loadProgress', loadFraction: number }} data
     */
    loadProgress({ loadFraction }) {
        primaryBar.value = loadFraction;
        if (loadFraction === 1) {
            hideSecondaryBar();
            finishingWrapper.style.display = '';
            finishingWrapper.style.opacity = '1';
            loadscreenWrapper.style.opacity = '0';
        }
    },

    /**
     * @param {{ eventName: 'onLogLine', message: string }} data
     */
    onLogLine({ message }) {
        logLine.innerText = message;
    },

    /**
     * @param {{ eventName: 'startDataFileEntries', count: number }} data
     */
    startDataFileEntries({ count }) {
        currentLoadingAction.startedDataFiles = true;
        showSecondaryBar(count);
    },

    /**
     * @param {{ eventName: 'onDataFileEntry', name: string, type: number, isNew: boolean }} data
     */
    onDataFileEntry({ name }) {
        currentLoadingAction.map = null;
        currentLoadingAction.dataFile = name;
        updateLoadingAction();
        if (currentLoadingAction.startedDataFiles) secondaryBar.value += 1;
    },

    /**
     * @param {{ eventName: 'performMapLoadFunction', idx: number }} data
     */
    performMapLoadFunction({ idx }) {
        currentLoadingAction.map = `Map ${idx}`;
        updateLoadingAction();
    },

    /**
     * @param {{ eventName: 'endDataFileEntries' }} data
     */
    endDataFileEntries({}) {
        hideSecondaryBar();
        currentLoadingAction.map = null;
        currentLoadingAction.dataFile = null;
        currentLoadingAction.startedDataFiles = false;
    },

    /**
     * @param {{ eventName: 'startInitFunction', type: string }} data
     */
    startInitFunction({ type }) {
        currentLoadingAction.initFunctionType = type;
        updateLoadingAction();
        showSecondaryBar(0); // just a random value to begin the mini progress bar
    },

    /**
     * @param {{ eventName: 'startInitFunctionOrder', type: string, order: number, count: number }} data
     */
    startInitFunctionOrder({ type, order, count }) {
        currentLoadingAction.initFunctionType = `${type} (${order})`;
        updateLoadingAction();
        showSecondaryBar(count);
    },

    /**
     * @param {{ eventName: 'initFunctionInvoking', type: string, name: string, idx: number }} data
     */
    initFunctionInvoking({ name, idx }) {
        currentLoadingAction.initFunction = name;
        secondaryBar.value = idx;
        updateLoadingAction();
    },

    /**
     * @param {{ eventName: 'initFunctionInvoked', type: string, name: string }} data
     */
    initFunctionInvoked({}) {
        currentLoadingAction.map = null;
        currentLoadingAction.dataFile = null;
        currentLoadingAction.initFunction = null;
        updateLoadingAction();
    },

    /**
     * @param {{ eventName: 'endInitFunction', type: string }} _data
     */
    endInitFunction(_data) {
        hideSecondaryBar();
        currentLoadingAction.initFunction = null;
        currentLoadingAction.initFunctionType = null;
    },
};

window.addEventListener('message', ({ data }) =>
    handlers[/** @type {keyof handlers} */ (data.eventName)]?.(data),
);

if (isBrowserEnv()) {
    postMessage({ eventName: 'loadProgress', loadFraction: 0.65 });
    postMessage({ eventName: 'startDataFileEntries', count: 100 });
    postMessage({
        eventName: 'startInitFunctionOrder',
        type: 'TEST_FUNCTION',
        order: 1,
        count: 1,
    });
    postMessage({
        eventName: 'initFunctionInvoking',
        name: 'helloWorld',
        idx: 0.65,
    });
    postMessage({
        eventName: 'performMapLoadFunction',
        idx: 65,
    });
    finishingWrapper.style.display = '';
    finishingWrapper.style.opacity = '1';
    postMessage({ eventName: 'onLogLine', message: 'Awaiting scripts' });
}
