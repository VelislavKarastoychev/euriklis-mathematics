"use strict";

import type { NumericType, TypedArrayConstructor } from "../../Types";
/**
 * Creates a TypedArray constructor based on the provided numeric type.
 * @param {NumericType} type - The numeric type.
 * @returns {TypedArrayConstructor | ArrayConstructor} - The TypedArray constructor.
 */
export const CreateTypedArrayConstructor = (
  type: NumericType,
): TypedArrayConstructor | ArrayConstructor => {
  switch (type) {
    case "int8":
      return Int8Array;
    case "unsignedInt8":
      return Uint8Array;
    case "int16":
      return Int16Array;
    case "unsignedInt16":
      return Uint16Array;
    case "int32":
      return Int32Array;
    case "unsignedInt32":
      return Uint32Array;
    case "float32":
      return Float32Array;
    case "float64":
      return Float64Array;
    case "generic":
      return Array;
  }
};
