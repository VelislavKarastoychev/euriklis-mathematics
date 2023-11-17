"use strict";
/**
 * Utility function which is used in the implementation of the isPromise method.
 * @param {Promise} value - the current validator "value" property.
 * @returns {boolean} if the "value" is a Promise instance, then returns true, otherwise returns false.
 **/
export const IsPromiseFunction = (value) => value instanceof Promise;
