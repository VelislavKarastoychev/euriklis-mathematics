"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayOfFunctions = void 0;
/**
 * Checks if the "value" is an array of functions.
 * Utility function for the isArrayOfFunctions method.
 *
 * @param {any | Function []} value - the current validator
 * instance, which has to be array of functions.
 * @returns {boolean} if the "value" is an array
 * of functions, returns true, otherwise returns false.
 */
const IsArrayOfFunctions = (value) => {
    const n = value.length;
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (typeof value[j] !== "function" ||
            typeof value[j + 1] !== "function" ||
            typeof value[j + 2] !== "function" ||
            typeof value[j + 3] !== "function")
            return false;
    }
    for (j = i << 2; j < n; j++) {
        if (typeof value[j] !== "function")
            return false;
    }
    return true;
};
exports.IsArrayOfFunctions = IsArrayOfFunctions;
