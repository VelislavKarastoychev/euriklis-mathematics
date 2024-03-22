"use strict";
/**
 * Implements the isUint8Array method.
 * @param {any | Uint8Array} value
 * @returns {boolean} if the current validator "value" property is Uint8Array, then returns true, otherwise returns false.
 */
export const IsUint8Array = (value: any | Uint8Array): boolean =>
  value instanceof Uint8Array;
