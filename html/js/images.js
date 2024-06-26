import { getHandoverData } from "./util/handover.js";
import { incrementWrap } from "./util/increment-wrap.js";
import { randomInt } from "./util/random.js";

const {
    paths: { images },
    config: { background, imageRate, imageShuffle },
} = getHandoverData();

if (background === "image" && images.length > 0) {
    if (images.length === 1) {
        document.documentElement.style.background = images[0];
    } else {
        // cache images
        for (const fileName of images) {
            const image = document.createElement("img");
            image.style.position = "absolute";
            image.style.top = "-99999px";
            image.style.left = "-99999px";
            image.src = fileName;
            document.body.appendChild(image);
        }

        /** @type {number | null} */
        let currentImage = null;

        const nextImage = () => {
            currentImage = imageShuffle
                ? randomInt(0, images.length, currentImage)
                : incrementWrap(currentImage, 0, images.length - 1);
            document.documentElement.style.backgroundImage = `url(${images[currentImage]})`;
        };

        nextImage();
        setInterval(nextImage, imageRate);
    }
}
