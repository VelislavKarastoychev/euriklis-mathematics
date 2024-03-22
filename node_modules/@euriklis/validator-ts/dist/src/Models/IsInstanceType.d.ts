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
export declare const IsInstanceType: (value: any) => boolean;
//# sourceMappingURL=IsInstanceType.d.ts.map