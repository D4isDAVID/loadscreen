import { initialMusicVolume, music } from "../config.js";

/** @type {HTMLDivElement} */
const audioControlsWrapper = document.getElementById("audio-controls-wrapper");
/** @type {HTMLAudioElement} */
const backgroundAudio = document.getElementById("background-audio");
/** @type {HTMLButtonElement} */
const audioControlsPrev = document.getElementById("audio-controls-prev");
/** @type {HTMLButtonElement} */
const audioControlsNext = document.getElementById("audio-controls-next");

backgroundAudio.volume = initialMusicVolume;

/**
 * @param {string} fileName
 */
const play = (fileName) => {
    backgroundAudio.src = fileName;
    backgroundAudio.play();
};

if (music.length === 1) {
    audioControlsWrapper.style.display = "";
    backgroundAudio.loop = true;
    play(music[0]);
} else if (music.length > 1) {
    /** @type {number | null} */
    let currentSong = null;

    audioControlsWrapper.style.display = "";
    audioControlsPrev.style.display = "";
    audioControlsNext.style.display = "";

    const prevSong = () => {
        if (currentSong === null || currentSong <= 0)
            currentSong = music.length - 1;
        else currentSong--;
        play(music[currentSong]);
    };

    const nextSong = () => {
        if (currentSong === null || currentSong >= music.length - 1)
            currentSong = 0;
        else currentSong++;
        play(music[currentSong]);
    };

    audioControlsPrev.addEventListener("click", prevSong);
    audioControlsNext.addEventListener("click", nextSong);
    backgroundAudio.addEventListener("ended", nextSong);
    nextSong();
}
