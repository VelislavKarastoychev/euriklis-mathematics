"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import type { Integer, MatrixType, NumericMatrix } from "../src/Types";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  function reshapeMatrix(
    matrix: NumericMatrix | MatrixType,
    newRows: Integer,
    newColumns: Integer,
  ) {
    const flattened = matrix.flat(); // Convert matrix to a 1D array
    const reshaped = [];

    for (let i = 0; i < newRows; i++) {
      reshaped[i] = [];
      for (let j = 0; j < newColumns; j++) {
        const index = i * newColumns + j;
        reshaped[i][j] = flattened[index];
      }
    }

    return reshaped;
  }

  const m = Matrix.random(dimensions[0], dimensions[1]);
  const m1 = Matrix.copy(m, "generic");
  const reshaped = Matrix.reshape(m, dimensions[0] >> 1, dimensions[1] << 1);

  const condition = Matrix.isEqualTo(
    reshaped,
    reshapeMatrix(m1, dimensions[0] >> 1, dimensions[1] << 1),
  );
  const euriklisTest = (matrix: any) =>
    matrix.reshape(m, dimensions[0] >> 1, dimensions[1] << 1);
  const numericTest = (_: any) =>
    reshapeMatrix(m1, dimensions[0] >> 1, dimensions[1] << 1);
  // const tfTest = (m: any) => m.reshape(m1, [dimensions[0] >> 1, dimensions[1] << 1]);
  startPerformanceTest(
    "reshape",
    [{ param: "matrix", dimensions, type: "float64" }, {
      param: "rows",
      size: dimensions[0] >> 1,
    }, { param: "columns", size: dimensions[1] << 1 }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      commonJS: {
        instance: undefined,
        test: numericTest,
      },
      // tensorFlowjs: {
      //   instance: tf,
      //   test: tfTest,
      // },
      // tensorFlowjsNode: {
      //   instance: tfNode,
      //   test: tfTest,
      // },
    },
  );
})();
