/**
 * @type {NuiHandoverData}
 */
const DEFAULT_HANDOVER_DATA = {
    vars: {
        playerName: 'Player',
        serverName: 'Server',
    },
    paths: {
        images: ['./assets/images/moon.png', './assets/images/vinewood.png'],
        music: ['./assets/music/fire.mp3'],
        videos: ['./assets/videos/waterfall.webm'],
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
        embedLink:
            'https://www.youtube.com/embed?playlist=E49ureeMykI&autoplay=1&loop=1',
        embedAccess: true,
    },
};

/**
 * @returns {NuiHandoverData}
 */
export function getHandoverData() {
    return /** @type {any} */ (window).nuiHandoverData ?? DEFAULT_HANDOVER_DATA;
}

/**
 * @readonly
 * @enum {number}
 */
const BackgroundType = {
    CSS: 0,
    Image: 1,
    Video: 2,
    Embed: 3,
};

/**
 * @param {NuiHandoverData} handoverData
 * @returns {BackgroundType}
 */
function getBackgroundType({ config: { background } }) {
    return (
        {
            image: BackgroundType.Image,
            video: BackgroundType.Video,
            embed: BackgroundType.Embed,
        }[background] ?? BackgroundType.CSS
    );
}

/**
 * @param {NuiHandoverData} handoverData
 * @returns {boolean}
 */
export function shouldShowBackgroundCSS(handoverData) {
    return getBackgroundType(handoverData) === BackgroundType.CSS;
}

/**
 * @param {NuiHandoverData} handoverData
 * @returns {boolean}
 */
export function shouldShowBackgroundImages(handoverData) {
    return (
        getBackgroundType(handoverData) === BackgroundType.Image &&
        handoverData.paths.images.length > 0
    );
}

/**
 * @param {NuiHandoverData} handoverData
 * @returns {boolean}
 */
export function shouldShowBackgroundVideos(handoverData) {
    return (
        getBackgroundType(handoverData) === BackgroundType.Video &&
        handoverData.paths.videos.length > 0
    );
}

/**
 * @param {NuiHandoverData} handoverData
 * @returns {boolean}
 */
export function shouldShowBackgroundEmbed(handoverData) {
    return (
        getBackgroundType(handoverData) === BackgroundType.Embed &&
        handoverData.config.embedLink.trim().length > 0
    );
}

/**
 * @param {NuiHandoverData} handoverData
 * @returns {boolean}
 */
export function shouldShowLogo({ paths, config }) {
    return config.logo && typeof paths.logo !== 'undefined';
}

/**
 * @param {NuiHandoverData} handoverData
 * @returns {boolean}
 */
export function shouldPlayBackgroundMusic({ paths, config }) {
    return config.music && paths.music.length > 0;
}

/**
 * @param {NuiHandoverData} handoverData
 * @returns {boolean}
 */
export function shouldShowAudioControls(handoverData) {
    return (
        handoverData.config.audioControls &&
        (shouldShowBackgroundVideos(handoverData) ||
            shouldPlayBackgroundMusic(handoverData))
    );
}

/**
 * @param {NuiHandoverData} handoverData
 * @returns {boolean}
 */
export function shouldShowSecondaryWrapper({ config }) {
    return config.secondaryBar && config.loadingAction;
}
