"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
} from "../src/Types";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const appendBloackBottomIterator = (m1, m2, k = 0) => {
    const n1: Integer = m1.length;
    const n2: Integer = m2.length;
    const extendedMatrix: NumericMatrix | number[] = [];
    let i: Integer, j: Integer;
    if (k) {
      for (i = 0; i < n1 >> 2; i++) {
        j = i << 2;
        (extendedMatrix as number[])[j] = m1[j++];
        (extendedMatrix as number[])[j] = m1[j++];
        (extendedMatrix as number[])[j] = m1[j++];
        (extendedMatrix as number[])[j] = m1[j];
      }

      for (j = i << 2; j < n1; j++) {
        (extendedMatrix as number[])[j] = m1[j];
      }
    } else {
      for (i = n1; i--;) {
        (extendedMatrix as NumericMatrix)[i] = appendBloackBottomIterator(
          m1[i],
          m2[i],
          k + 1,
        ) as number[];
      }

      for (i = n2; i--;) {
        (extendedMatrix as NumericMatrix)[i + n1] = appendBloackBottomIterator(
          m2[i],
          m1[i],
          k + 1,
        ) as number[];
      }
    }

    return extendedMatrix;
  };

  const appendBlockBottom = (
    m1: MatrixType | NumericMatrix | number[] | TypedArray,
    m2: MatrixType | NumericMatrix | number[] | TypedArray,
  ): NumericMatrix | number[] => {
    return appendBloackBottomIterator(m1, m2);
  };
  // Matrix.setType("generic")
  const rand1 = Matrix.uniqueRandom(...dimensions);
  const rand2 = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.appendBlockBottom(rand1, rand2),
    appendBlockBottom(rand1, rand2) as NumericMatrix,
  );
  const euriklisTest = (m: any) => m.appendBlockBottom(rand1, rand2);
  const numericTest = (_: any) => appendBlockBottom(rand1, rand2);
  startPerformanceTest(
    "appendBlockBottom",
    [{
      param: "matrix",
      dimensions,
      type: "float64",
    }, {
      param: "block",
      dimensions,
      type: "float64",
    }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest
      },
      commonJS: {
        instance: undefined,
        test: numericTest
      }
    }
  );
})();
