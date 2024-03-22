"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfArrays = void 0;
const CheckType_1 = require("./CheckType.js");
/**
 * Checks if the "value" is an array of arbitrary array
 * elements.
 *
 * @param {any} value - an array of arbitrary arrays.
 * @returns {boolean} if the "value" is an array whoose
 * elements are all arbitrary arrays.
 */
const IsArrayOfArrays = (value) => {
    const n = value.length;
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (!(0, CheckType_1.CheckType)(value[j], "Array") ||
            !(0, CheckType_1.CheckType)(value[j + 1], "Array") ||
            !(0, CheckType_1.CheckType)(value[j + 2], "Array") ||
            !(0, CheckType_1.CheckType)(value[j + 3], "Array"))
            return false;
    }
    for (j = i << 2; j < n; j++) {
        if (!(0, CheckType_1.CheckType)(value[j], "Array"))
            return false;
    }
    return true;
};
exports.IsArrayOfArrays = IsArrayOfArrays;
