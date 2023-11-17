"use strict";
/**
 * Tests if the value parameter is a number.
 * Utility function for the isNumber method.
 * @param {any} value
 * @returns {boolean}
 **/
export const IsNumber = (value) => (typeof value === 'number') && !isNaN(value)
