"use strict";

import {
  ArithmeticOperatorSymbol,
  Integer,
  MatrixType,
  NumericMatrix,
  NumericType,
  VectorToMatrixOperation,
} from "../types";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor";

const arithmeticalOperationsForColVectorByRowAxis = (
  operator: ArithmeticOperatorSymbol,
) => ({
  init: "",
  rowInit: "const accum = new Array(n);",
  colInit: "const accum1 = new typedArray(n), vi = v[row][0];",
  rowSetup: "accum[i] = ai;",
  colSetup: `accum1[i] = aij ${operator} vi;`,
  rowAccumulator: "return accum;",
  colAccumulator: "return accum1;",
});

const arithmeticalOperationsForRowVectorByRowAxis = (
  operator: ArithmeticOperatorSymbol,
) => ({
  init: "",
  rowInit: "v = v[0];const accum = new Array(n);",
  colInit: "const accum1 = new typedArray(n), vi = v[row];",
  rowSetup: "accum[i] = ai;",
  colSetup: `accum1[i] = aij ${operator} vi;`,
  rowAccumulator: "return accum;",
  colAccumulator: "return accum1;",
});

const arithmeticalOperationsForRowVectorByColAxis = (
  operator: ArithmeticOperatorSymbol,
) => ({
  init: "",
  rowInit: "v = v[0];const accum = new Array(n);",
  colInit: "const accum1 = new typedArray(n)",
  rowSetup: "accum[i] = ai;",
  colSetup: `accum1[i] = aij ${operator} v[i];`,
  rowAccumulator: "return accum;",
  colAccumulator: "return accum1;",
});

const arithmeticalOperationsForColVectorByColAxis = (
  operator: ArithmeticOperatorSymbol
) => ({
  init: "",
  rowInit: "const accum = new Array(n);",
  colInit: "const accum1 = new typedArray(n)",
  rowSetup: "accum[i] = ai;",
  colSetup: `accum1[i] = aij ${operator} v[i][0];`,
  rowAccumulator: "return accum;",
  colAccumulator: "return accum1;",
})
const GenerateVectorToMatrixExpressions = (
  operation: VectorToMatrixOperation,
): {
  init: string;
  rowInit: string;
  colInit: string;
  rowSetup: string;
  colSetup: string;
  rowAccumulator: string;
  colAccumulator: string;
} => {
  switch (operation) {
    case "addRowVectorToMatrixByRowAxis":
      return arithmeticalOperationsForRowVectorByRowAxis("+");
    case "addColVectorToMatrixByRowAxis":
      return arithmeticalOperationsForColVectorByRowAxis("+");
    case "addRowVectorToMatrixByColAxis":
      return arithmeticalOperationsForRowVectorByColAxis("+");
    case "addColVectorToMatrixByColAxis":
      return arithmeticalOperationsForColVectorByColAxis("+");
    case "subtractRowVectorFromMatrixByRowAxis":
      return arithmeticalOperationsForRowVectorByRowAxis("-");
    case "subtractColVectorFromMatrixByRowAxis":
      return arithmeticalOperationsForColVectorByRowAxis("-");
    case "subtractRowVectorFromMatrixByColAxis":
      return arithmeticalOperationsForRowVectorByColAxis("-");
    case "subtractColVectorFromMatrixByColAxis":
      return arithmeticalOperationsForColVectorByColAxis("-");
    case "multiplyRowVectorToMatrixByRowAxis":
      return arithmeticalOperationsForRowVectorByRowAxis("*");
    case "multiplyColVectorToMatrixByRowAxis":
      return arithmeticalOperationsForColVectorByRowAxis("*");
    case "multiplyRowVectorToMatrixByColAxis":
      return arithmeticalOperationsForRowVectorByColAxis("*");
    case "multiplyColVectorToMatrixByColAxis":
      return arithmeticalOperationsForColVectorByColAxis("*");
    case "divideRowVectorToMatrixByRowAxis":
      return arithmeticalOperationsForRowVectorByRowAxis("/");
    case "divideColVectorToMatrixByRowAxis":
      return arithmeticalOperationsForColVectorByRowAxis("/");
    case "divideRowVectorToMatrixByColAxis":
      return arithmeticalOperationsForRowVectorByColAxis("/");
    case "divideColVectorToMatrixByColAxis":
      return arithmeticalOperationsForColVectorByColAxis("/");
  }
};

const ExecuteVectorOperationToMatrix = (
  a: MatrixType | NumericMatrix,
  v: MatrixType | NumericMatrix,
  type: NumericType,
  dim: Integer[],
  init: string,
  rowInit: string,
  colInit: string,
  rowSetup: string,
  colSetup: string,
  rowAccumulator: string,
  colAccumulator: string,
): MatrixType | NumericMatrix => {
  const typedArray = CreateTypedArrayConstructor(type);
  return Function(
    "a",
    "v",
    "typedArray",
    `
    function ExecuteVectorOperationToMatrixIterator(a, v, typedArray, row, it = 0) {
      const dim = ${JSON.stringify(dim)};
      const n = a.length;
      let i, ai, aij, vi;
      ${init}
      if (it === dim.length - 1) {
        ${colInit}
        for (i = n;i-- > 1;) {
          aij = a[i];
          ${colSetup}
        }
        if (i === 0) {
          aij = a[i];
          ${colSetup}
        }
        ${colAccumulator};
      } else {
        ${rowInit}
        for (i = n;i--;) {
          ai = ExecuteVectorOperationToMatrixIterator(a[i], v, typedArray, i, it + 1);
          ${rowSetup}
        }
        ${rowAccumulator}
      }
    }
    return ExecuteVectorOperationToMatrixIterator(a, v, typedArray = ${typedArray.name});
    `,
  )(a, v, typedArray);
};

export const ApplyVectorOperationToMatrix = (
  a: MatrixType | NumericMatrix,
  v: MatrixType | NumericMatrix,
  type: NumericType,
  dim: Integer[],
  operation: VectorToMatrixOperation,
): MatrixType | NumericMatrix => {
  const {
    init,
    rowInit,
    colInit,
    rowSetup,
    colSetup,
    rowAccumulator,
    colAccumulator,
  } = GenerateVectorToMatrixExpressions(operation);
  return ExecuteVectorOperationToMatrix(
    a,
    v,
    type,
    dim,
    init,
    rowInit,
    colInit,
    rowSetup,
    colSetup,
    rowAccumulator,
    colAccumulator,
  );
};
