import {
    audioNext,
    audioPrev,
    audioWrapper,
    backgroundAudio,
} from './util/elements.js';
import { getHandoverData } from './util/handover.js';
import { decrementWrap, incrementWrap } from './util/increment-wrap.js';
import { randomInt } from './util/random.js';

const {
    paths: { music },
    config: { music: musicEnabled, musicVolume, musicShuffle },
} = getHandoverData();

if (musicEnabled && music.length > 0) {
    backgroundAudio.volume = musicVolume;
    audioWrapper.style.display = '';

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
        audioPrev.style.display = '';
        audioNext.style.display = '';

        /** @type {number | null} */
        let currentSong = null;

        const prevSong = () => {
            currentSong = decrementWrap(currentSong, 0, music.length - 1);
            play(/** @type {string} */ (music[currentSong]));
        };

        const nextSong = () => {
            currentSong = incrementWrap(currentSong, 0, music.length - 1);
            play(/** @type {string} */ (music[currentSong]));
        };

        const randomSong = () => {
            currentSong = randomInt(0, music.length, currentSong);
            play(/** @type {string} */ (music[currentSong]));
        };

        audioPrev.addEventListener('click', prevSong);
        audioNext.addEventListener('click', nextSong);
        backgroundAudio.addEventListener(
            'ended',
            musicShuffle ? randomSong : nextSong,
        );
        musicShuffle ? randomSong() : nextSong();
    }
}
