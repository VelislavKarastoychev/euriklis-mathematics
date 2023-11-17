"use strict";
/**
 * Utility function which is used to implement the isMap method.
 * In the implementation of this function we use the fact that each
 * type in JavaScript is an object type. To check if the type is Map
 * we call the object toString method which has to be equals to the
 * value "[object Map]"
 * @param {Map} value - the current validator "value" property.
 * @returns {boolean} if the value is Map, then returns true, otherwise returns false.
 **/
export const IsMap = (value) => Object.prototype.toString.call(value) === '[object Map]';
