"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsInt8Array = void 0;
/**
 * Implements the isInt8Array method.
 * @param {any | Int8Array} value - the current validator "value" instance.
 * @returns {boolean} if the "value" is Int8Array then returns true, otherwise returns false.
 */
const IsInt8Array = (value) => {
    return value instanceof Int8Array;
};
exports.IsInt8Array = IsInt8Array;
