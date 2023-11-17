"use strict";

import { NumericType, TypedArrayConstructor } from "../types.ts";
/**
 * Creates a TypedArray constructor based on the provided numeric type.
 * @param {NumericType} type - The numeric type.
 * @returns {TypedArrayConstructor} - The TypedArray constructor.
 */
export const CreateTypedArrayConstructor = (
  type: NumericType,
): TypedArrayConstructor => {
  let typedArray: TypedArrayConstructor;
  switch (type) {
    case "int8":
      typedArray = Int8Array;
      break;
    case "unsignedInt8":
      typedArray = Uint8Array;
      break;
    case "int16":
      typedArray = Int16Array;
      break;
    case "unsignedInt16":
      typedArray = Uint16Array;
      break;
    case "int32":
      typedArray = Int32Array;
      break;
    case "unsignedInt32":
      typedArray = Uint32Array;
      break;
    case "float32":
      typedArray = Float32Array;
      break;
    case "float64":
      typedArray = Float64Array;
      break;
  }
  return typedArray;
};
