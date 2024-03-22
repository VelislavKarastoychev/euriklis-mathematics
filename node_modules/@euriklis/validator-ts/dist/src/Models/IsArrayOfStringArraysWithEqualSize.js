"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfStringArraysWithEqualSize = void 0;
const CheckType_1 = require("./CheckType.js");
const IsStringArray_1 = require("./IsStringArray.js");
/**
 * Implements the isArrayOfStringArraysWithEqualSize method.
 * @param {any | string [][]} value - the current validator "value" property.
 * @returns {boolean} if the "value" is string matrix, returns true, otherwise returns false.
 */
const IsArrayOfStringArraysWithEqualSize = (value) => {
    const n = value.length;
    let i, j, l;
    if (!(0, CheckType_1.CheckType)(value[0], "Array"))
        return false;
    else
        l = value[0].length;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (!(0, CheckType_1.CheckType)(value[j], "Array") || !(0, IsStringArray_1.IsStringArray)(value[j]) ||
            value[j].length !== l ||
            !(0, CheckType_1.CheckType)(value[j], "Array") || !(0, IsStringArray_1.IsStringArray)(value[j + 1]) ||
            value[j + 1].length !== l ||
            !(0, CheckType_1.CheckType)(value[j + 2], "Array") || !(0, IsStringArray_1.IsStringArray)(value[j + 2]) ||
            value[j + 2].length !== l ||
            !(0, CheckType_1.CheckType)(value[j + 3], "Array") || !(0, IsStringArray_1.IsStringArray)(value[j + 3]) ||
            value[j + 3].length !== l)
            return false;
    }
    for (j = i << 2; j < n; j++) {
        if (!(0, CheckType_1.CheckType)(value[j], "Array") || !(0, IsStringArray_1.IsStringArray)(value[j]) ||
            value[j].length !== l)
            return false;
    }
    return true;
};
exports.IsArrayOfStringArraysWithEqualSize = IsArrayOfStringArraysWithEqualSize;
