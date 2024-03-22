"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsGeneratorFunction = void 0;
/**
 * Utility function, which is used in the implementation of the isGeneratorFunction method.
 * @param {any | Generator} value - the current validator "value" property.
 * @returns {boolean} if the "value" is a generator functions returns true, otherwise returns false.
 */
const IsGeneratorFunction = (value) => value instanceof Function
    ? value.constructor.name === "GeneratorFunction"
    : value instanceof Object
        ? Object.prototype.toString.call(value) === "[object Generator]"
        : false;
exports.IsGeneratorFunction = IsGeneratorFunction;
