"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPromiseFunction = void 0;
/**
 * Utility function which is used in the implementation of the isPromise method.
 * @param {any } value - the current validator "value" property.
 * @returns {boolean} if the "value" is a Promise instance, then returns true, otherwise returns false.
 */
const IsPromiseFunction = (value) => value instanceof Promise;
exports.IsPromiseFunction = IsPromiseFunction;
