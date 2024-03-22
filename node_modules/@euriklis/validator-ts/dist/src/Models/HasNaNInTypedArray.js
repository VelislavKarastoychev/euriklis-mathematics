"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasNaNInTypedArray = void 0;
/**
 * Checks if in the elements of the typed array exists a NaN element.
 * Utility funciton used in the isNumberArray, isIntegerArray etc.
 *
 * @param {any} value
 * @returns {boolean} if all the elements of the array are numbers
 * returns false, otherwise returns true.
 */
const HasNaNInTypedArray = (value) => {
    const n = value.length;
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (isNaN(value[j]) ||
            isNaN(value[j + 1]) ||
            isNaN(value[j + 2]) ||
            isNaN(value[j + 3])) {
            return true;
        }
    }
    for (j = i << 2; j < n; j++) {
        if (isNaN(value[j])) {
            return true;
        }
    }
    return false;
};
exports.HasNaNInTypedArray = HasNaNInTypedArray;
