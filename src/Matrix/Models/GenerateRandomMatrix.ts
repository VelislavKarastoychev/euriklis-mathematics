"use strict";

import { dimensions } from "../../../Benchmark/utils";
import {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
  TypedArrayConstructor,
} from "../types";

/**
 * Generates a matrix with static random numbers.
 * The utility function is generalized in order to
 * creates tensors if dimensions is with length
 * greater than two.
 *
 * @param {Integer[]} dimensions
 * @param {number} from - a real number
 * @param {number} to - a real number
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - the typed array instance.
 * @param {number} seed - a real number
 * @returns {MatrixType | NumericMatrix} (array of typed arrays)
 */
export const GenerateRandomMatrix = (
  dimensions: Integer[],
  from: Integer,
  to: Integer,
  typedArray: TypedArrayConstructor | ArrayConstructor,
  seed: number,
): MatrixType | NumericMatrix => {
  function RandomNumberGenerator(
    t: Integer = 0,
  ): MatrixType | TypedArray | number[] | NumericMatrix {
    const n: Integer = dimensions[t];
    const l: Integer = dimensions.length - 1;
    let rand: TypedArray | number[] | MatrixType | NumericMatrix, k: number;
    if (t === l) {
      let j = n;
      rand = new typedArray(n);
      for (let i = n >> 1; i--;) {
        seed <<= 0;
        k = (seed / 127773) >> 0;
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0;
        if (seed < 0) seed += 2147483647;
        rand[--j] = from + (to - from) * seed * 4.656612875e-10;
        seed <<= 0;
        k = (seed / 127773) >> 0;
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0;
        if (seed < 0) seed += 2147483647;
        rand[--j] = from + (to - from) * seed * 4.656612875e-10;
      }
      if (j) {
        seed <<= 0;
        k = (seed / 127773) >> 0;
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0;
        if (seed < 0) seed += 2147483647;
        rand[--j] = from + (to - from) * seed * 4.656612875e-10;
      }
      return rand as TypedArray;
    } else {
      rand = new Array(n);
      for (let i = n; i--;) {
        rand[i] = RandomNumberGenerator(t + 1) as
          | TypedArray
          | number[];
      }
    }
    return rand;
  }
  return RandomNumberGenerator() as MatrixType | NumericMatrix;
};

/**
 * Generates a random matrix with unique values each time the method is called.
 *
 * @param {Integer[]} dimensions - An array representing the dimensions of the generated matrix.
 * @param {number} from - The lower bound of the random values range.
 * @param {number} to - The upper bound of the random values range.
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - The constructor
 * for the typed array or array to be used for storing the matrix elements.
 * @returns {MatrixType | NumericMatrix} A random matrix with unique values.
 */

export const GenerateUniqueRandomMatrix = (
  dimensions: Integer[],
  from: Integer,
  to: Integer,
  typedArray: TypedArrayConstructor | ArrayConstructor,
): MatrixType | NumericMatrix => {
  function UniqueRandomMatrixGenerator(
    t: Integer = 0,
  ): MatrixType | NumericMatrix | TypedArray | number[] {
    const n = dimensions[t];
    const l = dimensions.length - 1;
    const random = Math.random;
    let i: Integer, rand: number[] | TypedArray | MatrixType | NumericMatrix;
    if (t === l) {
      rand = new typedArray(n);
      for (i = n; i-- > 1;) {
        rand[i--] = from + (to - from) * random();
        rand[i] = from + (to - from) * random();
      }

      if (i === 0) rand[0] = from + (to - from) * random();
    } else {
      rand = Array(n);
      for (i = n; i--;) {
        rand[i] = UniqueRandomMatrixGenerator(t + 1) as TypedArray | number[];
      }
    }

    return rand;
  }
  return UniqueRandomMatrixGenerator() as MatrixType | NumericMatrix;
};

/**
 * Generates a lower triangular matrix with static
 * random numbers.
 * The utility function is generalized in order to
 * creates tensors if dimensions is with length
 * greater than two.
 *
 * @param {Integer[]} dimensions
 * @param {number} from - a real number
 * @param {number} to - a real number
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - the typed array instance.
 * @param {number} seed - a real number
 * @returns {MatrixType | NumericMatrix} (array of typed arrays)
 */
