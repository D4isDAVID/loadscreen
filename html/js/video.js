import { video, videoVolume } from "../config.js";

/** @type {HTMLVideoElement} */
const backgroundVideo = document.getElementById("background-video");

backgroundVideo.volume = videoVolume;

if (video) {
    backgroundVideo.style.display = "";
    backgroundVideo.src = video;
}
