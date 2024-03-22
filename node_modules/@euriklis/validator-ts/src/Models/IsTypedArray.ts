"use strict";

import { TypedArray } from "../types";

/**
 * Checks if an object has properties typical of TypedArray instances.
 *
 * @param {any | TypedArray} value - The object to check.
 * @returns {boolean} True if the object has TypedArray properties, false otherwise.
 */
export const IsTypedArray = (value: any | TypedArray): boolean =>
  value instanceof Object &&
  "buffer" in value &&
  "byteLength" in value &&
  "byteOffset" in value;