export const GenerateLowerRandomTriangularMatrix = (
  dimensions: Integer[],
  from: number,
  to: number,
  typedArray: TypedArrayConstructor | ArrayConstructor,
  seed: number,
): MatrixType | NumericMatrix => {
  function RandomLowerTriangularMatrixGenerator(
    rowIndex: Integer = 0,
    t: Integer = 0,
  ): MatrixType | NumericMatrix | TypedArray | number[] {
    const n = dimensions[t];
    const l = dimensions.length - 1;
    let rand: MatrixType | NumericMatrix | TypedArray | number[],
      i: Integer,
      k: number;
    if (t === l) {
      rand = new typedArray(n);
      for (i = rowIndex; i > 0;) {
        seed <<= 0;
        k = (seed / 127773) >> 0;
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0;
        if (seed < 0) seed += 2147483647;
        rand[i--] = from + (to - from) * seed * 4.656612875e-10;
        seed <<= 0;
        k = (seed / 127773) >> 0;
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0;
        if (seed < 0) seed += 2147483647;
        rand[i--] = from + (to - from) * seed * 4.656612875e-10;
      }
      if (i === 0) {
        seed <<= 0;
        k = (seed / 127773) >> 0;
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0;
        if (seed < 0) seed += 2147483647;
        rand[0] = from + (to - from) * seed * 4.656612875e-10;
      }

      if (typedArray === Array) {
        for (i = n; i-- > rowIndex + 2;) {
          rand[i--] = 0;
          rand[i] = 0;
        }

        if (i === rowIndex + 1) rand[i] = 0;
      }
    } else {
      rand = Array(n);
      for (i = n; i--;) {
        rand[i] = RandomLowerTriangularMatrixGenerator(
          i,
          t + 1,
        ) as TypedArray | number[];
      }
    }
    return rand;
  }

  return RandomLowerTriangularMatrixGenerator() as
    | MatrixType
    | NumericMatrix;
};

/**
 * Generates an upper triangular matrix with static
 * random numbers.
 * The utility function is generalized in order to
 * creates tensors if dimensions is with length
 * greater than two.
 *
 * @param {Integer[]} dimensions
 * @param {number} from - a real number
 * @param {number} to - a real number
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - the typed array instance.
 * @param {number} seed - a real number
 * @returns {MatrixType | NumericMatrix} (array of typed arrays)
 */

export const GenerateUpperRandomTriangularMatrix = (
  dimensions: Integer[],
  from: Integer,
  to: Integer,
  typedArray: TypedArrayConstructor | ArrayConstructor,
  seed: number,
): MatrixType | NumericMatrix => {
  function RandomUpperTriangularMatrixGenerator(
    rowIndex: Integer = 0,
    t: Integer = 0,
  ): number[] | TypedArray | MatrixType | NumericMatrix {
    const n = dimensions[t];
    const l = dimensions.length - 1;
    let i: Integer,
      k: Integer,
      rand: number[] | TypedArray | MatrixType | NumericMatrix;
    if (t === l) {
      rand = new typedArray(n);
      for (i = n; i-- > rowIndex + 1;) {
        seed <<= 0;
        k = (seed / 127773) >> 0;
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0;
        if (seed < 0) seed += 2147483647;
        rand[i--] = from + (to - from) * seed * 4.656612875e-10;
        seed <<= 0;
        k = (seed / 127773) >> 0;
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0;
        if (seed < 0) seed += 2147483647;
        rand[i] = from + (to - from) * seed * 4.656612875e-10;
      }
      if (i === rowIndex) {
        seed <<= 0;
        k = (seed / 127773) >> 0;
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0;
        if (seed < 0) seed += 2147483647;
        rand[i] = from + (to - from) * seed * 4.656612875e-10;
      }

      if (typedArray === Array) {
        for (i = rowIndex; i-- > 1;) {
          rand[i--] = 0;
          rand[i] = 0;
        }

        if (i === 0) rand[0] = 0;
      }
    } else {
      rand = Array(n);
      for (i = n; i--;) {
        rand[i] = RandomUpperTriangularMatrixGenerator(
          i,
          t + 1,
        ) as TypedArray | number[];
      }
    }
    return rand;
  }

  return RandomUpperTriangularMatrixGenerator() as MatrixType | NumericMatrix;
};

