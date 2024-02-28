"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(dimensions[0], dimensions[1]);
  const cr = Matrix.copy(r, "generic");
  const condition =
    Math.abs(Matrix.FrobeniusNorm(r) - numeric.norm2(cr.flat())) < 1e-8;
  const euriklisTest = (m: any) => m.FrobeniusNorm(r);
  const numericTest = (m: any) => m.norm2(cr.flat());
  startPerformanceTest(
    "Frobenius norm",
    [
      { param: "matrix", dimensions, type: "float64" },
    ],
    condition,
    euriklisTest,
    numericTest,
  );
})();
