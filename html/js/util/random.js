/**
 * @param {number} min inclusive
 * @param {number} max exclusive
 * @returns {number}
 */
export function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * @param {number} min inclusive
 * @param {number} max exclusive
 * @param {number | null | undefined} avoid
 * @returns {number}
 */
export function randomInt(min, max, avoid) {
    let random;
    do {
        random = Math.floor(randomNum(min, max));
    } while (random === avoid);
    return random;
}
