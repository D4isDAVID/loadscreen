import { getHandoverData } from "./util/handover.js";
import { decrementWrap, incrementWrap } from "./util/increment-wrap.js";
import { randomInt } from "./util/random.js";

const {
    paths: { music },
    config: { music: musicEnabled, musicVolume, musicShuffle },
} = getHandoverData();

if (musicEnabled && music.length > 0) {
    /** @type {HTMLDivElement} */
    const audioControlsWrapper = document.getElementById(
        "audio-controls-wrapper"
    );
    /** @type {HTMLAudioElement} */
    const backgroundAudio = document.getElementById("background-audio");
    /** @type {HTMLButtonElement} */
    const audioControlsPrev = document.getElementById("audio-controls-prev");
    /** @type {HTMLButtonElement} */
    const audioControlsNext = document.getElementById("audio-controls-next");

    backgroundAudio.volume = musicVolume;
    audioControlsWrapper.style.display = "";

    /**
     * @param {string} fileName
     */
    const play = (fileName) => {
        backgroundAudio.src = fileName;
        backgroundAudio.play();
    };

    if (music.length === 1) {
        backgroundAudio.loop = true;
        play(music[0]);
    } else {
        audioControlsPrev.style.display = "";
        audioControlsNext.style.display = "";

        /** @type {number | null} */
        let currentSong = null;

        const prevSong = () => {
            currentSong = decrementWrap(currentSong, 0, music.length - 1);
            play(music[currentSong]);
        };

        const nextSong = () => {
            currentSong = incrementWrap(currentSong, 0, music.length - 1);
            play(music[currentSong]);
        };

        const randomSong = () => {
            currentSong = randomInt(0, music.length, currentSong);
            play(music[currentSong]);
        };

        audioControlsPrev.addEventListener("click", prevSong);
        audioControlsNext.addEventListener("click", nextSong);
        backgroundAudio.addEventListener(
            "ended",
            musicShuffle ? randomSong : nextSong
        );
        musicShuffle ? randomSong() : nextSong();
    }
}
