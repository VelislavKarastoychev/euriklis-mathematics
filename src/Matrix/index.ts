"use strict";
import * as conditions from "./Conditions/index.ts";
import * as models from "./Models/index.ts";
import * as errors from "./Errors/index.ts";
import {
  Integer,
  MatrixBlockOptions,
  MatrixDeclaration,
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArrayConstructor,
} from "./types";

export class Matrix {
  // 1. Declaration of the private methods and properties

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

  // 2. Static methods

  /**
   * Checks if the input parameter "m" is a Matrix
   * instance from the Matrix library of the @euriklis/mathematics.
   *
   * @param m - A Matrix instance.
   * @returns {boolean} - True if the "m" parameter is a
   * Matrix and false otherwise.
   */
  static isMatrix(m: any): boolean {
    return conditions.IsMatrix(m);
  }

  /**
   * Creates a matrix with zero elements
   *
   * @param rows - an integer greater than zero
   * @param columns - an integer greater than zero
   * @param {NumericType} type
   */
  static zeros(
    rows: Integer,
    columns: Integer,
    type: NumericType = "float64",
  ): Matrix {
    const z = new Matrix();
    z.#M = models.GenerateZeroMatrix(rows, columns, type);
    return z;
  }

  /**
   * Generates a square zero matrix
   *
   * @param n - The number of the rows and the columns of the Matrix
   * @param type - The type of each element of the Matrix
   * @returns A square zero Matrix
   */
  static zero(n: Integer, type: NumericType = "float64"): Matrix {
    return Matrix.zeros(n, n, type);
  }

  /**
   * Generates an identity-like matrix with specified dimensions.
   *
   * @param {Integer} rows - The number of rows of the matrix.
   * @param {Integer} columns - The number of columns of the matrix.
   * @param {NumericType} type - The type of each element of the matrix.
   * @returns {Matrix} - An identity-like matrix.
   */
  static identityLike(
    rows: Integer,
    columns: Integer,
    type: NumericType = "float64",
  ): Matrix {
    const I = new Matrix();
    I.#M = models.GenerateIdentityLikeMatrix(rows, columns, type);
    return I;
  }

  /**
   * Generates identity matrix with specified dimensions
   *
   * @param n - The number of rows/columns of the identity matrix
   * @returns {Matrix} The identity matrix
   */
  static identity(n: Integer, type: NumericType = "float64"): Matrix {
    return Matrix.identityLike(n, n, type);
  }

  /**
   * Creates a new Matrix with specified dimensions,
   * where each element is initialized to the same numeric value.
   *
   * @static
   * @param {number} n - The numeric value to replicate.
   * @param {Integer} rows - The number of rows in the new matrix.
   * @param {Integer} columns - The number of columns in the new matrix.
   * @param {NumericType} [type="float64"] - The numeric type of the matrix elements.
   * @returns {Matrix} A new Matrix with the specified dimensions and replicated numeric value.
   * @throws {Error} If rows or columns are not positive.
   */
  static replicate(
    n: number,
    rows: Integer,
    columns: Integer,
    type: NumericType = "float64",
  ): Matrix {
    const rep: Matrix = new Matrix();
    if (rows > 0 && columns > 0) {
      rep.#M = models.Replicate(n, rows, columns, type) as MatrixType;
    } else errors.IncorrectRowsOrColumnsParameterInReplicate();

    return rep;
  }

  /**
   * Creates a new Matrix instance with randomized values.
   *
   * @param rows - The number of rows.
   * @param columns - The number of columns.
   * @param from - The minimum value for randomization.
   * @param to - The maximum value for randomization.
   * @param type - The numeric type of the matrix.
   * @param seed - The seed for randomization.
   * @returns A new Matrix instance.
   */
  static random(
    rows: Integer,
    columns: Integer,
    from: Integer = 0,
    to: Integer = 1,
    type: NumericType = "float64",
    seed: number = 123445,
  ): Matrix {
    const rand: Matrix = new Matrix();
    rand.#M = models.GenerateRandomMatrix(rows, columns, from, to, type, seed);
    return rand;
  }

