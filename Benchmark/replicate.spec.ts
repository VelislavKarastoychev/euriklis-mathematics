"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";
const rep1 = Matrix.replicate(Math.PI, 5, 5);
const rep2 = numeric.rep([5, 5], Math.PI);
(async () => {
  startPerformanceTest(
    "replilcate",
    [{ param: "matrix", dimensions, type: "float64" }],
    Matrix.isEqualTo(rep1, rep2),
    (m) => m.replicate(Math.PI, dimensions[0], dimensions[1]),
    (m) => m.rep(dimensions, Math.PI),
  );
  startPerformanceTest(
    "replilcate",
    [{ param: "matrix", dimensions, type: "generic" }],
    Matrix.isEqualTo(Matrix.replicate(Math.PI, 5, 5, "generic"), rep2),
    (m) => m.replicate(Math.PI, dimensions[0], dimensions[1], "generic"),
    (m) => m.rep(dimensions, Math.PI),
  );
})();
