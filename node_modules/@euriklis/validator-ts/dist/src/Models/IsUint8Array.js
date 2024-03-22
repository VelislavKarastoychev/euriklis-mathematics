"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUint8Array = void 0;
/**
 * Implements the isUint8Array method.
 * @param {any | Uint8Array} value
 * @returns {boolean} if the current validator "value" property is Uint8Array, then returns true, otherwise returns false.
 */
const IsUint8Array = (value) => value instanceof Uint8Array;
exports.IsUint8Array = IsUint8Array;
