/**
 * Implements the isObject method.
 *
 * @param {any | object} value - the current validator "value" property
 * @returns {boolean} if the "value" property is object type, then returns true, otherwise returns false.
 * @description this utility function tests if its parameter is of Object type/instance.
 * Because all in javascript is object type, we can not use the expression "value instanceof Object",
 * because if the "value" parameter is Array or function, this will returns also true value. In this
 * case we have to use a "hack" to detect when the "value" is Object.
 */
export declare const IsObject: (value: any | object) => boolean;
//# sourceMappingURL=IsObject.d.ts.map