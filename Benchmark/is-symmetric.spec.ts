"use strict";
import numeric from "numericjs";
import { Matrix } from "../src";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const a = Matrix.random(...dimensions);
  const square = numeric.mul(numeric.add(a, numeric.transpose(a)), 0.5);

  console.log(Matrix.isSymmetric(square));
  const condition = Matrix.isMatrix(square) &&
    Matrix.isSquare([[2, 2], [2, 2]]);
  const euriklisTest = (m: any) => m.isSymmetric(square);
  const numericTest = (m: any) => m.same(numeric.transpose(square), square);
  startPerformanceTest(
    "isSymmetric",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
