"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsInstanceType = void 0;
/**
 * Tests if the parameter is InstanceType.
 *
 * @param {any} value - the current validator value property.
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
 */
const IsInstanceType = (value) => {
    return typeof value === "function" && !!value.prototype;
};
exports.IsInstanceType = IsInstanceType;
