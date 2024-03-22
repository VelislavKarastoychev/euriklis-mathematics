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
export declare const ForAnyArrayEdition: (value: any, callback: (item: validator, index: number) => validator) => boolean;
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
export declare const ForAnyObjectEdition: (value: any, callback: (value: validator, key: number | string) => validator) => boolean;
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
export declare const ForAnySetEdition: (value: any, callback: (value: validator, index: number) => validator) => boolean;
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
export declare const ForAnyMapEdition: (map: any, callback: (value: validator, key: string | number) => validator) => boolean;
//# sourceMappingURL=ForAny.d.ts.map