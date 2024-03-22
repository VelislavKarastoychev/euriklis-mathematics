"use strict";
/**
 * Utility function which is used in the implementation of the isUint32Array.
 * @param {any | Uint32Array} value - the current validator "value" property.
 * @returns {boolean} if the "value" property is Uint32Array, then returns true, otherwise returns false.
 */
export const IsUint32Array = (value: any | Uint32Array): boolean =>
  value instanceof Uint32Array;
