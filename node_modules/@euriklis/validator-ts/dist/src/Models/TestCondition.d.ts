import { ComparisonType } from "../types.js";
/**
 * This utility function allows you to test a value against a given condition
 * (e.g., equality, less than, greater than, etc.). You can optionally specify
 * a property name or index to access within the value.

 * @param {any} value - The value to be tested.
 * @param {string | number} [property] - Optional: Property name or index to access within the value.
 * @param {ComparisonType} condition - The comparison condition:
 *   - "eq": Equal to.
 *   - "lt": Less than.
 *   - "gt": Greater than.
 *   - "neq": Not equal to.
 *   - "leq": Less than or equal to.
 *   - "geq": Greater than or equal to.
 * @param {number | string} item - The item to compare the value against.
 * @returns {boolean} True if the value meets the specified condition, otherwise false.
 * @example
 * // Test if 'value' is equal to 42
 * const result = TestCondition(value, "", "eq", 42);
 *
 * // Test if 'value.property' is greater than or equal to 10
 * const result = TestCondition(value, "property", "geq", 10);
 */
export declare const TestCondition: (value: any, property: string | number | undefined, item: string | number, condition?: ComparisonType) => boolean;
//# sourceMappingURL=TestCondition.d.ts.map