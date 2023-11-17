"use strict";
/**
 * Implements the isInstanceof method. Note that if the "instance" is not InstanceType
 * constructor, then an error will be thrown
 * @param {any} value - the current validator instance value property.
 * @param {InstanceType} instance - some instance or a class which will be used to test.
 * @returns {boolean} if the "value" property is instance of the instance, then returns true, otherwise returns false.
 **/
export const IsInstanceof = (value, instance) => {
  return value instanceof instance;
}
