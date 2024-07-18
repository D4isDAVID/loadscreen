/**
 * @typedef {import('../../../types/handover.d.ts').NuiHandoverData} NuiHandoverData
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
        style: 'minimal',
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
        secondaryBar: false,
        loadingAction: false,
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
