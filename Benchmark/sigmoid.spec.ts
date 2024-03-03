"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.sigmoid(r),
    numeric.pointwise(["x[i]"], "ret[i] = 1 / (1 + Math.exp(-x[i]))")(r),
  );
  const euriklisTest = (m: any) => m.sigmoid(r);
  const numericTest = (m: any) =>
    m.pointwise(["x[i]"], "ret[i] = 1 / (1 + Math.exp(-x[i]))")(r);
  startPerformanceTest(
    "sigmoid",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
