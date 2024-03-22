"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsIntegerLike = void 0;
/**
 * Tests if the value parameter is an integer or a string which can be transformed to integer.
 * Utility function for isConvertibleToInteger method.
 * @param {any | Integer | string} value
 * @returns {boolean}
 */
const IsIntegerLike = (value) => typeof value === "string"
    ? Number.isInteger(+value)
    : Number.isInteger(value);
exports.IsIntegerLike = IsIntegerLike;