  // 3. Constructor

  /**
   * Creates a new Matrix instance.
   * @param options - The options for matrix initialization.
   * @returns A new Matrix instance.
   */
  constructor(
    options?: MatrixDeclaration | Matrix | NumericMatrix | MatrixType,
  ) {
    if (options !== undefined) {
      if (
        Matrix.isMatrix(options) ||
        conditions.IsMatrixDeclaration(options as MatrixDeclaration)
      ) {
        this.type = (options as Matrix | MatrixDeclaration).type || "float64";
        this.M = (options as Matrix).M;
      } else {
        this.type = "float64";
        this.M = options as NumericMatrix | MatrixType;
      }
    }
  }

  // 4. Properties and utility fields

  /**
   * Gets the matrix data.
   *
   * @returns The numeric matrix.
   */
  get M(): NumericMatrix {
    return models.ObtainMatrixFromTypedMatrix(this.#M);
  }

  /**
   * Sets the matrix data.
   *
   * @param matrix - The numeric matrix.
   */
  set M(matrix: NumericMatrix | MatrixType) {
    if (conditions.IsArrayOfArraysWithEqualSize(matrix)) {
      const matrixType: TypedArrayConstructor = models
        .CreateTypedArrayConstructor(this.type);
      models.InitializeMatrix(matrixType, matrix, this.#M);
    } else errors.IncorrectMatrixInput();
  }

  get data() {
    const typedArray = models.CreateTypedArrayConstructor(this.type);
    return this.#M.map((row) => new typedArray(row));
  }

  /**
   * Gets the numeric type of the matrix.
   *
   * @returns The numeric type.
   */
  get type(): NumericType {
    return this.#type;
  }

  /**
   * Sets the numeric type of the matrix.
   *
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
  get rows(): Integer {
    return this.#M.length;
  }

  /**
   * @readonly
   * Returns the number of columns of the current
   * Matrix instance.
   */
  get columns(): Integer {
    return this.rows ? this.#M[0].length : 0;
  }

  /**
   * @readonly
   * @returns {boolean} True if the matrix is squared
   * and false otherwise.
   */
  get isSquare(): boolean {
    return this.rows !== this.columns;
  }

  // 5. Utility functions or operators
  // for matrix manipulation.

  /**
   * Checks if the elements of the current Matrix are equal to
   * the corresponding elements of the provided matrix.
   *
   * @param {Matrix | NumericMatrix | MatrixType} matrix - The matrix used
   * for comparison
   * @returns {boolean} True, if the elements of the current matrix instance
   * are equal to the elements of the "matrix" parameter, false otherwise.
   */
  isEqualTo(matrix: Matrix | NumericMatrix | MatrixType): boolean {
    const m: MatrixType | NumericMatrix = Matrix.isMatrix(matrix as Matrix)
      ? (matrix as Matrix).#M
      : (matrix as MatrixType | NumericMatrix);
    if (this.rows !== m.length || this.columns !== m[0].length) return false;
    else if (this.rows < 20 && this.columns < 20) {
      return JSON.stringify(this.#M) === JSON.stringify(m);
    } else return models.CompareMatrices(this.#M, m, "eq");
  }

  /**
   * Checks if the elements of the current Matrix are greater than
   * the elements of the "matrix" parameter of the method.
   *
   * @param {Matrix | NumericMatrix | MatrixType} matrix - The matrix used
   * for comparison
   * @returns {boolean} true, if the elements of the current matrix instance
   * are greater than the elements of the "matrix" parameter, false otherwise.
   */
  isGreaterThan(matrix: Matrix | NumericMatrix | MatrixType): boolean {
    const m: MatrixType | NumericMatrix = Matrix.isMatrix(matrix as Matrix)
      ? (matrix as Matrix).#M
      : (matrix as MatrixType | NumericMatrix);
    if (this.rows !== m.length || this.columns !== m[0].length) return false;
    else return models.CompareMatrices(this.#M, m, "gt");
  }

  /**
   * Checks if the elements of the current Matrix are greater than or equal to
   * the elements of the "matrix" parameter of the method.
   *
   * @param {Matrix | NumericMatrix | MatrixType} matrix - The matrix used
   * for comparison
   * @returns {boolean} true, if the elements of the current matrix instance
   * are greater than or equal to the elements of the "matrix" parameter, false otherwise.
   */
  isGreaterThanOrEqual(matrix: Matrix | NumericMatrix | MatrixType): boolean {
    const m: MatrixType | NumericMatrix = Matrix.isMatrix(matrix as Matrix)
      ? (matrix as Matrix).#M
      : (matrix as MatrixType | NumericMatrix);
    if (this.rows !== m.length || this.columns !== m[0].length) return false;
    else return models.CompareMatrices(this.#M, m, "geq");
  }

  /**
   * Checks if all elements of the current Matrix are less than the corresponding
   * elements of the provided matrix.
   *
   * @param {Matrix | NumericMatrix | MatrixType} matrix - The matrix for comparison.
   * @returns {boolean} True if all elements of the current matrix are less than
   * the corresponding elements of the provided matrix, false otherwise.
   */
  isLessThan(matrix: Matrix | NumericMatrix | MatrixType): boolean {
    const m: MatrixType | NumericMatrix = Matrix.isMatrix(matrix as Matrix)
      ? (matrix as Matrix).#M
      : (matrix as NumericMatrix | MatrixType);
    if (this.rows !== m.length || this.columns !== m[0].length) return false;
    else return models.CompareMatrices(this.#M, m, "lt");
  }

  /**
   * Checks if the elements of the current Matrix are less than or equal to
   * the elements of the "matrix" parameter.
   *
   * @param {Matrix | NumericMatrix | MatrixType} matrix - The matrix used for comparison.
   * @returns {boolean} true, if the elements of the current matrix instance are less than
   * or equal to the elements of the "matrix" parameter, false otherwise.
   */
  isLessThanOrEqual(matrix: Matrix | NumericMatrix | MatrixType): boolean {
    const m: MatrixType | NumericMatrix = Matrix.isMatrix(matrix as Matrix)
      ? (matrix as Matrix).#M
      : (matrix as NumericMatrix | MatrixType);
    if (this.rows !== m.length || this.columns !== m[0].length) return false;
    else return models.CompareMatrices(this.#M, m, "leq");
  }

  /**
   * Gets a block matrix by given starting and ending indices
   *
   * @param options - The "from" and "to" indices needed for the method
   *   (by default set to [0, 0] and [rows - 1, columns - 1]).
   * @returns {Matrix} The block as Matrix
   */
  getBlock(
    options: MatrixBlockOptions = {
      from: [0, 0],
      to: [this.rows - 1, this.columns - 1],
    },
  ): Matrix {
    const { from, to } = options;

    if (
      !conditions.AreFromAndToCorrectlyDefined(from, to, [
        this.rows,
        this.columns,
      ])
    ) {
      errors.IncorrectFromAndToParametersInGetBlock();
    }
    const block = new Matrix();
    block.#M = models.GetBlock(this.#M, from, to, this.type);

    return block;
  }

  /**
   * Sets the elements of a block/ sub - matrix of the current Matrix
   * instance with the elements of the "block" parameter.
   *
   * @param options - The "block", "from," and "to" parameters needed for the method.
   * @returns {Matrix} The updated Matrix instance.
   */
  setBlock(
    options: MatrixBlockOptions & {
      block: NumericMatrix | Matrix | MatrixType;
    },
  ): Matrix {
    let b: NumericMatrix | MatrixType | null = null;
    const { block, from, to } = options;

    if (
      !conditions.AreFromAndToCorrectlyDefined(from, to, [
        this.rows,
        this.columns,
      ])
    ) {
      errors.IncorrectFromAndToParametersInSetBlock();
    }
    if (Matrix.isMatrix(block as Matrix)) {
      b = (block as Matrix).#M;
    } else b = block as NumericMatrix;
    if (conditions.IsArrayOfArraysWithEqualSize(b as NumericMatrix)) {
      if (
        (b as NumericMatrix).length > (to[0] - from[0] + 1) ||
        (b as NumericMatrix)[0].length > (to[1] - from[1] + 1)
      ) {
        errors.IncorrectBlockParameterInSetBlock();
      }
    }

    models.SetBlock(this.#M, b as NumericMatrix, from, to);

    return this;
  }
  /**
   * Retrieves a specific row from the matrix based on the provided row index
   * and optional column range.
   *
   * @param {Integer} rowIndex - The index of the row to retrieve.
   * @param {Integer} [fromColumnIndex=0] - The starting column index (default is 0).
   * @param {Integer} [toColumnIndex=this.columns - 1] - The ending column index (default is the last column).
   * @returns {Matrix} - The extracted row as a Matrix.
   */
  getRow(
    rowIndex: Integer,
    fromColumnIndex: Integer = 0,
    toColumnIndex: Integer = this.columns - 1,
  ): Matrix {
    return this.getBlock({
      from: [rowIndex, fromColumnIndex],
      to: [rowIndex, toColumnIndex],
    });
  }

  /**
   * Sets the values of a specific row in the matrix based on the provided row index,
   * column range, and values.
   *
   * @param {Integer} rowIndex - The index of the row to set.
   * @param {Integer} fromColumnIndex - The starting column index.
   * @param {Integer} toColumnIndex - The ending column index.
   * @param {NumericMatrix | Matrix} row - The values to set in the specified row.
   * @returns {Matrix} - The updated matrix instance.
   */
  setRow(
    rowIndex: Integer,
    fromColumnIndex: Integer,
    toColumnIndex: Integer,
    row: NumericMatrix | Matrix,
  ): Matrix {
    return this.setBlock({
      from: [rowIndex, fromColumnIndex],
      to: [rowIndex, toColumnIndex],
      block: row,
    });
  }

  /**
   * Exchange rows in the matrix.
   *
   * @param {Integer} row1 - The index of the first row to exchange.
   * @param {Integer} row2 - The index of the second row to exchange.
   * @param {Integer} fromColumn - The starting column index (inclusive).
   * @param {Integer} toColumn - The ending column index (exclusive).
   * @returns {Matrix} The updated Matrix instance (The initial matrix is not copied).
   */
  exchangeRows(
    row1: Integer,
    row2: Integer,
    fromColumn: Integer = 0,
    toColumn: Integer = this.columns - 1,
  ): Matrix {
    if (row1 < 0 || row1 >= this.rows || row2 < 0 || row2 >= this.rows) {
      errors.IncorrectRowIndexParametersInExchangeRows();
    }

    if (fromColumn < 0 || fromColumn > toColumn) {
      errors.IncorrectFromColumnIndexParameterInExchangeRows();
    }

    if (toColumn < fromColumn || toColumn > this.columns || toColumn < 0) {
      errors.IncorrectToColumnIndexParameterInExcangeRows();
    }

    models.ExchangeRows(this.#M, row1, row2, fromColumn, toColumn);

    return this;
  }

  /**
   * Exchange columns in the matrix
   *
   * @param {Integer} col1 - The index of the first column to exchange
   * @param {Integer} col2 - The index of the second column to exchange
   * @param {Integer} fromRow - The starting row index
   * @param {Integer} toRow - The ending row index
   * @returns {Matrix} The updated matrix instance (the previous values are not copied)
   */
  exchangeColumns(
    col1: Integer,
    col2: Integer,
    fromRow: Integer = 0,
    toRow: Integer = this.rows - 1,
  ): Matrix {
    if (col1 < 0 || col1 > this.columns || col2 < 0 || col2 >= this.columns) {
      errors.IncorrectColumnIndexParametersInExchangeColumns();
    }

    if (fromRow < 0 || fromRow > toRow) {
      errors.IncorrectFromRowIndexParameterInExchangeColumns();
    }

    if (toRow < 0 || toRow >= this.rows) {
      errors.IncorrectToRowIndexParameterInExchangeColumns();
    }

    models.ExchangeColumns(this.#M, col1, col2, fromRow, toRow);

    return this;
  }

  /**
   * Gets the diagonal of the matrix or the subdiagonal when a row index is defined.
   *
   * @param {Integer} row - The row index for subdiagonal (default is 0).
   * @returns {Matrix} - The diagonal or subdiagonal as a Matrix.
   */
  getDiagonal(row: Integer = 0): Matrix {
    if (row < 0 || row >= this.rows) {
      errors.IncorrectRowIndexParameterInGetDiagonal();
    }

    const typedArray = models.CreateTypedArrayConstructor(this.type);
    const diagonalMatrix = new Matrix();
    diagonalMatrix.#M = models.GetDiagonal(this.#M, row, typedArray);

    return diagonalMatrix;
  }
  /**
   * Converts the current matrix into collection of
   * diagonal matrix blocks.
   *
   * @returns {Matrix} - The resulting diagonal matrix.
   */
  toDiagonalMatrix(): Matrix {
    const diagMatrix = new Matrix();
    diagMatrix.#M = models.ToDiagonalMatrix(this.#M, this.type);

    return diagMatrix;
  }

  /**
   * Appends a block to the right side of the current matrix instance.
   *
   * @param {NumericMatrix | MatrixType | Matrix} block - The block to append.
   * @returns {Matrix} - The extended matrix instance.
   */
  appendBlockRight(block: NumericMatrix | MatrixType | Matrix): Matrix {
    let blockData: MatrixType | undefined;
    if (Matrix.isMatrix(block)) {
      blockData = (block as Matrix).#M;
    } else {
      blockData = new Matrix(block).#M;
    }
    if (!conditions.IsEmpty(blockData)) {
      if (blockData.length !== this.rows) {
        errors.IncorrectBlockParameterInAppendBlockRight();
      }
      const typedArray = models.CreateTypedArrayConstructor(this.type);
      const extendedMatrix = new Matrix();
      extendedMatrix.#M = models.AppendBlockRight(
        this.#M,
        blockData,
        typedArray,
      );
      return extendedMatrix;
    }
    return this;
  }

  /**
   * Appends a block to the bottom of the current matrix instance.
   *
   * @param {NumericMatrix | MatrixType | Matrix} block - The block to append.
   * @returns {Matrix} - The extended matrix instance.
   */
  appendBlockBottom(block: NumericMatrix | MatrixType | Matrix): Matrix {
    let blockData: MatrixType | undefined;
    if (Matrix.isMatrix(block)) {
      blockData = (block as Matrix).#M;
    } else {
      blockData = new Matrix(block).#M;
    }

    if (!conditions.IsEmpty(blockData)) {
      if (blockData[0].length !== this.columns) {
        errors.IncorrectBlockParameterInAppendBlockBottom();
      }
      const typedArray = models.CreateTypedArrayConstructor(this.type);
      const extendedMatrix = new Matrix();
      extendedMatrix.#M = models.AppendBlockBottom(
        this.#M,
        blockData,
        typedArray,
      );

      return extendedMatrix;
    }

    return this;
  }

  // 6. Matrix operations and
  // common linear algebra algorithms.

  /**
   * Transposes the current matrix,
   * swapping its rows and columns.
   *
   * @returns {Matrix} Returns a new Matrix
   * instance representing the transposed matrix.
   */
  transpose(): Matrix {
    if (this.rows === 1 && this.columns === 1) return this;
    const typedArray = models.CreateTypedArrayConstructor(this.type);
    const transposed = new Matrix();
    transposed.#M = models.TransposeMatrix(
      this.#M,
      this.rows,
      this.columns,
      typedArray,
    );

    return transposed;
  }

  get T() {
    return this.transpose();
  }
  /**
   * Calculates the Frobenius norm of a matrix.
   *
   * @memberof Matrix
   * @type {number}
   * @readonly
   * @throws {Error} If the matrix is not valid.
   * @returns {number} The Frobenius (Euclidean) 
   * norm of the matrix.
   */
  get FrobeniusNorm(): number {
    return models.FrobeniusNorm(this.#M);
  }
}
