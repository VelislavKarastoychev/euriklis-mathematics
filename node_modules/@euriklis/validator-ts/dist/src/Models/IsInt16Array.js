"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsInt16Array = void 0;
/**
 * Implements the isInt16Array method.
 * @param {any | Int16Array} value - the current validator "value" property.
 * @returns {boolean} if the "value" property is Int16Array returns true, otherwise returns false.
 */
const IsInt16Array = (value) => value instanceof Int16Array;
exports.IsInt16Array = IsInt16Array;
