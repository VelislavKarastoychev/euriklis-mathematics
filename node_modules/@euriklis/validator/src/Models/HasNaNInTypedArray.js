"use strict";
/**
 * Checks if in the elements of the typed array exists a NaN element.
 * Utility funciton used in the isNumberArray, isIntegerArray etc.
 * 
 * @param { Int8Array | Uint8ClampedArray |  Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array} value
 * @returns {boolean} if all the elements of the array are numbers
 * returns false, otherwise returns true.
 */
export const HasNaNInTypedArray = (value) => {
  const n = value.length;
  let i, j, hasNaN = false;
  for (i = 0; i < n >> 2; i++) {
    j = i << 2;
    if (
      isNaN(value[j]) ||
      isNaN(value[j + 1]) ||
      isNaN(value[j + 2]) ||
      isNaN(value[j + 3])
    ) {
      hasNaN = true;
      break;
    }
  }
  if (!hasNaN) {
    j = i << 2;
    for (; j < n; j++) {
      if (isNaN(value[j])) {
        hasNaN = true;
        break;
      }
    }
  }
  
  return hasNaN;
};
