import { video, videoVolume } from "../config.js";

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers#browser_compatibility
const VIDEO_TYPE_MAP = {
    "3gp": "video/3gpp",
    mpg: "video/mpeg",
    mpeg: "video/mpeg",
    mp4: "video/mp4",
    m4v: "video/mp4",
    m4p: "video/mp4",
    ogv: "video/ogg",
    ogg: "video/ogg",
    mov: "video/quicktime",
    webm: "video/webm",
};

/** @type {HTMLVideoElement} */
const backgroundVideo = document.getElementById("background-video");

backgroundVideo.volume = videoVolume;

if (video) {
    const source = document.createElement("source");
    source.src = video;
    source.type = VIDEO_TYPE_MAP[video.split(".").slice(-1)];
    backgroundVideo.appendChild(source);

    backgroundVideo.load();
    backgroundVideo.play();

    backgroundVideo.style.display = "";
}
