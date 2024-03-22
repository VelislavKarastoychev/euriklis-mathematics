"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfTypedArraysWithEqualSize = void 0;
const IsTypedArray_1 = require("./IsTypedArray.js");
/**
 * Checks if the "value" is an array of typed
 * arrays with equal length.
 *
 * @param {any | TypedArray[] | number[][]} value
 * @returns {boolean} True if the value is
 * a typed matrix, false otherwise.
 */
const IsArrayOfTypedArraysWithEqualSize = (value) => {
    const n = value.length;
    let i, j, l;
    if ((0, IsTypedArray_1.IsTypedArray)(value[0])) {
        l = value[0].length;
    }
    else
        l = false;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if ((!(0, IsTypedArray_1.IsTypedArray)(value[j]) || value[j].length !== l) ||
            (!(0, IsTypedArray_1.IsTypedArray)(value[j + 1]) || value[j + 1].length !== l) ||
            (!(0, IsTypedArray_1.IsTypedArray)(value[j + 2]) || value[j + 2].length !== l) ||
            (!(0, IsTypedArray_1.IsTypedArray)(value[j + 3]) || value[j + 3].length !== l))
            return false;
    }
    for (j = i << 2; j < n; j++) {
        if ((!(0, IsTypedArray_1.IsTypedArray)(value[j]) || value[j].length !== l)) {
            return false;
        }
    }
    return true;
};
exports.IsArrayOfTypedArraysWithEqualSize = IsArrayOfTypedArraysWithEqualSize;
