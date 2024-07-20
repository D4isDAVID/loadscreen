import { isBrowserEnv } from '../util/env.js';
import { getHandoverData } from '../util/handover.js';
import { devClose, devMenu, devOpen } from './elements/menu.js';
import { setupDevHandlers } from './handlers/index.js';

const HIDDEN_REM = '-25rem';

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

    setupDevHandlers(handoverData);
}
