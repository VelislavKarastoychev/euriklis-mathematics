"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.arccotan(r),
    numeric.pointwise(["x[i]"], "ret[i] = Math.PI/2 - Math.atan(x[i])")(r),
  );
  const euriklisTest = (m: any) => Matrix.arccotan(r);
  const numericTest = (m: any) =>
    numeric.pointwise(["x[i]"], "ret[i] = Math.PI/2 - Math.atan(x[i])")(r);
  startPerformanceTest(
    "arccotan",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
