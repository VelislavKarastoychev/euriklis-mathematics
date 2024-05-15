"use strict";
import type { MatrixReducer, MatrixType, NumericMatrix, TypedArray } from "../types";

/**
 * Generates the accumulator expressions and initialization code
 * based on the specified matrix reducer type.
 *
 * @param {MatrixReducer} reducer - The type of matrix reducer.
 * @returns {{
 *   columnAccumulator: string;
 *   rowAccumulator: string;
 *   init: string;
 *   f: Function;
 * }} The accumulator expressions and initialization code.
 */
const ReducerExpression = (
  reducer: MatrixReducer,
): {
  columnAccumulator: string;
  rowAccumulator: string;
  init: string;
  f: Function;
} => {
  switch (reducer) {
    case "inf":
      return {
        rowAccumulator: "accum = min(accum, ai);",
        columnAccumulator: "accum = min(accum, aij);",
        init: "const min = Math.min;let accum = 0;",
        f: MatrixReduceRowIterator,
      };
    case "sup":
      return {
        rowAccumulator: "accum = max(accum, ai);",
        columnAccumulator: "accum = max(accum, aij);",
        init: "const max = Math.max;let accum = -Infinity;",
        f: MatrixReduceRowIterator,
      };
    case "square":
      return {
        rowAccumulator: "accum += ai;",
        columnAccumulator: "accum += aij * aij;",
        init: "let accum = 0;",
        f: MatrixReduceRowIterator,
      };
    case "cube":
      return {
        rowAccumulator: "accum += ai;",
        columnAccumulator: "accum += aij * aij * aij;",
        init: "let accum = 0;",
        f: MatrixReduceRowIterator,
      };
    case "norm1":
      return {
        rowAccumulator: "accum += abs(aij);",
        columnAccumulator: "accum = max(accum, ai);",
        init: "const abs = Math.abs, max = Math.max;let accum = 0;",
        f: MatrixReduceColumnIterator,
      };
    case "maxNorm":
      return {
        rowAccumulator: "accum = max(accum, abs(ai));",
        columnAccumulator: "accum = max(accum, abs(aij))",
        init: "const max = Math.max, abs = Math.abs;let accum = 0;",
        f: MatrixReduceRowIterator,
      };
    case "infNorm":
      return {
        rowAccumulator: "accum = max(accum, abs(ai));",
        columnAccumulator: "accum += abs(aij);",
        init: "const max = Math.max, abs = Math.abs;let accum = 0;",
        f: MatrixReduceRowIterator,
      };
    case "any":
      return {
        rowAccumulator: "if (ai) return true;",
        columnAccumulator: "if (aij) return true;",
        init: "let accum = false;",
        f: MatrixReduceRowIterator,
      };
    case "all":
      return {
        rowAccumulator: "if (!ai) return false;",
        columnAccumulator: "if (!aij) return false;",
        init: "let accum = true;",
        f: MatrixReduceRowIterator,
      };
    case "sum":
      return {
        rowAccumulator: "accum += ai;",
        columnAccumulator: "accum += aij;",
        init: "let accum = 0;",
        f: MatrixReduceRowIterator,
      };
    case "product":
      return {
        rowAccumulator: "accum *= ai;",
        columnAccumulator: "accum *= aij;",
        init: "let accum = 1;",
        f: MatrixReduceRowIterator,
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
const MatrixReduceRowIterator = (
  matrix: MatrixType | NumericMatrix | number[] | TypedArray,
  rowAccumulator: string,
  columnAccumulator: string,
  init: string,
  it: boolean = false,
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
          ai = reduceIterator(a[i], !it);
          ${rowAccumulator}
        }
       }
       return accum;
     }
     return reduceIterator(a, ${it});
    `,
  )(matrix);

/**
 * Performs matrix reduction based on the specified reducer expressions
 * through the columns of the matrix.
 *
 * @param {MatrixType | NumericMatrix} matrix - The input matrix.
 * @param {string} rowAccumulator - The row accumulator expression.
 * @param {string} columnAccumulator - The column accumulator expression.
 * @param {string} init - The initialization code.
 * @param {boolean} it - Iteration indicator.
 * @returns {number} The result of the matrix reduction.
 */
const MatrixReduceColumnIterator = (
  matrix: MatrixType | NumericMatrix,
  rowAccumulator: string,
  columnAccumulator: string,
  init: string,
  it: boolean = false,
): number =>
  new Function(
    "a",
    `const reduceIterator = (a, col, it) => {
       const n = a.length;
       ${init};
       let ai, aij, i, j;
       if (it){
         for (j = 0;j < n >> 2;j++) {
           i = j << 2;
           aij = a[i][col];
           ${rowAccumulator}
           aij = a[i + 1][col];
           ${rowAccumulator} 
           aij = a[i + 2][col];   
           ${rowAccumulator} 
           aij = a[i + 3][col];
           ${rowAccumulator}
         }
         for (i = j << 2;i < n;i++) {
           aij = a[i][col];
           ${rowAccumulator}
         }
       } else {
         for (let i = a[0].length;i--;) {
           ai = reduceIterator(a, i, !it);
           ${columnAccumulator}
         }
       }

       return accum;
    }
    
    return reduceIterator(a, -1,${it});
    `,
  )(matrix);

/**
 * Performs matrix reduction based on the specified reducer type
 * through the rows of the matrix.
 *
 * @param {MatrixType | NumericMatrix} matrix - The input matrix.
 * @param {MatrixReducer} reducer - The type of matrix reducer.
 * @returns {number} The result of the matrix reduction.
 */
export const MatrixReduce = (
  matrix: MatrixType | NumericMatrix,
  reducer: MatrixReducer,
): number => {
  const { columnAccumulator, rowAccumulator, init, f } = ReducerExpression(
    reducer,
  );
  return f(
    matrix,
    rowAccumulator,
    columnAccumulator,
    init,
  );
};
