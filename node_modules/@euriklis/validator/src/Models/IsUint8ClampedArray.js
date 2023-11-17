"use strict";
/**
 * Implements the isUint8ClampedArray method. 
 * @param {Uint8ClampedArray} value
 * @returns {boolean} if the "value" property of the current validator instance is Uint8ClampedArray, then returns true, otherwise returns false. 
 **/
export const IsUint8ClampedArray = (value) => value instanceof Uint8ClampedArray;
