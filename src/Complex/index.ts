"use strict";
import type { Integer } from "../Types";
import { abs, atan2, cos, exp, ln, pow, pythag, sin, sqrt } from "../utils";
import * as models from "./Models";
import * as errors from "./Errors";

/**
 * Represents a complex number.
 */
export class Complex {
  private _Im: number = 0;
  private _Re: number = 0;

  /**
   * Creates an instance of Complex.
   *
   * @param {Complex | number | undefined} a - If number,
   * represents the real part of the complex number.
   * If Complex, initializes with the provided complex number.
   * If undefined, initializes with zero.
   * @param {number | undefined} [b] - The imaginary part
   * of the complex number. If undefined, initializes with zero.
   */
  constructor(a?: Complex | number | undefined, b?: number | undefined) {
    let z1: number = 0, z2: number = 0;
    [z1, z2] = models.PrepareInput(a, b, z1, z2);
    this.Re = z1;
    this.Im = z2;
  }

  /**
   * Gets the real part of the complex number.
   *
   * @returns {number} The real part.
   */
  get Re(): number {
    return this._Re;
  }

  /**
   * Sets the real part of the complex number.
   *
   * @param {number | undefined} n - The new real part.
   */
  set Re(n: number | undefined) {
    if (n) this._Re = n;
  }

  /**
   * Gets the imaginary part of the complex number.
   *
   * @returns {number} The imaginary part.
   */
  get Im(): number {
    return this._Im;
  }

  /**
   * Sets the imaginary part of the complex number.
   *
   * @param {number | undefined} n - The new imaginary part.
   */
  set Im(n: number | undefined) {
    if (n) this._Im = n;
  }

  /**
   * Creates a copy of the complex number.
   *
   * @returns {Complex} A new instance
   * of Complex with the same value.
   */
  copy(): Complex {
    return new Complex(this);
  }

  /**
   * Adds a complex number or a real number to the current complex number.
   *
   * @param {Complex | number | undefined} a - The complex number or real part to add.
   * @param {number | undefined} [b] - The imaginary part to add.
   * @returns {Complex} The current instance with the sum.
   */ plus(a: Complex | number | undefined, b?: number | undefined): Complex {
    let z1: number = 0, z2: number = 0;
    [z1, z2] = models.PrepareInput(a, b, z1, z2);
    this._Re += z1;
    this._Im += z2;

    return this;
  }

  /**
   * Subtracts a complex number or a real number from the current complex number.
   *
   * @param {Complex | number | undefined} a - The complex number or real part to subtract.
   * @param {number | undefined} [b] - The imaginary part to subtract.
   * @returns {Complex} The current instance with the difference.
   */
  minus(a: Complex | number | undefined, b?: number | undefined): Complex {
    let z1: number = 0, z2: number = 0;
    [z1, z2] = models.PrepareInput(a, b, z1, z2);
    this._Re -= z1;
    this._Im -= z2;
    return this;
  }

  /**
   * Multiplies the current complex number by another
   * complex number or a real number.
   *
   * @param {Complex | number | undefined} a - The complex
   * number or real part to multiply with.
   * @param {number | undefined} [b] - The imaginary part to multiply with.
   * If "a" is a Complex instance, then it will be ignored.
   * @returns {Complex} The current instance with the product.
   */
  times(a: Complex | number | undefined, b?: number | undefined): Complex {
    let z1: number = 0,
      z2: number = 0,
      x: number = this._Re,
      y: number = this._Im;
    [z1, z2] = models.PrepareInput(a, b, z1, z2);
    // Gauss technique of multiplication:
    const m1: number = x * z1,
      m2: number = y * z2,
      m3: number = (x + y) * (z1 + z2);
    this._Re = m1 - m2;
    this.Im = m3 - m1 - m2;

    return this;
  }

  /**
   * Divides two complex numbers using technique
   * of Gauss - like trick according to the article of
   * Aleksandr Cariow:
   * A. Cariow, An algorithm for dividing two complex numbers,
   * West Pomeranian University of Technology, Szczecin,
   * Faculty of Computer Science and Information Technology,
   * Żołnierska 49, Szczecin 71-210, Poland.
   *
   * Note! The formula proposed from the A. Cariow has an
   * inaquracy in the sign. Instead of "-(x + y)", the
   * correct version is "(x + y)" for the computation of
   * the D3 matrix.
   *
   * @param {Complex | number | undefined} a - If is a number, represents
   * the real part of the complex number, if is undefined, the real part will
   * be set to zero and if is Complex instance then only this parameter
   * will be assumed as input.
   * @param {number | undefined} b - The imaginary part of the complex number
   * which will be used for the ivision. If is undefined and "a" is not Complex
   * instance, then the imaginary part will be set to zero. If "a" is Complex
   * instance, then this parameter will be ignored.
   * @returns {Complex} The current Complex instance will be changed with the
   * resulting of the division.
   */
  divide(a: Complex | number | undefined, b?: number | undefined): Complex {
    let z1: number = 0, z2: number = 0;
    [z1, z2] = models.PrepareInput(a, b, z1, z2);
    const x = this._Re, y = this._Im;
    if (z1 === 0 && z2 === 0) errors.ZeroDivision("divide")();
    const Y12 = models.AleksandrCariowComplexDivision(x, y, z1, z2);
    this._Re = Y12[0];
    this._Im = Y12[1];

    return this;
  }

