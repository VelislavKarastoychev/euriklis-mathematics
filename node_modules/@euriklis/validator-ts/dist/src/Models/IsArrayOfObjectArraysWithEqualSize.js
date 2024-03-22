"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfObjectArraysWithEqualSize = void 0;
const IsObjectArray_1 = require("./IsObjectArray.js");
/**
 * Checks if the "value" is a matrix of objects.
 * Utility function for the isArrayOfObjectArraysWithEqualSize method.
 *
 * @param {any | object [][]} value - the current validator parameter, which
 * is expected to be a matrix of objects.
 * @returns {boolean} If the "value" is a matrix of object elements,
 * then returns true, otherwise returns false.
 */
const IsArrayOfObjectArraysWithEqualSize = (value) => {
    const n = value.length;
    let i, j, l;
    if (!Array.isArray(value[0]))
        return false;
    else
        l = value[0].length;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (!Array.isArray(value[j]) || !(0, IsObjectArray_1.IsObjectArray)(value[j]) ||
            value[j].length !== l ||
            !Array.isArray(value[j + 1]) || !(0, IsObjectArray_1.IsObjectArray)(value[j + 1]) ||
            value[j + 1].length !== l ||
            !Array.isArray(value[j + 2]) || !(0, IsObjectArray_1.IsObjectArray)(value[j + 2]) ||
            value[j + 2].length !== l ||
            !Array.isArray(value[j + 3]) || !(0, IsObjectArray_1.IsObjectArray)(value[j + 3]) ||
            value[j + 3].length !== l)
            return false;
    }
    for (j = i << 2; j < n; j++) {
        if (!Array.isArray(value[j]) || !(0, IsObjectArray_1.IsObjectArray)(value[j]) ||
            value[j].length !== l)
            return false;
    }
    return true;
};
exports.IsArrayOfObjectArraysWithEqualSize = IsArrayOfObjectArraysWithEqualSize;
