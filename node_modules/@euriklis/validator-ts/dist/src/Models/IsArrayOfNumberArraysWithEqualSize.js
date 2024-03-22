"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfNumberArraysWithEqualSize = void 0;
const CheckType_1 = require("./CheckType.js");
const IsNumberArray_1 = require("./IsNumberArray.js");
/**
 * Checks if the "value" is a numeric matrix.
 *
 * @param {any | number [][]} value - the current validator instance value.
 * @returns {boolean} If the "value" is a numeric matrix
 * returns true, otherwise returns false.
 */
const IsArrayOfNumberArraysWithEqualSize = (value) => {
    const n = value.length;
    let i, j, l;
    if (!(0, CheckType_1.CheckType)(value[0], "Array"))
        return false;
    else
        l = value[0].length;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (!(0, IsNumberArray_1.IsNumberArray)(value[j]) || value[j].length !== l ||
            !(0, IsNumberArray_1.IsNumberArray)(value[j + 1]) || value[j + 1].length !== l ||
            !(0, IsNumberArray_1.IsNumberArray)(value[j + 2]) || value[j + 2].length !== l ||
            !(0, IsNumberArray_1.IsNumberArray)(value[j + 3]) || value[j + 3].length !== l)
            return false;
    }
    for (j = i << 2; j < n; j++) {
        if (!(0, IsNumberArray_1.IsNumberArray)(value[j]) || value[j].length !== l)
            return false;
    }
    return true;
};
exports.IsArrayOfNumberArraysWithEqualSize = IsArrayOfNumberArraysWithEqualSize;
