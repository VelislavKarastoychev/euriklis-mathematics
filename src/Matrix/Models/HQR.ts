"use strict";
import { GenerateIdentityLikeMatrix } from "./GenerateIdentityLikeMatrix";
import { cdiv, sign, abs, EPS, sqrt, max } from "../../utils";
import type {
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
  TypedArrayConstructor,
} from "../types";
import { MatrixReduce } from "./MatrixReduce";
/**
 * Implements the Hessenberg QR algorithm
 * for computing of the eigenvalues of a
 * real non symmetric matrix. This utility
 * function is translation of the hqr algorithm
 * implemented in "Numerical recipies in C".
 * Instead of the implementation of the anorm
 * we preferred to use our function because it
 * is more time efficient.
 * Note that the matrix "a" will be destroyed.
 * @param {MatrixType | NumericMatrix} a - An upper
 * Hessenberg matrix.
 * @returns {{real: TypedArray | number[], imaginary: TypedArray | number[]}} - The
 * eigenvalues of the matrix a.
 */
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
    anorm: number;
  anorm = MatrixReduce(a, "norm1");
  nn = n - 1;
  t = 0.0;
  while (nn >= 0) {
    its = 0;
    do {
      for (l = nn; l > 0; l--) {
        s = abs(a[l - 1][l - 1]) + abs(a[l][l]);
        if (s === 0.0) s = anorm;
        if ((abs(a[l][l - 1]) + s) === s) break;
      }
      x = a[nn][nn];
      if (l === nn) {
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
          if (its === 30) new Error("Too many iterations in hqr");
          if (its === 10 || its === 20) {
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
            if ((u + v) === v) break;
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
    } while (l <= nn);
  }
  return { real: wr, imaginary: wi };
};


/**
 * This function is a translation of the hqr2 subroutine
 * in Fortran, which is a translation of the algol procedure
 * hqr2, num. math. 16, 181-204(1970) by peters and wilkinson.
 * handbook for auto. comp., vol.ii-linear algebra, 372-395(1971).
 *
 * This function finds the eigenvalues and eigenvectors
 * of a real upper hessenberg matrix by the qr method.  the
 * eigenvectors of a real general matrix can also be found
 * if  elmhes  and  eltran  or  orthes  and ortran  have
 * been used to reduce this general matrix to hessenberg form
 * and to accumulate the similarity transformations.
 * @param {MatrixType | NumericMatrix} a - a Hessenberg matrix.
 * @param {TypedArrayConstructor | ArrayConstructor} typedArray - the
 * desired form of the output.
 * @returns {{
 * eigenvalues: [
 * real: TypedArray \ number[],
 * imaginary: TypedArray | number[]
 * ]
 * }}
 */
export const modifiedHQR = (
  a: MatrixType | NumericMatrix,
  typedArray: TypedArrayConstructor | ArrayConstructor,
): {
  eigenvalues: {
    real: TypedArray | number[];
    imaginary: TypedArray | number[];
  };
  eigenvectors: MatrixType | NumericMatrix;
} => {
  let nn: Integer,
    m: Integer,
    l: Integer,
    k: Integer,
    j: Integer,
    its: Integer,
    i: Integer,
    mmin: Integer,
    na: Integer;
  let z: number,
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
    ra,
    sa,
    vr,
    vi;
  let temp: [number, number];
  const n: Integer = a.length;
  const wi = new typedArray(n);
  const wr = new typedArray(n);
  const zz = GenerateIdentityLikeMatrix(n, n, typedArray);

    // Compute the matrix norm for possible use
  // in locationg of signle small subdiagonal
  // elements.
  anorm = MatrixReduce(a, "norm1");
  nn = n - 1;
  t = 0.0;
  while (nn >= 0) {
    // Gets changed only by some exceptional shift.
    its = 0;
    // Begin search for the next eigenvalue.
    do {
      // Begin iteration. Search for single small
      // subdiagonal element.
      for (l = nn; l > 0; l--) {
        s = abs(a[l - 1][l - 1]) + abs(a[l][l]);
        if (s == 0.0) s = anorm;
        if (abs(a[l][l - 1]) <= EPS * s) {
          a[l][l - 1] = 0.0;
          break;
        }
      }
      x = a[nn][nn];
      if (l == nn) {
        // one root found...
        wr[nn] = a[nn][nn] = x + t;
        wi[nn--] = 0;
      } else {
        y = a[nn - 1][nn - 1];
        w = a[nn][nn - 1] * a[nn - 1][nn];
        if (l == nn - 1) {
          // two roots found...
          p = 0.5 * (y - x);
          q = p * p + w;
          z = sqrt(abs(q));
          x += t;
          a[nn][nn] = x;
          a[nn - 1][nn - 1] = y + t;
          if (q >= 0.0) {
            z = p + sign(z, p);
            wr[nn - 1] = wr[nn] = x + z;
            wi[nn - 1] = wi[nn] = 0;
            if (z != 0.0) wr[nn] = x - w / z;
            x = a[nn][nn - 1];
            s = abs(x) + abs(z);
            p = x / s;
            q = z / s;
            r = sqrt(p * p + q * q);
            p /= r;
            q /= r;
            // row modification.
            for (j = nn - 1; j < n; j++) {
              z = a[nn - 1][j];
              a[nn - 1][j] = q * z + p * a[nn][j];
              a[nn][j] = q * a[nn][j] - p * z;
            }
            // column modification.
            for (i = 0; i <= nn; i++) {
              z = a[i][nn - 1];
              a[i][nn - 1] = q * z + p * a[i][nn];
              a[i][nn] = q * a[i][nn] - p * z;
            }
            // acumulate transformations.
            for (i = 0; i < n; i++) {
              z = zz[i][nn - 1];
              zz[i][nn - 1] = q * z + p * zz[i][nn];
              zz[i][nn] = q * zz[i][nn] - p * z;
            }
          } else {
            // a complex pair located...
            [wr[nn], wi[nn]] = [x + p, -z];
            [wr[nn - 1], wi[nn - 1]] = [x + p, z];
          }
          nn -= 2;
        } else {
          // No toors found. Continue iteration.
          if (its == 30) throw new Error("Too many iterations in hqr");
          if (its == 10 || its == 20) {
            // Form exceptional shift.
            t += x;
            for (i = 0; i < nn + 1; i++) a[i][i] -= x;
            s = abs(a[nn][nn - 1]) + abs(a[nn - 1][nn - 2]);
            y = x = .75 * s;
            w = -.4375 * s * s;
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
            v = abs(p) * (abs(a[m - 1][m - 1]) + abs(z) + abs(a[m + 1][m + 1]));
            if (u <= EPS * v) break;
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
              if (k + 1 != nn) r = a[k + 2][k - 1];
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
              for (j = k; j < n; j++) {
                p = a[k][j] + q! * a[k + 1][j];
                if (k + 1 != nn) {
                  p += r! * a[k + 2][j];
                  a[k + 2][j] -= p * z;
                }
                a[k + 1][j] -= p * y;
                a[k][j] -= p * x;
              }
              mmin = nn < k + 3 ? nn : k + 3;
              for (i = 0; i < mmin + 1; i++) {
                p = x * a[i][k] + y * a[i][k + 1];
                if (k + 1 != nn) {
                  p += z * a[i][k + 2];
                  a[i][k + 2] -= p * r!;
                }
                a[i][k + 1] -= p * q!;
                a[i][k] -= p;
              }
              for (i = 0; i < n; i++) {
                p = x * zz[i][k] + y * zz[i][k + 1];
                if (k + 1 != nn) {
                  p += z * zz[i][k + 2];
                  zz[i][k + 2] -= p * r!;
                }
                zz[i][k + 1] -= p * q!;
                zz[i][k] -= p;
              }
            }
          }
        }
      }
    } while (l + 1 < nn);
  }
  // All roots found. Backsubstitute to 
  // find the vectors of upper triangular form.
  if (anorm != 0.0) {
    for (nn = n - 1; nn >= 0; nn--) {
      p = wr[nn];
      q = wi[nn];
      na = nn - 1;
      if (q == 0.0) {
        m = nn;
        a[nn][nn] = 1.0;
        for (i = nn - 1; i >= 0; i--) {
          w = a[i][i] - p;
          r = 0.0;
          for (j = m; j <= nn; j++) {
            r += a[i][j] * a[j][nn];
          }
          if (wi[i] < 0.0) {
            z = w;
            s = r;
          } else {
            m = i;
            if (wi[i] == 0.0) {
              t = w;
              if (t == 0.0) {
                t = EPS * anorm;
              }
              a[i][nn] = -r / t;
            } else {
              x = a[i][i + 1];
              y = a[i + 1][i];
              q = (wr[i] - p) * (wr[i] - p)+ (wi[i] * wi[i]);
              t = (x * s! - z! * r) / q;
              a[i][nn] = t;
              if (abs(x) > abs(z!)) {
                a[i + 1][nn] = (-r - w * t) / x;
              } else {
                a[i + 1][nn] = (-s! - y * t) / z!;
              }
            }
            t = abs(a[i][nn]);
            if (EPS * t * t > 1) {
              for (j = i; j <= nn; j++) {
                a[j][nn] /= t;
              }
            }
          }
        }
      } else if (q < 0.0) {
        m = na;
        if (abs(a[nn][na]) > abs(a[na][nn])) {
          a[na][na] = q / a[nn][na];
          a[na][nn] = -(a[nn][nn] - p) / a[nn][na];
        } else {
          temp = cdiv([0.0, -a[na][nn]], [a[na][na] - p, q]);
          a[na][na] = temp[0];
          a[na][nn] = temp[1];
        }
        a[nn][na] = 0.0;
        a[nn][nn] = 1.0;
        for (i = nn - 2; i >= 0; i--) {
          w = a[i][i] - p;
          ra = sa = 0.0;
          for (j = m; j <= nn; j++) {
            ra += a[i][j] * a[j][na];
            sa += a[i][j] * a[j][nn];
          }
          if (wi[i] < 0.0) {
            z = w;
            r = ra;
            s = sa;
          } else {
            m = i;
            if (wi[i] == 0.0) {
              temp = cdiv([-ra, -sa], [w, q]);
              a[i][na] = temp[0];
              a[i][nn] = temp[1];
            } else {
              x = a[i][i + 1];
              y = a[i + 1][i];
              vr = (wr[i] - p) * (wr[i] - p) + (wi[i] * wi[i]) - q * q;
              vi = 2.0 * q * (wr[i] - p);
              if (vr == 0.0 && vi == 0.0) {
                vr = EPS * anorm *
                  (abs(w) + abs(q) + abs(x) + abs(y) + abs(z!));
              }
              temp = cdiv([
                x * r! - z! * ra + q * sa,
                x * s! - z! * sa - q * ra,
              ], [vr, vi]);
              a[i][na] = temp[0];
              a[i][nn] = temp[1];
              if (abs(x) > abs(z!) + abs(q)) {
                a[i + 1][na] = (-ra - w * a[i][na] + q * a[i][nn]) / x;
                a[i + 1][nn] = (-sa - w * a[i][nn] - q * a[i][na]) / x;
              } else {
                temp = cdiv([-r! - y * a[i][na], -s! - y * a[i][nn]], [z!, q]);
                a[i + 1][na] = temp[0];
                a[i + 1][nn] = temp[1];
              }
            }
          }
          t = max(abs(a[i][na]), abs(a[i][nn]));
          if (EPS * t * t > 1) {
            for (j = i; j <= nn; j++) {
              a[j][na] /= t;
              a[j][nn] /= t;
            }
          }
        }
      }
    }
    for (j = n - 1; j >= 0; j--) {
      for (i = 0; i < n; i++) {
        z = 0.0;
        for (k = 0; k <= j; k++) {
          z += zz[i][k] * a[k][j];
        }
        zz[i][j] = z;
      }
    }
  }
  return {
    eigenvalues: {
      real: wr,
      imaginary: wi,
    },
    eigenvectors: zz,
  };
};
