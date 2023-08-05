import { chooseImageRandomly, imageSwitchRate, images } from "../config.js";

if (images.length === 1) {
    document.documentElement.style.background = images[0];
} else if (images.length > 1) {
    // cache images
    for (const fileName of images) {
        const image = document.createElement("img");
        image.style.position = "absolute";
        image.style.top = "-99999px";
        image.style.left = "-99999px";
        image.src = fileName;
        document.body.appendChild(image);
    }

    let currentImage = null;
    const nextBackground = () => {
        if (chooseImageRandomly) {
            let random = currentImage;
            while (random === currentImage)
                random = Math.floor(Math.random() * images.length);
            currentImage = random;
        } else if (currentImage === null) {
            currentImage = 0;
        } else {
            currentImage++;
            if (currentImage >= images.length) currentImage = 0;
        }

        document.documentElement.style.backgroundImage = `url(${images[currentImage]})`;
    };

    nextBackground();
    setInterval(nextBackground, imageSwitchRate);
}
