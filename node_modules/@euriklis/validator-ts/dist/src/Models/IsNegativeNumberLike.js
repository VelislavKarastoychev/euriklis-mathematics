"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNegativeNumberLike = void 0;
/**
 * Tests if the value parameter is is negative number or string which can be transformed to negative number.
 * @param {any | Integer | string} value
 * @returns {boolean}
 */
const IsNegativeNumberLike = (value) => !isNaN(value) ? +value < 0 : false;
exports.IsNegativeNumberLike = IsNegativeNumberLike;
