"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPositiveIntegerLike = void 0;
/**
 * Tests if the value parameter is positive integer or a string which can be transformed to positive integer.
 * Utility function for the isPositiveIntegerLike.
 * @param {any | Integer | string} value
 * @returns {boolean}
 */
const IsPositiveIntegerLike = (value) => !isNaN(value) ? Number.isInteger(+value) && (+value >= 0) : false;
exports.IsPositiveIntegerLike = IsPositiveIntegerLike;
