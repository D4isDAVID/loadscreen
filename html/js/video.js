import { backgroundVideo } from './util/elements.js';
import { getHandoverData } from './util/handover.js';
import { incrementWrap } from './util/increment-wrap.js';
import { randomInt } from './util/random.js';

const {
    paths: { videos },
    config: { background, initialAudioVolume, videoShuffle },
} = getHandoverData();

if (background === 'video' && videos.length > 0) {
    backgroundVideo.volume = initialAudioVolume;
    backgroundVideo.style.display = '';

    if (videos.length === 1) {
        backgroundVideo.src = /** @type {string} */ (videos[0]);
        backgroundVideo.loop = true;
    } else {
        /** @type {number | null} */
        let currentVideo = null;

        const nextVideo = () => {
            currentVideo = videoShuffle
                ? randomInt(0, videos.length, currentVideo)
                : incrementWrap(currentVideo, 0, videos.length - 1);
            backgroundVideo.src = /** @type {string} */ (videos[currentVideo]);
        };

        backgroundVideo.addEventListener('ended', nextVideo);
        nextVideo();
    }
}
