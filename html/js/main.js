const loadscreenWrapperHeader = /** @type {HTMLDivElement} */ (
    document.getElementById('loadscreen-wrapper-header')
);
const loadscreenWrapperMain = /** @type {HTMLDivElement} */ (
    document.getElementById('loadscreen-wrapper-main')
);
const loadscreenWrapperFooter = /** @type {HTMLDivElement} */ (
    document.getElementById('loadscreen-wrapper-footer')
);
const logLine = /** @type {HTMLParagraphElement} */ (
    document.getElementById('log-line')
);
const mainProgress = /** @type {HTMLProgressElement} */ (
    document.getElementById('main-progress')
);
const miniProgressWrapper = /** @type {HTMLDivElement} */ (
    document.getElementById('mini-progress-wrapper')
);
const miniProgressAction = /** @type {HTMLParagraphElement} */ (
    document.getElementById('mini-progress-action')
);
const miniProgress = /** @type {HTMLProgressElement} */ (
    document.getElementById('mini-progress')
);

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
    miniProgress.value = 0;
    miniProgress.max = max;
    miniProgressWrapper.style.display = '';
};

const updateMiniProgressAction = () => {
    let action = currentMap;
    action = prefixOrReplace(currentDataFile, action, ': ');
    action = prefixOrReplace(currentInitFunction, action, ': ');
    action = prefixOrReplace(currentInitFunctionType, action, ': ');
    miniProgressAction.innerText = action ?? '';
};

const finishMiniProgress = () => {
    miniProgressWrapper.style.display = 'none';
    miniProgressAction.innerText = '';
};

const handlers = {
    /**
     * @param {{ eventName: 'loadProgress', loadFraction: number }} data
     */
    loadProgress({ loadFraction }) {
        mainProgress.value = loadFraction;
        if (loadFraction === 1) {
            finishMiniProgress();
            loadscreenWrapperMain.style.display = '';
            loadscreenWrapperMain.style.opacity = '1';
            loadscreenWrapperHeader.style.opacity = '0';
            loadscreenWrapperFooter.style.opacity = '0';
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
        if (processingDataFiles) miniProgress.value += 1;
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
        miniProgress.value = idx;
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
    loadscreenWrapperMain.style.display = '';
    loadscreenWrapperMain.style.opacity = '1';
    postMessage({ eventName: 'onLogLine', message: 'Awaiting scripts' });
}
