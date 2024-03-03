"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.ReLU(r),
    numeric.pointwise(["x[i]"], "ret[i] = x[i] <= 0 ? -1 : x[i]")(r),
  );
  const euriklisTests = (m: any) => m.ReLU(r);
  const numericTest = (m: any) =>
    m.pointwise(["x[i]"], "ret[i] = x[i] <= 0 ? -1 : x[i]")(r);
  startPerformanceTest(
    "ReLU",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTests,
    numericTest,
  );
})();
