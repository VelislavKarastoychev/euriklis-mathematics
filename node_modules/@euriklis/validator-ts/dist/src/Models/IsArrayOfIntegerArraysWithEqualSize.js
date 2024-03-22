"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfIntegerArraysWithEqualSize = void 0;
const CheckType_1 = require("./CheckType.js");
const IsIntegerArray_1 = require("./IsIntegerArray.js");
/**
 * Implements the isArrayOfIntegerArraysWithEqualSize.
 *
 * @param {any | number [][]} value - the current validator value property.
 * @returns {boolean} if the "value" is an array of integer arrrays with equal size returns true, otherwise returns false.
 */
const IsArrayOfIntegerArraysWithEqualSize = (value) => {
    const n = value.length;
    let i, j, l;
    if (!(0, CheckType_1.CheckType)(value[0], "Array"))
        return false;
    else
        l = value[0].length;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (!(0, IsIntegerArray_1.IsIntegerArray)(value[j]) || value[j].length !== l ||
            !(0, IsIntegerArray_1.IsIntegerArray)(value[j + 1]) || value[j + 1].length !== l ||
            !(0, IsIntegerArray_1.IsIntegerArray)(value[j + 2]) || value[j + 2].length !== l ||
            !(0, IsIntegerArray_1.IsIntegerArray)(value[j + 3]) || value[j + 3].length !== l)
            return false;
    }
    for (j = i << 2; j < n; j++) {
        if (!(0, IsIntegerArray_1.IsIntegerArray)(value[j]) || value[j].length !== l)
            return false;
    }
    return true;
};
exports.IsArrayOfIntegerArraysWithEqualSize = IsArrayOfIntegerArraysWithEqualSize;
