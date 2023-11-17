"use strict";
/**
 * Tests if the value property is number or string which can be transformed to number.
 * Utility function for isNumberLike method.
 * @param {number | string} value
 * @returns {boolean}
 */
export const IsNumberLike = (value) =>
  typeof value === "number" ||
  (typeof value === "string" && !Number.isNaN(Number(value)));
