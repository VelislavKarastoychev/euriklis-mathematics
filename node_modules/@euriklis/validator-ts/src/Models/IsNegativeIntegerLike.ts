"use strict";
import { Integer } from "../types";
/**
 * Tests if the value parameter is negative integer or string which can be transformed to negative integer.
 * Utility function for isNegativeIntegerLike method.
 * @param {any | Integer| string} value
 * @returns {boolean}
 */
export const IsNegativeIntegerLike = (value: any | Integer | string): boolean =>
  !isNaN(value) ? Number.isInteger(+value) && (+value < 0) : false;
