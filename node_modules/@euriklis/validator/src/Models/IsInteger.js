"use strict";
/**
 * Tests if the value parameter is integer.
 * Utility 
 * @param {any} value
 * @returns {boolean}
 **/
export const IsInteger = (value) => (typeof value === 'number') && (Number.isInteger(value));
