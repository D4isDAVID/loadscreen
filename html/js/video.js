import { getHandoverData } from "./util/handover.js";
import { incrementWrap } from "./util/increment-wrap.js";
import { randomInt } from "./util/random.js";

const {
    paths: { videos },
    config: { background, videoVolume, videoShuffle },
} = getHandoverData();

if (background === "video" && videos.length > 0) {
    /** @type {HTMLVideoElement} */
    const backgroundVideo = document.getElementById("background-video");

    backgroundVideo.volume = videoVolume;
    backgroundVideo.style.display = "";

    if (videos.length === 1) {
        backgroundVideo.src = videos[0];
        backgroundVideo.loop = true;
    } else {
        /** @type {number | null} */
        let currentVideo = null;

        const nextVideo = () => {
            currentVideo = videoShuffle
                ? randomInt(0, videos.length, currentVideo)
                : incrementWrap(currentVideo, 0, videos.length - 1);
            backgroundVideo.src = videos[currentVideo];
        };

        backgroundVideo.addEventListener("ended", nextVideo);
        nextVideo();
    }
}
