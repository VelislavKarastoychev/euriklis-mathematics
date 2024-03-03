"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.cosh(r),
    numeric.pointwise(["x[i]"], "ret[i] = Math.cosh(x[i])")(r),
  );
  const euriklisTest = (m: any) => m.cosh(r);
  const numericTest = (m: any) =>
    m.pointwise(["x[i]"], "ret[i] = Math.cosh(x[i])")(r);
  startPerformanceTest(
    "cosh",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
