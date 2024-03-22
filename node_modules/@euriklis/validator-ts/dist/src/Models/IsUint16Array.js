"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUint16Array = void 0;
/**
 * Utility function which is used in the implementation of the isUint16Array method.
 * @param {any | Uint16Array} value - the current validator property.
 * @returns {boolean} if the "value" is Uint16Array, then returns true, otherwise returns false.
 */
const IsUint16Array = (value) => value instanceof Uint16Array;
exports.IsUint16Array = IsUint16Array;
