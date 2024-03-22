"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfTypedArrays = void 0;
const IsTypedArray_1 = require("./IsTypedArray.js");
/**
 * Checks if the "value" property is an array of
 * typed arrays.
 * Utility function for the isArrayOfTypedArrays
 * method.
 *
 * @param {any | TypedArray[] | number[][]} value - The "value" property of
 * the current validator instance, which has to be
 * an array.
 * @returns {boolean} True if the value is array
 * of typed arrays and false otherwise
 */
const IsArrayOfTypedArrays = (value) => {
    const n = value.length;
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (!(0, IsTypedArray_1.IsTypedArray)(value[j]) ||
            !(0, IsTypedArray_1.IsTypedArray)(value[j + 1]) ||
            !(0, IsTypedArray_1.IsTypedArray)(value[j + 2]) ||
            !(0, IsTypedArray_1.IsTypedArray)(value[j + 3]))
            return false;
    }
    for (j = i << 2; j < n; j++) {
        if (!(0, IsTypedArray_1.IsTypedArray)(value[j]))
            return false;
    }
    return true;
};
exports.IsArrayOfTypedArrays = IsArrayOfTypedArrays;
