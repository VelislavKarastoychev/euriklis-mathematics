"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfStringArrays = void 0;
const CheckType_1 = require("./CheckType.js");
const IsStringArray_1 = require("./IsStringArray.js");
/**
 * Checks if the "value" is an array of string
 * arrays with arbitrary length.
 * Utility function for the isArrayOfStringArrays method.
 * @param {any | string [][]} value - the "value" property
 * of the current validator instance.
 * @returns {boolean} if the "value" is an array of
 * string arrays, returns true, otherwise returns false.
 */
const IsArrayOfStringArrays = (value) => {
    const n = value.length;
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (!(0, CheckType_1.CheckType)(value[j], "Array") || !(0, IsStringArray_1.IsStringArray)(value[j]) ||
            !(0, CheckType_1.CheckType)(value[j + 1], "Array") || !(0, IsStringArray_1.IsStringArray)(value[j + 1]) ||
            !(0, CheckType_1.CheckType)(value[j + 2], "Array") || !(0, IsStringArray_1.IsStringArray)(value[j + 2]) ||
            !(0, CheckType_1.CheckType)(value[j + 3], "Array") || !(0, IsStringArray_1.IsStringArray)(value[j + 3]))
            return false;
    }
    for (j = i << 2; j < n; j++) {
        if (!(0, CheckType_1.CheckType)(value[j], "Array") || !(0, IsStringArray_1.IsStringArray)(value[j]))
            return false;
    }
    return true;
};
exports.IsArrayOfStringArrays = IsArrayOfStringArrays;
