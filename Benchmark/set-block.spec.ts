"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import {  startPerformanceTest, dimensions } from "./utils.ts";
// const dimensions: [number, number] = [5, 6];
(async () => {
  const m11 = Matrix.uniqueRandom(...dimensions);
  const m12 = Matrix.copy(m11);
  const m2 = Matrix.random(dimensions[0] - 1, dimensions[1] - 1);
  const condition = Matrix.isEqualTo(
    Matrix.setBlock(m11, {
      from: [0, 0],
      to: [dimensions[0] - 2, dimensions[1] - 2],
    }, m2),
    numeric.setBlock(m12, [0, 0], [dimensions[0] - 2, dimensions[1] - 2], m2),
  );
  const euriklisTest = (m: any) =>
    m.setBlock(m11, { from: [0, 0], to: [dimensions[0] - 2, dimensions[1] - 2] }, m2);
  const numericTest = (m: any) => m.setBlock(m12, [0, 0], [dimensions[0] - 2, dimensions[1] - 2], m2);
  startPerformanceTest(
    "setBlock",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
