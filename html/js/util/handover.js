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
 * @property {string} background
 * @property {number} backgroundBrightness
 * @property {string} textColor
 * @property {string} primaryColor
 * @property {string} secondaryColor
 * @property {string} shadowColor
 * @property {string} fontFamily
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
        background: 'image',
        backgroundBrightness: 0.3,
        textColor: 'rgb(250, 250, 250)',
        primaryColor: 'rgb(64, 64, 255)',
        secondaryColor: 'rgb(64, 64, 64)',
        shadowColor: 'rgba(8, 8, 16, 0.5)',
        fontFamily: "'Segoe UI', Arial, Helvetica, sans-serif",
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
