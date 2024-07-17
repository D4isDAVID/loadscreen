/**
 * @typedef {Object} NuiHandoverPaths
 * @property {string[]} images
 * @property {string[]} music
 * @property {string[]} videos
 * @property {string} [logo]
 */

/**
 * @typedef {Object} NuiHandoverConfig
 * @property {string} style
 * @property {boolean} logo
 * @property {string} serverMessage
 * @property {boolean} primaryBar
 * @property {boolean} secondaryBar
 * @property {boolean} loadingAction
 * @property {string} finishingMessage
 * @property {boolean} logLine
 * @property {boolean} audioControls
 * @property {boolean} errorLog
 * @property {number} initialAudioVolume
 * @property {boolean} music
 * @property {boolean} musicShuffle
 * @property {string} background
 * @property {number} imageRate
 * @property {boolean} imageShuffle
 * @property {boolean} videoShuffle
 */

/**
 * @typedef {Object} NuiHandoverData
 * @property {string} playerName
 * @property {string} serverName
 * @property {NuiHandoverPaths} paths
 * @property {NuiHandoverConfig} config
 */

/**
 * @type {NuiHandoverData}
 */
const DEFAULT_HANDOVER_DATA = {
    playerName: 'Player',
    serverName: 'Server',
    paths: {
        images: ['./assets/images/moon.png', './assets/images/vinewood.png'],
        music: ['./assets/music/fire.mp3'],
        videos: [],
        logo: './assets/logo.png',
    },
    config: {
        style: 'classic',
        logo: true,
        serverMessage: '${playerName}, welcome to ${serverName}!',
        primaryBar: true,
        secondaryBar: true,
        loadingAction: true,
        finishingMessage: 'Finishing up...',
        logLine: true,
        audioControls: true,
        errorLog: true,
        initialAudioVolume: 0.1,
        music: true,
        musicShuffle: false,
        background: 'image',
        imageRate: 7500,
        imageShuffle: false,
        videoShuffle: false,
    },
};

/**
 * @returns {NuiHandoverData}
 */
export function getHandoverData() {
    return /** @type {any} */ (window).nuiHandoverData ?? DEFAULT_HANDOVER_DATA;
}
