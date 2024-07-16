import { backgroundAudio } from './util/elements.js';
import { getHandoverData } from './util/handover.js';
import { incrementWrap } from './util/increment-wrap.js';
import { randomInt } from './util/random.js';

const {
    paths: { music },
    config: { music: musicEnabled, initialAudioVolume, musicShuffle },
} = getHandoverData();

if (musicEnabled && music.length > 0) {
    backgroundAudio.volume = initialAudioVolume;

    /**
     * @param {string} fileName
     */
    const play = (fileName) => {
        backgroundAudio.src = fileName;
        backgroundAudio.play();
    };

    if (music.length === 1) {
        backgroundAudio.loop = true;
        play(/** @type {string} */ (music[0]));
    } else {
        /** @type {number | null} */
        let currentSong = null;

        const next = () => {
            currentSong = musicShuffle
                ? randomInt(0, music.length, currentSong)
                : incrementWrap(currentSong, 0, music.length - 1);
            play(/** @type {string} */ (music[currentSong]));
        };

        backgroundAudio.addEventListener('ended', next);
        next();
    }
}
