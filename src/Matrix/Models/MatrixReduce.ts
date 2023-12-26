"use strict";
import { MatrixReducer, MatrixType, NumericMatrix, TypedArray } from "../types";
/**
 * Generates the accumulator expressions and initialization code
 * based on the specified matrix reducer type.
 *
 * @param {MatrixReducer} reducer - The type of matrix reducer.
 * @returns {{
 *   columnAccumulator: string,
 *   rowAccumulator: string,
 *   init: string
 * }} The accumulator expressions and initialization code.
 */
const ReducerExpression = (
  reducer: MatrixReducer,
): { columnAccumulator: string; rowAccumulator: string; init: string } => {
  switch (reducer) {
    case "inf":
      return {
        rowAccumulator: "accum = min(accum, ai);",
        columnAccumulator: "accum = min(accum, aij);",
        init: "const min = Math.min;let accum = 0;",
      };
    case "sup":
      return {
        rowAccumulator: "accum = max(accum, ai);",
        columnAccumulator: "accum = max(accum, aij);",
        init: "const max = Math.max;let accum = -Infinity;",
      };
    case "square":
      return {
        rowAccumulator: "accum += ai;",
        columnAccumulator: "accum += aij * aij;",
        init: "let accum = 0;",
      };
    case "cube":
      return {
        rowAccumulator: "accum += ai;",
        columnAccumulator: "accum += aij * aij * aij;",
        init: "let accum = 0;",
      };
    case "norm1":
      return {
        rowAccumulator: "accum += ai;",
        columnAccumulator: "accum += abs(aij);",
        init: "const abs = Math.abs;let accum = 0;",
      };
    case "infNorm":
      return {
        rowAccumulator: "accum = max(accum, abs(ai));",
        columnAccumulator: "accum = max(accum, abs(aij));",
        init: "const max = Math.max, abs = Math.abs;let accum = 0;",
      };
    case "any":
      return {
        rowAccumulator: "if (ai) return true;",
        columnAccumulator: "if (aij) return true;",
        init: "let accum = false;",
      };
    case "all":
      return {
        rowAccumulator: "if (!ai) return false;",
        columnAccumulator: "if (!aij) return false;",
        init: "let accum = true;",
      };
    case "sum":
      return {
        rowAccumulator: "accum += ai;",
        columnAccumulator: "accum += aij;",
        init: "let accum = 0;",
      };
    case "product":
      return {
        rowAccumulator: "accum *= ai;",
        columnAccumulator: "accum *= aij;",
        init: "let accum = 1;",
      };
  }
};
/**
 * Performs matrix reduction based on the specified reducer expressions.
 *
 * @param {MatrixType | NumericMatrix | number[] | TypedArray} matrix - The input matrix.
 * @param {string} rowAccumulator - The row accumulator expression.
 * @param {string} columnAccumulator - The column accumulator expression.
 * @param {string} init - The initialization code.
 * @returns {number} The result of the matrix reduction.
 */
const MatrixReduceIterator = (
  matrix: MatrixType | NumericMatrix | number[] | TypedArray,
  rowAccumulator: string,
  columnAccumulator: string,
  init: string,
): number =>
  Function(
    "a",
    `
    const reduceIterator = (a, it) => {
      const n = a.length;
      ${init}
      let ai, aij, i, j;
      if (it) {
        for (j = 0;j < n >> 2;j++) {
          i =  j << 2;
          aij = a[i];
          ${columnAccumulator}
          aij = a[i + 1];
          ${columnAccumulator}
          aij = a[i + 2];
          ${columnAccumulator}
          aij = a[i + 3];
          ${columnAccumulator}
       }
       for (i = j << 2;i < n;i++) {
         aij = a[i];
         ${columnAccumulator}
       }
       
      } else {
        for (i = n;i--;) {
          ai = reduceIterator(a[i], it + 1);
          ${rowAccumulator}
        }
       }
       return accum;
     }
     return reduceIterator(a, 0);
    `,
  )(matrix);

/**
 * Performs matrix reduction based on the specified reducer type.
 *
 * @param {MatrixType | NumericMatrix} matrix - The input matrix.
 * @param {MatrixReducer} reducer - The type of matrix reducer.
 * @returns {number} The result of the matrix reduction.
 */
export const MatrixReduce = (
  matrix: MatrixType | NumericMatrix,
  reducer: MatrixReducer,
): number => {
  const { columnAccumulator, rowAccumulator, init } = ReducerExpression(
    reducer,
  );
  return MatrixReduceIterator(matrix, rowAccumulator, columnAccumulator, init);
};