/**
 * Generates a random lower triangular matrix with unique values each time the method is called.
 *
 * @param {Integer[]} dimensions - An array representing the dimensions of the generated matrix.
 * @param {number} from - The lower bound of the random values range.
 * @param {number} to - The upper bound of the random values range.
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - The constructor
 * for the typed array or array to be used for storing the matrix elements.
 * @returns {MatrixType | NumericMatrix} A random matrix with unique values.
 */
export const GenerateUniqueRandomLowerTriangularMatrix = (
  dimensions: Integer[],
  from: number,
  to: number,
  typedArray: TypedArrayConstructor | ArrayConstructor,
): MatrixType | NumericMatrix => {
  function UniqueRandomLowerTriangularMatrixGenerator(
    rowIndex: Integer = 0,
    t: Integer = 0,
  ) {
    const n = dimensions[t];
    const l = dimensions.length - 1;
    const random = Math.random;
    let i: Integer, rand: number[] | TypedArray | MatrixType | NumericMatrix;
    if (t === l) {
      rand = new typedArray(n);
      for (i = rowIndex; i > 0;) {
        rand[i--] = from + random() * (to - from);
        rand[i--] = from + random() * (to - from);
      }
      if (i === 0) rand[0] = from + random() * (to - from);
      if (typedArray === Array) {
        for (i = n; i-- > rowIndex + 2;) {
          rand[i--] = 0;
          rand[i] = 0;
        }

        if (i === rowIndex + 1) rand[i] = 0;
      }
    } else {
      rand = Array(n);
      for (i = n; i--;) {
        rand[i] = UniqueRandomLowerTriangularMatrixGenerator(i, t + 1) as
          | TypedArray
          | number[];
      }
    }
    
    return rand;
  }
  return UniqueRandomLowerTriangularMatrixGenerator() as
    | MatrixType
    | NumericMatrix;
};

/**
 * Generates a random upper triangular matrix with unique values each time the method is called.
 *
 * @param {Integer[]} dimensions - An array representing the dimensions of the generated matrix.
 * @param {number} from - The lower bound of the random values range.
 * @param {number} to - The upper bound of the random values range.
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - The constructor
 * for the typed array or array to be used for storing the matrix elements.
 * @returns {MatrixType | NumericMatrix} A random matrix with unique values.
 */
export const GenerateUniqueRandomUpperTriangularMatrix = (
  dimensions: Integer[],
  from: number,
  to: number,
  typedArray: TypedArrayConstructor | ArrayConstructor,
): MatrixType | NumericMatrix => {
  function UniqueRandomUpperTriangularMatrix(
    rowIndex: Integer = 0,
    t: Integer = 0,
  ) {
    const n = dimensions[t];
    const l = dimensions.length - 1;
    const random = Math.random;
    let i: Integer, rand: number[] | TypedArray | MatrixType | NumericMatrix;
    if (t === l) {
      rand = new typedArray(n);
      for (i = n; i-- > rowIndex + 1;) {
        rand[i--] = from + (to - from) * random();
        rand[i] = from + (to - from) * random();
      }

      if (i === rowIndex) rand[i] = from + (to - from) * random();
      if (typedArray === Array) {
        for (i = rowIndex; i-- > 1;) {
          rand[i--] = 0;
          rand[i] = 0;
        }

        if (i === 0) rand[0] = 0;
      }
    } else {
      rand = Array(n);
      for (i = n; i--;) {
        rand[i] = UniqueRandomUpperTriangularMatrix(i, t + 1) as
          | TypedArray
          | number[];
      }
    }

    return rand;
  }

  return UniqueRandomUpperTriangularMatrix() as MatrixType | NumericMatrix;
};
