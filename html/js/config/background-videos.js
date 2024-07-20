import { backgroundVideo } from '../util/elements.js';
import { shouldShowBackgroundVideos } from '../util/handover.js';
import { incrementWrap } from '../util/increment-wrap.js';
import { randomInt } from '../util/random.js';

/** @type {(() => void) | null} */
let next = null;

/**
 * @param {NuiHandoverData} handoverData
 */
export function configBackgroundVideos(handoverData) {
    if (next !== null) {
        backgroundVideo.removeEventListener('ended', next);
        next = null;
    }

    if (!shouldShowBackgroundVideos(handoverData)) {
        backgroundVideo.style.display = 'none';
        backgroundVideo.src = '';
        return;
    }

    const {
        paths: { videos },
        config,
    } = handoverData;

    backgroundVideo.style.display = '';
    backgroundVideo.volume = config.initialAudioVolume;

    if (videos.length === 1) {
        backgroundVideo.src = /** @type {string} */ (videos[0]);
        backgroundVideo.loop = true;
        return;
    }

    backgroundVideo.loop = false;

    /** @type {number | null} */
    let currentVideo = null;

    next = function () {
        currentVideo = config.videoShuffle
            ? randomInt(0, videos.length, currentVideo)
            : incrementWrap(currentVideo, 0, videos.length - 1);
        backgroundVideo.src = /** @type {string} */ (videos[currentVideo]);
    };

    backgroundVideo.addEventListener('ended', next);
    next();
}
