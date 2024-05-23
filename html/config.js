/**
 * The CSS file to load for the screen.
 *
 * Default styles:
 * * `./styles/classic.css` - the classic look since v1.0.0.
 * * `./styles/modern.css` - a modernized layout.
 * * `./styles/minimal.css` - everything is at the center of the screen without the secondary bar.
 *
 * File paths must be relative to the `index.html` file.
 */
export const style = "./styles/classic.css";

/**
 * The message displayed at the top-left of the screen.
 *
 * Available variables:
 * ${playerName} - Player name
 * ${serverName} - sv_projectName variable (or sv_hostname if not available)
 */
export const serverMessage = "${playerName}, welcome to ${serverName}!";

/**
 * The message displayed when FiveM finished loading and is now starting scripts.
 */
export const finishingMessage = "Finishing up...";

/**
 * Image files or URLs used for the background.
 * Empty the array to use a CSS background instead.
 *
 * File paths must be relative to the `index.html` file.
 */
export const images = [
    "./assets/images/moon.png",
    "./assets/images/vinewood.png",
];

/**
 * Whether the background images should be shown randomly or in order of the array.
 */
export const chooseImageRandomly = false;

/**
 * The switch rate of the background images, in milliseconds.
 */
export const imageSwitchRate = 7500;

/**
 * Music files or URLs used for the background.
 * Empty the array to not use background music.
 *
 * File paths must be relative to the `index.html` file.
 */
export const music = ["./assets/music/fire.mp3"];

/**
 * The initial volume of the background music.
 */
export const initialMusicVolume = 0.1;

/**
 * Video file or URL used for the background (controls will not be shown).
 * This will appear over the image backgrounds.
 * Empty the string to use image backgrounds or a CSS background instead.
 *
 * File paths must be relative to the `index.html` file.
 */
export const video = "";

/**
 * The volume of the background video.
 */
export const videoVolume = 0.1;
