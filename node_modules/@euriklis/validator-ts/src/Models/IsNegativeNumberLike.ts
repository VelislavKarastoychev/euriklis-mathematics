"use strict";

import { Integer } from "../types";

/**
 * Tests if the value parameter is is negative number or string which can be transformed to negative number.
 * @param {any | Integer | string} value
 * @returns {boolean}
 */
export const IsNegativeNumberLike = (value: any | Integer | string): boolean =>
  !isNaN(value) ? +value < 0 : false;
