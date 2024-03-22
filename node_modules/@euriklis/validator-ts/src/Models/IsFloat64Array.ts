"use strict";
/**
 * Utility function which is used in the implementation of the isFloat64Array.
 * @param {any | Float64Array} value - the current validator "value" property.
 * @returns {boolean} if the "value" is a Float64Array, then returns true, otherwise returns false.
 **/
export const IsFloat64Array = (value: any | Float64Array): boolean => value instanceof Float64Array;
