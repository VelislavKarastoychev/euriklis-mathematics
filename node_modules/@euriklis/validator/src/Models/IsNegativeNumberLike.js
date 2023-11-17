"use strict";
/**
 * Tests if the value parameter is is negative number or string which can be transformed to negative number.
 * @param {number | string} value
 * @returns {boolean}
 */
export const IsNegativeNumberLike = (value) =>
  !isNaN(value) ? +value < 0 : false;
