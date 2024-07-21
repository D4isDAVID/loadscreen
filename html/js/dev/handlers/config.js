import {
    devAudioControls,
    devBackground,
    devBackgroundBrightness,
    devEmbedAccess,
    devEmbedLink,
    devErrorLog,
    devFinishingMessage,
    devFontFamily,
    devImageRate,
    devImageShuffle,
    devInitialAudioVolume,
    devLoadingAction,
    devLogLine,
    devLogo,
    devMusic,
    devMusicShuffle,
    devPrimaryBar,
    devPrimaryColor,
    devSecondaryBar,
    devSecondaryColor,
    devServerMessage,
    devShadowColor,
    devStyle,
    devStyleButton,
    devTextColor,
    devVideoShuffle,
} from '../elements/config.js';
import { createInputCheckedHandler, createInputValueHandler } from './index.js';

/**
 * @param {NuiHandoverData} handoverData
 */
export function setupDevConfigHandlers(handoverData) {
    const { config } = handoverData;

    createInputValueHandler(
        handoverData,
        devStyle,
        config.style,
        (v) => (config.style = v),
        devStyleButton,
    );
    createInputValueHandler(
        handoverData,
        devBackground,
        config.background,
        (v) => (config.background = v),
    );
    createInputValueHandler(
        handoverData,
        devBackgroundBrightness,
        `${config.backgroundBrightness * 100}`,
        (v) => (config.backgroundBrightness = parseInt(v) / 100),
    );
    createInputValueHandler(
        handoverData,
        devTextColor,
        config.textColor,
        (v) => (config.textColor = v),
    );
    createInputValueHandler(
        handoverData,
        devPrimaryColor,
        config.primaryColor,
        (v) => (config.primaryColor = v),
    );
    createInputValueHandler(
        handoverData,
        devSecondaryColor,
        config.secondaryColor,
        (v) => (config.secondaryColor = v),
    );
    createInputValueHandler(
        handoverData,
        devShadowColor,
        config.shadowColor,
        (v) => (config.shadowColor = v),
    );
    createInputValueHandler(
        handoverData,
        devFontFamily,
        config.fontFamily,
        (v) => (config.fontFamily = v),
    );
    createInputCheckedHandler(
        handoverData,
        devLogo,
        config.logo,
        (c) => (config.logo = c),
    );
    createInputValueHandler(
        handoverData,
        devServerMessage,
        config.serverMessage,
        (v) => (config.serverMessage = v),
    );
    createInputCheckedHandler(
        handoverData,
        devPrimaryBar,
        config.primaryBar,
        (c) => (config.primaryBar = c),
    );
    createInputCheckedHandler(
        handoverData,
        devSecondaryBar,
        config.secondaryBar,
        (c) => (config.secondaryBar = c),
    );
    createInputCheckedHandler(
        handoverData,
        devLoadingAction,
        config.loadingAction,
        (c) => (config.loadingAction = c),
    );
    createInputValueHandler(
        handoverData,
        devFinishingMessage,
        config.finishingMessage,
        (v) => (config.finishingMessage = v),
    );
    createInputCheckedHandler(
        handoverData,
        devLogLine,
        config.logLine,
        (c) => (config.logLine = c),
    );
    createInputCheckedHandler(
        handoverData,
        devAudioControls,
        config.audioControls,
        (c) => (config.audioControls = c),
    );
    createInputCheckedHandler(
        handoverData,
        devErrorLog,
        config.errorLog,
        (c) => (config.errorLog = c),
    );
    createInputValueHandler(
        handoverData,
        devInitialAudioVolume,
        `${config.initialAudioVolume * 100}`,
        (v) => (config.initialAudioVolume = parseInt(v) / 100),
    );
    createInputCheckedHandler(
        handoverData,
        devMusic,
        config.music,
        (c) => (config.music = c),
    );
    createInputCheckedHandler(
        handoverData,
        devMusicShuffle,
        config.musicShuffle,
        (c) => (config.musicShuffle = c),
    );
    createInputValueHandler(
        handoverData,
        devImageRate,
        `${config.imageRate}`,
        (v) => (config.imageRate = parseInt(v)),
    );
    createInputCheckedHandler(
        handoverData,
        devImageShuffle,
        config.imageShuffle,
        (c) => (config.imageShuffle = c),
    );
    createInputCheckedHandler(
        handoverData,
        devVideoShuffle,
        config.videoShuffle,
        (c) => (config.videoShuffle = c),
    );
    createInputValueHandler(
        handoverData,
        devEmbedLink,
        config.embedLink,
        (c) => (config.embedLink = c),
    );
    createInputCheckedHandler(
        handoverData,
        devEmbedAccess,
        config.embedAccess,
        (c) => (config.embedAccess = c),
    );
}
