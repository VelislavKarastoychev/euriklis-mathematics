"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUint8ClampedArray = void 0;
/**
 * Implements the isUint8ClampedArray method.
 * @param {any | Uint8ClampedArray} value
 * @returns {boolean} if the "value" property of the current validator instance is Uint8ClampedArray, then returns true, otherwise returns false.
 */
const IsUint8ClampedArray = (value) => value instanceof Uint8ClampedArray;
exports.IsUint8ClampedArray = IsUint8ClampedArray;
