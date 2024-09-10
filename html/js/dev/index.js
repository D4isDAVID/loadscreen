import {
    devBack,
    devCfgWrapper,
    devClose,
    devConfig,
    devCustomEvents,
    devEvents,
    devMenu,
    devOpen,
    devOptions,
    devVariables,
} from '../util/elements.js';
import { isBrowserEnv } from '../util/env.js';
import { getHandoverData } from '../util/handover.js';
import { setupEventHandlers } from './event-handlers.js';
import { customEvents } from './events/custom-events.js';
import { events } from './events/events.js';
import { setupValueHandlers } from './value-handlers.js';

const HIDDEN_REM = '-25rem';

const intHandlers = {
    /**
     * @param {number} val
     * @returns {string}
     */
    initial(val) {
        return `${val}`;
    },

    /**
     * @param {string} val
     * @returns {number}
     */
    update(val) {
        return parseInt(val);
    },
};

const fractionHandlers = {
    /**
     * @param {number} val
     * @returns {string}
     */
    initial(val) {
        return `${val * 100}`;
    },

    /**
     * @param {string} val
     * @returns {number}
     */
    update(val) {
        return parseInt(val) / 100;
    },
};

if (isBrowserEnv()) {
    const handoverData = getHandoverData();

    devOpen.style.display = '';
    devMenu.style.display = '';
    devMenu.style.right = HIDDEN_REM;

    devOpen.addEventListener('click', () => {
        devMenu.style.right = '';
    });
    devClose.addEventListener('click', () => {
        devMenu.style.right = HIDDEN_REM;
    });

    devBack.addEventListener('click', () => {
        document.getElementById('dev-section')?.remove();
        devBack.style.display = 'none';
        devOptions.style.display = '';
        devCfgWrapper.style.display = '';
    });

    setupValueHandlers(handoverData, 'vars', devVariables);
    setupValueHandlers(handoverData, 'config', devConfig, {
        backgroundBrightness: fractionHandlers,
        initialAudioVolume: fractionHandlers,
        imageRate: intHandlers,
    });

    setupEventHandlers('eventName', events, devEvents);
    setupEventHandlers('customEvent', customEvents, devCustomEvents);
}
