"use strict";

import { ComparisonType } from "../types";

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
export const TestCondition = (
  value: any,
  property: string | number = "",
  item: string | number,
  condition: ComparisonType = "eq",
): boolean => {
  let v = value;
  if (property) {
    v = value[property];
  }
  switch (condition) {
    case "eq":
      return v === item;
    case "neq":
      return v !== item;
    case "geq":
      return v >= item;
    case "leq":
      return v <= item;
    case "lt":
      return v < item;
    case "gt":
      return v > item;
  }
};
