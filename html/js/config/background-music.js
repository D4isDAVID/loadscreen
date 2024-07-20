import { backgroundAudio } from '../util/elements.js';
import { shouldPlayBackgroundMusic } from '../util/handover.js';
import { incrementWrap } from '../util/increment-wrap.js';
import { randomInt } from '../util/random.js';

/** @type {(() => void) | null} */
let next = null;

/**
 * @param {NuiHandoverData} handoverData
 */
export function configBackgroundMusic(handoverData) {
    if (next !== null) {
        backgroundAudio.removeEventListener('ended', next);
        next = null;
    }

    if (!shouldPlayBackgroundMusic(handoverData)) {
        backgroundAudio.src = '';
        return;
    }

    const {
        paths: { music },
        config,
    } = handoverData;

    backgroundAudio.volume = config.initialAudioVolume;

    if (music.length === 1) {
        backgroundAudio.src = /** @type {string} */ (music[0]);
        backgroundAudio.loop = true;
        return;
    }

    backgroundAudio.loop = false;

    /** @type {number | null} */
    let currentSong = null;

    next = function () {
        currentSong = config.musicShuffle
            ? randomInt(0, music.length, currentSong)
            : incrementWrap(currentSong, 0, music.length - 1);
        backgroundAudio.src = /** @type {string} */ (music[currentSong]);
    };

    backgroundAudio.addEventListener('ended', next);
    next();
}
