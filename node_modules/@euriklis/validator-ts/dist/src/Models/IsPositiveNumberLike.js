"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPositiveNumberLike = void 0;
/**
 * Tests if the value parameter is positive number or is string which can be transformed to positive number.
 * Utility function for the isPositiveNumberLike method.
 * @param {any | number | string} value
 */
const IsPositiveNumberLike = (value) => !isNaN(value) ? +value >= 0 : false;
exports.IsPositiveNumberLike = IsPositiveNumberLike;
