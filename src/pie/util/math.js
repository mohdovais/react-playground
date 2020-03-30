export const MATH = Math;

export function round(number, precisionTo) {
    var precision = MATH.pow(10, precisionTo || 0);
    return MATH.round(number * precision) / precision;
}

/**
 *
 * @param {Number} degree
 * @returns {Number} radian
 */
export function radian(degree) {
    return (degree * MATH.PI) / 180 || 0;
}

/**
 *
 * @param ...{Number}
 * @returns {Number}
 */
export function sum() {
    return Array.prototype.reduce.call(
        arguments,
        (accumulator, item) => accumulator + item,
        0
    );
}
