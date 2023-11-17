"use strict";
/**
 * Checks if an object has properties typical of TypedArray instances.
 *
 * @param {Object} value - The object to check. 
 * @returns {boolean} True if the object has TypedArray properties, false otherwise.
 */
export const IsTypedArray = (value) =>
  value instanceof Object &&
  "buffer" in value &&
  "byteLength" in value &&
  "byteOffset" in value;
