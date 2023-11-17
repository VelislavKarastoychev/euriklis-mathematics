"use strict";
import * as conditions from "./Conditions/index.ts";
import * as models from "./Models/index.ts";
import * as errors from "./Errors/index.ts";
import {
  MatrixDeclaration,
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArrayConstructor,
} from "./types.ts";

export class Matrix {
  /**
   * @private {MatrixType} #M - A holder of the matrix instance
   */
  #M: MatrixType = [];
  /**
   * @private {NumericType} #type - A holder for the type of the
   * current matrix instance. By default this property will be
   * set to "float64" (double precision) type.
   */
  #type: NumericType = "float64";

  /**
   * Checks if the input parameter "m" is a Matrix
   * instance from the Matrix library of the @euriklis/mathematics.
   * @param m - A Matrix instance.
   * @returns {boolean} - True if the "m" parameter is a
   * Matrix and false otherwise.
   */
  static isMatrix (m: Matrix): boolean {
    return conditions.IsMatrix(m);
  } 
  /**
   * Creates a new Matrix instance with randomized values.
   * @param rows - The number of rows.
   * @param columns - The number of columns.
   * @param from - The minimum value for randomization.
   * @param to - The maximum value for randomization.
   * @param type - The numeric type of the matrix.
   * @param seed - The seed for randomization.
   * @returns A new Matrix instance.
   */
  static random(
    rows: number,
    columns: number,
    from = 0,
    to = 1,
    type: NumericType = "float64",
    seed: number = 123445,
  ): Matrix {
    const rand = new Matrix();
    rand.#M = models.GenerateRandomMatrix(rows, columns, from, to, type, seed);
    return rand;
  }

  /**
   * Creates a new Matrix instance.
   * @param options - The options for matrix initialization.
   * @returns A new Matrix instance.
   */
  constructor(options?: MatrixDeclaration) {
    if (options !== undefined) {
      this.type = options.type;
      this.M = options.M;
    }
  }

  /**
   * Gets the matrix data.
   * @returns The numeric matrix.
   */
  get M(): NumericMatrix {
    return models.ObtainMatrixFromTypedMatrix(this.#M);
  }

  /**
   * Sets the matrix data.
   * @param matrix - The numeric matrix.
   */
  set M(matrix: NumericMatrix) {
    if (conditions.IsArrayOfArraysWithEqualSize(matrix)) {
      const matrixType: TypedArrayConstructor = models
        .CreateTypedArrayConstructor(this.type);
      models.InitializeMatrix(matrixType, matrix, this.#M);
    } else errors.IncorrectMatrixInput();
  }

  /**
   * Gets the numeric type of the matrix.
   * @returns The numeric type.
   */
  get type(): NumericType {
    return this.#type;
  }

  /**
   * Sets the numeric type of the matrix.
   * @param type - The numeric type.
   */
  set type(type: NumericType) {
    this.#type = type;
    if (this.rows) this.M = this.M;
  }

  /**
   * @readonly
   * Returns the rows of the current matrix instance.
   */
  get rows(): number {
    return this.#M.length;
  }
  
  /**
   * @readonly
   * Returns the number of columns of the current
   * Matrix instance.
   */
  get columns(): number {
    return this.rows ? this.#M[0].length : 0;
  }
}
