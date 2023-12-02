/** @type {HTMLDivElement} */
const loadscreenWrapperMain = document.getElementById(
    "loadscreen-wrapper-main"
);
/** @type {HTMLDivElement} */
const loadscreenWrapperFooter = document.getElementById(
    "loadscreen-wrapper-footer"
);
/** @type {HTMLParagraphElement} */
const logLine = document.getElementById("log-line");
/** @type {HTMLProgressElement} */
const mainProgress = document.getElementById("main-progress");
/** @type {HTMLDivElement} */
const miniProgressWrapper = document.getElementById("mini-progress-wrapper");
/** @type {HTMLParagraphElement} */
const miniProgressAction = document.getElementById("mini-progress-action");
/** @type {HTMLProgressElement} */
const miniProgress = document.getElementById("mini-progress");

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
 * @param {string} str
 * @param {string} base
 * @param {string} sep
 * @returns {string}
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
    miniProgressWrapper.style.display = "";
};

const updateMiniProgressAction = () => {
    let action = currentMap;
    action = prefixOrReplace(currentDataFile, action, ": ");
    action = prefixOrReplace(currentInitFunction, action, ": ");
    action = prefixOrReplace(currentInitFunctionType, action, ": ");
    miniProgressAction.innerText = action;
};

const finishMiniProgress = () => {
    miniProgressWrapper.style.display = "none";
    miniProgressAction.innerText = "";
};

const handlers = {
    /**
     * @param {{ eventName: 'loadProgress', loadFraction: number }} data
     */
    loadProgress({ loadFraction }) {
        mainProgress.value = loadFraction;
        if (loadFraction === 1) {
            finishMiniProgress();
            loadscreenWrapperMain.style.display = "";
            loadscreenWrapperMain.style.opacity = 1;
            loadscreenWrapperFooter.style.opacity = 0;
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
     * @param {{ eventName: 'endDataFileEntries' }} data
     */
    endDataFileEntries() {
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
     * @param {{ eventName: 'initFunctionInvoked', type: string, name: string }} data
     */
    initFunctionInvoked() {
        currentMap = null;
        currentDataFile = null;
        currentInitFunction = null;
        updateMiniProgressAction();
    },

    /**
     * @param {{ eventName: 'endInitFunction', type: string }} data
     */
    endInitFunction() {
        finishMiniProgress();
        currentInitFunction = null;
        currentInitFunctionType = null;
    },
};

window.addEventListener("message", ({ data }) =>
    handlers[data.eventName]?.(data)
);

if (!window.invokeNative) {
    postMessage({ eventName: "loadProgress", loadFraction: 0.65 });
    postMessage({ eventName: "startDataFileEntries", count: 100 });
    postMessage({
        eventName: "startInitFunctionOrder",
        type: "TEST_FUNCTION",
        order: 1,
        count: 1,
    });
    postMessage({
        eventName: "initFunctionInvoking",
        name: "helloWorld",
        idx: 0.65,
    });
    postMessage({
        eventName: "performMapLoadFunction",
        idx: 65,
    });
    loadscreenWrapperMain.style.display = "";
    loadscreenWrapperMain.style.opacity = 1;
    postMessage({ eventName: "onLogLine", message: "Awaiting scripts" });
}
