"use strict";
/**
 * Utility function which is used in the isArrayBuffer method.
 * @param {any} value - the current validator "value" property.
 * @returns {boolean} if the "value" is ArrayBuffer, returns true, otherwise returns false.
 */
export const IsArrayBuffer = (value: any): boolean =>
  value instanceof ArrayBuffer;
