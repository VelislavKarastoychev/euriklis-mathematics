"use strict"
/**
 * Tests if the parameter is InstanceType.
 *
 * @param {InstanceType} value - the current validator value property.
 * @returns {boolean} if the 'value' property is InstanceType then returns true, otherwise returns false.
 * @description to check if a parameter is InstanceType we have to check if the parameter is function and
 * if for this function exists a prototype.
 * @example
 * class Person {
 *   name;
 *   surname;
 *   family;
 *   age;
 *   ID;
 * }
 * console.log(IsInstanceType(Person)); // true
 **/
export const IsInstanceType = (value) => {
  return typeof value === 'function' && !!value.prototype;
}
