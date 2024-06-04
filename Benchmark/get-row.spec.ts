"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m = Matrix.random(...dimensions);
  const rowIndex = Math.random() * dimensions[0] | 0;
  const colIndex = Math.random() * dimensions[1] | 0;
  const condition = Matrix.isEqualTo(
    Matrix.getRow(m, rowIndex, 0, colIndex),
    numeric.getBlock(m, [rowIndex, 0], [rowIndex, colIndex]),
  );
  const euriklisTest = (matrix: any) => matrix.getRow(m, rowIndex);
  const numericTest = (matrix: any) =>
    matrix.getBlock(m, [rowIndex, 0], [rowIndex, m.length - 1]);
  startPerformanceTest(
    "getRow",
    [{ param: "matrix", dimensions, fromColumn: 0, toColumn: m.length }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest
      },
      numericjs: {
        instance: numeric,
        test: numericTest
      }
    }
  );
})();
