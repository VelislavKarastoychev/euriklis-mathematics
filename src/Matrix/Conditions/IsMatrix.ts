"use strict";
import { Matrix } from "../index.ts";
import validator from "@euriklis/validator-ts";

/**
 * Utility function for isMatrix method of the Matrix library.
 * Checks if an object is a Matrix instance.
 * @param m - A Matrix instance.
 * @returns - True if "m" is a Matrix
 */
export const IsMatrix = (m: Matrix): boolean => {
  return new validator(m).isArrayOfAbstractArraysWithEqualSize.answer;
};
