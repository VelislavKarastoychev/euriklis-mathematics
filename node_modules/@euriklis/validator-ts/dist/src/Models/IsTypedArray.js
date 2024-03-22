"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsTypedArray = void 0;
/**
 * Checks if an object has properties typical of TypedArray instances.
 *
 * @param {any | TypedArray} value - The object to check.
 * @returns {boolean} True if the object has TypedArray properties, false otherwise.
 */
const IsTypedArray = (value) => value instanceof Object &&
    "buffer" in value &&
    "byteLength" in value &&
    "byteOffset" in value;
exports.IsTypedArray = IsTypedArray;
