import {
    devEndDataFileEntries,
    devEndInitFunction,
    devEndInitFunctionType,
    devInitFunctionInvoked,
    devInitFunctionInvokedName,
    devInitFunctionInvokedType,
    devInitFunctionInvoking,
    devInitFunctionInvokingIdx,
    devInitFunctionInvokingName,
    devInitFunctionInvokingType,
    devLoadProgress,
    devLoadProgressFraction,
    devLoadProgressFractionLabel,
    devOnDataFileEntry,
    devOnDataFileEntryIsNew,
    devOnDataFileEntryName,
    devOnDataFileEntryType,
    devOnLogLine,
    devOnLogLineMessage,
    devPerformMapLoadFunction,
    devPerformMapLoadFunctionIdx,
    devStartDataFileEntries,
    devStartDataFileEntriesCount,
    devStartInitFunction,
    devStartInitFunctionOrder,
    devStartInitFunctionOrderCount,
    devStartInitFunctionOrderOrder,
    devStartInitFunctionOrderType,
    devStartInitFunctionType,
} from '../elements/events.js';

/**
 * @template {LoadscreenEvent} T
 * @param {HTMLButtonElement} button
 * @param {() => T} event
 */
function setupDevEventHandler(button, event) {
    button.addEventListener('click', () => window.postMessage(event()));
}

export function setupDevEventHandlers() {
    devLoadProgressFraction.addEventListener('input', () => {
        devLoadProgressFractionLabel.textContent =
            devLoadProgressFraction.value;
    });

    setupDevEventHandler(
        devLoadProgress,
        () =>
            /** @satisfies {LoadscreenEvents.LoadProgress} */ ({
                eventName: 'loadProgress',
                loadFraction: parseFloat(devLoadProgressFraction.value),
            }),
    );

    setupDevEventHandler(
        devOnLogLine,
        () =>
            /** @satisfies {LoadscreenEvents.OnLogLine} */
            ({
                eventName: 'onLogLine',
                message: devOnLogLineMessage.value,
            }),
    );

    setupDevEventHandler(
        devStartDataFileEntries,
        () =>
            /** @type {LoadscreenEvents.StartDataFileEntries} */
            ({
                eventName: 'startDataFileEntries',
                count: parseInt(devStartDataFileEntriesCount.value),
            }),
    );

    setupDevEventHandler(
        devOnDataFileEntry,
        () =>
            /** @type {LoadscreenEvents.OnDataFileEntry} */
            ({
                eventName: 'onDataFileEntry',
                name: devOnDataFileEntryName.value,
                type: parseInt(devOnDataFileEntryType.value),
                isNew: devOnDataFileEntryIsNew.checked,
            }),
    );

    setupDevEventHandler(
        devPerformMapLoadFunction,
        () =>
            /** @type {LoadscreenEvents.PerformMapLoadFunction} */
            ({
                eventName: 'performMapLoadFunction',
                idx: parseInt(devPerformMapLoadFunctionIdx.value),
            }),
    );

    setupDevEventHandler(
        devEndDataFileEntries,
        () =>
            /** @type {LoadscreenEvents.EndDataFileEntries} */
            ({
                eventName: 'endDataFileEntries',
            }),
    );

    setupDevEventHandler(
        devStartInitFunction,
        () =>
            /** @type {LoadscreenEvents.StartInitFunction} */
            ({
                eventName: 'startInitFunction',
                type: devStartInitFunctionType.value,
            }),
    );

    setupDevEventHandler(
        devStartInitFunctionOrder,
        () =>
            /** @type {LoadscreenEvents.StartInitFunctionOrder} */
            ({
                eventName: 'startInitFunctionOrder',
                type: devStartInitFunctionOrderType.value,
                order: parseInt(devStartInitFunctionOrderOrder.value),
                count: parseInt(devStartInitFunctionOrderCount.value),
            }),
    );

    setupDevEventHandler(
        devInitFunctionInvoking,
        () =>
            /** @type {LoadscreenEvents.InitFunctionInvoking} */
            ({
                eventName: 'initFunctionInvoking',
                type: devInitFunctionInvokingType.value,
                name: devInitFunctionInvokingName.value,
                idx: parseInt(devInitFunctionInvokingIdx.value),
            }),
    );

    setupDevEventHandler(
        devInitFunctionInvoked,
        () =>
            /** @type {LoadscreenEvents.InitFunctionInvoked} */
            ({
                eventName: 'initFunctionInvoked',
                type: devInitFunctionInvokedType.value,
                name: devInitFunctionInvokedName.value,
            }),
    );

    setupDevEventHandler(
        devEndInitFunction,
        () =>
            /** @type {LoadscreenEvents.EndInitFunction} */
            ({
                eventName: 'endInitFunction',
                type: devEndInitFunctionType.value,
            }),
    );
}
