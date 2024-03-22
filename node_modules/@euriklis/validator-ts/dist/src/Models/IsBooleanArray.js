"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBooleanArray = void 0;
/**
 * Tests if an array contains only boolean elements.
 * Utility function for the isBooleanArray method.
 *
 * @param {any | boolean[]} value
 * @returns {boolean}
 */
const IsBooleanArray = (value) => {
    const n = value.length;
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (typeof value[j] !== "boolean" ||
            typeof value[j + 1] !== "boolean" ||
            typeof value[j + 2] !== "boolean" ||
            typeof value[j + 3] !== "boolean") {
            return false;
        }
    }
    for (j = i << 2; j < n; j++) {
        if (typeof value[j] !== "boolean") {
            return false;
        }
    }
    return true;
};
exports.IsBooleanArray = IsBooleanArray;
