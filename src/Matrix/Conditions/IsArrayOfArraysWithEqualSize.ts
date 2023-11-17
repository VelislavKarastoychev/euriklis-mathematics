import { NumericMatrix } from "../types";
import validator from "@euriklis/validator";
/**
 * Checks if the input in the M setter is
 * a legal matrix object.
 */
export const IsArrayOfArraysWithEqualSize = (array: NumericMatrix): boolean =>
  new validator(array).isArrayOfArraysWithEqualSize.answer;


