"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const cr = Matrix.copy(r, "generic");
  const condition =
    Math.abs(
      Matrix.norm1(r) - numeric.sup(
        numeric.transpose(cr).map((m) => numeric.norm1(m)),
      ),
    ) < 1e-8;
  const euriklisTest = (m: any) => m.norm1(r);
  const numericTest = (m: any) =>
    m.sup(numeric.transpose(cr).map((row: number[]) => numeric.norm1(row)));
  startPerformanceTest(
    "norm1",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
