"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsInteger = void 0;
/**
 * Tests if the value parameter is integer.
 * Utility
 * @param {any} value
 * @returns {boolean}
 */
const IsInteger = (value) => (typeof value === "number") && (Number.isInteger(value));
exports.IsInteger = IsInteger;
