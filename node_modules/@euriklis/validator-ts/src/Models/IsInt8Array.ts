"use strict";
/**
 * Implements the isInt8Array method.
 * @param {any | Int8Array} value - the current validator "value" instance.
 * @returns {boolean} if the "value" is Int8Array then returns true, otherwise returns false.
 */
export const IsInt8Array = (value: any | Int8Array): boolean => {
  return value instanceof Int8Array;
};
