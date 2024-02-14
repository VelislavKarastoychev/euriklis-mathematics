import { MatrixType, NumericMatrix } from "../types";
import validator from "@euriklis/validator-ts";
/**
 * Checks if the input in the M setter is
 * a legal matrix object.
 */
export const IsArrayOfArraysWithEqualSize = (array: NumericMatrix | MatrixType): boolean =>
  new validator(array).isArrayOfAbstractArraysWithEqualSize.answer;


