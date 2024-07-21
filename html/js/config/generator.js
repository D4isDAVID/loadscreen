import { devGeneratedCfg } from '../dev/elements/config.js';
import { isBrowserEnv } from '../util/env.js';

const CONVAR_PREFIX = 'loadscreen:';

/** @param {string} v */
function str(v) {
    return `"${v}"`;
}

/** @param {number} v */
function int(v) {
    return `${v}`;
}

/** @param {number} v */
function int100(v) {
    return `${v * 100}`;
}

/** @param {boolean} v */
function bool(v) {
    return v ? 'true' : 'false';
}

/**
 * @param {NuiHandoverData} handoverData
 */
export function configGenerator({ config }) {
    if (!isBrowserEnv()) return;

    /**
     * @type {{ name: keyof NuiHandoverData['config'], func: (...args: any) => string }[]}
     */
    const vars = [
        { name: 'style', func: str },
        { name: 'background', func: str },
        { name: 'backgroundBrightness', func: int100 },
        { name: 'textColor', func: str },
        { name: 'primaryColor', func: str },
        { name: 'secondaryColor', func: str },
        { name: 'shadowColor', func: str },
        { name: 'fontFamily', func: str },
        { name: 'logo', func: bool },
        { name: 'serverMessage', func: str },
        { name: 'primaryBar', func: bool },
        { name: 'secondaryBar', func: bool },
        { name: 'loadingAction', func: bool },
        { name: 'finishingMessage', func: str },
        { name: 'logLine', func: bool },
        { name: 'audioControls', func: bool },
        { name: 'errorLog', func: bool },
        { name: 'initialAudioVolume', func: int100 },
        { name: 'music', func: bool },
        { name: 'musicShuffle', func: bool },
        { name: 'imageRate', func: int },
        { name: 'imageShuffle', func: bool },
        { name: 'videoShuffle', func: bool },
        { name: 'embedLink', func: str },
        { name: 'embedAccess', func: bool },
    ];

    devGeneratedCfg.value = vars
        .map(
            ({ name, func }) =>
                `set ${CONVAR_PREFIX}${name} ${func(config[name])}`,
        )
        .join('\n');
}
