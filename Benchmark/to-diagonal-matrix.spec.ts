"use strict";
import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.random(1, 5);
  const condition = Matrix.isEqualTo(
    Matrix.toDiagonalMatrix(r),
    numeric.diag(Matrix.copy(r, "generic")[0]),
  );
  const euriklisTest = (m: any) => m.toDiagonalMatrix(r);
  const numericTest = (m: any) => m.diag(r[0]);
  startPerformanceTest(
    "toDiagonalMatrix",
    [{ param: "matrix", dimensions: [1, 5000], type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
