"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfPositiveIntegers = void 0;
/**
 * Checks if the value is an array of positive integers.
 * Utility function for the isArrayOfPositiveIntegers.
 *
 * @param {any | Integer []} value
 * @returns {boolean} if the "value" is an array of
 * positive integers returns true, otherwise returns false.
 */
const IsArrayOfPositiveIntegers = (value) => {
    const n = value.length;
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if ((typeof value[j] !== "number" || !Number.isInteger(value[j]) ||
            value[j] < 0) ||
            (typeof value[j + 1] !== "number" || !Number.isInteger(value[j + 1]) ||
                value[j + 1] < 0) ||
            (typeof value[j + 2] !== "number" || !Number.isInteger(value[j + 2]) ||
                value[j + 2] < 0) ||
            (typeof value[j + 3] !== "number" || !Number.isInteger(value[j + 3]) ||
                value[j + 3] < 0)) {
            return false;
        }
    }
    for (j = i << 2; j < n; j++) {
        if (typeof value[j] !== "number" || !Number.isInteger(value[j]) ||
            value[j] < 0) {
            return false;
        }
    }
    return true;
};
exports.IsArrayOfPositiveIntegers = IsArrayOfPositiveIntegers;
