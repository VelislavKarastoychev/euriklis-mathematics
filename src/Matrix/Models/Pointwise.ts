"use strict";

import {
  BinaryOperator,
  BinaryPointwiseOperator,
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArrayConstructor,
  UnaryPointwiseOperator,
} from "../types";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";

/**
 * Generates the JavaScript binary operator expression based on the binary pointwise operator.
 *
 * @param {BinaryPointwiseOperator} action - The binary pointwise operator.
 * @returns {BinaryOperator} The JavaScript binary operator expression.
 */
const BinaryPointwiseExpression = (
  action: BinaryPointwiseOperator,
): BinaryOperator => {
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
      return "&&";
    case "band":
      return "&";
    case "or":
      return "||";
    case "bor":
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

const UnaryPointwiseExpression = (action: UnaryPointwiseOperator): string => {
  switch (action) {
    case "neg":
      return "-";
    case "bneg":
      return "~";
    case "sin":
      return "Math.sin";
    case "cos":
      return "Math.cos";
    case "tg":
      return "Math.tan";
    case "cotg":
      return "Math.cotan";
    case "exp":
      return "Math.exp";
    case "sinh":
      return "Math.sinh";
    case "cosh":
      return "Math.cosh";
    case "tanh":
      return "Math.tanh";
    case "cotanh":
      return "Math.cotanh";
    case "arcsin":
      return "Math.asin";
    case "arccos":
      return "Math.acos";
    case "atan":
      return "Math.atan";
    case "acotan":
      return "Math.acotan";
    case "abs":
      return "Math.abs";
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

const UnaryPointwiseIterator = (
  matrix: MatrixType | NumericMatrix,
  operator: string,
  typedArray: TypedArrayConstructor,
): MatrixType =>
  new Function(
    "matrix",
    `
    const unaryPointwise = (a, it = false) => {
      const n = a.length;
      let i, j, out;
      if (it) {
        out = new ${typedArray.name}(n);
        for (i = n;i-- > 1;) {
          out[i] = ${operator}(a[i--]);
          out[i] = ${operator}(a[i]);
        }
        
        if (i === 0) out[0] = ${operator}(a[0]);
       } else {
        out = new Array(n);
        for (i = n;i--;) out[i] = unaryPointwise(a[i], !it);
      }
      
      return out;
    }
    return unaryPointwise(matrix);
    `,
  )(matrix, operator, typedArray);

export const UnaryPointwise = (
  matrix: MatrixType | NumericMatrix,
  action: UnaryPointwiseOperator,
  type: NumericType,
): MatrixType => {
  const typedArray: TypedArrayConstructor = CreateTypedArrayConstructor(type);
  const operator = UnaryPointwiseExpression(action);

  return UnaryPointwiseIterator(matrix, operator, typedArray);
};
