import { configAudioControls, setupAudioControls } from './audio-controls.js';
import { configBackgroundEmbed } from './background-embed.js';
import { configBackgroundImages } from './background-images.js';
import { configBackgroundMusic } from './background-music.js';
import { configBackgroundVideos } from './background-videos.js';
import { configErrorLog, setupErrorLog } from './error-log.js';
import { configGenerator } from './generator.js';
import { configMessages } from './messages.js';
import { configStyle, setupStyle } from './style.js';

export function setup() {
    setupErrorLog();
    setupStyle();
    setupAudioControls();
}

/**
 * @param {NuiHandoverData} handoverData
 */
export function config(handoverData) {
    configErrorLog(handoverData);
    configStyle(handoverData);
    configMessages(handoverData);
    configBackgroundImages(handoverData);
    configBackgroundVideos(handoverData);
    configBackgroundEmbed(handoverData);
    configBackgroundMusic(handoverData);
    configAudioControls(handoverData);
    configGenerator(handoverData);
}
