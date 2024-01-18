"use strict";
import * as conditions from "./Conditions/index.ts";
import * as models from "./Models/index.ts";
import * as errors from "./Errors/index.ts";
import {
  ifFromOrToParametersAreIncorrectlyDefinedThrow,
  ifIsNotArrayOfArraysWithEqualSizeThrow,
  ifIsNotNumberOrMatrixThrow,
  ifRowsAndColumnsAreInappropriatelyDefinedThrow,
  ifRowsOrColumnsAreNotPositiveIntegersThrow,
  resetMatrix,
} from "./Decorators/index.ts";
import {
  Integer,
  MatrixBlockOptions,
  MatrixDeclaration,
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArray,
  TypedArrayConstructor,
} from "./types";

export class Matrix {
  // 1. Declaration of the private methods and properties

  /**
   * @private {MatrixType} #M - A holder of the matrix instance
   */
  private _M: MatrixType = [];
  /**
   * @private {NumericType} #type - A holder for the type of the
   * current matrix instance. By default this property will be
   * set to "float64" (double precision) type.
   */
  private _type: NumericType = "float64";

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
  @ifRowsOrColumnsAreNotPositiveIntegersThrow(
    errors.IncorrectRowsOrColumnsParametersInZeros,
  )
  static zeros(
    rows: Integer,
    columns: Integer,
    type: NumericType = "float64",
  ): Matrix {
    const z = new Matrix();
    z._M = models.GenerateZeroMatrix(rows, columns, type);
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
  @ifRowsOrColumnsAreNotPositiveIntegersThrow(
    errors.IncorrectRowsOrColumnsParametersInIdentityLike,
  )
  static identityLike(
    rows: Integer,
    columns: Integer,
    type: NumericType = "float64",
  ): Matrix {
    const I = new Matrix();
    I._M = models.GenerateIdentityLikeMatrix(rows, columns, type);
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
  @ifRowsOrColumnsAreNotPositiveIntegersThrow(
    errors.IncorrectRowsOrColumnsParameterInReplicate,
    1,
    2,
  )
  static replicate(
    n: number,
    rows: Integer,
    columns: Integer,
    type: NumericType = "float64",
  ): Matrix {
    const rep: Matrix = new Matrix();
    rep._M = models.Replicate(n, rows, columns, type) as MatrixType;

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
  @ifRowsOrColumnsAreNotPositiveIntegersThrow(
    errors.IncorrectRowsOrColumnsParameterInRandom,
  )
  static random(
    rows: Integer,
    columns: Integer,
    from: Integer = 0,
    to: Integer = 1,
    type: NumericType = "float64",
    seed: number = 123445,
  ): Matrix {
    const rand: Matrix = new Matrix();
    rand._M = models.GenerateRandomMatrix(rows, columns, from, to, type, seed);
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
    return models.ObtainMatrixFromTypedMatrix(this._M);
  }

  /**
   * Sets the matrix data.
   *
   * @param matrix - The numeric matrix.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  set M(matrix: NumericMatrix | MatrixType) {
    const matrixType: TypedArrayConstructor = models
      .CreateTypedArrayConstructor(this._type);
    models.InitializeMatrix(matrixType, matrix, this._M);
  }

  get data() {
    const typedArray = models.CreateTypedArrayConstructor(this._type);
    return this._M.map((row: TypedArray) => new typedArray(row));
  }

  /**
   * Gets the numeric type of the matrix.
   *
   * @returns The numeric type.
   */
  get type(): NumericType {
    return this._type;
  }

  /**
   * Sets the numeric type of the matrix.
   *
   * @param type - The numeric type.
   */
  @resetMatrix
  set type(type: NumericType) {
    this._type = type;
  }

  /**
   * @readonly
   * Returns the rows of the current matrix instance.
   */
  get rows(): Integer {
    return this._M.length;
  }

  /**
   * @readonly
   * Returns the number of columns of the current
   * Matrix instance.
   */
  get columns(): Integer {
    return this.rows ? this._M[0].length : 0;
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
      ? (matrix as Matrix)._M
      : (matrix as MatrixType | NumericMatrix);
    if (this.rows !== m.length || this.columns !== m[0].length) return false;
    else return models.CompareMatrices(this._M, m, "eq");
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
      ? (matrix as Matrix)._M
      : (matrix as MatrixType | NumericMatrix);
    if (this.rows !== m.length || this.columns !== m[0].length) return false;
    else return models.CompareMatrices(this._M, m, "gt");
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
      ? (matrix as Matrix)._M
      : (matrix as MatrixType | NumericMatrix);
    if (this.rows !== m.length || this.columns !== m[0].length) return false;
    else return models.CompareMatrices(this._M, m, "geq");
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
      ? (matrix as Matrix)._M
      : (matrix as NumericMatrix | MatrixType);
    if (this.rows !== m.length || this.columns !== m[0].length) return false;
    else return models.CompareMatrices(this._M, m, "lt");
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
      ? (matrix as Matrix)._M
      : (matrix as NumericMatrix | MatrixType);
    if (this.rows !== m.length || this.columns !== m[0].length) return false;
    else return models.CompareMatrices(this._M, m, "leq");
  }

  /**
   * Gets a block matrix by given starting and ending indices
   *
   * @param options - The "from" and "to" indices needed for the method
   *   (by default set to [0, 0] and [rows - 1, columns - 1]).
   * @returns {Matrix} The block as Matrix
   */
  @ifFromOrToParametersAreIncorrectlyDefinedThrow(
    errors.IncorrectFromAndToParametersInGetBlock,
  )
  getBlock(
    options?: MatrixBlockOptions,
  ): Matrix {
    const { from, to } = options as MatrixBlockOptions;
    const block = new Matrix();
    block._M = models.GetBlock(this._M, from, to, this._type);

    return block;
  }

  /**
   * Sets the elements of a block/ sub - matrix of the current Matrix
   * instance with the elements of the "block" parameter.
   *
   * @param options - The "block", "from," and "to" parameters needed for the method.
   * @returns {Matrix} The updated Matrix instance.
   */
  @ifFromOrToParametersAreIncorrectlyDefinedThrow(
    errors.IncorrectFromAndToParametersInSetBlock,
  )
  setBlock(
    options: MatrixBlockOptions & {
      block: NumericMatrix | Matrix | MatrixType;
    },
  ): Matrix {
    let b: NumericMatrix | MatrixType | null = null;
    const { block, from, to } = options;

    if (Matrix.isMatrix(block as Matrix)) {
      b = (block as Matrix)._M;
    } else b = block as NumericMatrix;
    if (conditions.IsArrayOfArraysWithEqualSize(b as NumericMatrix)) {
      if (
        (b as NumericMatrix).length > (to[0] - from[0] + 1) ||
        (b as NumericMatrix)[0].length > (to[1] - from[1] + 1)
      ) {
        errors.IncorrectBlockParameterInSetBlock();
      }
    }

    models.SetBlock(this._M, b as NumericMatrix, from, to);

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

    models.ExchangeRows(this._M, row1, row2, fromColumn, toColumn);

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

    models.ExchangeColumns(this._M, col1, col2, fromRow, toRow);

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
    diagonalMatrix._M = models.GetDiagonal(this._M, row, typedArray);

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
    diagMatrix._M = models.ToDiagonalMatrix(this._M, this.type);

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
      blockData = (block as Matrix)._M;
    } else {
      blockData = new Matrix(block)._M;
    }
    if (!conditions.IsEmpty(blockData)) {
      if (blockData.length !== this.rows) {
        errors.IncorrectBlockParameterInAppendBlockRight();
      }
      const typedArray = models.CreateTypedArrayConstructor(this.type);
      const extendedMatrix = new Matrix();
      extendedMatrix._M = models.AppendBlockRight(
        this._M,
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
      blockData = (block as Matrix)._M;
    } else {
      blockData = new Matrix(block)._M;
    }

    if (!conditions.IsEmpty(blockData)) {
      if (blockData[0].length !== this.columns) {
        errors.IncorrectBlockParameterInAppendBlockBottom();
      }
      const typedArray = models.CreateTypedArrayConstructor(this.type);
      const extendedMatrix = new Matrix();
      extendedMatrix._M = models.AppendBlockBottom(
        this._M,
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
   * Reshapes the matrix to have the specified number of rows and columns.
   * Throws an error if the provided rows and columns are inappropriate.
   *
   * @param {Integer} rows - The desired number of rows for the reshaped matrix.
   * @param {Integer} columns - The desired number of columns for the reshaped matrix.
   * @returns {Matrix} The reshaped matrix.
   * @throws {Error} Throws an error if the provided rows and columns are inappropriate.
   * i.e. when they are not positive integers.
   */
  @ifRowsAndColumnsAreInappropriatelyDefinedThrow(
    errors.IncorrectRowsAndColumnsParametersInReshape,
  )
  reshape(rows: Integer, columns: Integer): Matrix {
    const reshaped = new Matrix();
    if (rows === this.rows && columns === this.columns) return this;
    const typedArray = models.CreateTypedArrayConstructor(this.type);
    reshaped._M = models.Reshape(
      this._M,
      this.rows,
      this.columns,
      rows,
      columns,
      typedArray,
    );

    return reshaped;
  }

  /**
   * Transposes the current matrix,
   * swapping its rows and columns.
   *
   * @returns {Matrix} A new Matrix
   * instance representing the transposed matrix.
   */
  transpose(): Matrix {
    if (this.rows === 1 && this.columns === 1) return this;
    const typedArray = models.CreateTypedArrayConstructor(this.type);
    const transposed = new Matrix();
    transposed._M = models.TransposeMatrix(
      this._M,
      this.rows,
      this.columns,
      typedArray,
    );

    return transposed;
  }

  /**
   * Transposes the current Matrix instance,
   * swapping its row and column elements.
   *
   * @returns {Matrix} A new Matrix instance
   * representing the transposed matrix.
   */
  get T(): Matrix {
    return this.transpose();
  }

  /**
   * Calculates the Frobenius norm of a matrix.
   *
   * @readonly
   * @throws {Error} If the matrix is not valid.
   * @returns {number} The Frobenius (Euclidean)
   * norm of the matrix.
   */
  get FrobeniusNorm(): number {
    return models.FrobeniusNorm(this._M);
  }

  /**
   * Obtains the infinity norm of the matrix.
   * The infinity norm is the maximum absolute row sum of the matrix.
   * It is calculated as the maximum sum of absolute values of each row.
   * If the matrix is empty or contains non-numeric elements, an internal error is thrown.
   *
   * @returns {number} The infinity norm of the matrix.
   * @throws {Error} Throws an internal error if the matrix is empty or contains non-numeric elements.
   *
   * @example
   * const matrix = new Matrix([[1, 2, 3], [-4, 5, 6], [7, 8, 9]]);
   * const infinityNorm = matrix.infinityNorm; // Returns 24
   */
  get infinityNorm(): number {
    const infNorm = models.MatrixReduce(this._M, "infNorm");
    if (infNorm < 0 || isNaN(infNorm)) {
      errors.InternalErrorInInfinityNorm();
    }

    return infNorm;
  }

  /**
   * Obtains the maximum absolute element norm of the matrix.
   * The maximum absolute element norm is the maximum absolute value of any element in the matrix.
   *
   * @returns {number} The maximum absolute element norm of the matrix.
   *
   * @example
   * const matrix = new Matrix([[1, 2, 3], [-4, 5, 6], [7, 8, 9]]);
   * const maxNorm = matrix.maxNorm; // Returns 9 (maximum absolute value in the matrix)
   */
  get maxNorm(): number {
    const maxNorm = models.MatrixReduce(this._M, "maxNorm");
    if (maxNorm < 0 || isNaN(maxNorm)) {
      errors.InternalErrorInMaxNorm();
    }

    return maxNorm;
  }

  /**
   * Computes the 1-norm (maximum column sum) of the matrix.
   *
   * @returns {number} The 1-norm of the matrix.
   * @throws {Error} If the calculation of the method is NaN.
   */
  get norm1(): number {
    const norm1 = models.MatrixReduce(this._M, "norm1");
    if (norm1 < 0 || isNaN(norm1)) {
      errors.InternalErrorInNorm1();
    }

    return norm1;
  }

  /**
   * Computes the superior norm of the matrix.
   *
   * @returns {number} The superior norm.
   * @throws {Error} If the calculation result is NaN.
   */
  get superior(): number {
    const superior = models.MatrixReduce(this._M, "sup");
    if (isNaN(superior)) {
      errors.InternalErrorInSuperiorNorm();
    }

    return superior;
  }

  /**
   * Computes the inferior norm of the matrix.
   *
   * @returns {number} The inferior norm.
   * @throws {Error} If the calculation result is NaN.
   */
  get inferior(): number {
    const inferior = models.MatrixReduce(this._M, "inf");
    if (isNaN(inferior)) {
      errors.InternalErrorInInferiorNorm();
    }

    return inferior;
  }

  /**
   * Computes the sum of all elements in the matrix.
   *
   * @returns {number} The sum of all elements.
   * @throws {Error} If the calculation result is NaN.
   */
  get sumOfAllElements(): number {
    const sum = models.MatrixReduce(this._M, "sum");
    if (isNaN(sum)) errors.InternalErrorInSum();

    return sum;
  }

  /**
   * Computes the sum of all elements in the matrix.
   *
   * @returns {number} The product of all elements.
   * @throws {Error} If the calculation result is NaN.
   */
  get productOfAllElements(): number {
    const product = models.MatrixReduce(this._M, "product");
    if (isNaN(product)) errors.InternalErrorInProduct();

    return product;
  }

  /**
   * Computes the sum of the squares of all matrix elements.
   *
   * @returns {number} The sum of squares of all matrix elements.
   * @throws {Error} If some  of the elements of the matrix is NaN
   * or the result of the computation is negative.
   */
  get sumOfSquaresOfAllElements(): number {
    const squares = models.MatrixReduce(this._M, "square");
    if (isNaN(squares) || squares < 0) {
      errors.InternalErrorInSquares();
    }

    return squares;
  }

  /**
   * Computes the sum of the cubes of all matrix elements.
   *
   * @returns {number} The calculated result of the method.
   * @throws {Error} If the calculated result is NaN.
   */
  get sumOfCubesOfAllElements(): number {
    const cubes = models.MatrixReduce(this._M, "cube");
    if (isNaN(cubes)) errors.InternalErrorInCubes();

    return cubes;
  }

  /**
   * Generates a matrix with elements 0/1. If the element is greater than the provided
   * value or the corresponding element in the input matrix (m), then the output element
   * will be 1; otherwise, it will be 0.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The value or matrix to compare against.
   * @returns {Matrix} A matrix with elements 0/1 based on the comparison.
   * @throws {Error} If the "m" parameter is not a number or a matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(errors.IncorrectMatrixParameterInPointwise("gt"))
  gt(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (typeof m !== "number") {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("gt")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "gt",
      this._type,
    );

    return output;
  }

  /**
   * Generates a matrix with elements 0/1. If the element is
   * greater than or equal to the m (or m[i][j] in the case when the m
   * is a Matrix or Matrix-like structure), then the output
   * element will be 1 and zero otherwise.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The number
   * or matrix for pointwise comparison.
   * @returns {Matrix} A new matrix resulting from the pointwise
   * "greater than or equal to" operation.
   * @throws {Error} If the "m" parameter is
   * not a number or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(errors.IncorrectMatrixParameterInPointwise("geq"))
  geq(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("geq")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "geq",
      this._type,
    );

    return output;
  }
  /**
   * Generates a matrix with elements 0/1. If the element is
   * equal to the m (or m[i][j] in the case when the m
   * is a Matrix or Matrix-like structure), then the output
   * element will be 1 and zero otherwise.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The number
   * or matrix for pointwise comparison.
   * @returns {Matrix} A new matrix resulting from the
   * pointwise "equal to" operation.
   * @throws {Error} If the "m" parameter is not a
   * number or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(errors.IncorrectMatrixParameterInPointwise("eq"))
  eq(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("eq")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "eq",
      this._type,
    );

    return output;
  }
  /**
   * Generates a matrix with elements 0/1. If the element is
   * not equal to the m (or m[i][j] in the case when the m
   * is a Matrix or Matrix-like structure), then the output
   * element will be 1 and zero otherwise.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The number 
   * or matrix for pointwise comparison.
   * @returns {Matrix} A new matrix resulting 
   * from the pointwise "not equal to" operation.
   * @throws {Error} If the "m" parameter is not 
   * a number or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(errors.IncorrectMatrixParameterInPointwise("neq"))
  neq(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("neq")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "neq",
      this._type,
    );

    return output;
  }

  /**
   * Generates a matrix with elements 0/1. If the element is
   * less than the m (or m[i][j] in the case when the m
   * is a Matrix or Matrix-like structure), then the output
   * element will be 1 and zero otherwise.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The 
   * number or matrix for pointwise comparison.
   * @returns {Matrix} A new matrix resulting 
   * from the pointwise "less than" operation.
   * @throws {Error} If the "m" parameter is 
   * not a number or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(errors.IncorrectMatrixParameterInPointwise("lt"))
  lt(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("lt")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "lt",
      this._type,
    );

    return output;
  }

  /**
   * Generates a matrix with elements 0/1. If the element is
   * less than or equal to the m (or m[i][j] in the case when the m
   * is a Matrix or Matrix-like structure), then the output
   * element will be 1 and zero otherwise.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The 
   * number or matrix for pointwise comparison.
   * @returns {Matrix} A new matrix resulting 
   * from the pointwise "less than or equal to" operation.
   * @throws {Error} If the "m" parameter is not a number 
   * or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(errors.IncorrectMatrixParameterInPointwise("leq"))
  leq(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("leq")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "leq",
      this._type,
    );

    return output;
  }

  /**
   * Performs a bitwise OR operation element-wise between the current matrix
   * and the provided number or matrix. If the input is a number, each element
   * of the current matrix is bitwise ORed with that number. If the input is
   * a matrix with the same dimensions as the current matrix, the bitwise OR
   * operation is applied element-wise between corresponding elements.
   *
   * NB! Note that in JavaScript and in TypeScript respectively the logical
   * bitwise operations are limited to 32-bit numbers.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The number or 
   * matrix for the bitwise OR operation.
   * @returns {Matrix} A new matrix resulting from the pointwise bitwise OR operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(errors.IncorrectMatrixParameterInPointwise("or"))
  or(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("or")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "or",
      this._type,
    );

    return output;
  }

  /**
   * Performs a bitwise AND operation element-wise between the current matrix
   * and the provided number or matrix. If the input is a number, each element
   * of the current matrix is bitwise ANDed with that number. If the input is
   * a matrix with the same dimensions as the current matrix, the bitwise AND
   * operation is applied element-wise between corresponding elements.
   *
   * NB! Note that in JavaScript and in TypeScript respectively the logical
   * bitwise operations are limited to 32-bit numbers.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m -The number or 
   * matrix for the bitwise AND operation.
   * @returns {Matrix} A new matrix resulting from the pointwise bitwise AND operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(errors.IncorrectMatrixParameterInPointwise("and"))
  and(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("and")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "and",
      this._type,
    );

    return output;
  }

  /**
   * Performs a bitwise XOR (exclusive OR) operation element-wise between the
   * current matrix and the provided number or matrix. If the input is a number,
   * each element of the current matrix is bitwise XORed with that number. If
   * the input is a matrix with the same dimensions as the current matrix, the
   * bitwise XOR operation is applied element-wise between corresponding elements.
   *
   * NB! Note that in JavaScript and in TypeScript respectively the logical
   * bitwise operations are limited to 32-bit numbers.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The number or matrix for the bitwise XOR operation.
   * @returns {Matrix} A new matrix resulting from the pointwise bitwise XOR operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(errors.IncorrectMatrixParameterInPointwise("xor"))
  xor(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("xor")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "xor",
      this._type,
    );

    return output;
  }

  /**
   * Performs a bitwise right shift operation element-wise between the current
   * matrix and the provided number or matrix. If the input is a number, each
   * element of the current matrix is bitwise right-shifted by that number of
   * positions. If the input is a matrix with the same dimensions as the current
   * matrix, the bitwise right shift operation is applied element-wise between
   * corresponding elements.
   *
   * NB! Note that in JavaScript and in TypeScript respectively the logical
   * bitwise operations are limited to 32-bit numbers.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The number or 
   * matrix for the bitwise right shift operation.
   * @returns {Matrix} A new matrix resulting from the pointwise bitwise right shift operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("rightShiftBy"),
  )
  rightShiftBy(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("rightShiftBy")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "rightShiftBy",
      this._type,
    );

    return output;
  }

  /**
   * Performs a bitwise left shift operation element-wise between the current
   * matrix and the provided number or matrix. If the input is a number, each
   * element of the current matrix is bitwise left-shifted by that number of
   * positions. If the input is a matrix with the same dimensions as the current
   * matrix, the bitwise left shift operation is applied element-wise between
   * corresponding elements.
   *
   * NB! Note that in JavaScript and in TypeScript respectively the logical
   * bitwise operations are limited to 32-bit numbers.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The number or 
   * matrix for the bitwise left shift operation.
   * @returns {Matrix } A new matrix resulting from the pointwise bitwise left shift operation.
   * @throws {ErrorI} f the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("leftShiftBy"),
  )
  leftShiftBy(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("leftShiftBy")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "leftShiftBy",
      this._type,
    );

    return output;
  }

  /**
   * Performs a pointwise addition operation (classical matrix addition) between
   * the current matrix and the provided number or matrix. If the input is a
   * number, each element of the current matrix is added by that number.
   * If the input is a matrix with the same dimensions as the current matrix,
   * the addition operation is applied element-wise between corresponding elements.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The number or 
   * matrix for the addition operation.
   * @returns {Matrix}  A new matrix resulting from the pointwise addition operation.
   * @throws {Error } If the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("plus"),
  )
  plus(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("plus")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "plus",
      this._type,
    );

    return output;
  }

  /**
   * Performs a pointwise subtraction operation between the current matrix and
   * the provided number or matrix. If the input is a number, each element of
   * the current matrix is subtracted by that number. If the input is a matrix
   * with the same dimensions as the current matrix, the subtraction operation
   * is applied element-wise between corresponding elements.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The number or
   * matrix for the subtraction operation.
   * @returns {MatrixA}  new matrix resulting from the pointwise subtraction operation.
   * @throws {ErrorI} f the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("minus"),
  )
  minus(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("minus")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "minus",
      this._type,
    );

    return output;
  }

  /**
   * Performs a pointwise exponentiation operation between the current matrix and
   * the provided number or matrix. If the input is a number, each element of the
   * current matrix is raised to the power of that number. If the input is a matrix
   * with the same dimensions as the current matrix, the exponentiation operation
   * is applied element-wise between corresponding elements.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The number or matrix 
   * for the exponentiation operation.
   * @returns {Matrix} A new matrix resulting from the pointwise exponentiation operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("power"),
  )
  power(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("power")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "power",
      this._type,
    );

    return output;
  }

  /**
   * Performs the Hadamard product (element-wise multiplication) between the
   * current matrix and the provided number or matrix. If the input is a number,
   * each element of the current matrix is multiplied by that number. If the input
   * is a matrix with the same dimensions as the current matrix, the Hadamard
   * product is applied element-wise between corresponding elements.
   *
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The number or matrix 
   * for the Hadamard product.
   * @returns {Matrix} A new matrix resulting from the Hadamard product operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("Hadamard"),
  )
  Hadamard(m: number | Matrix | MatrixType | NumericMatrix): Matrix {
    const output = new Matrix();
    if (Matrix.isMatrix(m)) m = (m as Matrix)._M;
    if (typeof m !== "number") {
      if (
        (m as MatrixType | NumericMatrix).length !== this.rows &&
        (m as MatrixType | NumericMatrix)[0].length !== this.columns
      ) {
        errors.IncorrectMatrixParameterInPointwise("Hadamard")();
      }
    }
    output._M = models.BinaryPointwise(
      this._M,
      m as number | MatrixType | NumericMatrix,
      "Hadamard",
      this._type,
    );

    return output;
  }
}
