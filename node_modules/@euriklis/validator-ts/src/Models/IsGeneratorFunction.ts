"use strict";
/**
 * Utility function, which is used in the implementation of the isGeneratorFunction method.
 * @param {any | Generator} value - the current validator "value" property.
 * @returns {boolean} if the "value" is a generator functions returns true, otherwise returns false.
 */
export const IsGeneratorFunction = (value: any | Generator): boolean =>
  value instanceof Function
    ? value.constructor.name === "GeneratorFunction"
    : value instanceof Object
    ? Object.prototype.toString.call(value) === "[object Generator]"
    : false;
