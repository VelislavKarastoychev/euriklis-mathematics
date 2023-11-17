"use strict";
/**
 * Tests if the value parameter is positive number or is string which can be transformed to positive number.
 * Utility function for the isPositiveNumberLike method.
 * @param {number | string} value
 */
export const IsPositiveNumberLike = (value) =>
  !isNaN(value) ? +value >= 0 : false;
