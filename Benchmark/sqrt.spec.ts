"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.sqrt(r),
    numeric.sqrt(r),
  );
  const test = (lib: any) => lib.sqrt(r);
  startPerformanceTest(
    "sqrt",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    test,
    test,
  );
})();
