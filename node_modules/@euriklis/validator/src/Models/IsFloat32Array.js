"use strict";
/**
 * Utility function which is used in the implementation of the isFloat32Array method.
 * @param {Float32Array} value - the current validator "value" property
 * @returns {boolean} if the "value" is Float32Array returns true, otherwise returns false.
 **/
export const IsFloat32Array = (value) => value instanceof Float32Array;
