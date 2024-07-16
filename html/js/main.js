import {
    finishingWrapper,
    loadingAction,
    loadscreenWrapper,
    logLine,
    primaryBar,
    secondaryBar,
    secondaryBarWrapper,
} from './util/elements.js';

/** @type {boolean} */
let processingDataFiles = false;
/** @type {string | null} */
let currentDataFile = null;
/** @type {string | null} */
let currentMap = null;
/** @type {string | null} */
let currentInitFunctionType = null;
/** @type {string | null} */
let currentInitFunction = null;

/**
 * @param {string | null} str
 * @param {string | null} base
 * @param {string} sep
 * @returns {string | null}
 */
const prefixOrReplace = (str, base, sep) => {
    if (!base) return str;
    if (!str) return base;
    return `${str}${sep}${base}`;
};

/**
 * @param {number} max
 */
const beginMiniProgress = (max) => {
    secondaryBar.value = 0;
    secondaryBar.max = max;
    loadingAction.style.display = '';
};

const updateMiniProgressAction = () => {
    let action = currentMap;
    action = prefixOrReplace(currentDataFile, action, ': ');
    action = prefixOrReplace(currentInitFunction, action, ': ');
    action = prefixOrReplace(currentInitFunctionType, action, ': ');
    loadingAction.innerText = action ?? '';
};

const finishMiniProgress = () => {
    secondaryBarWrapper.style.display = 'none';
    loadingAction.innerText = '';
};

const handlers = {
    /**
     * @param {{ eventName: 'loadProgress', loadFraction: number }} data
     */
    loadProgress({ loadFraction }) {
        primaryBar.value = loadFraction;
        if (loadFraction === 1) {
            finishMiniProgress();
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
        processingDataFiles = true;
        beginMiniProgress(count);
    },

    /**
     * @param {{ eventName: 'onDataFileEntry', name: string, type: number, isNew: boolean }} data
     */
    onDataFileEntry({ name }) {
        currentMap = null;
        currentDataFile = name;
        updateMiniProgressAction();
        if (processingDataFiles) secondaryBar.value += 1;
    },

    /**
     * @param {{ eventName: 'performMapLoadFunction', idx: number }} data
     */
    performMapLoadFunction({ idx }) {
        currentMap = `Map ${idx}`;
        updateMiniProgressAction();
    },

    /**
     * @param {{ eventName: 'endDataFileEntries' }} _data
     */
    endDataFileEntries(_data) {
        finishMiniProgress();
        currentMap = null;
        currentDataFile = null;
        processingDataFiles = false;
    },

    /**
     * @param {{ eventName: 'startInitFunction', type: string }} data
     */
    startInitFunction({ type }) {
        currentInitFunctionType = type;
        updateMiniProgressAction();
        beginMiniProgress(0); // just a random value to begin the mini progress bar
    },

    /**
     * @param {{ eventName: 'startInitFunctionOrder', type: string, order: number, count: number }} data
     */
    startInitFunctionOrder({ type, order, count }) {
        currentInitFunctionType = `${type} (${order})`;
        updateMiniProgressAction();
        beginMiniProgress(count);
    },

    /**
     * @param {{ eventName: 'initFunctionInvoking', type: string, name: string, idx: number }} data
     */
    initFunctionInvoking({ name, idx }) {
        currentInitFunction = name;
        secondaryBar.value = idx;
        updateMiniProgressAction();
    },

    /**
     * @param {{ eventName: 'initFunctionInvoked', type: string, name: string }} _data
     */
    initFunctionInvoked(_data) {
        currentMap = null;
        currentDataFile = null;
        currentInitFunction = null;
        updateMiniProgressAction();
    },

    /**
     * @param {{ eventName: 'endInitFunction', type: string }} _data
     */
    endInitFunction(_data) {
        finishMiniProgress();
        currentInitFunction = null;
        currentInitFunctionType = null;
    },
};

window.addEventListener('message', ({ data }) =>
    handlers[/** @type {keyof handlers} */ (data.eventName)]?.(data),
);

if (!('invokeNative' in window)) {
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
