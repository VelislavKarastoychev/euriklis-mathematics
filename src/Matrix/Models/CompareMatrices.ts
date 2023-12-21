"use strict";

import {
  ComparisonOperator,
  ComparisonParameter,
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
} from "../types";

/**
 * Obtains the JavaScript comparison operator
 * corresponding to the given string parameter.
 *
 * @param {ComparisonParameter} operator - The
 * comparison operator string
 * ('eq', 'leq', 'lt', 'gt', 'geq', 'neq').
 * @returns {ComparisonOperator} The JavaScript
 * comparison operator.
 *
 * @example
 * const obtainedOperator = ObtainOperator('eq'); // Output: '==='
 */
const ObtainOperator = (
  operator: ComparisonParameter,
): ComparisonOperator => {
  switch (operator) {
    case "eq":
      return "===";
    case "leq":
      return "<=";
    case "lt":
      return "<";
    case "gt":
      return ">";
    case "geq":
      return ">=";
    case "neq":
      return "!==";
    default:
      return "===";
  }
};

/**
 * Recursive iterator function for element-wise
 * comparison of matrices using the specified
 * comparison operator.
 *
 * @param {MatrixType | NumericMatrix | TypedArray} a - The
 * first matrix or array for comparison.
 * @param {MatrixType | NumericMatrix | TypedArray} b - The
 * second matrix or array for comparison.
 * @param {ComparisonOperator} operator - The
 * JavaScript comparison operator
 * ('===', '<=', '<', '>', '>=', '!==').
 * @param {Integer} [it=0] - Iterator parameter
 * for recursive calls.
 * @returns {boolean} True if the matrices
 * or arrays satisfy the specified comparison,
 * false otherwise.
 *
 * @example
 * const matrixA = [[1, 2], [3, 4]];
 * const matrixB = [[1, 2], [3, 4]];
 * const matrixC = [[1, 2], [3, 5]];
 *
 * console.log(CompareMatricesIterator(matrixA, matrixB, '===')); // Output: true
 * console.log(CompareMatricesIterator(matrixA, matrixC, '===')); // Output: false
 */
const CompareMatricesIterator = (
  a: MatrixType | NumericMatrix | TypedArray,
  b: MatrixType | NumericMatrix | TypedArray,
  operator: ComparisonOperator,
  it: Integer = 0,
): boolean => {
  const compare = Function(
    "a,b",
    `const n = a.length;
       let i;
       for(i = 0;i < n >> 2;i++) {
         j = i << 2;
         if (
           !(a[j] ${operator} b[j]) || 
           !(a[j + 1] ${operator} b[j + 1]) ||
           !(a[j + 2] ${operator} b[j + 2]) ||
           !(a[j + 3] ${operator} b[j + 3])
         ) return false;
       }
       
       for (j = i << 2;j < n;j++) {
         if (!(a[j] ${operator} b[j])) return false;    
       }
      
       return true;
      `,
  );
  let answer: boolean = true;
  let j: Integer;
  if (!it) {
    const n = a.length;
    for (j = n; j--;) {
      answer = CompareMatricesIterator(
        a[j] as TypedArray,
        b[j] as TypedArray,
        operator,
        it + 1,
      );
      if (!answer) return answer;
    }

    return answer;
  } else return compare(a, b);
};

/**
 * Compares two matrices element-wise
 * using the specified comparison operator.
 *
 * @param {MatrixType | NumericMatrix} a - The
 * first matrix for comparison.
 * @param {MatrixType | NumericMatrix} b - The
 * second matrix for comparison.
 * @param {ComparisonParameter} operator - The
 * comparison operator
 * ('eq', 'leq', 'lt', 'gt', 'geq', 'neq').
 * @returns {boolean} True if the matrices
 * satisfy the specified comparison, false otherwise.
 *
 * @example
 * const matrixA = [[1, 2], [3, 4]];
 * const matrixB = [[1, 2], [3, 4]];
 * const matrixC = [[1, 2], [3, 5]];
 *
 * console.log(CompareMatrices(matrixA, matrixB, 'eq')); // Output: true
 * console.log(CompareMatrices(matrixA, matrixC, 'eq')); // Output: false
 */
export const CompareMatrices = (
  a: MatrixType | NumericMatrix,
  b: MatrixType | NumericMatrix,
  operator: ComparisonParameter,
): boolean => {
  const obtainedOperator = ObtainOperator(operator);
  return CompareMatricesIterator(a, b, obtainedOperator);
};
