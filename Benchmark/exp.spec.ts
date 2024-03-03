"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.exp(r),
    numeric.exp(r),
  );
  const test = (lib: any) => lib.exp(r);
  startPerformanceTest(
    "exp",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    test,
    test,
  );
})();
