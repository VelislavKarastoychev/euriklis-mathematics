"use strict";
/**
 * Utility function which is used in the implementation of the isUint32Array.
 * @param {Uint32Array} value - the current validator "value" property.
 * @returns {boolean} if the "value" property is Uint32Array, then returns true, otherwise returns false.
 **/
export const IsUint32Array = (value) => value instanceof Uint32Array; 
