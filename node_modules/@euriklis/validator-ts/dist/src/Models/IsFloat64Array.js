"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFloat64Array = void 0;
/**
 * Utility function which is used in the implementation of the isFloat64Array.
 * @param {any | Float64Array} value - the current validator "value" property.
 * @returns {boolean} if the "value" is a Float64Array, then returns true, otherwise returns false.
 **/
const IsFloat64Array = (value) => value instanceof Float64Array;
exports.IsFloat64Array = IsFloat64Array;
