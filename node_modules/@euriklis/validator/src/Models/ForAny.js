"use strict";
import validator from "../validator.js";

/**
 * Implementation of the forAny method
 * when the "value" property of the current
 * validator instance is an array.
 *
 * @param {any} value - The "value" property
 * of the current validator instance.
 * @param {function(validator, number): validator} callback - A
 * function that takes a validator instance and an optional key
 * or index and returns a validator instance.
 *
 * @returns {boolean} True if the callback function returns
 * a "truthy" validator instance for any element in the array,
 * false otherwise.
 */
export const ForAnyArrayEdition = (value, callback) => {
  const n = value.length;
  const v = new validator();
  let i, j;

  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      (v.reset(), v.value = value[j], callback(v, j).answer) ||
      (v.reset(), v.value = value[j + 1], callback(v, j + 1).answer) ||
      (v.reset(), v.value = value[j + 2], callback(v, j + 2).answer) ||
      (v.reset(), v.value = value[j + 3], callback(v, j + 3).answer)
    ) return true;
  }

  j = i << 2;
  for (; j < n; j++) {
    if (v.reset(), v.value = value[j], callback(v, j).answer) return true;
  }

  return false;
};

/**
 * Implementation of the forAny method
 * when the "value" property of the current
 * validator instance is an object.
 *
 * @param {any} value - The "value" property
 * of the current validator instance.
 * @param {function(validator, number): validator} callback - A
 * function that takes a validator instance and an optional key
 * or index and returns a validator instance.
 *
 * @returns {boolean} True if the callback function returns
 * a "truthy" validator instance for any value of the object,
 * false otherwise.
 */
export const ForAnyObjectEdition = (value, callback) => {
  let i, j;
  const keys = Object.keys(value);
  const n = keys.length;
  const v = new validator();

  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      (v.reset(), v.value = value[keys[j]], callback(v, keys[j]).answer) ||
      (v.reset(),
        v.value = value[keys[j + 1]],
        callback(v, keys[j + 1]).answer) ||
      (v.reset(),
        v.value = value[keys[j + 2]],
        callback(v, keys[j + 2]).answer) ||
      (v.reset(), v.value = value[keys[j + 3]], callback(v, keys[j + 3]).answer)
    ) return true;
  }

  j = i << 2;
  for (; j < n; j++) {
    if (v.reset(), v.value = value[keys[j]], callback(v, keys[j]).answer) {
      return true;
    }
  }

  return false;
};

/**
 * Implementation of the forAny method
 * when the "value" property of the current
 * validator instance is a set.
 *
 * @param {any} value - The "value" property
 * of the current validator instance.
 * @param {function(validator, number): validator} callback - A
 * function that takes a validator instance and an optional key
 * or index and returns a validator instance.
 *
 * @returns {boolean} True if the callback function returns
 * a "truthy" validator instance for any element in the set,
 * false otherwise.
 */
export const ForAnySetEdition = (value, callback) => {
  const v = new validator();
  let index = 0;

  for (const element of value) {
    if (v.reset(), v.value = element, callback(v, index++).answer) return true;
  }

  return false;
};

/**
 * Implementation of the forAny method
 * when the "value" property of the current
 * validator instance is a map.
 *
 * @param {any} value - The "value" property
 * of the current validator instance.
 * @param {function(validator, number): validator} callback - A
 * function that takes a validator instance and an optional key
 * or index and returns a validator instance.
 *
 * @returns {boolean} True if the callback function returns
 * a "truthy" validator instance for any element in the map,
 * false otherwise.
 */
export const ForAnyMapEdition = (map, callback) => {
  const v = new validator();

  for (const [key, value] of map) {
    if (v.reset(), v.value = value, callback(v, key).answer) return true;
  }

  return false;
};
