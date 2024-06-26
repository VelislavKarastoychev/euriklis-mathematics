"use strict";
import { ComputeDimensions } from "./ComputeDimensions";
import { abs, EPS, max, min, pythag, sign, sqrt } from "../../utils";
import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
  TypedArrayConstructor,
} from "../../Types";
import { GenerateZeroMatrix } from "./GenerateZeroMatrix";

const reorder = (
  u: MatrixType | NumericMatrix,
  w: TypedArray | number[],
  v: MatrixType | NumericMatrix,
  typedArray: TypedArrayConstructor | ArrayConstructor,
  n: Integer,
  m: Integer,
) => {
  let i: Integer, j: Integer, k: Integer, s: Integer, inc: Integer = 1;
  let sw: number;
  let su: TypedArray | number[] = new typedArray(m),
    sv: TypedArray | number[] = new typedArray(n);
  do {
    inc *= 3;
    inc++;
  } while (inc <= n);
  do {
    inc /= 3;
    for (i = inc; i < n; i++) {
      sw = w[i];
      for (k = 0; k < m; k++) su[k] = u[k][i];
      for (k = 0; k < n; k++) sv[k] = v[k][i];
      j = i;
      while (w[j - inc] < sw) {
        w[j] = w[j - inc];
        for (k = 0; k < m; k++) u[k][j] = u[k][j - inc];
        for (k = 0; k < n; k++) v[k][j] = v[k][j - inc];
        j -= inc;
        if (j < inc) break;
      }
      w[j] = sw;
      for (k = 0; k < m; k++) u[k][j] = su[k];
      for (k = 0; k < n; k++) v[k][j] = sv[k];
    }
  } while (inc > 1);
  for (k = 0; k < n; k++) {
    s = 0;
    for (i = 0; i < m; i++) if (u[i][k] < 0.) s++;
    for (j = 0; j < n; j++) if (v[j][k] < 0.) s++;
    if (s > (m + n) / 2) {
      for (i = 0; i < m; i++) u[i][k] = -u[i][k];
      for (j = 0; j < n; j++) v[j][k] = -v[j][k];
    }
  }
};

