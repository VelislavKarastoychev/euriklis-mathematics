"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfIntegerArrays = void 0;
const IsIntegerArray_1 = require("./IsIntegerArray.js");
/**
 * Checks if the "value" is an array of integer arrays.
 * Utility function for isArrayOfIntegerArrays method.
 *
 * @param {any | Integer [][]} value - the current validator
 * instance value property.
 * @returns {boolean} if the "value" is an arrray of
 * integer arrays returns true, otherwise returns false.
 */
const IsArrayOfIntegerArrays = (value) => {
    const n = value.length;
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (!(0, IsIntegerArray_1.IsIntegerArray)(value[j]) ||
            !(0, IsIntegerArray_1.IsIntegerArray)(value[j + 1]) ||
            !(0, IsIntegerArray_1.IsIntegerArray)(value[j + 2]) ||
            !(0, IsIntegerArray_1.IsIntegerArray)(value[j + 3]))
            return false;
    }
    for (j = i << 2; j < n; j++) {
        if (!(0, IsIntegerArray_1.IsIntegerArray)(value[j]))
            return false;
    }
    return true;
};
exports.IsArrayOfIntegerArrays = IsArrayOfIntegerArrays;
