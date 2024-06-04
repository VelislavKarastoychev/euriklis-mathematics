"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m = Matrix.random(...dimensions);
  const row = Matrix.uniqueRandom(1, dimensions[1]);
  const condition = Matrix.isEqualTo(
    Matrix.setRow(
      Matrix.copy(m),
      row,
      0,
      0,
      dimensions[0] - 1,
    ),
    numeric.setBlock(Matrix.copy(m), [0, 0], [0, dimensions[1] - 1], row),
  );
  const euriklisTest = (matrix: any) =>
    matrix.setRow(m, row, 0, 0, dimensions[1] - 1);
  const numericTest = (matrix: any) =>
    matrix.setBlock(m, [0, 0], [0, dimensions[1] - 1], row);
  startPerformanceTest(
    "setRow",
    [{ param: "matrix", dimensions, type: "float64", fromRow: 0, toColumn: dimensions[1] - 1 }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      numericjs: {
        instance: numeric,
        test: numericTest
      }
    }
  );
})();
