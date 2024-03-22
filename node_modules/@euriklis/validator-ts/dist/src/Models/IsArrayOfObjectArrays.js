"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfObjectArrays = void 0;
const IsObjectArray_1 = require("./IsObjectArray.js");
/**
 * Checks if the "value" is an array of object arrays.
 * Utility function for the isArrayOfObjectArrays method.
 *
 * @param {any | object [][]} value - the current validator parameter,
 * which is expected to be an array of object arrays.
 * @returns {boolean} If all elements of the "value" are
 * object arrays, then returns true, otherwise returns false.
 */
const IsArrayOfObjectArrays = (value) => {
    const n = value.length;
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (!Array.isArray(value[j]) || !(0, IsObjectArray_1.IsObjectArray)(value[j]) ||
            !Array.isArray(value[j + 1]) || !(0, IsObjectArray_1.IsObjectArray)(value[j + 1]) ||
            !Array.isArray(value[j + 2]) || !(0, IsObjectArray_1.IsObjectArray)(value[j + 2]) ||
            !Array.isArray(value[j + 3]) || !(0, IsObjectArray_1.IsObjectArray)(value[j + 3]))
            return false;
    }
    for (j = i << 2; j < n; j++) {
        if (!Array.isArray(value[j]) || !(0, IsObjectArray_1.IsObjectArray)(value[j]))
            return false;
    }
    return true;
};
exports.IsArrayOfObjectArrays = IsArrayOfObjectArrays;
