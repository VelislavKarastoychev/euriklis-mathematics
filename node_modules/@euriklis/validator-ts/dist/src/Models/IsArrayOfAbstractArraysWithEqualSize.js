"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfAbstractArraysWithEqualSize = void 0;
const CheckType_1 = require("./CheckType.js");
const IsTypedArray_1 = require("./IsTypedArray.js");
/**
 * Utility function for the isArrayOfAbstractArraysWithEqualSize
 * Checks if the "value" property is
 * an array of generic or typed arrays with
 * equal size, i.e. if the "value" is an matrix
 * or typed matrix.
 *
 * @param {any} value
 * @returns {boolean} Ture if the "value" is an
 * array of generic or typed arrays with equal
 * size, false otherwise.
 */
const IsArrayOfAbstractArraysWithEqualSize = (value) => {
    const n = value.length;
    let i, j, l;
    if ((0, CheckType_1.CheckType)(value[0], "Array") || (0, IsTypedArray_1.IsTypedArray)(value[0])) {
        l = value[0].length;
    }
    else
        l = false;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (((!(0, CheckType_1.CheckType)(value[j], "Array") &&
            !(0, IsTypedArray_1.IsTypedArray)(value[j])) ||
            value[j].length !== l) ||
            ((!(0, CheckType_1.CheckType)(value[j + 1], "Array") &&
                !(0, IsTypedArray_1.IsTypedArray)(value[j + 1])) ||
                value[j + 1].length !== l) || ((!(0, CheckType_1.CheckType)(value[j + 2], "Array") &&
            !(0, IsTypedArray_1.IsTypedArray)(value[j + 2])) ||
            value[j + 2].length !== l) || ((!(0, CheckType_1.CheckType)(value[j + 3], "Array") &&
            !(0, IsTypedArray_1.IsTypedArray)(value[j + 3])) ||
            value[j + 3].length !== l)) {
            return false;
        }
    }
    for (j = i << 2; j < n; j++) {
        if ((!(0, CheckType_1.CheckType)(value[j], "Array") &&
            !(0, IsTypedArray_1.IsTypedArray)(value[j])) ||
            value[j].length !== l) {
            return false;
        }
    }
    return true;
};
exports.IsArrayOfAbstractArraysWithEqualSize = IsArrayOfAbstractArraysWithEqualSize;
