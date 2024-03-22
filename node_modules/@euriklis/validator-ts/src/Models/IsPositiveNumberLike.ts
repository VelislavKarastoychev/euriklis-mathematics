"use strict";
/**
 * Tests if the value parameter is positive number or is string which can be transformed to positive number.
 * Utility function for the isPositiveNumberLike method.
 * @param {any | number | string} value
 */
export const IsPositiveNumberLike = (value: any | number | string): boolean =>
  !isNaN(value) ? +value >= 0 : false;
