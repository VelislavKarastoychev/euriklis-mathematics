"use strict";

import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
  TypedArrayConstructor,
} from "../../Types";
import { GenerateIdentityLikeMatrix } from "./GenerateIdentityLikeMatrix";

function ROTATE(
  a: MatrixType | NumericMatrix,
  i: Integer,
  j: Integer,
  k: Integer,
  l: Integer,
  g: number,
  s: number,
  h: number,
  tau: number,
) {
  g = a[i][j];
  h = a[k][l];
  a[i][j] = g - s * (h + g * tau);
  a[k][l] = h + s * (g - h * tau);
}

export function Jacobi(
  a: MatrixType | NumericMatrix,
  typedArray: TypedArrayConstructor | ArrayConstructor,
) {
  const n: Integer = a.length;
  let j: Integer,
    iq: Integer,
    ip: Integer,
    i: Integer,
    nrot: Integer,
    tresh: number,
    theta: number,
    tau: number,
    t: number,
    sm: number,
    s: number,
    h: number,
    g: number,
    c: number;
  let v: MatrixType | NumericMatrix = GenerateIdentityLikeMatrix(
      n,
      n,
      typedArray,
    ),
    b: TypedArray | number[] = new typedArray(n) as TypedArray | number[],
    z: TypedArray | number[] = new typedArray(n) as TypedArray | number[],
    d: TypedArray | number[] = new typedArray(n) as TypedArray | number[],
    wi: TypedArray | number[] = new typedArray(n) as TypedArray | number[];
  const abs: (u: number) => number = Math.abs,
    sqrt: (u: number) => number = Math.sqrt;
  for (ip = 0; ip < n; ip++) {
    v[ip] = [];
    for (iq = 0; iq < n; iq++) v[ip][iq] = 0.0;
    v[ip][ip] = 1.0;
  }
  for (ip = 0; ip < n; ip++) {
    b[ip] = d[ip] = a[ip][ip];
    z[ip] = 0.0;
  }
  nrot = 0;
  for (i = 1; i <= 50; i++) {
    sm = 0.0;
    for (ip = 0; ip < n - 1; ip++) {
      for (iq = ip + 1; iq < n; iq++) sm += abs(a[ip][iq]);
    }
    if (sm == 0.0) {
      z = [];
      b = z;

      return { eigenvalues: { real: d, imaginary: wi }, eigenvectors: v };
    }
    if (i < 4) {
      tresh = 0.2 * sm / (n * n);
    } else {
      tresh = 0.0;
    }
    for (ip = 0; ip < n - 1; ip++) {
      for (iq = ip + 1; iq < n; iq++) {
        g = 100.0 * abs(a[ip][iq]);
        if (
          i > 4 && (abs(d[ip]) + g) == abs(d[ip]) &&
          (abs(d[iq]) + g) == abs(d[iq])
        ) {
          a[ip][iq] = 0.0;
        } else if (abs(a[ip][iq]) > tresh) {
          h = d[iq] - d[ip];
          if ((abs(h) + g) == abs(h)) t = (a[ip][iq]) / h;
          else {
            theta = 0.5 * h / (a[ip][iq]);
            t = 1.0 / (abs(theta) + sqrt(1.0 + theta * theta));
            if (theta < 0.0) t = -t;
          }
          c = 1.0 / sqrt(1 + t * t);
          s = t * c;
          tau = s / (1.0 + c);
          h = t * a[ip][iq];
          z[ip] -= h;
          z[iq] += h;
          d[ip] -= h;
          d[iq] += h;
          a[ip][iq] = 0.0;
          for (j = 0; j <= ip - 1; j++) {
            ROTATE(a, j, ip, j, iq, g, s, h, tau);
          }
          for (j = ip + 1; j <= iq - 1; j++) {
            ROTATE(a, ip, j, j, iq, g, s, h, tau);
          }
          for (j = iq + 1; j < n; j++) {
            ROTATE(a, ip, j, iq, j, g, s, h, tau);
          }
          for (j = 0; j < n; j++) {
            ROTATE(v, j, ip, j, iq, g, s, h, tau);
          }
          ++nrot;
        }
      }
    }
    for (ip = 0; ip < n; ip++) {
      b[ip] += z[ip];
      d[ip] = b[ip];
      z[ip] = 0.0;
    }
  }
  throw new Error("Too many iterations in routine jacobi");
}
