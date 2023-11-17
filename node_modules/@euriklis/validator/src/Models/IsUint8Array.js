"use strict";
/**
 * Implements the isUint8Array method.
 * @param {Uint8Array} value
 * @returns {boolean} if the current validator "value" property is Uint8Array, then returns true, otherwise returns false.
 **/
export const IsUint8Array = (value) => value instanceof Uint8Array;
