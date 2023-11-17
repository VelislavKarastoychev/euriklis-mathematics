"use strict";
/**
 * Utility function which is used in the implementation of the isUint16Array method.
 * @param {Uint16Array} value - the current validator property.
 * @returns {boolean} if the "value" is Uint16Array, then returns true, otherwise returns false.
 **/
export const IsUint16Array = (value) => value instanceof Uint16Array;
