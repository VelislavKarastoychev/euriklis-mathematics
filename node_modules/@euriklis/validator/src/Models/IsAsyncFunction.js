"use strict";
/**
 * Utility function which is used in the implementation of the isAsync method.
 * @param {AsyncGenerator} value - the current validator "value" property.
 * @returns {boolean} if the "value" is AsyncFunction, then returns true, otherwise returns false.
 */
export const IsAsyncFunction = (value) =>
  Object.prototype.toString.call(value) === "[object AsyncFunction]";
