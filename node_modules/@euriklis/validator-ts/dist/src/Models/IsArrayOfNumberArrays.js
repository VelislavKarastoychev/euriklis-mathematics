"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfNumberArrays = void 0;
const IsNumberArray_1 = require("./IsNumberArray.js");
/**
 * Checks if the "value" is an array of numeric arrays.
 *
 * @param {any | number [][]} value - the current validator instance.
 * @returns {boolean} if the "value" is an array of number arrays
 * returns true, otherwise return false.
 */
const IsArrayOfNumberArrays = (value) => {
    const n = value.length;
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (!(0, IsNumberArray_1.IsNumberArray)(value[j]) ||
            !(0, IsNumberArray_1.IsNumberArray)(value[j + 1]) ||
            !(0, IsNumberArray_1.IsNumberArray)(value[j + 2]) ||
            !(0, IsNumberArray_1.IsNumberArray)(value[j + 3])) {
            return false;
        }
    }
    for (j = i << 2; j < n; j++) {
        if (!(0, IsNumberArray_1.IsNumberArray)(value[j]))
            return false;
    }
    return true;
};
exports.IsArrayOfNumberArrays = IsArrayOfNumberArrays;
