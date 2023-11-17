"use strict";
/**
 * Utility funciton which is used in the implementation of the isInt32Array.
 * @param {Int32Array} value - the "value" property of the the current validator instance.
 * @returns {boolean} if the "value" is Int32Array instance returns true, otherwise returns false.
 **/
export const IsInt32Array = (value) => value instanceof Int32Array;
