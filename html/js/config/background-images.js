import { shouldShowBackgroundImages } from '../util/handover.js';
import { incrementWrap } from '../util/increment-wrap.js';
import { randomInt } from '../util/random.js';

/** @type {HTMLImageElement[]} */
let imageCache = [];
/** @type {number | null} */
let interval = null;

/**
 * @param {NuiHandoverData} handoverData
 */
export function configBackgroundImages(handoverData) {
    imageCache.forEach((e) => e.remove());
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }

    if (!shouldShowBackgroundImages(handoverData)) {
        document.documentElement.style.background = '';
        return;
    }

    const {
        paths: { images },
        config,
    } = handoverData;

    if (images.length === 1) {
        document.documentElement.style.background = /** @type {string} */ (
            images[0]
        );
        return;
    }

    // cache images
    for (const path of images) {
        const image = document.createElement('img');
        image.style.position = 'absolute';
        image.style.top = '-99999px';
        image.style.left = '-99999px';
        image.src = path;
        document.body.appendChild(image);
        imageCache.push(image);
    }

    /** @type {number | null} */
    let currentImage = null;

    const nextImage = () => {
        currentImage = config.imageShuffle
            ? randomInt(0, images.length, currentImage)
            : incrementWrap(currentImage, 0, images.length - 1);
        document.documentElement.style.backgroundImage = `url(${images[currentImage]})`;
    };

    nextImage();
    interval = setInterval(nextImage, config.imageRate);
}
