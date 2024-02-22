"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m = Matrix.random(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.getDiagonal(m),
    [numeric.getDiag(m)],
  );
  const euriklisTest = (matrix: any) => matrix.getDiagonal(m);
  const numericTest = (matrix: any) => matrix.getDiag(m);
  startPerformanceTest(
    "getDiagonal",
    [{ param: "matrix", dimensions, type: "float64," }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
