"use strict";
/**
 * Utility function which is used in the implementation of the isFloat64Array.
 * @param {Float64Array} value - the current validator "value" property.
 * @returns {boolean} if the "value" is a Float64Array, then returns true, otherwise returns false.
 **/
export const IsFloat64Array = (value) => value instanceof Float64Array;
