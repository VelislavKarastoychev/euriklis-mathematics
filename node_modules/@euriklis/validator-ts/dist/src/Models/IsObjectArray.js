"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsObjectArray = void 0;
/**
 * Checks if the "value" is an array of object elements.
 * Utility function for the isObjectArray method.
 *
 * @param {any | object []} value - an array of object elements
 * @returns {boolean} if the "value" is an array of object
 * elements returns true, otherwise false.
 */
const IsObjectArray = (value) => {
    const n = value.length;
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if ((value[j] instanceof Array || typeof value[j] !== "object" ||
            value[j] === null) ||
            (value[j + 1] instanceof Array || typeof value[j + 1] !== "object" ||
                value[j + 1] === null) ||
            (value[j + 2] instanceof Array || typeof value[j + 2] !== "object" ||
                value[j + 2] === null) ||
            (value[j + 3] instanceof Array || typeof value[j + 3] !== "object" ||
                value[j + 3] === null)) {
            return false;
        }
    }
    for (j = i << 2; j < n; j++) {
        if ((value[j] instanceof Array || typeof value[j] !== "object" ||
            value[j] === null)) {
            return false;
        }
    }
    return true;
};
exports.IsObjectArray = IsObjectArray;
