"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const cr = Matrix.copy(r, "generic");
  const condition =
    Math.abs(Matrix.inferior(r) - numeric.inf(cr.flat())) < 1e-7;
  const euriklisTest = (m: any) => m.inferior(r);
  const numericTest = (m: any) => m.inf(cr.flat());
  startPerformanceTest(
    "inferior",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
