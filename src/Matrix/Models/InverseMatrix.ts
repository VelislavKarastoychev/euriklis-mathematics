"use strict";
import type {
  Integer,
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArray,
  TypedArrayConstructor,
} from "../../Types";
import { CreateTypedArrayConstructor } from "./CreateTypedArrayConstructor";
import { GenerateIdentityLikeMatrix } from "./GenerateIdentityLikeMatrix";

/**
 * Computes the inverse matrix via the Gaussian elimination
 * method.
 * The implementation of this utility function uses the
 * methodology and optimization techniques of the Sébastien Loisel,
 * numericjs function. It is important to say that its implementation
 * is very fast and time/memory efficient.
 *
 * @param {MatrixType | NumericMatrix} a - The matrix which will be
 * inverted.
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - The type of the output matrix.
 */
export const InverseMatrixGauss = (
  a: MatrixType | NumericMatrix,
  typedArray: TypedArrayConstructor | ArrayConstructor,
): MatrixType | NumericMatrix => {
  const n = a.length;
  const abs = Math.abs;
  const I = GenerateIdentityLikeMatrix(n, n, typedArray);
  let p: Integer,
    r: Integer,
    c: Integer,
    apmax: number,
    maxp: number,
    absap: number,
    s: number,
    ap: TypedArray | number[],
    ar: TypedArray | number[],
    Ir: TypedArray | number[],
    Ip: TypedArray | number[];
  // forward phase
  for (p = 0; p < n; p++) {
    // make pivot strategy
    apmax = 0;
    maxp = p;
    for (r = p; r < n; r++) {
      if ((absap = abs(a[r][p])) > apmax) {
        maxp = r;
        apmax = absap;
      }
    }

    // swapping...
    if (maxp !== p) {
      [a[maxp], a[p], I[maxp], I[p]] = [a[p], a[maxp], I[p], I[maxp]];
    }
    ap = a[p];
    Ip = I[p];
    // define the scatter
    s = 1 / ap[p];
    for (c = n; c-- > p + 1;) {
      ap[c--] *= s;
      ap[c] *= s;
    }
    if (c === p) ap[p] *= s;
    for (c = n; c-- > 1;) {
      Ip[c--] *= s;
      Ip[c] *= s;
    }
    if (c === 0) Ip[0] *= s;
    for (r = n; r--;) {
      if (r !== p) {
        ar = a[r];
        Ir = I[r];
        s = -ar[p];
        for (c = p + 1; c !== n; ++c) ar[c] += ap[c] * s;
        for (c = n; c-- > 1;) {
          Ir[c] += Ip[c--] * s;
          Ir[c] += Ip[c] * s;
        }
        if (c === 0) Ir[0] += Ip[0] * s;
      }
    }
  }

  return I;
};

export const InverseMatrixLU = (
  a: MatrixType | NumericMatrix,
  P: Integer[],
  typedArray: TypedArrayConstructor | ArrayConstructor,
): MatrixType | NumericMatrix => {
  const n = a.length;
  const I: MatrixType | NumericMatrix = Array(n);
  let j: Integer,
    i: Integer,
    k: Integer,
    s: number,
    Ii: TypedArray | number[],
    ai: TypedArray | number[];
  for (i = n; i--;) I[i] = new typedArray(n);
  for (j = 0; j < n; j++) {
    for (i = 0; i < n; i++) {
      Ii = I[i];
      ai = a[i];
      Ii[j] = +(P[i] === j); // use the coersion feature of JavaScript
      for (k = 0; k < i; k++) {
        Ii[j] -= ai[k] * I[k][j];
      }
    }

    for (i = n; i--;) {
      Ii = I[i];
      ai = a[i];
      s = 1 / ai[i];
      for (k = i + 1; k < n; k++) {
        Ii[j] -= ai[k] * I[k][j];
      }
      Ii[j] *= s;
    }
  }
  return I;
};
