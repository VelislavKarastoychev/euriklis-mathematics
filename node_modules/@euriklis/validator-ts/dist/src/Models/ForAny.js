"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForAnyMapEdition = exports.ForAnySetEdition = exports.ForAnyObjectEdition = exports.ForAnyArrayEdition = void 0;
const validator_1 = __importDefault(require("../validator.js"));
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
const ForAnyArrayEdition = (value, callback) => {
    const n = value.length;
    const v = new validator_1.default(undefined);
    let i, j;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if ((v.reset(), v.value = value[j], callback(v, j).answer) ||
            (v.reset(), v.value = value[j + 1], callback(v, j + 1).answer) ||
            (v.reset(), v.value = value[j + 2], callback(v, j + 2).answer) ||
            (v.reset(), v.value = value[j + 3], callback(v, j + 3).answer))
            return true;
    }
    for (j = i << 2; j < n; j++) {
        if (v.reset(), v.value = value[j], callback(v, j).answer)
            return true;
    }
    return false;
};
exports.ForAnyArrayEdition = ForAnyArrayEdition;
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
const ForAnyObjectEdition = (value, callback) => {
    let i, j;
    const keys = Object.keys(value);
    const n = keys.length;
    const v = new validator_1.default(undefined);
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if ((v.reset(), v.value = value[keys[j]], callback(v, keys[j]).answer) ||
            (v.reset(),
                v.value = value[keys[j + 1]],
                callback(v, keys[j + 1]).answer) ||
            (v.reset(),
                v.value = value[keys[j + 2]],
                callback(v, keys[j + 2]).answer) ||
            (v.reset(), v.value = value[keys[j + 3]], callback(v, keys[j + 3]).answer))
            return true;
    }
    j = i << 2;
    for (; j < n; j++) {
        if (v.reset(), v.value = value[keys[j]], callback(v, keys[j]).answer) {
            return true;
        }
    }
    return false;
};
exports.ForAnyObjectEdition = ForAnyObjectEdition;
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
const ForAnySetEdition = (value, callback) => {
    const v = new validator_1.default();
    let index = 0;
    for (const element of value) {
        if (v.reset(), v.value = element, callback(v, index++).answer)
            return true;
    }
    return false;
};
exports.ForAnySetEdition = ForAnySetEdition;
/**
 * Implementation of the forAny method
 * when the "value" property of the current
 * validator instance is a map.
 *
 * @param {any} map - The "value" property
 * of the current validator instance.
 * @param {function(validator, number): validator} callback - A
 * function that takes a validator instance and an optional key
 * or index and returns a validator instance.
 *
 * @returns {boolean} True if the callback function returns
 * a "truthy" validator instance for any element in the map,
 * false otherwise.
 */
const ForAnyMapEdition = (map, callback) => {
    const v = new validator_1.default();
    for (const [key, value] of map) {
        if (v.reset(), v.value = value, callback(v, key).answer)
            return true;
    }
    return false;
};
exports.ForAnyMapEdition = ForAnyMapEdition;
