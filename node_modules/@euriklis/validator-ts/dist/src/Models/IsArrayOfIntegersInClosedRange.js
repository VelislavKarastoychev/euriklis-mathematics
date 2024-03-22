"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfIntegersInClosedRange = void 0;
/**
 * Checks if the "value" property is an array of integers, which lies
 * in the closed interval [a, b].
 * Utility function for the isArrayOfIntegersInClosedRange.
 *
 * @param {any | Integer []} value
 * @param {number} a - the lower bound of the array elements.
 * @param {number} b - the upper bound of the array elements.
 * @returns {boolean} if the "value" is integer array in the closed range [a, b], returns true, otherwise returns false.
 */
const IsArrayOfIntegersInClosedRange = (value, a, b) => {
    const n = value.length;
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if ((!Number.isInteger(value[j]) || value[j] < a || value[j] > b) ||
            (!Number.isInteger(value[j + 1]) || value[j + 1] < a ||
                value[j + 1] > b) ||
            (!Number.isInteger(value[j + 2]) || value[j + 2] < a ||
                value[j + 2] > b) ||
            (!Number.isInteger(value[j + 3]) || value[j + 3] < a || value[j + 3] > b)) {
            return false;
        }
    }
    for (j = i << 2; j < n; j++) {
        if ((!Number.isInteger(value[j]) || value[j] < a || value[j] > b)) {
            return false;
        }
    }
    return true;
};
exports.IsArrayOfIntegersInClosedRange = IsArrayOfIntegersInClosedRange;
