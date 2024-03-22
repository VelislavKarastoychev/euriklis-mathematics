"use strict";

import {
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArrayConstructor,
} from "../types";
import { ComputeDimensions } from "./ComputeDimensions";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor";

const GenerateMapReduceExpression = (mapReduceExpression: string): {
  init: string;
  rowInit: string;
  colInit: string;
  rowAccumulator: string;
  colAccumulator: string;
  rowSetup: string;
  colSetup: string;
} => {
  switch (mapReduceExpression) {
    case "rowSumAsRow":
      return {
        init: "let accum, accum1 = 0;",
        rowInit: "accum = new typedArray(n)",
        colInit: "",
        rowAccumulator: "return [accum];",
        colAccumulator: "return accum1;",
        rowSetup: "accum[i] = ai;",
        colSetup: "accum1 += aij;",
      };
    case "rowSumAsColumn":
      return {
        init: "let accum = [], accum1 = 0;",
        rowInit: "",
        colInit: "",
        rowAccumulator: "return accum;",
        colAccumulator: "return accum1;",
        rowSetup: "accum[i] = new typedArray([ai]);",
        colSetup: "accum1 += aij;",
      };
    case "rowSumNoDiagAsRow":
      return {
        init: "let accum, accum1 = 0;",
        rowInit: "accum = new typedArray(n);",
        colInit: "",
        rowAccumulator: "return [accum];",
        colAccumulator: "return accum1;",
        rowSetup: "accum[i] = ai;",
        colSetup: "accum1 += (i !== row) * aij;",
      };
    case "rowSumNoDiagAsColumn":
      return {
        init: "let accum = [], accum1 = 0;",
        rowInit: "",
        colInit: "",
        rowAccumulator: "return accum;",
        colAccumulator: "return accum1;",
        rowSetup: "accum[i] = new typedArray([ai]);",
        colSetup: "accum1 += (i !== row) * aij;",
      };
    case "colSumAsRow":
      return {
        init: `
        const add = (a, b) => {
          if(a){
            let i;
            const k = b.length;
            for (i = k;i-- > 1;) {
              b[i] += a[i--];
              b[i] += a[i];
            }
            if (i === 0) b[0] += a[0];
          }           
          return b;
        }
        `,
        rowInit: "let accum;",
        colInit: "let accum1 = new typedArray(n);",
        rowAccumulator: "return [accum];",
        colAccumulator: "return accum1;",
        rowSetup: "accum = add(accum, ai);",
        colSetup: "accum1[i] = aij;",
      };
    case "colSumAsColumn":
      return {
        init: `
        const add = (a, b) => {
          if(a){
            let i;
            const k = b.length;
            for (i = k;i-- > 1;) {
              b[i] += a[i--];
              b[i] += a[i];
            }
            if (i === 0) b[0] += a[0];
          }           
          return b;
        }
        `,
        rowInit: "let accum;",
        colInit: "let accum1 = new typedArray(n);",
        rowAccumulator:
          "for (i = accum.length;i--;)accum[i] = [accum[i]];return accum;",
        colAccumulator: "return accum1;",
        rowSetup: "accum = add(accum, ai);",
        colSetup: "accum1[i] = aij;",
      };
    case "colSumNoDiagAsRow":
      return {
        init: `
        const add = (a, b) => {
          if(a){
            let i;
            const k = b.length;
            for (i = k;i-- > 1;) {
              b[i] += a[i--];
              b[i] += a[i];
            }
            if (i === 0) b[0] += a[0];
          }           
          return b;
        }
        `,
        rowInit: "let accum;",
        colInit: "let accum1 = new typedArray(n);",
        rowAccumulator: "return [accum];",
        colAccumulator: "return accum1;",
        rowSetup: "accum = add(accum, ai);",
        colSetup: "accum1[i] = (i !== row) * aij;",
      };
    case "colSumNoDiagAsColumn":
      return {
        init: `
        const add = (a, b) => {
          if(a){
            let i;
            const k = b.length;
            for (i = k;i-- > 1;) {
              b[i] += a[i--];
              b[i] += a[i];
            }
            if (i === 0) b[0] += a[0];
          }           
          return b;
        }
        `,
        rowInit: "let accum;",
        colInit: "let accum1 = new typedArray(n);",
        rowAccumulator:
          "for (i = accum.length;i--;)accum[i] = [accum[i]];return accum;",
        colAccumulator: "return accum1;",
        rowSetup: "accum = add(accum, ai);",
        colSetup: "accum1[i] = (i !== row) * aij;",
      };
  }
};

const ExecuteMatrixMapReduce = (
  a: MatrixType | NumericMatrix,
  typedArray: TypedArrayConstructor | ArrayConstructor,
  init: string,
  rowInit: string,
  colInit: string,
  rowSetup: string,
  colSetup: string,
  rowAccumulator: string,
  colAccumulator: string,
  dim: number[],
) =>
  Function(
    "a",
    `typedArray = ${typedArray.name}`,
    `
    function ExecuteMapReduceRecursive(a, row, it = 0){
      const dim = ${JSON.stringify(dim)};
      const n = a.length;
      let ai, aij, i;
      ${init}
      if (it === dim.length - 1) {
       ${colInit}
        for (i = n;i-- > 1;) {
          aij = a[i];
          ${colSetup}
          aij = a[--i];
          ${colSetup}
        }
        if (i === 0) {
          aij = a[0];
          ${colSetup}
        }
        ${colAccumulator}
      } else {
        ${rowInit}
        for (let i = n;i--;) {
          ai = ExecuteMapReduceRecursive(a[i], i, it + 1);
          ${rowSetup}
        }
        ${rowAccumulator}
      } 
    }
    return ExecuteMapReduceRecursive(a);
    `,
  )(a, typedArray);

export const MatrixMapReduce = (
  a: MatrixType | NumericMatrix,
  type: NumericType,
  mapReducer: string,
) => {
  const typedArray = CreateTypedArrayConstructor(type);
  const {
    init,
    rowInit,
    colInit,
    rowAccumulator,
    colAccumulator,
    rowSetup,
    colSetup,
  } = GenerateMapReduceExpression(mapReducer);
  const dim = ComputeDimensions(a);
  return ExecuteMatrixMapReduce(
    a,
    typedArray,
    init,
    rowInit,
    colInit,
    rowSetup,
    colSetup,
    rowAccumulator,
    colAccumulator,
    dim,
  );
};
