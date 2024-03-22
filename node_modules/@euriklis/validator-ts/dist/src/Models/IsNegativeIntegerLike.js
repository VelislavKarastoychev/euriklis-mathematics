"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNegativeIntegerLike = void 0;
/**
 * Tests if the value parameter is negative integer or string which can be transformed to negative integer.
 * Utility function for isNegativeIntegerLike method.
 * @param {any | Integer| string} value
 * @returns {boolean}
 */
const IsNegativeIntegerLike = (value) => !isNaN(value) ? Number.isInteger(+value) && (+value < 0) : false;
exports.IsNegativeIntegerLike = IsNegativeIntegerLike;
