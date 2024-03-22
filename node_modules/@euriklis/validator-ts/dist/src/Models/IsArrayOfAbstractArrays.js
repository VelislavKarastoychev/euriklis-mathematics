"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfAbstractArrays = void 0;
const CheckType_1 = require("./CheckType.js");
const IsTypedArray_1 = require("./IsTypedArray.js");
/**
 * Utility function for the isArrayOfAbstractArrays.
 * Checks if the "value" parameter is an array of
 * generic or typed arrays.
 *
 * @param {any} value
 * @returns {boolean} True if the "value" is an
 * array of generic or typed arrays, false otherwise.
 */
const IsArrayOfAbstractArrays = (value) => {
    const n = value.length;
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if ((!(0, CheckType_1.CheckType)(value[j], "Array") && !(0, IsTypedArray_1.IsTypedArray)(value[j])) ||
            (!(0, CheckType_1.CheckType)(value[j + 1], "Array") && !(0, IsTypedArray_1.IsTypedArray)(value[j + 1])) ||
            (!(0, CheckType_1.CheckType)(value[j + 2], "Array") && !(0, IsTypedArray_1.IsTypedArray)(value[j + 2])) ||
            (!(0, CheckType_1.CheckType)(value[j + 3], "Array") && !(0, IsTypedArray_1.IsTypedArray)(value[j + 3]))) {
            return false;
        }
    }
    for (j = i << 2; j < n; j++) {
        if (!(0, CheckType_1.CheckType)(value[j], "Array") && !(0, IsTypedArray_1.IsTypedArray)(value[j])) {
            return false;
        }
    }
    return true;
};
exports.IsArrayOfAbstractArrays = IsArrayOfAbstractArrays;
