"use strict";
import numeric from "numericjs";
import { Matrix } from "../src";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";
import { dimensions } from "./utils";
function LL(A: MatrixType | NumericMatrix): MatrixType | NumericMatrix {
  const n = A.length;
  const L: NumericMatrix = numeric.rep([A.length, A[0].length], 0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      for (let k = 0; k < j; k++) {
        sum += L[i][k] * L[j][k];
      }
      if (i === j) {
        L[i][j] = Math.sqrt(A[i][i] - sum);
      } else {
        L[i][j] = (A[i][j] - sum) / L[j][j];
      }
    }
    if (L[i][i] <= 0) {
      throw new Error("Input matrix is not symmetric positive definite");
    }
  }

  return L;
}
(async () => {
  const r = Matrix.random(dimensions[0] / 1000, dimensions[1] / 1000, -10, 10);
  const a = Matrix.Hadamard(Matrix.plus(r, Matrix.transpose(r)), 0.5);
  const condition = Matrix.isEqualTo(
    Matrix.LUPC(Matrix.copy(a)).LU,
    LL(a),
  );
  console.log(condition);
  // console.table(Matrix.LL(Matrix.copy(a)));
})();
