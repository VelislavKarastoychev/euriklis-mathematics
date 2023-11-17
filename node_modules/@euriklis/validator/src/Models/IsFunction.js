"use strict";
/**
 * Utility function which is used in the implementation of the isFunction method.
 * @param {function} value - the current validator "value" property.
 * @returns {boolean} if the "value" is a function and not some DERIVATIVE of a function, then returns true, otherwise returns false.
 **/
export const IsFunction = (value) => value instanceof Function ? value.constructor.name === 'Function' : false;
