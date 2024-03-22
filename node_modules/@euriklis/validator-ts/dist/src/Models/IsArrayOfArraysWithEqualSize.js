"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfArraysWithEqualSize = void 0;
const CheckType_1 = require("./CheckType.js");
/**
 * Checks if the "value" is an array of
 * arbitrary arrays with equal size.
 * Utility function for the isArrayOfArraysWithEqualSize method.
 *
 * @param {any | [][]} value - an array of arrays
 * which have to be with equal size.
 * @returns {boolean} Returns true if the value is an array
 * which consists of arrays with equal size, otherwise
 * returns false.
 */
const IsArrayOfArraysWithEqualSize = (value) => {
    const n = value.length;
    let i, j, l;
    if ((0, CheckType_1.CheckType)(value[0], "Array")) {
        l = value[0].length;
    }
    else
        return false;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (!(0, CheckType_1.CheckType)(value[j], "Array") || value[j].length !== l ||
            !(0, CheckType_1.CheckType)(value[j + 1], "Array") || value[j + 1].length !== l ||
            !(0, CheckType_1.CheckType)(value[j + 2], "Array") || value[j + 2].length !== l ||
            !(0, CheckType_1.CheckType)(value[j + 3], "Array") || value[j + 3].length !== l)
            return false;
    }
    for (j = i << 2; j < n; j++) {
        if (!(0, CheckType_1.CheckType)(value[j], "Array") || value[j].length !== l)
            return false;
    }
    return true;
};
exports.IsArrayOfArraysWithEqualSize = IsArrayOfArraysWithEqualSize;
