"use strict";
import { Integer } from "../types";
/**
 * Tests if the value parameter is positive integer or a string which can be transformed to positive integer.
 * Utility function for the isPositiveIntegerLike.
 * @param {any | Integer | string} value
 * @returns {boolean}
 */
export const IsPositiveIntegerLike = (value: any | Integer | string): boolean =>
  !isNaN(value) ? Number.isInteger(+value) && (+value >= 0) : false;
