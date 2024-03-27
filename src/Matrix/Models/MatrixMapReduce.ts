"use strict";

import {
  Integer,
  MapReduceExpression,
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArrayConstructor,
} from "../types";
import { ComputeDimensions } from "./ComputeDimensions";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor";

/**
 * Generates map-reduce expressions based on the specified map-reducer type.
 * @param {MapReduceExpression} mapReduceExpression - The type of map-reduce operation.
 * @returns {{
 *   init: string,
 *   rowInit: string,
 *   colInit: string,
 *   rowAccumulator: string,
 *   colAccumulator: string,
 *   rowSetup: string,
 *   colSetup: string
 * }} The generated map-reduce expressions.
 */
const GenerateMapReduceExpression = (
  mapReduceExpression: MapReduceExpression,
): {
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
          "accum1 = [];for (i = accum.length;i--;)accum1[i] = [accum[i]];return accum1;",
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
          "accum1 = [];for (i = accum.length;i--;)accum1[i] = [accum[i]];return accum1;",
        colAccumulator: "return accum1;",
        rowSetup: "accum = add(accum, ai);",
        colSetup: "accum1[i] = (i !== row) * aij;",
      };
    case "rowNorm1AsRow":
      return {
        init: "const abs = Math.abs;let accum, accum1 = 0;",
        rowInit: "accum = new typedArray(n)",
        colInit: "",
        rowAccumulator: "return [accum];",
        colAccumulator: "return accum1;",
        rowSetup: "accum[i] = ai;",
        colSetup: "accum1 += abs(aij);",
      };
    case "rowNorm1AsColumn":
      return {
        init: "const abs = Math.abs;let accum = [], accum1 = 0;",
        rowInit: "",
        colInit: "",
        rowAccumulator: "return accum;",
        colAccumulator: "return accum1;",
        rowSetup: "accum[i] = new typedArray([ai]);",
        colSetup: "accum1 += abs(aij);",
      };
    case "rowNorm1NoDiagAsRow":
      return {
        init: "const abs = Math.abs;let accum, accum1 = 0;",
        rowInit: "accum = new typedArray(n)",
        colInit: "",
        rowAccumulator: "return [accum];",
        colAccumulator: "return accum1;",
        rowSetup: "accum[i] = ai;",
        colSetup: "accum1 += +(i !== row) * abs(aij);", // use the coersion feature of JS!
      };
    case "rowNorm1NoDiagAsColumn":
      return {
        init: "const abs = Math.abs;let accum = [], accum1 = 0;",
        rowInit: "",
        colInit: "",
        rowAccumulator: "return accum;",
        colAccumulator: "return accum1;",
        rowSetup: "accum[i] = new typedArray([ai]);",
        colSetup: "accum1 += +(i !== row) * abs(aij);",
      };
    case "colNorm1AsRow":
      return {
        init: `
        const abs = Math.abs;
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
        colSetup: "accum1[i] = abs(aij);",
      };
    case "colNorm1AsColumn":
      return {
        init: `
        const abs = Math.abs;
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
          "accum1 = [];for (i = accum.length;i--;)accum1[i] = [accum[i]];return accum1;",
        colAccumulator: "return accum1;",
        rowSetup: "accum = add(accum, ai);",
        colSetup: "accum1[i] = abs(aij);",
      };
    case "colNorm1NoDiagAsRow":
      return {
        init: `
        const abs = Math.abs;
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
        colSetup: "accum1[i] = (i !== row) * abs(aij);",
      };
    case "colNorm1NoDiagAsColumn":
      return {
        init: `
        const abs = Math.abs;
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
          "accum1 = [];for (i = accum.length;i--;)accum1[i] = [accum[i]];return accum1;",
        colAccumulator: "return accum1;",
        rowSetup: "accum = add(accum, ai);",
        colSetup: "accum1[i] = (i !== row) * abs(aij);",
      };
    case "rowSumSquaresAsRow":
      return {
        init: "let accum, accum1 = 0;",
        rowInit: "accum = new typedArray(n)",
        colInit: "",
        rowAccumulator: "return [accum];",
        colAccumulator: "return accum1;",
        rowSetup: "accum[i] = ai;",
        colSetup: "accum1 += aij * aij;",
      };
    case "rowSumSquaresAsColumn":
      return {
        init: "let accum = [], accum1 = 0;",
        rowInit: "",
        colInit: "",
        rowAccumulator: "return accum;",
        colAccumulator: "return accum1;",
        rowSetup: "accum[i] = new typedArray([ai]);",
        colSetup: "accum1 += aij * aij;",
      };
    case "colSumSquaresAsRow":
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
        colSetup: "accum1[i] = aij * aij;",
      };
    case "colSumSquaresAsColumn":
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
          "accum1 = [];for (i = accum.length;i--;)accum1[i] = [accum[i]];return accum1;",
        colAccumulator: "return accum1;",
        rowSetup: "accum = add(accum, ai);",
        colSetup: "accum1[i] = aij * aij;",
      };
    case "rowSumSquaresNoDiagAsRow":
      return {
        init: "let accum, accum1 = 0;",
        rowInit: "accum = new typedArray(n);",
        colInit: "",
        rowAccumulator: "return [accum];",
        colAccumulator: "return accum1;",
        rowSetup: "accum[i] = ai;",
        colSetup: "accum1 += +(i !== row) * aij * aij;",
      };
    case "rowSumSquaresNoDiagAsColumn":
      return {
        init: "let accum = [], accum1 = 0;",
        rowInit: "",
        colInit: "",
        rowAccumulator: "return accum;",
        colAccumulator: "return accum1;",
        rowSetup: "accum[i] = new typedArray([ai]);",
        colSetup: "accum1 += (i !== row) * aij * aij;",
      };
    case "colSumSquaresNoDiagAsRow":
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
        colSetup: "accum1[i] = +(i !== row) * aij * aij;",
      };
    case "colSumSquaresNoDiagAsColumn":
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
          "accum1 = [];for (i = accum.length;i--;)accum1[i] = [accum[i]];return accum1;",
        colAccumulator: "return accum1;",
        rowSetup: "accum = add(accum, ai);",
        colSetup: "accum1[i] = (i !== row) * aij * aij;",
      };
  }
};

/**
 * Executes matrix map-reduce operations recursively.
 * @param {MatrixType | NumericMatrix} a - The input matrix.
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - The constructor function for typed arrays.
 * @param {string} init - The initialization code for the map-reduce operation.
 * @param {string} rowInit - The initialization code for row operations.
 * @param {string} colInit - The initialization code for column operations.
 * @param {string} rowSetup - The setup code for row operations.
 * @param {string} colSetup - The setup code for column operations.
 * @param {string} rowAccumulator - The accumulator code for row operations.
 * @param {string} colAccumulator - The accumulator code for column operations.
 * @param {Integer[]} dim - The dimensions of the matrix.
 * @returns {MatrixType | NumericMatrix} The result of the map-reduce operation.
 */
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
  dim: Integer[],
): MatrixType | NumericMatrix =>
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

/**
 * Executes map-reduce operations on a matrix.
 * @param {MatrixType | NumericMatrix} a - The input matrix.
 * @param {NumericType} type - The numeric type of the output matrix.
 * @param {MapReduceExpression} mapReducer - The type of map-reduce operation to perform.
 * @returns {MatrixType | NumericMatrix} The result of the map-reduce operation.
 */
export const MatrixMapReduce = (
  a: MatrixType | NumericMatrix,
  type: NumericType,
  mapReducer: MapReduceExpression,
): MatrixType | NumericMatrix => {
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
