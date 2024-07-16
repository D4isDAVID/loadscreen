/**
 * @param {number | null | undefined} num
 * @param {number} min
 * @param {number} max
 */
export function incrementWrap(num, min, max) {
    return typeof num === 'undefined' || num === null || num >= max
        ? min
        : ++num;
}
