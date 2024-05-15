"use strict";

import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
  TypedArrayConstructor,
} from "../types";
import { MatrixReduce } from "./MatrixReduce";

export const HQR = (
  a: MatrixType | NumericMatrix,
  typedArray: TypedArrayConstructor | ArrayConstructor,
): { real: TypedArray | number[]; imaginary: TypedArray | number[] } => {
  /*a is an n-n square upper Hessenberg matrix!!!*/
  const n: Integer = a.length;
  let wr: TypedArray | number[] = new typedArray(n),
    wi: TypedArray | number[] = new typedArray(n),
    nn: Integer,
    m: Integer,
    l: Integer,
    k: Integer,
    j: Integer,
    its: Integer,
    i: Integer,
    mmin: Integer,
    z: number,
    y: number,
    x: number,
    w: number,
    v: number,
    u: number,
    t: number,
    s: number,
    r: number,
    q: number,
    p: number,
    anorm: number,
    sign: (a: number, b: number) => number = (
      a,
      b,
    ) => (b >= 0.0 ? Math.abs(a) : -Math.abs(a)),
    abs: (n: number) => number = Math.abs,
    sqrt: (n: number) => number = Math.sqrt;
  anorm = MatrixReduce(a, "norm1");
  nn = n - 1;
  t = 0.0;
  while (nn >= 0) {
    its = 0;
    do {
      for (l = nn; l > 0; l--) {
        s = abs(a[l - 1][l - 1]) + abs(a[l][l]);
        if (s == 0.0) s = anorm;
        if ((abs(a[l][l - 1]) + s) == s) break;
      }
      x = a[nn][nn];
      if (l == nn) {
        wr[nn] = x + t;
        wi[nn--] = 0.0;
      } else {
        y = a[nn - 1][nn - 1];
        w = a[nn][nn - 1] * a[nn - 1][nn];
        if (l === (nn - 1)) {
          p = 0.5 * (y - x);
          q = p * p + w;
          z = sqrt(abs(q));
          x += t;
          if (q >= 0.0) {
            z = p + sign(z, p);
            wr[nn - 1] = wr[nn] = x + z;
            if (z) wr[nn] = x - w / z;
            wi[nn - 1] = wi[nn] = 0.0;
          } else {
            wr[nn - 1] = wr[nn] = x + p;
            wi[nn - 1] = -(wi[nn] = z);
          }
          nn -= 2;
        } else {
          if (its == 30) new Error("Too many iterations in hqr");
          if (its == 10 || its == 20) {
            t += x;
            for (i = 0; i <= nn + 1; i++) a[i][i] -= x;
            s = abs(a[nn][nn - 1]) + abs(a[nn - 1][nn - 2]);
            y = x = 0.75 * s;
            w = -0.4375 * s * s;
          }
          ++its;
          for (m = nn - 2; m >= l; m--) {
            z = a[m][m];
            r = x - z;
            s = y - z;
            p = (r * s - w) / a[m + 1][m] + a[m][m + 1];
            q = a[m + 1][m + 1] - z - r - s;
            r = a[m + 2][m + 1];
            s = abs(p) + abs(q) + abs(r);
            p /= s;
            q /= s;
            r /= s;
            if (m == l) break;
            u = abs(a[m][m - 1]) * (abs(q) + abs(r));
            v = abs(p) *
              (abs(a[m - 1][m - 1]) + abs(z) + abs(a[m + 1][m + 1]));
            if ((u + v) == v) break;
          }
          for (i = m; i < nn - 1; i++) {
            a[i + 2][i] = 0.0;
            if (i != m) a[i + 2][i - 1] = 0.0;
          }
          for (k = m; k < nn; k++) {
            if (k != m) {
              p = a[k][k - 1];
              q = a[k + 1][k - 1];
              r = 0.0;
              if (k != (nn - 1)) r = a[k + 2][k - 1];
              if ((x = abs(p) + abs(q) + abs(r)) != 0.0) {
                p /= x;
                q /= x;
                r /= x;
              }
            }
            if ((s = sign(sqrt(p! * p! + q! * q! + r! * r!), p!)) != 0.0) {
              if (k == m) {
                if (l != m) {
                  a[k][k - 1] = -a[k][k - 1];
                }
              } else {
                a[k][k - 1] = -s * x;
              }
              p! += s;
              x = p! / s;
              y = q! / s;
              z = r! / s;
              q! /= p!;
              r! /= p!;
              for (j = k; j < nn + 1; j++) {
                p = a[k][j] + q! * a[k + 1][j];
                if (k + 1 != nn) {
                  p += r! * a[k + 2][j];
                  a[k + 2][j] -= p * z;
                }
                a[k + 1][j] -= p * y;
                a[k][j] -= p * x;
              }
              mmin = nn < k + 3 ? nn : k + 3;
              for (i = l; i < mmin + 1; i++) {
                p = x * a[i][k] + y * a[i][k + 1];
                if (k != (nn - 1)) {
                  p += z * a[i][k + 2];
                  a[i][k + 2] -= p * r!;
                }
                a[i][k + 1] -= p * q!;
                a[i][k] -= p;
              }
            }
          }
        }
      }
    } while (l + 1 < nn);
  }
  return { real: wr, imaginary: wi };
};
