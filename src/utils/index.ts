"use strict";

import type { MatrixType, NumericMatrix, TypedArray } from "../Matrix/types";

export const abs: (n: number) => number = Math.abs;
export const sqrt: (n: number) => number = Math.sqrt;
export const max: (...args: number[]) => number = Math.max;
export const min: (...args: number[]) => number = Math.min;
export const EPS: number = Number.EPSILON;
export const ln: (n: number) => number = Math.log;
export const pow: (a: number, n: number) => number = Math.pow;
export const PI: number = Math.PI;
export const E: number = Math.E;
export const exp: (n: number) => number = Math.exp;
export const sin: (n: number) => number = Math.sin;
export const cos: (n: number) => number = Math.cos;
export const tg: (n: number) => number = Math.tan;
export const cotg: (n: number) => number = (n) => 1 / Math.tan(n);
export const atan2: (n: number, m: number) => number = Math.atan2;
export const sinh: (n: number) => number = Math.sinh;
export const cosh: (n: number) => number = Math.cosh;
export const tanh: (n: number) => number = Math.tanh;
export const sign: (a: number, b: number) => number = (
  a,
  b,
) => (b >= 0.0 ? Math.abs(a) : -Math.abs(a));
export const cdiv = (
  a: [number, number],
  b: [number, number],
): [number, number] => {
  const z = b[0] * b[0] + b[1] * b[1];
  return [(a[0] * b[0] + a[1] * b[1]) / z, (a[1] * b[0] - a[0] * b[1]) / z];
};

export const cdot = (
  a: [number, number],
  b: [number, number],
) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[0] * b[0]];

export const pythag = (a: number, b: number): number => {
  const absa: number = abs(a), absb: number = abs(b);
  return (absa > absb
    ? absa * sqrt(1.0 + (absb / absa) * (absb / absa))
    : (absb == 0.0 ? 0.0 : absb * sqrt(1.0 + (absa / absb) * (absa / absb))));
};

export const printVector = (v: TypedArray | number[]): string => "[" + v + "]";
export const printAsJavaVector = (v: TypedArray | number[]): string =>
  "{" + v + "}";
export const printMatrix: (m: MatrixType | NumericMatrix) => string = (m) => {
  return `[${m.map((row) => printVector(row))}]`;
};

export const printAsJavaMatrix: (m: MatrixType | NumericMatrix) => string = (
  m,
) => {
  return `{${m.map((row) => printAsJavaVector(row))}}`;
};
