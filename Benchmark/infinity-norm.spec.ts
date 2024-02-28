"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";
import { NumericMatrix } from "../src/Matrix/types.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const cr = Matrix.copy(r, "generic") as NumericMatrix;
  const condition = Math.abs(
    Matrix.infinityNorm(r) - numeric.sup(cr.map((row: number[]) =>
      numeric.norm1(row)
    )),
  ) < 1e-8;
  const euriklisTest = (m: any) => m.infinityNorm(r);
  const numericTest = (m: any) => m.sup(cr.map((row) => numeric.norm1(row)));
  startPerformanceTest(
    "infinityNorm",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
