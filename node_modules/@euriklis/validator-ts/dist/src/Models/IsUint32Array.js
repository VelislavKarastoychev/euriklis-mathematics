"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUint32Array = void 0;
/**
 * Utility function which is used in the implementation of the isUint32Array.
 * @param {any | Uint32Array} value - the current validator "value" property.
 * @returns {boolean} if the "value" property is Uint32Array, then returns true, otherwise returns false.
 */
const IsUint32Array = (value) => value instanceof Uint32Array;
exports.IsUint32Array = IsUint32Array;
