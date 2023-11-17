import validator from "@euriklis/validator";
import { NumericMatrix } from "../types";
/**
 * Checks if the input in the M setter is
 * a legal matrix object.
 */
export const IsArrayOfArraysWithEqualSize = (array: NumericMatrix): boolean =>
  new validator(array).isArrayOfArraysWithEqualSize.answer;
