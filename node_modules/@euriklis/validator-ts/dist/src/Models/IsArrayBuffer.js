"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsArrayBuffer = void 0;
/**
 * Utility function which is used in the isArrayBuffer method.
 * @param {any} value - the current validator "value" property.
 * @returns {boolean} if the "value" is ArrayBuffer, returns true, otherwise returns false.
 */
const IsArrayBuffer = (value) => value instanceof ArrayBuffer;
exports.IsArrayBuffer = IsArrayBuffer;
