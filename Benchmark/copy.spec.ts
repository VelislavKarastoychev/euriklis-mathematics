"use strict";
import { Matrix } from "../src";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";
import { dimensions, startPerformanceTest } from "./utils";
(async () => {
  const r = Matrix.random(2, 3);
  const r1 = Matrix.copy(r);
  r1[1][2] = Math.PI;
  const c1 = !Matrix.isEqualTo(r, r1);
  const n = Matrix.copy(r, "generic");
  const n1 = Matrix.copy(n, "generic");
  n1[1][2] = Math.PI;
  const c2 = !Matrix.isEqualTo(n, n1);
  let m: MatrixType | NumericMatrix, m1: MatrixType | NumericMatrix;
  m = Matrix.random(...dimensions);
  m1 = Matrix.random(dimensions[0], dimensions[1], 0, 1, "generic");
  const euriklisTest = (matrix: any) => matrix.copy(m);
  const numericTest = (matrix: any) => matrix.clone(m1);
  startPerformanceTest(
    "copy",
    [{ param: "matrix", dimensions, type: "float64" }],
    c1 && c2,
    euriklisTest,
    numericTest,
  );
  Matrix.setType("generic");
  m = Matrix.random(...dimensions);
  m1 = Matrix.random(dimensions[0], dimensions[1], 0, 1, "generic");
  startPerformanceTest(
    "copy",
    [{ param: "matrix", dimensions, type: "generic" }],
    c1 && c2,
    euriklisTest,
    numericTest,
  );
})();
