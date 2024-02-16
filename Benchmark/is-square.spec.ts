"use strict";
import { dimensions, startPerformanceTest } from "./utils";
import { Matrix } from "../src";
import numeric from "numericjs";
(async () => {
  const condition = Matrix.isMatrix(Matrix.random(2, 2));
  const m1 = Matrix.random(...dimensions);
  const m2 = numeric.random(...dimensions);
  const euriklisTest = (m: any) => m.isSquare(m1);
  const numericTest = (m: any) => {
    const [rows, columns] = m.dim(m2);
    return rows === columns;
  };
  startPerformanceTest(
    "isSquare",
    [{param: "matrix", dimensions, type: "float64"}],
    condition,
    euriklisTest,
    numericTest
  );
})();
