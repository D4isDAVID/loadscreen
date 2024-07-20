import {
    finishingWrapper,
    loadingAction,
    loadscreenWrapper,
    logLine,
    primaryBar,
    secondaryBar,
    secondaryBarWrapper,
} from './util/elements.js';
import {
    getHandoverData,
    shouldShowSecondaryWrapper,
} from './util/handover.js';

const handoverData = getHandoverData();

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
    if (!shouldShowSecondaryWrapper(handoverData)) return;
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
     * @param {LoadscreenEvents.LoadProgress} data
     */
    loadProgress({ loadFraction }) {
        primaryBar.value = loadFraction;
        if (loadFraction === 1) {
            hideSecondaryBar();
            finishingWrapper.style.display = '';
            finishingWrapper.style.opacity = '1';
            loadscreenWrapper.style.opacity = '0';
        } else {
            finishingWrapper.style.display = 'none';
            finishingWrapper.style.opacity = '0';
            loadscreenWrapper.style.opacity = '1';
        }
    },

    /**
     * @param {LoadscreenEvents.OnLogLine} data
     */
    onLogLine({ message }) {
        logLine.innerText = message;
    },

    /**
     * @param {LoadscreenEvents.StartDataFileEntries} data
     */
    startDataFileEntries({ count }) {
        currentLoadingAction.startedDataFiles = true;
        showSecondaryBar(count);
    },

    /**
     * @param {LoadscreenEvents.OnDataFileEntry} data
     */
    onDataFileEntry({ name }) {
        currentLoadingAction.map = null;
        currentLoadingAction.dataFile = name;
        updateLoadingAction();
        if (currentLoadingAction.startedDataFiles) secondaryBar.value += 1;
    },

    /**
     * @param {LoadscreenEvents.PerformMapLoadFunction} data
     */
    performMapLoadFunction({ idx }) {
        currentLoadingAction.map = `Map ${idx}`;
        updateLoadingAction();
    },

    /**
     * @param {LoadscreenEvents.EndDataFileEntries} data
     */
    endDataFileEntries({}) {
        hideSecondaryBar();
        currentLoadingAction.map = null;
        currentLoadingAction.dataFile = null;
        currentLoadingAction.startedDataFiles = false;
    },

    /**
     * @param {LoadscreenEvents.StartInitFunction} data
     */
    startInitFunction({ type }) {
        currentLoadingAction.initFunctionType = type;
        updateLoadingAction();
        showSecondaryBar(0); // just a random value to begin the mini progress bar
    },

    /**
     * @param {LoadscreenEvents.StartInitFunctionOrder} data
     */
    startInitFunctionOrder({ type, order, count }) {
        currentLoadingAction.initFunctionType = `${type} (${order})`;
        updateLoadingAction();
        showSecondaryBar(count);
    },

    /**
     * @param {LoadscreenEvents.InitFunctionInvoking} data
     */
    initFunctionInvoking({ name, idx }) {
        currentLoadingAction.initFunction = name;
        secondaryBar.value = idx;
        updateLoadingAction();
    },

    /**
     * @param {LoadscreenEvents.InitFunctionInvoked} data
     */
    initFunctionInvoked({}) {
        currentLoadingAction.map = null;
        currentLoadingAction.dataFile = null;
        currentLoadingAction.initFunction = null;
        updateLoadingAction();
    },

    /**
     * @param {LoadscreenEvents.EndInitFunction} _data
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
