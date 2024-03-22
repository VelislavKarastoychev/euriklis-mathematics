"use strict";

import { Integer } from "../types";

/**
 * Tests if the value parameter is an integer or a string which can be transformed to integer.
 * Utility function for isConvertibleToInteger method.
 * @param {any | Integer | string} value
 * @returns {boolean}
 */
export const IsIntegerLike = (value: any | Integer | string): boolean =>
  typeof value === "string"
    ? Number.isInteger(+value)
    : Number.isInteger(value);
