import validator from "../validator.js";
/**
 * Implementation of the forEvery method when the "value" property of the
 * current validator instance is an array.
 *
 * @param {any} value - The "value" property of the current validator instance.
 * @param {function(validator, number): validator} callback - A function that
 * takes a validator instance and an optional key or index and returns a validator instance.
 *
 * @returns {boolean} True if the callback function returns "truthy" validator instances
 * for all elements of the array, false otherwise.
 */
export declare const ForEveryArrayEdition: (value: any, callback: (param: validator, index: number) => validator) => boolean;
/**
 * Implements the forEvery method for objects.
 *
 * @param {any} value - The value of the current validator instance.
 * @param {function(validator, number): validator} callback - A function that
 * takes a validator instance and an optional key or index and returns a validator instance.
 *
 * @returns {boolean} True if the callback function returns "truthy" validator instances
 * for all values of the object, false otherwise.
 */
export declare const ForEveryObjectEdition: (value: any, callback: (param: validator, key: number | string) => validator) => boolean;
/**
 * Implementation of the forEvery method when the "value" property of the
 * current validator instance is a set.
 *
 * @param {any} value - The "value" property of the current validator instance.
 * @param {function(validator, number): validator} callback - A function that
 * takes a validator instance and an optional key or index and returns a validator instance.
 *
 * @returns {boolean} True if the callback function returns "truthy" validator instances
 * for all elements of the set, false otherwise.
 */
export declare const ForEverySetEdition: (value: any, callback: (item: validator, index: number) => validator) => boolean;
/**
 * Implementation of the forEvery method when the "value" property of the
 * current validator instance is a map.
 *
 * @param {any} map - The "value" property of the current validator instance.
 * @param {function(validator, number): validator} callback - A function that
 * takes a validator instance and an optional key or index and returns a validator instance.
 *
 * @returns {boolean} True if the callback function returns "truthy" validator instances
 * for all values of the map, false otherwise.
 */
export declare const ForEveryMapEdition: (map: any, callback: (value: validator, key: number | string) => validator) => boolean;
//# sourceMappingURL=ForAll.d.ts.map