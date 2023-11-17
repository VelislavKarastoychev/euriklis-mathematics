"use strict";
/**
 * Tests if the value parameter is negative integer or string which can be transformed to negative integer.
 * Utility function for isNegativeIntegerLike method.
 * @param {number | string} value
 * @returns {boolean}
 **/
export const IsNegativeIntegerLike = (value) =>
  !isNaN(value) ? Number.isInteger(+value) && (+value < 0) : false;
