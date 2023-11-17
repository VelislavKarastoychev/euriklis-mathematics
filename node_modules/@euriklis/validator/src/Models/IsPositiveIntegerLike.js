"use strict";
/**
 * Tests if the value parameter is positive integer or a string which can be transformed to positive integer.
 * Utility function for the isPositiveIntegerLike.
 * @param {number | string} value
 * @returns {boolean}
 */
export const IsPositiveIntegerLike = (value) =>
  !isNaN(value) ? Number.isInteger(+value) && (+value >= 0) : false;
