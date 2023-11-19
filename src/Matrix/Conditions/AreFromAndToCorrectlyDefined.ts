"use strict";
import validator from "@euriklis/validator";
/**
 * Checks if the from and to properties are
 * correctly defined. We make checking only
 * for the from because of the typescript
 * strong types testing.
 *
 * @param from - An array with the starting indices
 * @param to - An array with the ending indices
 *
 * @returns {boolean} True if the from and to are
 * correctly defined.
 */
export const AreFromAndToCorrectlyDefined = (from: [number, number], to: [number, number]): boolean => {
  return new validator({from, to}).interface({
    from: f => f.isArrayAndForEvery((item, i) => item.isLessThanOrEqual(to[i as number]))
  }).answer;
}
