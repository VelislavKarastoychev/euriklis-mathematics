import { Integer } from "../types.js";
/**
 * Checks if the "value" property is an array of integers, which lies
 * in the closed interval [a, b].
 * Utility function for the isArrayOfIntegersInClosedRange.
 *
 * @param {any | Integer []} value
 * @param {number} a - the lower bound of the array elements.
 * @param {number} b - the upper bound of the array elements.
 * @returns {boolean} if the "value" is integer array in the closed range [a, b], returns true, otherwise returns false.
 */
export declare const IsArrayOfIntegersInClosedRange: (value: any | Integer[][], a: number, b: number) => boolean;
//# sourceMappingURL=IsArrayOfIntegersInClosedRange.d.ts.map