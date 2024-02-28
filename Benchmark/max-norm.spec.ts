"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const cr = Matrix.copy(r, "generic");
  const condition = Math.abs(Matrix.maxNorm(r) - numeric.sup(cr.flat())) < 1e-8;
  const euriklisTest = (m: any) => m.maxNorm(r);
  const numericTest = (m: any) => m.sup(cr.flat());
  startPerformanceTest(
    "maxNorm",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
