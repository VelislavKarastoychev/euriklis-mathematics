"use strict";
/**
 * Implements the isInt16Array method.
 * @param {any | Int16Array} value - the current validator "value" property.
 * @returns {boolean} if the "value" property is Int16Array returns true, otherwise returns false.
 */
export const IsInt16Array = (value: any | Int16Array): boolean =>
  value instanceof Int16Array;
