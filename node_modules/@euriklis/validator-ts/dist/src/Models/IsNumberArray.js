"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNumberArray = void 0;
/**
 * Checks if the value is an array of number elements
 * utility funtion for the isNumberArray method.
 *
 * @param {any} value - the current validator value.
 * @returns {boolean} if the value is number array returns
 * true, otherwise returns false.
 */
const IsNumberArray = (value) => {
    const n = value.length;
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if ((typeof value[j] !== "number" || isNaN(value[j])) ||
            (typeof value[j + 1] !== "number" || isNaN(value[j + 1])) ||
            (typeof value[j + 2] !== "number" || isNaN(value[j + 2])) ||
            (typeof value[j + 3] !== "number" || isNaN(value[j + 3]))) {
            return false;
        }
    }
    for (j = i << 2; j < n; j++) {
        if (typeof value[j] !== "number" || isNaN(value[j])) {
            return false;
        }
    }
    return true;
};
exports.IsNumberArray = IsNumberArray;
