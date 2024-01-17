"use strict";

import {
  BinaryOperator,
  BinaryPointwiseOperator,
  Integer,
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArrayConstructor,
} from "../types";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor.ts";

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
      return "===";
    case "neq":
      return "!==";
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
    case "minus":
      return "-";
    case "plus":
      return "+";
    case "power":
      return "**";
  }
};

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
      let i, j, c;
      if (it) {
        c = new ${typedArray.name}(n);
        if (typeof b === "number") {
            for (i = 0;i < n >> 2;i++) {
            j = i << 2;
            c[j] = a[j] ${operator} b;
            c[j + 1] = a[j + 1] ${operator} b;
            c[j + 2] = a[j + 2] ${operator} b;
            c[j + 3] = a[j + 3] ${operator} b;
          }
          for (j = i << 2;j < n;j++) { 
            c[j] = a[j] ${operator} b;
          }
        } else {
          for (i = 0;i < n >> 2;i++) {
            j = i << 2;
            c[j] = a[j] ${operator} b[j];
            c[j + 1] = a[j + 1] ${operator} b[j + 1];
            c[j + 2] = a[j + 2] ${operator} b[j + 2];
            c[j + 3] = a[j + 3] ${operator} b[j + 3];
          }
          for (j = i << 2;j < n;j++) { 
            c[j] = a[j] ${operator} b[j];
          }
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
