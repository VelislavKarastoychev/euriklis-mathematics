"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = Matrix.random(...dimensions);
  const m2 = Matrix.copy(m1, undefined, Math.PI, Math.E);
  const condition = Matrix.isEqualTo(
    Matrix.leq(m1, m2),
    Matrix.copy(numeric.leq(m1, m2)),
  );
  const test = (m: any) => m.leq(m1, m2);
  startPerformanceTest(
    "leq",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    test,
    test,
  );
})();
