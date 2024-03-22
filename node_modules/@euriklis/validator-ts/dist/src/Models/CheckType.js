"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckType = void 0;
/**
 * Utility function which is used in series of methods to check if a variable is of a given type or instance.
 * @param {any} value - the current validator "value" property.
 * @returns {boolean} if the "value" is instance of the "type", then returns true, otherwise returns false.
 */
const CheckType = (value, type) => Object.prototype.toString.call(value) === `[object ${type}]`;
exports.CheckType = CheckType;
