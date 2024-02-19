"use strict";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = Matrix.uniqueRandom(...dimensions);
  const from: [number, number] = [100, 101],
    to: [number, number] = [4990, 4999];
  const condition = Matrix.isEqualTo(
    Matrix.getBlock(m1, { from, to }),
    numeric.getBlock(m1, from, to),
  );
  const euriklisTest = (m: any) => m.getBlock(m1, { from, to });
  const numericTest = (m: any) => m.getBlock(m1, from, to);
  startPerformanceTest(
    "getBlock",
    [{
      param: "matrix",
      dimensions,
      type: "float64",
      from: [100, 101],
      to: [4990, 4999],
    }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
