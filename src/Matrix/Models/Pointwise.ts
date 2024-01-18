"use strict";

import {
  BinaryOperator,
  BinaryPointwiseOperator,
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArrayConstructor,
} from "../types";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";

/**
 * Generates the JavaScript binary operator expression based on the binary pointwise operator.
 *
 * @param {BinaryPointwiseOperator} action - The binary pointwise operator.
 * @returns {BinaryOperator} The JavaScript binary operator expression.
 */
const BinaryPointwiseExpression = (action: BinaryPointwiseOperator) => {
  switch (action) {
    case "gt":
      return ">";
    case "geq":
      return ">=";
    case "lt":
      return "<";
    case "leq":
      return "<=";
    case "eq":
      return "==";
    case "neq":
      return "!=";
    case "and":
      return "&";
    case "or":
      return "|";
    case "xor":
      return "^";
    case "leftShiftBy":
      return "<<";
    case "rightShiftBy":
      return ">>";
    case "Hadamard":
      return "*";
    case "divide":
      return "/";
    case "modulus":
      return "%";
    case "minus":
      return "-";
    case "plus":
      return "+";
    case "power":
      return "**";
  }
};

/**
 * Applies recursively a binary pointwise
 * operator between two matrices or a matrix and a scalar.
 *
 * @param {MatrixType | NumericType} m1 - The matrix instance data.
 * @param {number | MatrixType | NumericMatrix} m2 - The second matrix or scalar.
 * @param {BinaryOperator} operator - The binary operator to apply.
 * @param {TypedArrayConstructor} typedArray - The constructor for the typed array.
 * @returns {MatrixType} The result of applying the binary pointwise operator.
 */
const BinaryPointwiseIterator = (
  m1: MatrixType | NumericType,
  m2: number | MatrixType | NumericMatrix,
  operator: BinaryOperator,
  typedArray: TypedArrayConstructor,
): MatrixType => {
  return new Function(
    "a",
    "b",
    `
    const binaryPointwise = (a, b, it = false) => {
      const n = a.length;
      let i, c;
      if (it) {
        c = new ${typedArray.name}(n);
        if (typeof b === "number") {
          for (i = n;i-- > 1;) {
            c[i] = a[i--] ${operator} b;
            c[i] = a[i] ${operator} b;
          }
          if (i === 0) c[i] = a[i] ${operator} b;
        } else {
          for (i = n;i-- > 1;) {
            c[i] = a[i] ${operator} b[i--];
            c[i] = a[i] ${operator} b[i];
          }
          if (i === 0) c[0] = a[0] ${operator} b[0]
        }
      } else {
        c = new Array(n);
        if (typeof b === "number") {
          for (i = n;i--;) c[i] = binaryPointwise(a[i], b, !it);
        } else {
          for (i = n;i--;) c[i] = binaryPointwise(a[i], b[i], !it);
        }
      }
      return c;
    }
    return binaryPointwise(a, b);
    `,
  )(m1, m2);
};

/**
 * Applies a binary pointwise operator
 * between two matrices or a matrix and a scalar.
 *
 * @param {MatrixType} m1 - The  matrix instance.
 * @param {number | MatrixType | NumericMatrix} m2 - The second matrix or scalar.
 * @param {BinaryPointwiseOperator} action - The binary pointwise operator to apply.
 * @param {NumericType} type - The numeric type of the result matrix.
 * @returns {MatrixType} The result of applying the binary pointwise operator.
 */
export const BinaryPointwise = (
  m1: MatrixType,
  m2: number | MatrixType | NumericMatrix,
  action: BinaryPointwiseOperator,
  type: NumericType,
): MatrixType => {
  const typedArray: TypedArrayConstructor = CreateTypedArrayConstructor(type);
  const operator = BinaryPointwiseExpression(action);
  return BinaryPointwiseIterator(m1, m2, operator, typedArray);
};