  /**
   * Conjugates the current complex number.
   *
   * @returns {Complex} The current instance
   * with the conjugate.
   */
  conjugate(): Complex {
    this._Im = -this._Im;

    return this;
  }

  /**
   * Returns the absolute value
   * (magnitude) of the complex number.
   *
   * @returns {number} The absolute value.
   */
  abs(): number {
    const a = abs(this._Re);
    const b = abs(this._Im);

    return pythag(a, b);
  }

  /**
   * Returns the argument (phase) of the complex number.
   *
   * @returns {number} The argument in radians.
   */
  arg(): number {
    return atan2(this._Im, this._Re);
  }

  /**
   * Returns the sum of the absolute values
   * of the real and imaginary parts. This function
   * is used for the computation of the generalized
   * eigenproblem and more especially in the algorithm
   * LZ of Linda Kaufman.
   *
   * @returns {number} The sum of the absolute values.
   */
  cabs(): number {
    return abs(this._Re) + abs(this._Im);
  }

  /**
   * Computes the exponential of the current complex number (e^(x + iy)).
   *
   * @returns {Complex} The current instance updated with
   * the exponential of the original complex number.
   */
  exp(): Complex {
    const a = this._Re;
    const b = this._Im;
    this._Re = exp(a) * cos(b);
    this._Im = exp(a) * sin(b);

    return this;
  }

  /**
   * Raises the current complex number to the power
   * of another complex number or a real number.
   *
   * @param {Complex | number | undefined} a - The exponent complex number or real part.
   * @param {number | undefined} [b] - The imaginary part of the exponent.
   * If the "a" is a Complex instance, it will be ignored.
   * @returns {Complex} The current instance raised to the given power.
   */
  pow(a?: Complex | number | undefined, b?: number | undefined): Complex {
    let z1: number = 0,
      z2: number = 0,
      x: number = this._Re,
      y: number = this._Im,
      i: Integer;
    [z1, z2] = models.PrepareInput(a, b, z1, z2);
    if (z1 === 0 && z2 === 0) {
      this._Re = 1;
      this._Im = 0;
    } else {
      if (z2 === 0 && (!!!(z1 % 1))) {
        const p = new Complex(this);
        for (i = z1 - 1; i--;) p.times(this);
        this._Re = p._Re;
        this._Im = p._Im;
      } else {
        const arg = this.arg();
        const m = exp(-z2 * arg) * pow(pythag(x, y), z1);
        const t = z1 * arg + .5 * z2 * ln(x * x + y * y);
        this._Re = m * cos(t);
        this._Im = m * sin(t);
      }
    }

    return this;
  }

  /**
   * Checks if the current complex number is equal to another complex number.
   *
   * @param {Complex | number | undefined} a - The complex number or real part to compare with.
   * @param {number | undefined} [b] - The imaginary part to compare with.
   * If "a" is defined as Complex instance, then will be ignored.
   * @returns {boolean} True if the complex numbers are equal, false otherwise.
   */
  isEquals(a?: Complex | number | undefined, b?: number | undefined): boolean {
    let z1: number = 0,
      z2: number = 0,
      x: number = this._Re,
      y: number = this._Im;
    [z1, z2] = models.PrepareInput(a, b, z1, z2);

    return (x === z1) && (y == z2);
  }

  isNearlyEquals(
    a?: Complex | number | undefined,
    b?: number | undefined,
    epsilon: number = 1e-8,
  ): boolean {
    let z1: number = 0, z2: number = 0;
    [z1, z2] = models.PrepareInput(a, b, z1, z2);
    return this.copy().minus(z1, z2).abs() <= epsilon;
  }

  /**
   * Computes the natural logarithm of the complex number.
   *
   * @returns {Complex} The current instance updated with its natural logarithm.
   */
  log(): Complex {
    const magnitude = this.abs();
    const angle = this.arg();
    this._Re = ln(magnitude);
    this._Im = angle;

    return this;
  }

  /**
   * Computes the square root of the complex number.
   *
   * @returns {Complex} The current instance updated with its square root.
   */
  sqrt(): Complex {
    const magnitude = this.abs();
    const angle = this.arg();
    this._Re = sqrt(magnitude) * cos(.5 * angle);
    this._Im = sqrt(magnitude) * sin(.5 * angle);

    return this;
  }

  /**
   * Computes the reciprocal (1/z) of the complex number.
   *
   * @returns {Complex} The current instance updated with its reciprocal.
   */
  reciprocal(): Complex {
    const x: number = this._Re, y: number = this._Im;
    const denominator: number = x * x + y * y;
    if (denominator === 0) errors.ZeroDivision("reciprocal")();
    this._Re /= denominator;
    this._Im /= -denominator;

    return this;
  }

  /**
   * Normalizes the complex number (makes its magnitude equal to 1).
   *
   * @returns {Complex} The current instance normalized.
   */
  normalize(): Complex {
    const magnitude: number = this.abs();
    if (magnitude === 0) errors.ZeroDivision("normalize")();
    this._Re /= magnitude;
    this._Im /= magnitude;

    return this;
  }

  /**
   * Returns a string representation of the complex number.
   * The format is "a + bi" or "a - bi" depending on the sign of the imaginary part.
   * If the imaginary part is zero, it only returns "a".
   *
   * @returns {string} A string representation of the complex number.
   */
  toString(): string {
    return `${this._Re}${this._Im > 0 ? " + " : this._Im < 0 ? " - " : ""}${
      this._Im > 0 ? this._Im + "i" : this.Im < 0 ? -this._Im + "i" : ""
    }`;
  }
}