export const SVD = (
  u: MatrixType | NumericMatrix,
  typedArray: TypedArrayConstructor | ArrayConstructor,
  sort: boolean,
): {
  s: TypedArray | number[];
  v: MatrixType | NumericMatrix;
  d: MatrixType | NumericMatrix;
} => {
  const [n, m] = ComputeDimensions(u);
  let flag: boolean;
  let i: Integer,
    its: Integer,
    j: Integer,
    jj: Integer,
    k: Integer,
    l: Integer,
    nm: Integer;
  let anorm: number,
    c: number,
    f: number,
    g: number,
    h: number,
    s: number,
    scale: number,
    x: number,
    y: number,
    z: number;
  const rv1: TypedArray | number[] = new typedArray(n);
  const v: MatrixType | NumericMatrix = GenerateZeroMatrix(m, m, typedArray);
  const w: TypedArray | number[] = new typedArray(m);
  g = scale = anorm = 0.0;
  for (i = 0; i < n; i++) {
    l = i + 2;
    rv1[i] = scale * g;
    g = s = scale = 0.0;
    if (i < m) {
      for (k = i; k < m; k++) scale += abs(u[k][i]);
      if (scale != 0.0) {
        for (k = i; k < m; k++) {
          u[k][i] /= scale;
          s += u[k][i] * u[k][i];
        }
        f = u[i][i];
        g = -sign(sqrt(s), f);
        h = f * g - s;
        u[i][i] = f - g;
        for (j = l - 1; j < n; j++) {
          for (s = 0.0, k = i; k < m; k++) s += u[k][i] * u[k][j];
          f = s / h;
          for (k = i; k < m; k++) u[k][j] += f * u[k][i];
        }
        for (k = i; k < m; k++) u[k][i] *= scale;
      }
    }
    w[i] = scale * g;
    g = s = scale = 0.0;
    if (i + 1 <= m && i + 1 != n) {
      for (k = l - 1; k < n; k++) scale += abs(u[i][k]);
      if (scale != 0.0) {
        for (k = l - 1; k < n; k++) {
          u[i][k] /= scale;
          s += u[i][k] * u[i][k];
        }
        f = u[i][l - 1];
        g = -sign(sqrt(s), f);
        h = f * g - s;
        u[i][l - 1] = f - g;
        for (k = l - 1; k < n; k++) rv1[k] = u[i][k] / h;
        for (j = l - 1; j < m; j++) {
          for (s = 0.0, k = l - 1; k < n; k++) s += u[j][k] * u[i][k];
          for (k = l - 1; k < n; k++) u[j][k] += s * rv1[k];
        }
        for (k = l - 1; k < n; k++) u[i][k] *= scale;
      }
    }
    anorm = max(anorm, abs(w[i]) + abs(rv1[i]));
  }
  for (i = n; i--;) {
    if (i < n - 1) {
      if (g != 0.0) {
        for (j = l!; j < n; j++) {
          v[j][i] = (u[i][j] / u[i][l!]) / g;
        }
        for (j = l!; j < n; j++) {
          for (s = 0.0, k = l!; k < n; k++) s += u[i][k] * v[k][j];
          for (k = l!; k < n; k++) v[k][j] += s * v[k][i];
        }
      }
      for (j = l!!; j < n; j++) v[i][j] = v[j][i] = 0.0;
    }
    v[i][i] = 1.0;
    g = rv1[i];
    l = i;
  }
  for (i = min(m, n) - 1; i >= 0; i--) {
    l = i + 1;
    g = w[i];
    for (j = l; j < n; j++) u[i][j] = 0.0;
    if (g != 0.0) {
      g = 1.0 / g;
      for (j = l; j < n; j++) {
        for (s = 0.0, k = l; k < m; k++) s += u[k][i] * u[k][j];
        f = (s / u[i][i]) * g;
        for (k = i; k < m; k++) u[k][j] += f * u[k][i];
      }
      for (j = i; j < m; j++) u[j][i] *= g;
    } else for (j = i; j < m; j++) u[j][i] = 0.0;
    ++u[i][i];
  }
  for (k = n - 1; k >= 0; k--) {
    for (its = 0; its < 30; its++) {
      flag = true;
      for (l = k; l >= 0; l--) {
        nm = l - 1;
        if (l == 0 || abs(rv1[l]) <= EPS * anorm) {
          flag = false;
          break;
        }
        if (abs(w[nm]) <= EPS * anorm) break;
      }
      if (flag) {
        c = 0.0;
        s = 1.0;
        for (i = l; i < k + 1; i++) {
          f = s * rv1[i];
          rv1[i] = c * rv1[i];
          if (abs(f) <= EPS * anorm) break;
          g = w[i];
          h = pythag(f, g);
          w[i] = h;
          h = 1.0 / h;
          c = g * h;
          s = -f * h;
          for (j = 0; j < m; j++) {
            y = u[j][nm!];
            z = u[j][i];
            u[j][nm!] = y * c + z * s;
            u[j][i] = z * c - y * s;
          }
        }
      }
      z = w[k];
      if (l == k) {
        if (z < 0.0) {
          w[k] = -z;
          for (j = 0; j < n; j++) v[j][k] = -v[j][k];
        }
        break;
      }
      if (its == 29) {
        throw new Error("No convergence in 30 svd decomposition iterations");
      }
      x = w[l];
      nm = k - 1;
      y = w[nm];
      g = rv1[nm];
      h = rv1[k];
      f = ((y - z) * (y + z) + (g - h) * (g + h)) / (2.0 * h * y);
      g = pythag(f, 1.0);
      f = ((x - z) * (x + z) + h * ((y / (f + sign(g, f))) - h)) / x;
      c = s = 1.0;
      for (j = l; j <= nm; j++) {
        i = j + 1;
        g = rv1[i];
        y = w[i];
        h = s * g;
        g = c * g;
        z = pythag(f, h);
        rv1[j] = z;
        c = f / z;
        s = h / z;
        f = x * c + g * s;
        g = g * c - x * s;
        h = y * s;
        y *= c;
        for (jj = 0; jj < n; jj++) {
          x = v[jj][j];
          z = v[jj][i];
          v[jj][j] = x * c + z * s;
          v[jj][i] = z * c - x * s;
        }
        z = pythag(f, h);
        w[j] = z;
        if (z) {
          z = 1.0 / z;
          c = f * z;
          s = h * z;
        }
        f = c * g + s * y;
        x = c * y - s * g;
        for (jj = 0; jj < m; jj++) {
          y = u[jj][j];
          z = u[jj][i];
          u[jj][j] = y * c + z * s;
          u[jj][i] = z * c - y * s;
        }
      }
      rv1[l] = 0.0;
      rv1[k] = f;
      w[k] = x;
    }
  }
  if (sort) reorder(u, w, v, typedArray, n, m);
  return { s: w, d: u, v };
};
