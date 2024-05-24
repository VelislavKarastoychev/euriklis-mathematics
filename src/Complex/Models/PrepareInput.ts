"use strict";
import { Complex } from "..";
/**
 * This utility function sets the
 * z1 and z2 input parameters to
 * the values of the a and b instead
 * of the type of a and b.
 */
export const PrepareInput = (
  a: Complex | number | undefined,
  b: number | undefined,
  z1: number,
  z2: number,
): [number, number] => {
  const typeofa = a instanceof Complex
    ? "Complex"
    : typeof a === "number"
    ? "number"
    : typeof a === "undefined"
    ? "undefined"
    : "error";
  const typeofb = typeof b === "number"
    ? "number"
    : typeof b === "undefined"
    ? "undefined"
    : "error";
  if (typeofa === "error" || typeofb === "error") {
    throw new Error("Incorrect input.");
  }
  if (typeofa === "Complex") {
    z1 = (a as Complex).Re;
    z2 = (a as Complex).Im;
  } else {
    if (typeofa === "number") z1 = a as number;
    if (typeofb === "number") z2 = b as number;
  }
  return [z1, z2];
};
