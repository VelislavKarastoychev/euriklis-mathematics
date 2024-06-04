"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import type { Integer } from "../src/Types";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = Matrix.random(dimensions[0], 1);
  const m2 = Matrix.random(...dimensions);
  const numericTest = (_: any) => {
    const matrix: number[][] = [];
    const n = m1.length;
    let i: Integer, j: Integer, n1: Integer, n2: Integer;
    for (i = n; i--;) {
      matrix[i] = [];
      const m1i = m1[i];
      const m2i = m2[i];
      n1 = m1i.length;
      n2 = m2i.length;
      for (j = n1; j--;) {
        matrix[i][j] = m1i[j];
      }
      for (j = n2; j--;) {
        matrix[i][n1 + j] = m2i[j];
      }
    }
    return matrix;
  };
  const condition = Matrix.isEqualTo(
    Matrix.appendBlockRight(m1, m2),
    numericTest(undefined),
  );
  const euriklisTest = (m: any) => m.appendBlockRight(m1, m2);
  startPerformanceTest(
    "appendBlockRight",
    [{ param: "matrix", dimensions: [dimensions[0], 1], type: "float64" }, {
      param: "block",
      dimensions,
      type: "float64",
    }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest
      },
      conventionalJS: {
        instance: undefined,
        test: numericTest
      }
    }
  );
})();
