"use strict";
import { Matrix } from "../src";
import numeric from "numericjs";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";
import { dimensions, startPerformanceTest } from "./utils";
(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.copy(r1);
  const v1 = Matrix.uniqueRandom(1, dimensions[0]);
  const addVectorToMatrixByRowAxis = (
    v: MatrixType | NumericMatrix,
    m: MatrixType | NumericMatrix,
  ) =>
    numeric.pointwise2(
      ["v", "x[i]"],
      "xi = x[i];\n" +
        "ret[i] = Array(cols);\n" +
        "reti = ret[i];\n" +
        "for(j = cols;j-- > 1;) {reti[j] = xi[j--] + v[i];reti[j] = xi[j] + v[i];};\n" +
        "if(j === 0) reti[0] = xi[0] + v[0];",
      "v = v[0];let j, reti;const [_, cols] = numeric.dim(x);",
    )(v, m);
  const condition = Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.addVectorToMatrixByRowAxis(r1, v1),
      addVectorToMatrixByRowAxis(v1, r2),
    ),
  ) <= 1e-8;
  const euriklisTest = (m: any) => m.addVectorToMatrixByRowAxis(r1, v1);
  const numericTest = (_: any) => addVectorToMatrixByRowAxis(v1, r2);
  startPerformanceTest(
    "addVectorToMatrixByRowAxis",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
