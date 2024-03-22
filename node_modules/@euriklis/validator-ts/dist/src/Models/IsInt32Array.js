"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsInt32Array = void 0;
/**
 * Utility funciton which is used in the implementation of the isInt32Array.
 * @param {any | Int32Array} value - the "value" property of the the current validator instance.
 * @returns {boolean} if the "value" is Int32Array instance returns true, otherwise returns false.
 */
const IsInt32Array = (value) => value instanceof Int32Array;
exports.IsInt32Array = IsInt32Array;
