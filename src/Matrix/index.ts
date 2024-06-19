"use strict";
import * as conditions from "./Conditions";
import * as models from "./Models";
import * as errors from "./Errors";
import {
  ifBlockHasDifferentColumnsFromTheMatrixThrow,
  ifBlockHasDifferentRowsFromTheMatrixThrow,
  ifBlockIsEmptyReturnMatrix,
  ifColumnsOrFromRowIndexOrToRowIndexIsIncorrectlyDefinedThrow,
  ifColumnVectorHasInappropriateSizeThrow,
  ifFromOrToParametersAreIncorrectlyDefinedThrow,
  ifIsColumnVectorThrow,
  ifIsMatrixWithInappropriateDimensionsForPointwiseOperationsThrow,
  ifIsNotArrayOfArraysWithEqualSizeThrow,
  ifIsNotNumberOrMatrixThrow,
  ifIsNotNumberThrow,
  ifIsNotRowVectorOrHasInappropriateSizeThrow,
  ifIsNotSquareMatrixThrow,
  ifIsNotVectorOrHasInappropriateSizeThrow,
  ifIsNotVectorWithAppropriateSizeThrow,
  ifRowOrFromIndexOrToIndexIsIncorrectlyDefinedThrow,
  ifRowParameterIsInappropriatelyDefinedThrow,
  ifRowsAndColumnsAreInappropriatelyDefinedThrow,
  ifRowsOrColumnsAreNotPositiveIntegersThrow,
  ifSecureAndNotSymmetricThrow,
  ifTheParametersAreMatricesWithInappropriateSizeThrow,
  ifTheParametersAreNotMatricesThrow,
  ifTheVectorIsDefinedAndHasInappropriateSizeThrow,
} from "./Decorators";

import type {
  Integer,
  InverseMethods,
  MatrixBlockOptions,
  MatrixType,
  NumericMatrix,
  NumericType,
  TypedArray,
  TypedArrayConstructor,
} from "../Types";

export class Matrix {
  // 1. Declaration of the private methods and properties

  /**
   * @private {NumericType} type - A holder for the type of the
   * current matrix instance. By default this property will be
   * set to "float64" (double precision) type.
   */
  private static _type: NumericType = "float64";

  public static setType = (type: NumericType) => Matrix._type = type;

  // 2. Static methods

  /**
   * Checks if the input parameter "m" is a Matrix
   * instance from the Matrix library of the @euriklis/mathematics.
   *
   * @param {any} m - A Matrix candidate.
   * @returns {boolean} - True if the "m" parameter is a
   * Matrix and false otherwise.
   */
  public static isMatrix(m: any): boolean {
    return conditions.IsMatrix(m);
  }

  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static dimensions(m: MatrixType | NumericMatrix): number[] {
    return models.ComputeDimensions(m);
  }

  /**
   * Creates a matrix with zero elements
   *
   * @param {Integer} rows - an integer greater than zero
   * @param {Integer} columns - an integer greater than zero
   * @param {NumericType} type
   * @returns {MatrixType | NumericMatrix} a zero matrix.
   */
  @ifRowsOrColumnsAreNotPositiveIntegersThrow(
    errors.IncorrectRowsOrColumnsParametersInZeros,
  )
  public static zeros(
    rows: Integer,
    columns: Integer,
    type: NumericType = "float64",
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);

    return models.GenerateZeroMatrix(rows, columns, typedArray);
  }

  /**
   * Generates a square zero matrix
   *
   * @param {Integer} n - The number of the rows and the columns of the Matrix
   * @param {NumericType} type - The type of each element of the Matrix
   * @returns {MatrixType | NumericMatrix} A square zero Matrix
   */
  public static zero(
    n: Integer,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return Matrix.zeros(n, n, type);
  }

  /**
   * Generates an identity-like matrix with specified dimensions.
   *
   * @param {Integer} rows - The number of rows of the matrix.
   * @param {Integer} columns - The number of columns of the matrix.
   * @param {NumericType} type - The type of each element of the matrix.
   * @returns {MatrixType | NumericMatrix} - An identity-like matrix.
   */
  @ifRowsOrColumnsAreNotPositiveIntegersThrow(
    errors.IncorrectRowsOrColumnsParametersInIdentityLike,
  )
  public static identityLike(
    rows: Integer,
    columns: Integer,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);

    return models.GenerateIdentityLikeMatrix(rows, columns, typedArray);
  }

  /**
   * Generates identity matrix with specified dimensions
   *
   * @param {Integer} n - The number of rows/columns of the identity matrix
   * @param {NumericType} type - the type of the matrix elements.
   * @returns {MatrixType | NumericMatrix} The identity matrix
   */
  public static identity(
    n: Integer,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return Matrix.identityLike(n, n, type);
  }

  /**
   * Creates a new Matrix with specified dimensions,
   * where each element is initialized to the same numeric value.
   *
   * @param {number} n - The numeric value to replicate.
   * @param {Integer} rows - The number of rows in the new matrix.
   * @param {Integer} columns - The number of columns in the new matrix.
   * @param {NumericType} [type="float64"] - The numeric type of the matrix elements.
   * @returns {MatrixType | NumericMatrix} A new Matrix with the specified dimensions
   * and replicated numeric value.
   * @throws {Error} If rows or columns are not positive.
   */
  @ifRowsOrColumnsAreNotPositiveIntegersThrow(
    errors.IncorrectRowsOrColumnsParameterInReplicate,
    1,
    2,
  )
  public static replicate(
    n: number,
    rows: Integer,
    columns: Integer,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);

    return models.Replicate(n, rows, columns, typedArray) as MatrixType;
  }

  /**
   * Creates a new Matrix with randomized values by rows and columns.
   *
   * @param {Integer} rows - The number of rows.
   * @param {Integer} columns - The number of columns.
   * @param {number} from - The minimum value for randomization.
   * @param {number} to - The maximum value for randomization.
   * @param {NumericType} type - The numeric type of the matrix.
   * @param {Integer} seed - The seed for randomization.
   * @returns {MatrixType | NumericMatrix} A new Matrix instance.
   * @throws {Error} If the rows or columns parameter is not positive integer.
   */
  @ifRowsOrColumnsAreNotPositiveIntegersThrow(
    errors.IncorrectRowsOrColumnsParameterInRandom,
  )
  public static random(
    rows: Integer,
    columns: Integer,
    from: Integer = 0,
    to: Integer = 1,
    type: NumericType = Matrix._type,
    seed: number = 123445,
  ): MatrixType | NumericMatrix {
    const dimensions = [rows, columns];
    const typedArray = models.CreateTypedArrayConstructor(type);

    return models.GenerateRandomMatrix(dimensions, from, to, typedArray, seed);
  }

  /**
   * Creates a lower triangular matrix with randomized values by rows and columns.
   * NB! By definition the lower triangular matrix is SQUARE, but the method allows
   * the creation of peudo - lower triangular matrix, i.e. the non zero elements will
   * be equivallent to the elements of an lower triangular matrix if the matrix was
   * squared.
   *
   * @param {Integer} rows - The number of rows.
   * @param {Integer} columns - The number of columns.
   * @param {number} from - The minimum value for randomization.
   * @param {number} to - The maximum value for randomization.
   * @param {NumericType} type - The numeric type of the matrix.
   * @param {Integer} seed - The seed for randomization.
   * @returns {MatrixType | NumericMatrix} A new Matrix instance.
   * @throws {Error} If the rows or columns parameter is not positive integer.
   */
  @ifRowsOrColumnsAreNotPositiveIntegersThrow(
    errors.IncorrectRowsOrColumnsParameterInRandom,
  )
  public static randomLowerTriangular(
    rows: Integer,
    columns: Integer,
    from: Integer = 0,
    to: Integer = 1,
    type: NumericType = Matrix._type,
    seed: number = 123456,
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);

    return models.GenerateLowerRandomTriangularMatrix(
      [rows, columns],
      from,
      to,
      typedArray,
      seed,
    );
  }

  /**
   * Creates an upper triangular matrix with randomized values by rows and columns.
   * NB! By definition the upper triangular matrix is SQUARE matrix, but the method
   * allows the creation of pseudo - upper triangular matrix, i.e. the non zero elements
   * will be equivallent to the elements of an upper triangular matrix if the matrix
   * was square.
   *
   * @param {Integer} rows - The number of rows.
   * @param {Integer} columns - The number of columns.
   * @param {number} from - The minimum value for randomization.
   * @param {number} to - The maximum value for randomization.
   * @param {NumericType} type - The numeric type of the matrix.
   * @param {Integer} seed - The seed for randomization.
   * @returns {MatrixType | NumericMatrix} A new Matrix instance.
   * @throws {Error} If the rows or columns parameter is not positive integer.
   */
  @ifRowsOrColumnsAreNotPositiveIntegersThrow(
    errors.IncorrectRowsOrColumnsParameterInRandom,
  )
  public static randomUpperTriangular(
    rows: Integer,
    columns: Integer,
    from: number = 0,
    to: number = 1,
    type: NumericType = Matrix._type,
    seed: number = 123456,
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);

    return models.GenerateUpperRandomTriangularMatrix(
      [rows, columns],
      from,
      to,
      typedArray,
      seed,
    );
  }

  /**
   * Creates a lower triangular matrix with randomized values by rows and columns.
   * The method make use of the Math.random method of JavaScript.
   * NB! By definition the lower triangular matrix is a SQUARE matrix, but the method
   * allows the creation of pseudo - lower triangular matrix, i.e., the non zero
   * elements will be equivallent to the elements of a lower triangular matrix if
   * the rows and the columns was equal.
   *
   * @param {Integer} rows - The number of rows.
   * @param {Integer} columns - The number of columns.
   * @param {number} from - The minimum value for randomization.
   * @param {number} to - The maximum value for randomization.
   * @param {NumericType} type - The numeric type of the matrix.
   * @returns {MatrixType | NumericMatrix} A new Matrix instance.
   * @throws {Error} If the rows or columns parameter is not positive integer.
   */
  @ifRowsOrColumnsAreNotPositiveIntegersThrow(
    errors.IncorrectRowsOrColumnsParameterInRandom,
  )
  public static uniqueRandomLowerTriangular(
    rows: Integer,
    columns: Integer,
    from: number = 1,
    to: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);

    return models.GenerateUniqueRandomLowerTriangularMatrix(
      [rows, columns],
      from,
      to,
      typedArray,
    );
  }

  /**
   * Creates an upper triangular matrix with randomized values by rows and columns.
   * The method make use of the Math.random method of JavaScript.
   * NB! By definition the upper triangular matrix is a SQUARE matrix, but the method
   * allows the creation of pseudo - upper triangular matrix, i.e., the non zero
   * elements will be equivallent to the elements of an upper triangular matrix if
   * the rows and the columns was equal.
   *
   * @param {Integer} rows - The number of rows.
   * @param {Integer} columns - The number of columns.
   * @param {number} from - The minimum value for randomization.
   * @param {number} to - The maximum value for randomization.
   * @param {NumericType} type - The numeric type of the matrix.
   * @returns {MatrixType | NumericMatrix} A new Matrix instance.
   * @throws {Error} If the rows or columns parameter is not positive integer.
   */

  @ifRowsOrColumnsAreNotPositiveIntegersThrow(
    errors.IncorrectRowsOrColumnsParameterInRandom,
  )
  public static uniqueRandomUpperTriangular(
    rows: Integer,
    columns: Integer,
    from: number = 0,
    to: number = 1,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);

    return models.GenerateUniqueRandomUpperTriangularMatrix(
      [rows, columns],
      from,
      to,
      typedArray,
    );
  }

  /**
   * Generates a random matrix with unique values each time the method is called.
   *
   * @param {Integer} rows - The number of rows in the generated matrix.
   * @param {Integer} columns - The number of columns in the generated matrix.
   * @param {number} [from=0] - The lower bound of the random values range.
   * @param {number} [to=1] - The upper bound of the random values range.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the
   * elements in the generated matrix.
   * @returns {MatrixType | NumericMatrix} A random matrix with unique values.
   * @throws {Error} If the rows or columns parameters are not positive integers.
   */
  @ifRowsOrColumnsAreNotPositiveIntegersThrow(
    errors.IncorrectRowsOrColumnsParameterInRandom,
  )
  public static uniqueRandom(
    rows: Integer,
    columns: Integer,
    from: Integer = 0,
    to: Integer = 1,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);

    return models.GenerateUniqueRandomMatrix(
      [rows, columns],
      from,
      to,
      typedArray,
    );
  }

  /**
   * Creates a copy of the matrix parameter or a linary transformed
   * matrix from the elements of the matrix parameter.
   *
   * @param {MatrixType | NumericMatrix } matrix - The matrix which
   * elements will be copied.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} a new matrix with the same
   * elements of the "matrix" parameter.
   * @throws {Error} If the "matrix" parameter is not a table (array of arrays
   * with equal sizes).
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static copy(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    weight: number = 1,
    bias: number = 0,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(matrix, "deepCopy", type, weight, bias);
  }

  // 2 Utility methods
  //
  /**
   * Checks if the matrix is square, i.e. has the
   * same number of rows and columns.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix parameter.
   * @returns {boolean} True if the matrix is squared
   * and false otherwise.
   * @throws {Errors} If the matrix is not table, i.e.
   * every row of the matrix does not have the same
   * number of columns.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static isSquare(matrix: MatrixType | NumericMatrix): boolean {
    return matrix.length === matrix[0].length;
  }

  /**
   * Checks if the matrix is symmetric.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix parameter.
   * @returns {boolean} True if the matrix is symmetric, false otherwise.
   * @throws {Error} If the matrix is not table (every row does not have
   * the same number of columns).
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static isSymmetric(matrix: MatrixType | NumericMatrix): boolean {
    if (!Matrix.isSquare(matrix)) return false;
    return conditions.IsMatrixSymmetric(matrix);
  }

  // 3. Utility methods or operators
  // for matrix manipulation.

  /**
   * Checks if the elements of the first matrix are equal to
   * the corresponding elements of the provided matrix.
   *
   * @param {NumericMatrix | MatrixType} m1 - The first matrix used
   * for comparison
   * @param {NumericMatrix | MatrixType} m2 - The second matrix used
   * for comparison

   * @returns {boolean} True, if the elements of the current matrix instance
   * are equal to the elements of the "matrix" parameter, false otherwise.
   * @throws {Error} If some of the matrix parameters is not a table,i.e
   * every rows of the both matrices do not have the same number of columns.
   */
  @ifTheParametersAreNotMatricesThrow(
    errors.IncorrectMatricesInput("isEqualTo"),
  )
  public static isEqualTo(
    m1: NumericMatrix | MatrixType,
    m2: MatrixType | NumericMatrix,
  ): boolean {
    if (m1 === m2) return true;
    if (m1.length !== m2.length || m1[0].length !== m2[0].length) return false;
    else return models.CompareMatrices(m1, m2, "eq");
  }

  /**
   * Checks if two matrices are nearly equal based on a specified norm and threshold.
   * @param {MatrixType | NumericMatrix} m1 - The first matrix for comparison.
   * @param {MatrixType | NumericMatrix} m2 - The second matrix for comparison.
   * @param {number} [threshold=1e-8] - The threshold value for equality comparison.
   * @param {"Euclidean" | "inferior" | "infinity" | "max" | "norm1" | "superior" | "Frobenius"} [norm="Euclidean"] - The
   * norm type used for comparison.
   * @returns {boolean} `true` if the matrices are nearly equal based
   * on the specified norm and threshold, otherwise `false`.
   */
  public static isNearlyEqualTo(
    m1: MatrixType | NumericMatrix,
    m2: MatrixType | NumericMatrix,
    threshold: number = 1e-8,
    norm:
      | "Euclidean"
      | "inferior"
      | "infinity"
      | "max"
      | "norm1"
      | "superior"
      | "Frobenius" = "Euclidean",
  ): boolean {
    const m12 = Matrix.minus(m1, m2);
    switch (norm) {
      case "Euclidean":
        return Matrix.FrobeniusNorm(m12) <= threshold;
      case "Frobenius":
        return Matrix.FrobeniusNorm(m12) <= threshold;
      case "inferior":
        return Matrix.inferior(m12) <= threshold;
      case "norm1":
        return Matrix.norm1(m12) <= threshold;
      case "infinity":
        return Matrix.infinityNorm(m12) <= threshold;
      case "max":
        return Matrix.maxNorm(m12) <= threshold;
      case "superior":
        return Matrix.superior(m12) <= threshold;
      default:
        return Matrix.FrobeniusNorm(m12) <= threshold;
    }
  }

  /**
   * Checks if the elements of the first Matrix are greater than
   * the elements of the second "matrix" parameter of the method.
   *
   * @param {NumericMatrix | MatrixType} m1 - The first matrix used
   * for comparison
   * @param {NumericMatrix | MatrixType} m2 - The second matrix used
   * for comparison

   * @returns {boolean} true, if the elements of the current matrix instance
   * are greater than the elements of the "matrix" parameter, false otherwise.
   * @throws {Error} If the matrices are not tables, i.e., the matrices do not
   * have rows with the same number of columns.
   */
  @ifTheParametersAreNotMatricesThrow(
    errors.IncorrectMatricesInput("isGreaterThan"),
  )
  public static isGreaterThan(
    m1: NumericMatrix | MatrixType,
    m2: MatrixType | NumericMatrix,
  ): boolean {
    if (m1 === m2) return false;
    if (m1.length !== m2.length || m1[0].length !== m2[0].length) return false;
    else return models.CompareMatrices(m1, m2, "gt");
  }

  /**
   * Checks if the elements of the first "matrix" are greater than or equal to
   * the elements of the second "matrix" parameter of the method.
   *
   * @param {NumericMatrix | MatrixType} m1 - The first matrix used
   * for comparison
   * @param {NumericMatrix | MatrixType} m2 - The second matrix used
   * for comparison
   * @returns {boolean} true, if the elements of the current matrix instance
   * are greater than or equal to the elements of the "matrix" parameter, false otherwise.
   * @throws {Error} If some of the matrices is not a table.
   */
  @ifTheParametersAreNotMatricesThrow(
    errors.IncorrectMatricesInput("isGreaterThanOrEqual"),
  )
  public static isGreaterThanOrEqual(
    m1: NumericMatrix | MatrixType,
    m2: MatrixType | NumericMatrix,
  ): boolean {
    if (m1 === m2) return true;
    if (m1.length !== m2.length || m1[0].length !== m2[0].length) return false;
    else return models.CompareMatrices(m1, m2, "geq");
  }

  /**
   * Checks if all elements of the first "matrix" are less than the corresponding
   * elements of second the provided matrix.
   *
   * @param {NumericMatrix | MatrixType} m1 - The first matrix for comparison.
   * @param {NumericMatrix | MatrixType} m2 - The second matrix for comparison.
   * @returns {boolean} True if all elements of the current matrix are less than
   * the corresponding elements of the provided matrix, false otherwise.
   * @throws {Error} If some of the "matrix" parameters are not tables, i.e.,
   * every row of the matrices has the same number of columns.
   */
  @ifTheParametersAreNotMatricesThrow(
    errors.IncorrectMatricesInput("isLessThan"),
  )
  public static isLessThan(
    m1: NumericMatrix | MatrixType,
    m2: MatrixType | NumericMatrix,
  ): boolean {
    if (m1 === m2) return false;
    if (m1.length !== m2.length || m1[0].length !== m2[0].length) return false;
    return models.CompareMatrices(m1, m2, "lt");
  }

  /**
   * Checks if the elements of the first "matrix" are less than or equal to
   * the elements of the second "matrix" parameter.
   *
   * @param {NumericMatrix | MatrixType} m1 - The first matrix used for comparison.
   * @param {NumericMatrix | MatrixType} m2 - The second matrix used for comparison.
   *
   * @returns {boolean} true, if the elements of the current matrix instance are less than
   * or equal to the elements of the "matrix" parameter, false otherwise.
   * @throws {Error} If some of the matrices if not a table, i.e.,
   * some of the rows have not the same numbers of columns with the others.
   */
  @ifTheParametersAreNotMatricesThrow(
    errors.IncorrectMatricesInput("isLessThanOrEqual"),
  )
  public static isLessThanOrEqual(
    m1: NumericMatrix | MatrixType,
    m2: MatrixType | NumericMatrix,
  ): boolean {
    if (m1 === m2) return true;
    if (m1.length !== m2.length || m1[0].length !== m2[0].length) return false;
    return models.CompareMatrices(m1, m2, "leq");
  }

  /**
   * Generates a matrix with elements 0/1. If the element is greater than the provided
   * value or the corresponding element in the input matrix (m), then the output element
   * will be 1; otherwise, it will be 0.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix
   * which will be examined.
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The value or matrix to compare against.
   * @param {NumericType} type - The type of the matrix elements.
   * @returns {MatrixType | NumericMatrix} A matrix with elements 0/1 based on the comparison.
   * @throws {Error} If the "m" parameter is not a number or a matrix-like structure.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("gt"),
    1,
  )
  public static gt(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (typeof m !== "number") {
      if (
        (m as MatrixType | NumericMatrix).length !== matrix.length &&
        (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
      ) {
        errors.IncorrectMatrixParameterInPointwise("gt")();
      }
    }
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "gt",
      type,
    );
  }

  /**
   * Generates a matrix with elements 0/1. If the element is
   * greater than or equal to the m (or m[i][j] in the case when the m
   * is a Matrix or Matrix-like structure), then the output
   * element will be 1 and zero otherwise.
   *
   * @param {MatrixType |NumericMatrix} matrix - The matrix
   * whose elements will be compared.
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The number
   * or matrix for pointwise comparison.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix resulting from the pointwise
   * "greater than or equal to" operation.
   * @throws {Error} If the "m" parameter is
   * not a number or Matrix-like structure.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("geq"),
    1,
  )
  public static geq(
    matrix: MatrixType | NumericMatrix,
    m: number | Matrix | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== matrix.length &&
        (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
      ) {
        errors.IncorrectMatrixParameterInPointwise("geq")();
      }
    }
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "geq",
      type,
    );
  }

  /**
   * Generates a matrix with elements 0/1. If the element is
   * equal to the m (or m[i][j] in the case when the m
   * is a Matrix or Matrix-like structure), then the output
   * element will be 1 and zero otherwise.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix
   * whose elements will be used for comparison.
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The number
   * or matrix for pointwise comparison.
   * @param {NumericType} type - the type of the matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix resulting from the
   * pointwise "equal to" operation.
   * @throws {Error} If the "m" parameter is not a
   * number or Matrix-like structure.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("eq"),
    1,
  )
  public static eq(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== matrix.length &&
        (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
      ) {
        errors.IncorrectMatrixParameterInPointwise("eq")();
      }
    }
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "eq",
      type,
    );
  }

  /**
   * Generates a matrix with elements 0/1. If the element is
   * less than the m (or m[i][j] in the case when the m
   * is a Matrix or Matrix-like structure), then the output
   * element will be 1 and zero otherwise.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix
   * whose elements will be used for comparison.
   * @param {number | MatrixType | NumericMatrix} m - The
   * number or matrix for pointwise comparison.
   * @param {NumericType} type - the type of the resulting matrix.
   * @returns {MatrixType | NumericMatrix} A new matrix resulting
   * from the pointwise "less than" operation.
   * @throws {Error} If the "m" parameter is
   * not a number or Matrix-like structure.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("lt"),
    1,
  )
  public static lt(
    matrix: MatrixType | NumericMatrix,
    m: number | Matrix | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== matrix.length &&
        (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
      ) {
        errors.IncorrectMatrixParameterInPointwise("lt")();
      }
    }
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "lt",
      type,
    );
  }

  /**
   * Generates a matrix with elements 0/1. If the element is
   * less than or equal to the m (or m[i][j] in the case when the m
   * is a Matrix or Matrix-like structure), then the output
   * element will be 1 and zero otherwise.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix
   * whose elements will be used for comparison.
   * @param {number | MatrixType | NumericMatrix} m - The
   * number or matrix for pointwise comparison.
   * @param {NumericType} type - The type of the resulting matrix.
   * @returns {MatrixType | NumericMatrix} A new matrix resulting
   * from the pointwise "less than or equal to" operation.
   * @throws {Error} If the "m" parameter is not a number
   * or Matrix-like structure.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("leq"),
    1,
  )
  public static leq(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== matrix.length &&
        (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
      ) {
        errors.IncorrectMatrixParameterInPointwise("leq")();
      }
    }
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "leq",
      type,
    );
  }

  /**
   * Generates a matrix with elements 0/1. If the element is
   * not equal to the m (or m[i][j] in the case when the m
   * is a Matrix or Matrix-like structure), then the output
   * element will be 1 and zero otherwise.
   *
   * @param {MatrixType | NumericMatrix} matrix - the matrix whose elements
   * will be examined.
   * @param {number | MatrixType | NumericMatrix} m - The number
   * or matrix for pointwise comparison.
   * @returns {MatrixType | NumericMatrix} A new matrix resulting
   * from the pointwise "not equal to" operation.
   * @throws {Error} If the "m" parameter is not
   * a number or Matrix-like structure.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("neq"),
    1,
  )
  public static neq(
    matrix: MatrixType | NumericMatrix,
    m: number | Matrix | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== matrix.length &&
        (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
      ) {
        errors.IncorrectMatrixParameterInPointwise("neq")();
      }
    }
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "neq",
      type,
    );
  }

  /**
   * Performs a logical AND operation element-wise between the first matrix
   * and the provided number or matrix. If second parameter is a number, each element
   * of the first parameter is logical ANDed with that number. If the second parameter is
   * a matrix with the same dimensions as the current matrix, the logical AND
   * operation is applied element-wise between corresponding elements.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whoolse element
   * will be used for logical and operation.
   * @param {number | MatrixType | NumericMatrix} m -The number or
   * matrix for the bitwise AND operation.
   * @param {NumericType} type - The type of the matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix resulting from the pointwise bitwise AND operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("and"),
    1,
  )
  public static and(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== matrix.length &&
        (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
      ) {
        errors.IncorrectMatrixParameterInPointwise("and")();
      }
    }
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "and",
      type,
    );
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
   * @param {MatrixType | NumericMatrix} matrix - The first matrix
   * used for the bitwise and operation.
   * @param {number | MatrixType | NumericMatrix} m -The number or
   * matrix for the bitwise AND operation.
   * @param{NumericType} type - The type of the matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix resulting from the pointwise bitwise AND operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("bitwiseAnd"),
    1,
  )
  public static bitwiseAnd(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== matrix.length &&
        (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
      ) {
        errors.IncorrectMatrixParameterInPointwise("bitwiseAnd")();
      }
    }
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "band",
      type,
    );
  }

  /**
   * Performs a logical OR operation element-wise between the first matrix
   * and the second number or matrix. If the second parameter is a number, each element
   * of the first matrix is logical ORed with that number. If the second  parameter is
   * a matrix with the same dimensions as the first matrix, the logical OR
   * operation is applied element-wise between corresponding elements.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix
   * whose elements will be used for comparison.
   * @param {number | MatrixType | NumericMatrix} m - The number or
   * matrix for the bitwise OR operation.
   * @param {NumericType} type - the type of the matrix elements.
   * @returns {MatrixType \ NumericMatrix} A new matrix resulting from the pointwise bitwise OR operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("or"),
    1,
  )
  public static or(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== matrix.length &&
        (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
      ) {
        errors.IncorrectMatrixParameterInPointwise("or")();
      }
    }
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "or",
      type,
    );
  }

  /**
   * Performs a bitwise OR operation element-wise between the first matrix
   * and the second number or matrix. If the second parameter is a number, each element
   * of the first matrix is bitwise ORed with that number. If the second parameter is
   * a matrix with the same dimensions as the first matrix, the bitwise OR
   * operation is applied element-wise between corresponding elements.
   *
   * NB! Note that in JavaScript and in TypeScript respectively the logical
   * bitwise operations are limited to 32-bit numbers.
   *
   * @param {MatrixType | NumericMatrix} matrix - The first matrix
   * @param {number | MatrixType | NumericMatrix} m - The number or
   * matrix for the bitwise OR operation.
   * @returns {MatrixType | NumericMatrix} A new matrix resulting from the pointwise bitwise OR operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("bitwiseOr"),
    1,
  )
  public static bitwiseOr(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== matrix.length &&
        (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
      ) {
        errors.IncorrectMatrixParameterInPointwise("bitwiseOr")();
      }
    }
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "bor",
      type,
    );
  }

  /**
   * Performs a bitwise XOR (exclusive OR) operation element-wise between the
   * first matrix and the second number or matrix. If the second parameter is a number,
   * each element of the first matrix is bitwise XORed with that number. If
   * the second parameter is a matrix with the same dimensions as the first matrix, the
   * bitwise XOR operation is applied element-wise between corresponding elements.
   *
   * NB! Note that in JavaScript and in TypeScript respectively the logical
   * bitwise operations are limited to 32-bit numbers.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements
   * will be used for xor operation.
   * @param {number | MatrixType | NumericMatrix} m - The number or matrix for the bitwise XOR operation.
   * @param {NumericType} type - The type of the matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix resulting from the pointwise bitwise XOR operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("xor"),
    1,
  )
  public static xor(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== matrix.length &&
        (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
      ) {
        errors.IncorrectMatrixParameterInPointwise("xor")();
      }
    }
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "xor",
      type,
    );
  }

  /**
   * Performs a bitwise left shift operation element-wise between the first
   * matrix and the second number or matrix. If the second parameter is a number, each
   * element of the first matrix is bitwise left-shifted by that number of
   * positions. If the second parameter is a matrix with the same dimensions as the first
   * matrix, the bitwise left shift operation is applied element-wise between
   * corresponding elements.
   *
   * NB! Note that in JavaScript and in TypeScript respectively the logical
   * bitwise operations are limited to 32-bit numbers.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will
   * bitwise shifted to the left.
   * @param {number | MatrixType | NumericMatrix} m - The number or
   * matrix for the bitwise left shift operation.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix } A new matrix resulting from the pointwise bitwise left shift operation.
   * @throws {Error} f the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("leftShiftBy"),
    1,
  )
  public static leftShiftBy(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== matrix.length &&
        (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
      ) {
        errors.IncorrectMatrixParameterInPointwise("leftShiftBy")();
      }
    }
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "leftShiftBy",
      type,
    );
  }

  /**
   * Performs a bitwise right shift operation element-wise between the first
   * matrix and the second number or matrix. If the second parameter is a number, each
   * element of the first matrix is bitwise right-shifted by that number of
   * positions. If the second parameter is a matrix with the same dimensions as the first
   * matrix, the bitwise right shift operation is applied element-wise between
   * corresponding elements.
   *
   * NB! Note that in JavaScript and in TypeScript respectively the logical
   * bitwise operations are limited to 32-bit numbers.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix used for
   * right shifting of its elements.
   * @param {number | MatrixType | NumericMatrix} m - The number or
   * matrix for the bitwise right shift operation.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix resulting from the pointwise bitwise right shift operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("rightShiftBy"),
    1,
  )
  public static rightShiftBy(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (!conditions.IsNumber(m)) {
      if (
        (m as MatrixType | NumericMatrix).length !== matrix.length &&
        (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
      ) {
        errors.IncorrectMatrixParameterInPointwise("rightShiftBy")();
      }
    }

    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "rightShiftBy",
      type,
    );
  }

  /**
   * Gets a block matrix by given starting and ending indices
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix from which
   * will be extracted a block element.
   * @param {MatrixBlockOptions} options - The "from" and "to" indices needed for the method
   *   (by default set to [0, 0] and [rows - 1, columns - 1]).
   * @returns {MatrixType | NumericMatrix} The block as Matrix
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifFromOrToParametersAreIncorrectlyDefinedThrow(
    errors.IncorrectFromAndToParametersInGetBlock,
  )
  public static getBlock(
    matrix: MatrixType | NumericMatrix,
    options?: MatrixBlockOptions,
  ): MatrixType | NumericMatrix {
    const { from, to, type } = options as MatrixBlockOptions;
    return models.GetBlock(matrix, from, to, type || Matrix._type);
  }

  /**
   * Sets the elements of a block/ sub - matrix of the first Matrix
   * parameter with the elements of the "block" parameter.
   *
   * @param{MatrixType | NumericMatrix} matrix - The matrix which will be
   * changed.
   * @param {MatrixBlockOptions} options - The "from" and "to" parameters needed for the method.
   *  @param{MatrixType | NumericMatrix} block - The submatrix which will
   * be put in the maatrix.
   * @returns {MatrixType | NumericMatrix} The updated Matrix instance.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifFromOrToParametersAreIncorrectlyDefinedThrow(
    errors.IncorrectFromAndToParametersInSetBlock,
  )
  public static setBlock(
    matrix: MatrixType | NumericMatrix,
    options: MatrixBlockOptions,
    block: MatrixType | NumericMatrix,
  ): MatrixType | NumericMatrix {
    const { from, to } = options;
    if (conditions.IsArrayOfArraysWithEqualSize(block as NumericMatrix)) {
      if (
        (block as NumericMatrix).length > (to[0] - from[0] + 1) ||
        (block as NumericMatrix)[0].length > (to[1] - from[1] + 1)
      ) {
        errors.IncorrectBlockParameterInSetBlock();
      }
    }

    models.SetBlock(matrix, block as NumericMatrix, from, to);

    return matrix;
  }

  /**
   * Retrieves a specific row from the matrix based on the provided row index
   * and optional column range.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix instance from which will
   * be extracted the row.
   * @param {Integer} rowIndex - The index of the row to retrieve.
   * @param {Integer} [fromColumnIndex=0] - The starting column index (default is 0).
   * @param {Integer} [toColumnIndex=this.columns - 1] - The ending column index (default is the last column).
   * @returns {MatrixType | NumericMatrix} - The extracted row as a Matrix.
   * @throws {Error} If the row index or the fromIndex and toIndex parameters are
   * incorrectly defined.
   */
  public static getRow(
    matrix: MatrixType | NumericMatrix,
    rowIndex: Integer,
    fromColumnIndex: Integer = 0,
    toColumnIndex: Integer = matrix[0].length - 1,
  ): MatrixType | NumericMatrix {
    return Matrix.getBlock(
      matrix,
      {
        from: [rowIndex, fromColumnIndex],
        to: [rowIndex, toColumnIndex],
      },
    );
  }

  /**
   * Sets the values of a specific row in the matrix based on the provided row index,
   * column range, and values.
   *
   * @param {NumericMatrix | MatrixType} row - The values to set in the specified row.
   * @param {Integer} rowIndex - The index of the row to set.
   * @param {Integer} fromColumnIndex - The starting column index.
   * @param {Integer} toColumnIndex - The ending column index.
   * @returns {MatrixType | NumericMatrix} - The updated matrix instance.
   */
  public static setRow(
    matrix: MatrixType | NumericMatrix,
    row: MatrixType | NumericMatrix,
    rowIndex: Integer,
    fromColumnIndex: Integer,
    toColumnIndex: Integer,
  ): MatrixType | NumericMatrix {
    return Matrix.setBlock(
      matrix,
      {
        from: [rowIndex, fromColumnIndex],
        to: [rowIndex, toColumnIndex],
      },
      row,
    );
  }

  /**
   * Exchange rows in the matrix.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose
   * rows will be changed.
   * @param {Integer} row1 - The index of the first row to exchange.
   * @param {Integer} row2 - The index of the second row to exchange.
   * @param {Integer} fromColumn - The starting column index (inclusive).
   * @param {Integer} toColumn - The ending column index (exclusive).
   * @returns {MatrixType | NumericMatrix} The updated Matrix instance
   * (The initial matrix is not copied).
   * @throws {Error} If the rows or the from column index or to column index
   * is incorrectly defined (negative or greater than the matrix columns).
   */
  @ifRowOrFromIndexOrToIndexIsIncorrectlyDefinedThrow([
    errors.IncorrectRowIndexParametersInExchangeRows,
    errors.IncorrectFromColumnIndexParameterInExchangeRows,
    errors.IncorrectToColumnIndexParameterInExcangeRows,
  ])
  public static exchangeRows(
    matrix: MatrixType | NumericMatrix,
    row1: Integer,
    row2: Integer,
    fromColumn: Integer = 0,
    toColumn: Integer = matrix[0].length - 1,
  ): MatrixType | NumericMatrix {
    models.ExchangeRows(matrix, row1, row2, fromColumn, toColumn);
    return matrix;
  }

  /**
   * Exchange columns in the matrix
   *
   * @param {MatrixType | NumericMatrix} matrix - The Matrix instance whose columns
   * will be exchanged.
   * @param {Integer} col1 - The index of the first column to exchange
   * @param {Integer} col2 - The index of the second column to exchange
   * @param {Integer} fromRow - The starting row index
   * @param {Integer} toRow - The ending row index
   * @returns {MatrixType | NumericMatrix} The updated matrix instance (the previous values are not copied)
   */
  @ifColumnsOrFromRowIndexOrToRowIndexIsIncorrectlyDefinedThrow([
    errors.IncorrectColumnIndexParametersInExchangeColumns,
    errors.IncorrectFromRowIndexParameterInExchangeColumns,
    errors.IncorrectToRowIndexParameterInExchangeColumns,
  ])
  public static exchangeColumns(
    matrix: MatrixType | NumericMatrix,
    col1: Integer,
    col2: Integer,
    fromRow: Integer = 0,
    toRow: Integer = matrix.length - 1,
  ): MatrixType | NumericMatrix {
    models.ExchangeColumns(matrix, col1, col2, fromRow, toRow);
    return matrix;
  }

  /**
   * Gets the diagonal of the matrix or the subdiagonal when a row index is defined.
   * @param {MatrixType | NumericMatrix} matrix - The matrix instance.
   * @param {Integer} row - The row index for subdiagonal (default is 0).
   * @param {NumericType} type - The type of the output matrix elements.
   * @param {"row" | "column"} mode - The format of the output.
   * @returns {MatrixType | NumericMatrix} - The diagonal or subdiagonal as a Matrix.
   */
  @ifRowParameterIsInappropriatelyDefinedThrow(
    errors.IncorrectRowIndexParameterInGetDiagonal,
  )
  public static getDiagonal(
    matrix: MatrixType | NumericMatrix,
    row: Integer = 0,
    type: NumericType = Matrix._type,
    mode: string = "row",
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);
    if (mode === "column") {
      return models.GetDiagonalAsColumn(matrix, row, typedArray);
    }
    return models.GetDiagonal(matrix, row, typedArray);
  }

  /**
   * Converts the matrix parameter into collection of
   * diagonal matrix blocks.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix which will be
   * used for generating of Diagonal  - like matrices (matrix).
   * @returns {MatrixType | NumericMatrix} - The resulting diagonal matrix.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsColumnVectorThrow(errors.InappropriateMatrixParameterInToDiagonalMatrix)
  public static toDiagonalMatrix(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.ToDiagonalMatrix(matrix, type);
  }

  /**
   * Appends a block to the right side of the first matrix instance.
   *
   * @param {MatrixType | NumericMatrix} matrix - The initial matrix instance.
   * @param {NumericMatrix | MatrixType} block - The block to append.
   * @returns {MatrixType | NumericMatrix} - The extended matrix instance.
   * @throws {Error} If the Block matrix has rows which are
   * not equal to the "matrix" parameter.
   */
  @ifBlockIsEmptyReturnMatrix()
  @ifBlockHasDifferentRowsFromTheMatrixThrow(
    errors.IncorrectBlockParameterInAppendBlockRight,
  )
  public static appendBlockRight(
    matrix: MatrixType | NumericMatrix,
    block: NumericMatrix | MatrixType,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);
    return models.AppendBlockRight(
      matrix,
      block,
      typedArray,
    );
  }

  /**
   * Appends a block to the bottom of the first matrix parameter.
   *
   * @param {NumericMatrix | MatrixType} matrix - The initial matrix.
   * @param {NumericMatrix | MatrixType} block - The block to append.
   * @param {NumericType} type - The type of the extended matrix.
   * @returns {MatrixType | NumericMatrix} - The extended matrix.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifBlockIsEmptyReturnMatrix()
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectBlockParameterInAppendBlockBottom,
    1,
  )
  @ifBlockHasDifferentColumnsFromTheMatrixThrow(
    errors.IncorrectBlockParameterInAppendBlockBottom,
  )
  public static appendBlockBottom(
    matrix: MatrixType | NumericMatrix,
    block: NumericMatrix | MatrixType,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const dimensions = models.ComputeDimensions(matrix);
    const typedArray = models.CreateTypedArrayConstructor(type);
    return models.AppendBlockBottom(
      matrix,
      block,
      typedArray,
      dimensions.length,
    );
  }

  // 4. Matrix operations and
  // common linear algebra algorithms.

  /**
   * Reshapes the matrix to have the specified number of rows and columns.
   * Throws an error if the provided rows and columns are inappropriate.
   *
   * @param {Integer} rows - The desired number of rows for the reshaped matrix.
   * @param {Integer} columns - The desired number of columns for the reshaped matrix.
   * @returns {MatrixType | NumericMatrix} The reshaped matrix.
   * @throws {Error} Throws an error if the provided rows and columns are inappropriate.
   * i.e. when they are not positive integers.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifRowsAndColumnsAreInappropriatelyDefinedThrow(
    errors.IncorrectRowsAndColumnsParametersInReshape,
  )
  public static reshape(
    matrix: MatrixType | NumericMatrix,
    rows: Integer,
    columns: Integer,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (rows === matrix.length && columns === matrix[0].length) return matrix;
    const typedArray = models.CreateTypedArrayConstructor(type);
    return models.Reshape(
      matrix,
      matrix.length,
      matrix[0].length,
      rows,
      columns,
      typedArray,
    );
  }

  /**
   * Transposes the current matrix,
   * swapping its rows and columns.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix argument.
   * @param {NumericType} type - the type of the output.
   * @returns {MatrixType | NumericMatrix} A new Matrix.
   * instance representing the transposed matrix.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static transpose(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    if (matrix.length === 1 && matrix[0].length === 1) return matrix;
    const typedArray = models.CreateTypedArrayConstructor(type);
    return models.TransposeMatrix(
      matrix,
      matrix.length,
      matrix[0].length,
      typedArray,
    );
  }

  /**
   * Calculates the Frobenius norm of a matrix.
   *
   * @param{MatrixType | NumericMatrix} matrix - the matrix
   * whose norm has to be computed.
   * @throws {Error} If the matrix is not valid.
   * @returns {number} The Frobenius (Euclidean)
   * norm of the matrix.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static FrobeniusNorm(matrix: MatrixType | NumericMatrix): number {
    return models.FrobeniusNorm(matrix);
  }

  /**
   * Obtains the infinity norm of the matrix.
   * The infinity norm is the maximum absolute row sum of the matrix.
   * It is calculated as the maximum sum of absolute values of each row.
   * If the matrix is empty or contains non-numeric elements, an internal error is thrown.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose norm
   * has to be computed.
   * @returns {number} The infinity norm of the matrix.
   * @throws {Error} Throws an internal error if the matrix
   * is empty or contains non-numeric elements or is incorrectly defined.
   *
   * @example
   * const matrix = [[1, 2, 3], [-4, 5, 6], [7, 8, 9]];
   * const infinityNorm = Matrix.infinityNorm(matrix); // Returns 24
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static infinityNorm(matrix: MatrixType | NumericMatrix): number {
    const infNorm = models.MatrixReduce(matrix, "infNorm");
    if (infNorm < 0 || isNaN(infNorm)) {
      errors.InternalErrorInInfinityNorm();
    }

    return infNorm;
  }

  /**
   * Obtains the maximum absolute element norm of the matrix.
   * The maximum absolute element norm is the maximum absolute value of any element in the matrix.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose norm
   * have to be computed.
   * @returns {number} The maximum absolute element norm of the matrix.
   *
   * @example
   * const matrix = [[1, 2, 3], [-4, 5, 6], [7, 8, 9]];
   * const maxNorm = Matrix.maxNorm(matrix); // Returns 9 (maximum absolute value in the matrix)
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static maxNorm(matrix: MatrixType | NumericMatrix): number {
    const maxNorm = models.MatrixReduce(matrix, "maxNorm");
    if (maxNorm < 0 || isNaN(maxNorm)) {
      errors.InternalErrorInMaxNorm();
    }

    return maxNorm;
  }

  /**
   * Computes the 1-norm (maximum column sum) of the matrix.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix
   * whose norm has to be computed.
   * @returns {number} The 1-norm of the matrix.
   * @throws {Error} If the calculation of the method is NaN.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static norm1(matrix: MatrixType | NumericMatrix): number {
    const norm1 = models.MatrixReduce(matrix, "norm1");
    if (norm1 < 0 || isNaN(norm1)) {
      errors.InternalErrorInNorm1();
    }

    return norm1;
  }

  /**
   * Computes the superior norm of the matrix.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix
   * whose elements will be examined.
   * @returns {number} The superior norm.
   * @throws {Error} If the calculation result is NaN.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static superior(matrix: MatrixType | NumericMatrix): number {
    const superior = models.MatrixReduce(matrix, "sup");
    if (isNaN(superior)) {
      errors.InternalErrorInSuperiorNorm();
    }

    return superior;
  }

  /**
   * Computes the inferior norm of the matrix.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix
   * whose elements will be examined.
   * @returns {number} The inferior norm.
   * @throws {Error} If the calculation result is NaN.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static inferior(matrix: MatrixType | NumericMatrix): number {
    const inferior = models.MatrixReduce(matrix, "inf");
    if (isNaN(inferior)) {
      errors.InternalErrorInInferiorNorm();
    }

    return inferior;
  }

  /**
   * Computes the sum of all elements in the matrix.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix
   * whose elements will be added.
   * @returns {number} The sum of all elements.
   * @throws {Error} If the calculation result is NaN or if
   * the matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static sumOfAllElements(matrix: MatrixType | NumericMatrix): number {
    const sum = models.MatrixReduce(matrix, "sum");
    if (isNaN(sum)) errors.InternalErrorInSum();

    return sum;
  }

  /**
   * Computes the sum of all elements in the matrix.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix
   * whose elements will be multiplied.
   * @returns {number} The product of all elements.
   * @throws {Error} If the calculation result is NaN or the
   * matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static productOfAllElements(
    matrix: MatrixType | NumericMatrix,
  ): number {
    const product = models.MatrixReduce(matrix, "product");
    if (isNaN(product)) errors.InternalErrorInProduct();

    return product;
  }

  /**
   * Computes the sum of the squares of all matrix elements.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix
   * whose elements will be used for computation.
   * @returns {number} The sum of squares of all matrix elements.
   * @throws {Error} If some  of the elements of the matrix is NaN
   * or the result of the computation is negative.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static sumOfSquaresOfAllElements(
    matrix: MatrixType | NumericMatrix,
  ): number {
    const squares = models.MatrixReduce(matrix, "square");
    if (isNaN(squares) || squares < 0) {
      errors.InternalErrorInSquares();
    }

    return squares;
  }

  /**
   * Computes the sum of the cubes of all matrix elements.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix
   * whose elelements will be used for computations.
   * @returns {number} The calculated result of the method.
   * @throws {Error} If the calculated result is NaN.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static sumOfCubesOfAllElements(
    matrix: MatrixType | NumericMatrix,
  ): number {
    const cubes = models.MatrixReduce(matrix, "cube");
    if (isNaN(cubes)) errors.InternalErrorInCubes();

    return cubes;
  }

  /**
   * Performs a pointwise addition operation (classical matrix addition) between
   * the first matrix and the provided number or matrix. If the input is a
   * number, each element of the current matrix is added by that number.
   * If the input is a matrix with the same dimensions as the first matrix,
   * the addition operation is applied element-wise between corresponding elements.
   *
   * @param {MatrixType | NumericMatrix} matrix - The first matrix needed for the addition
   * operation.
   * @param {number | Matrix | MatrixType | NumericMatrix} m - The number or
   * matrix for the addition operation.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix}  A new matrix resulting from the pointwise addition operation.
   * @throws {Error } If the "m" parameter is not a number or Matrix-like structure
   * or has inappropriate dimensions.
   */
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("plus"),
    1,
  )
  @ifIsMatrixWithInappropriateDimensionsForPointwiseOperationsThrow(
    errors.IncorrectMatrixParameterInPointwise("plus"),
  )
  public static plus(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "plus",
      type,
    );
  }

  /**
   * Performs a pointwise subtraction operation between the first matrix and
   * the provided number or matrix. If the input is a number, each element of
   * the first matrix is subtracted by that number. If the input is a matrix
   * with the same dimensions as the current matrix, the subtraction operation
   * is applied element-wise between corresponding elements.
   *
   * @param {MatrixType | NumericMatrix} matrix - The first matrix needed for
   * the subtraction operation.
   * @param {number | MatrixType | NumericMatrix} m - The number or
   * matrix for the subtraction operation.
   * @param {NumericType} type - The type of the elements of the output matrix.
   * @returns {MatrixType | NumericMatrix}  new matrix resulting from the pointwise subtraction operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure
   * or has dimensions which are not equal to the dimensions of the "matrix"
   * parameter.
   */
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("minus"),
    1,
  )
  @ifIsMatrixWithInappropriateDimensionsForPointwiseOperationsThrow(
    errors.IncorrectMatrixParameterInPointwise("minus"),
  )
  public static minus(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "minus",
      type,
    );
  }

  /**
   * Performs a pointwise exponentiation operation between the first matrix and
   * the provided number or matrix. If the input is a number, each element of the
   * first matrix is raised to the power of that number. If the input is a matrix
   * with the same dimensions as the first matrix, the exponentiation operation
   * is applied element-wise between corresponding elements.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix which elements will be
   * power-ised.
   * @param {number | MatrixType | NumericMatrix} m - The number or matrix
   * for the exponentiation operation.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix resulting from the pointwise exponentiation operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure
   * or has different dimensions than the "matrix" parameter.
   */
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("power"),
    1,
  )
  @ifIsMatrixWithInappropriateDimensionsForPointwiseOperationsThrow(
    errors.IncorrectMatrixParameterInPointwise("power"),
  )
  public static power(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "power",
      type,
    );
  }

  /**
   * Performs the Hadamard product (element-wise multiplication) between the
   * first matrix and the provided number or matrix. If the input is a number,
   * each element of the first matrix is multiplied by that number. If the input
   * is a matrix with the same dimensions as the first matrix, the Hadamard
   * product is applied element-wise between corresponding elements.
   *
   * @param {MatrixType | NumericMatrix} matrix - The first matrix needed for
   * the pointwise multiplicaton.
   * @param {number | MatrixType | NumericMatrix} m - The number or matrix
   * for the Hadamard product.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix resulting from the Hadamard product operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure
   * or has different dimensions than the "matrix" parameter.
   */
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("Hadamard"),
    1,
  )
  @ifIsMatrixWithInappropriateDimensionsForPointwiseOperationsThrow(
    errors.IncorrectMatrixParameterInPointwise("Hadamard"),
  )
  public static Hadamard(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.BinaryPointwise(
      matrix,
      m as number | MatrixType | NumericMatrix,
      "Hadamard",
      type,
    );
  }

  /**
   * Performs element-wise division between the current matrix and the provided
   * number or matrix. If the input is a number, each element of the current
   * matrix is divided by that number. If the input is a matrix with the same
   * dimensions as the current matrix, division is applied element-wise between
   * corresponding elements.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix, whose elements will
   * be divided.
   * @param {number | MatrixType | NumericMatrix} m -The number or
   * matrix for the element-wise division.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix}  A new matrix resulting from the element-wise division operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure
   * or has different dimensions than the "matrix" parameter.
   */
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("divide"),
    1,
  )
  @ifIsMatrixWithInappropriateDimensionsForPointwiseOperationsThrow(
    errors.IncorrectMatrixParameterInPointwise("divide"),
  )
  public static divide(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.BinaryPointwise(
      matrix,
      m as MatrixType | NumericMatrix,
      "divide",
      type,
    );
  }

  /**
   * Performs element-wise modulus operation between the first matrix and the
   * provided number or matrix. If the input is a number, each element of the
   * first matrix is computed modulo that number. If the input is a matrix
   * with the same dimensions as the first matrix, modulus operation is applied
   * element-wise between corresponding elements.
   *
   * @param {MatrixType | NumericMatrix} matrix - The first matrix needed for
   * the modulus operation.
   * @param {number | MatrixType | NumericMatrix} m - The number or matrix
   * for the element-wise modulus operation.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix resulting from the element-wise modulus operation.
   * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
   */
  @ifIsNotNumberOrMatrixThrow(
    errors.IncorrectMatrixParameterInPointwise("modulus"),
    1,
  )
  @ifIsMatrixWithInappropriateDimensionsForPointwiseOperationsThrow(
    errors.IncorrectMatrixParameterInPointwise("modulus"),
  )
  public static modulus(
    matrix: MatrixType | NumericMatrix,
    m: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.BinaryPointwise(
      matrix,
      m as MatrixType | NumericMatrix,
      "modulus",
      type,
    );
  }

  /**
   * Performs a unary point-wise negation.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose
   * elements will be negated.
   * @param {number} [weight = 1] - The weight (real number) which will be used
   * to multiply the matrix elements before applied the negate operation.
   * @param {number} [bias = 0] - The bias (real number) which will be added to
   * each element of the matrix after the weight multiplication and before the
   * negation operation.
   * @param {NumericMatrix} type? - The type of the resulting matrix.
   * @returns {MatrixType | NumericMatrix} A new Matrix instance with negated elements.
   * @throws {Error} If the matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static negate(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(matrix, "neg", type, weight, bias);
  }

  public static inverted(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(matrix, "inverted", type, weight, bias);
  }
  /**
   * Performs a unary point-wise bitwise negation.
   *
   * Optionally, a weight and bias can be applied to
   * each element.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements
   * will be bitwise negated.
   * @param {number} [weight = 1] - The weight (real number) which will multiply
   * each element of the matrix before the bitwise negation operation.
   * @param {number} [bias = 0] - The bias (real number) which will be added to
   * each element of the matrix after the weight multiplication and before the
   * bitwise negation operation.
   * @param {NumericType} type? - The type of the resulting matrix.
   * @returns {MatrixType | NumericMatrix} A new Matrix instance with
   * bitwise negated elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static bitwiseNegate(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "bneg",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the sine function point-wise to the elements of the matrix.
   *
   * Optionally, a weight and bias can be applied to each element before
   * computing the sine.
   * The resulting value is computed as `Math.sin(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements
   * will be transformed to its sine values.
   * @param {number} [weight=1] - The weight to multiply each matrix element
   * before applying the sine function.
   * @param {number} [bias=0] - The bias to be added to each element after
   * the weiht multiplication.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the sine function
   * applied to its elements.
   * @throws {Error} If the "matrix" parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static sin(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(matrix, "sin", type, weight, bias);
  }

  /**
   * Applies the cosine function point-wise to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before
   * computing the cosine.
   * The resulting value is computed as `Math.cos(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be
   * transformed to its cosine value.
   * @param {number} [weight=1] - The weight to multiply each matrix element before
   * applying the cosine function.
   * @param {number} [bias=0] - The bias to be added to each element after the multiplication.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the cosine function
   * applied to its elements.
   * @throws {Error} If the "matrix" parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static cos(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(matrix, "cos", type, weight, bias);
  }

  /**
   * Applies the tangent function point-wise to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the tangent.
   * The resulting value is computed as `Math.tan(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be used
   * to provide a new matrix with its tangent values.
   * @param {number} [weight=1] - The weight to multiply each matrix element before applying the tangent function.
   * @param {number} [bias=0] - The bias to be added to each element after the multiplication.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the tangent function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static tan(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(matrix, "tan", type, weight, bias);
  }

  /**
   * Applies the cotangent function point-wise to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the cotangent.
   * The resulting value is computed as `Math.cotan(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will
   * be used for providing of a matrix with its cotangent values.
   * @param {number} [weight=1] - The weight to multiply each matrix element before applying the cotangent function.
   * @param {number} [bias=0] - The bias to be added to each element after the multiplication.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the cotangent function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static cotan(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "cotan",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise exponential function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the exponent.
   * The resulting value is computed as `Math.exp(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be
   * used for providing of a matrix with its exponent values.
   * @param {number} weight - A number to multiply each element before applying the exponential function.
   * @param {number} bias - A number to be added to each element before applying the exponential function.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the exponential function applied to its elements.
   * @throws {Error} If the matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static exp(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(matrix, "exp", type, weight, bias);
  }

  /**
   * Applies the point-wise hyperbolic sine function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the hyperbolic sine.
   * The resulting value is computed as `Math.sinh(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be
   * used to be produces a new matrix with its hyperbolic sine values.
   * @param {number} weight - A number to multiply each element before applying the hyperbolic sine function.
   * @param {number} bias - A number to be added to each element before applying the hyperbolic sine function.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the hyperbolic sine function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static sinh(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "sinh",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise hyperbolic cosine function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the hyperbolic cosine.
   * The resulting value is computed as `Math.cosh(weight * element + bias)`.
   *
   * @param {MatrixType | NumericType} matrix - The matrix which will be used
   * for computing and creation of matrix with its hyperbolic cosine values.
   * @param {number} weight - A number to multiply each element before applying the hyperbolic cosine function.
   * @param {number} bias - A number to be added to each element before applying the hyperbolic cosine function.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the hyperbolic cosine function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static cosh(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "cosh",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise hyperbolic tangent function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the hyperbolic tangent.
   * The resulting value is computed as `Math.tanh(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be used
   * for providing of a matrix with its hyperbolic tangent values.
   * @param {number} weight - A number to multiply each element before applying the hyperbolic tangent function.
   * @param {number} bias - A number to be added to each element before applying the hyperbolic tangent function.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the hyperbolic tangent function applied to its elements.
   * @throws {Errors} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static tanh(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "tanh",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise hyperbolic cotangent function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the hyperbolic cotangent.
   * The resulting value is computed as `cotanh(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be used
   * for the generating of a matrix of its hyperbolic cotangent values.
   * @param {number} weight - A number to multiply each element before applying the hyperbolic cotangent function.
   * @param {number} bias - A number to be added to each element before applying the hyperbolic cotangent function.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the hyperbolic cotangent function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static cotanh(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "cotanh",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise arcsine function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the arcsine.
   * The resulting value is computed as `Math.asin(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements
   * will be used for generating of a new matrix of its arcus sine values.
   * @param {number} weight - A number to multiply each element before applying the arcsine function.
   * @param {number} bias - A number to be added to each element before applying the arcsine function.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the arcsine function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static arcsin(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "arcsin",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise arccosine function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the arccosine.
   * The resulting value is computed as `Math.acos(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be used
   * for generating of a matrix of its arcus cosine values.
   * @param {number} weight - A number to multiply each element before applying the arccosine function.
   * @param {number} bias - A number to be added to each element before applying the arccosine function.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the arccosine function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static arccos(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "arccos",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise arctangent function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the arctangent.
   * The resulting value is computed as `Math.atan(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be used
   * for the providing of new matrix of its arcus tangent values.
   * @param {number} weight - A number to multiply each element before applying the arctangent function.
   * @param {number} bias - A number to be added to each element before applying the arctangent function.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the arctangent function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static arctan(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "atan",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise arccotangent function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the arccotangent.
   * The resulting value is computed as `Math.acotan(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be used
   * for generating of new matrix of its arcus tangent values.
   * @param {number} weight - A number to multiply each element before applying the arccotangent function.
   * @param {number} bias - A number to be added to each element before applying the arccotangent function.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the arccotangent function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static arccotan(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "acotan",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise absolute value function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the absolute value.
   * The resulting value is computed as `Math.abs(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix -The matrix whose elements will be used
   * to generate a new matrix of its absolute values.
   * @param {number} weight - A number to multiply each element before applying the absolute value function.
   * @param {number} bias - A number to be added to each element before applying the absolute value function.
   * @returns {MatrixType | NumericMatrix} A new matrix with the absolute value function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static abs(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(matrix, "abs", type, weight, bias);
  }

  /**
   * Applies the point-wise sigmoid function to the elements of the matrix or array.
   *
   * Optionally, a weight and bias can be applied to each element before computing the sigmoid.
   * The resulting value is computed as `1 / (1 + Math.exp(-(weight * element + bias)))`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix which elements
   * will be used for generating of matrix of its sigmoid values.
   * @param {number} weight - A number to multiply each element before applying the sigmoid function.
   * @param {number} bias - A number to be added to each element before applying the sigmoid function.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the sigmoid function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static sigmoid(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "sigmoid",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise rounding function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before rounding.
   * The resulting value is computed as `Math.round(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix which elements will be
   * used for generating of a new matrix of its rounded values.
   * @param {number} [weight = 1] - A number to multiply each element before applying the rounding function.
   * @param {number} [bias = 0] - A number to be added to each element before applying the rounding function.
   * @param {NumericType} [type = "float64"] - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the rounding function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static round(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "round",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise ceiling function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before ceiling.
   * The resulting value is computed as `Math.ceil(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix of the elements of which
   * will be produces a new matrix of its ceiled valuss.
   * @param {number} [weight = 1] - A number to multiply each element before applying the ceiling function.
   * @param {number} [bias = 0] - A number to be added to each element before applying the ceiling function.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the ceiling function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static ceil(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "ceil",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise square root function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the square root.
   * The resulting value is computed as `Math.sqrt(weight * element + bias)`.
   * Be careful for the elements of the matrix. Ensure that all elements are positive before run the
   * method.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix of the elements of which will
   * be performaed a new matrix with elements equal to its square root values.
   * @param {number} [weight = 1] - A number to multiply each element before applying the square root function.
   * @param {number} [bias = 0] - A number to be added to each element before applying the square root function.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the square root function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static sqrt(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "sqrt",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise natural logarithm function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the natural logarithm.
   * The resulting value is computed as `Math.log(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix from the elements of which will be
   * performed a new matrix of tis logarithmic values.
   * @param {number} [weight = 1] - A number to multiply each element before applying the natural logarithm function.
   * @param {number} [bias = 0] - A number to be added to each element before applying the natural logarithm function.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the natural logarithm function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static log(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(matrix, "log", type, weight, bias);
  }

  /**
   * Applies the point-wise floor function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the floor.
   * The resulting value is computed as `Math.floor(weight * element + bias)`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix of the elements of which will
   * be performed a matrix of its floored values.
   * @param {number} [weight = 1] - A number to multiply each element before applying the floor function.
   * @param {number} [bias = 0] - A number to be added to each element before applying the floor function.
   * @param {NumricType} type - type - The type of output matrix elements.
   * @returns {MatrixType | NumericMatrix} A new matrix with the floor function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static floor(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "floor",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise Rectified Linear Unit (ReLU) function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the ReLU.
   * The resulting value is computed as `x <= 0 ? -1 : x`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix from the elements of which
   * will be performed a new matrix of its ReLU values.
   * @param {number} [weight = 1] - A number to multiply each element before applying the ReLU function.
   * @param {number} [bias = 0] - A number to be added to each element before applying the ReLU function.
   * @param {NumericType} type - The type of the output matrix elements.
   * @returns {MatrixType | NumericType} A new matrix with the ReLU function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static ReLU(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "ReLU",
      type,
      weight,
      bias,
    );
  }

  /**
   * Applies the point-wise step function to the elements of the Matrix.
   *
   * Optionally, a weight and bias can be applied to each element before computing the step function.
   * The resulting value is computed as `x <= 0 ? -1 : 1`.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix from the elements of which will
   * be performed a new matrix provided of its step function values.
   * @param {number} weight - A number to multiply each element before applying the step function.
   * @param {number} bias - A number to be added to each element before applying the step function.
   * @param {NumericType} type - The type of the output matrix elements
   * @returns {MatrixType | NumericType} A new matrix with the step function applied to its elements.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static step(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return models.UnaryPointwise(
      matrix,
      "step",
      type,
      weight,
      bias,
    );
  }

  public static softmax(
    matrix: MatrixType | NumericMatrix,
    weight: number = 1,
    bias: number = 0,
    mode: "row" | "column" = "column",
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return matrix;
    // return models.ComputeSoftmax(
    //   matrix,
    //   weight,
    //   bias,
    //   type
    // );
  }

  /**
   * Sets the diagonal elements of a matrix to a specified number.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {number} n - The number to set as the diagonal element.
   * @returns {MatrixType | NumericMatrix} The matrix with diagonal elements set to the specified number.
   * @throws {Error} if the input matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberThrow(errors.IncorrectVectorParameter("setDiagonalToNumber"), 1)
  public static setDiagonalToNumber(
    matrix: MatrixType | NumericMatrix,
    n: number,
  ): MatrixType | NumericMatrix {
    return models.SetMatrixDiagonal(matrix, n);
  }

  /**
   * Sets the diagonal elements of a matrix to the corresponding elements of a row vector.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {MatrixType | NumericMatrix} v - The row vector to set as the diagonal elements.
   * @returns {MatrixType | NumericMatrix} The matrix with diagonal elements set to the row vector.
   * @throws {Error} if the input matrix is incorrectly defined.
   * @throws {Error} if the input vector is incorrectly defined
   * as not a vector or has inappropriate size.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotVectorWithAppropriateSizeThrow(
    errors.IncorrectVectorParameter("setDiagonalToRowVector"),
  )
  public static setDiagonalToRowVector(
    matrix: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
  ): MatrixType | NumericMatrix {
    return models.SetMatrixDiagonal(matrix, v);
  }

  /**
   * Sets the diagonal elements of a matrix to the corresponding elements of a column vector.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {MatrixType | NumericMatrix} v - The column vector to set as the diagonal elements.
   * @returns {MatrixType | NumericMatrix} The matrix with diagonal elements set to the column vector.
   * @throws {Error} if the input matrix is incorrectly defined.
   * @throws {Error} if the input vector is incorrectly defined as
   * not a vector or has inappropriate size.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotVectorWithAppropriateSizeThrow(
    errors.IncorrectVectorParameter("setDiagonalToColumnVector"),
  )
  public static setDiagonalToColumnVector(
    matrix: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
  ): MatrixType | NumericMatrix {
    return models.SetMatrixDiagonal(matrix, v);
  }

  /**
   * Adds a number or elements of vector, or
   * elements of an array to the diagonal
   * of a matrix.
   * NB!The matrix is not copied.
   *
   * @param {MatrixType | NumericMatrix} matrix - The initial matrix.
   * @param {number} v - A number which will be added to all diagonal
   * elements.
   *
   * @returns {MatrixType | NumericMatrix} The matrix with the updated
   * diagonal.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotNumberThrow(errors.IncorrectNumberParameterInAddNumberToDiagonal, 1)
  public static addNumberToDiagonal(
    matrix: MatrixType | NumericMatrix,
    v: number,
  ): MatrixType | NumericMatrix {
    return models.AddNumberToDiagonal(matrix, v);
  }

  /**
   * Adds a row vector to diagonal or throws error
   * when the size of the row vector is inappropriate.
   * NB!The method does not make copy of the matrix.
   *
   * @param {MatrixType | NumericMatrix} matrix - The initial matrix
   * @param {[number[] | TypedArray]} v - The row vector with size
   * min(r, c), where the r and c are the rows and the columns of
   * the "matrix" parameter.
   * @returns {MatrixType | NumericMatrix} The transformed matrix.
   * @throws {Error} If the matrix parameter is icorrectly defined
   * or if the rows vector has inappropriate size.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotRowVectorOrHasInappropriateSizeThrow(
    errors.IncorrectRowVectorInAddToDiagonal,
  )
  public static addRowVectorToDiagonal(
    matrix: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
  ): MatrixType | NumericMatrix {
    return models.AddArrayToDiagonal(matrix, v[0]);
  }

  /**
   * Adds the elements of each row to the equivallent diagonal
   * elements of the matrix.
   * NB! The method does not make copy of the matrix.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whoose
   * diagonal will be transformed.
   * @param {MatrixType | NumericMatrix} v - The column vector, which will
   * be added to the diagonal.
   * @returns {MatrixType | NumericMatrix} The transformed matrix.
   * @throws {Error} If the "matrix" parameter is incorrectly defined or
   * if the second parameter is not column vector witth appropriate size.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifColumnVectorHasInappropriateSizeThrow(
    errors.IncorrectColumnVectorInAddToDiagonal,
  )
  public static addColumnVectorToDiagonal(
    matrix: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
  ): MatrixType | NumericMatrix {
    return models.AddVectorToDiagonal(matrix, v);
  }

  /**
   * Calculates the sum of elements in each row of a matrix.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode of summation:
   * If mode is "row", returns a row vector (1 x rows).
   * If mode is "column", returns a column vector (rows x 1).
   * @returns {MatrixType | NumericMatrix} The result of summing each row or column elements.
   * @throws {Error} if the input matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static sumOfRowElements(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "row" ? "rowSumAsRow" : "rowSumAsColumn";
    
    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  /**
   * Calculates the sum of elements in each row of a matrix,
   * excluding diagonal elements.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode of summation:
   * If mode is "row", returns a row vector (1 x rows) excluding diagonal elements.
   * If mode is "column", returns a column vector (rows x 1) excluding diagonal elements.
   * @returns {MatrixType | NumericMatrix} The result of summation.
   * @throws {Error} if the input matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static sumOfRowElementsExceptDiagonal(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "rowSumNoDiagAsColumn"
      : "rowSumNoDiagAsRow";
    
    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  /**
   * Calculates the sum of elements in each column of a matrix.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode of summation:
   * If mode is "row", returns a row vector (1 x columns).
   * If mode is "column", returns a column vector (columns x 1).
   * @returns {MatrixType | NumericMatrix} The result of summing each column.
   * @throws {Error} if the input matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static sumOfColumnElements(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column" ? "colSumAsColumn" : "colSumAsRow";
    
    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  /**
   * Calculates the sum of elements in each column of a matrix, excluding the diagonal elements.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode of summation:
   * If mode is "row", returns a row vector (1 x columns).
   * If mode is "column", returns a column vector (columns x 1).
   * @returns {MatrixType | NumericMatrix} The result of summing each column excluding the diagonal elements.
   * @throws {Error} if the input matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static sumOfColumnElementsExceptDiagonal(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "colSumNoDiagAsColumn"
      : "colSumNoDiagAsRow";
    
    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  /**
   * Calculates the absolute sum of elements in each row of a matrix.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode of summation:
   * If mode is "row", returns a row vector (1 x rows) containing the absolute sum of each row.
   * If mode is "column", returns a column vector (rows x 1) containing the absolute sum of each column.
   * @returns {MatrixType | NumericMatrix} The result of summing the absolute values of each row.
   * @throws {Error} if the input matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static absoluteSumOfRowElements(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "rowNorm1AsColumn"
      : "rowNorm1AsRow";
    
    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  /**
   * Calculates the absolute sum of elements in each row of a matrix, excluding diagonal elements.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode of summation:
   * If mode is "row", returns a row vector (1 x rows) containing the absolute sum of each row.
   * If mode is "column", returns a column vector (rows x 1) containing the absolute sum of each column.
   * @returns {MatrixType | NumericMatrix} The result.
   * @throws {Error} if the input matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static absoluteSumOfRowElementsExceptDiagonal(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "rowNorm1NoDiagAsColumn"
      : "rowNorm1NoDiagAsRow";
    
    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  /**
   * Calculates the absolute sum of elements in each column of a matrix.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode of summation:
   * If mode is "row", returns a row vector (1 x columns) containing the absolute sum of each column.
   * If mode is "column", returns a column vector (columns x 1) containing the absolute sum of each row.
   * @returns {MatrixType | NumericMatrix} The result of summing the absolute values of each column.
   * @throws {Error} if the input matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static absoluteSumOfColumnElements(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "colNorm1AsColumn"
      : "colNorm1AsRow";
    
    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  /**
   * Calculates the absolute sum of elements in each column of a matrix, excluding diagonal elements.
   *
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode of summation:
   * If mode is "row", returns a row vector (1 x columns).
   * If mode is "column", returns a column vector (columns x 1).
   * @returns {MatrixType | NumericMatrix} The result
   * @throws {Error} if the input matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static absoluteSumOfColumnElementsExceptDiagonal(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "colNorm1NoDiagAsColumn"
      : "colNorm1NoDiagAsRow";
    
    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  /**
   * Calculates the sum of squares of elements in each row of a matrix.
   *
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode of summation:
   * If mode is "row", returns a row vector (1 x rows).
   * If mode is "column", returns a column vector (rows x 1).
   * @returns {MatrixType | NumericMatrix} The result of summing the squares of each row.
   * @throws {Error} if the input matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static sumOfSquaresOfRowElements(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "rowSumSquaresAsColumn"
      : "rowSumSquaresAsRow";
    
    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  /**
   * Calculates the sum of squares of elements in each column of a matrix.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode specifying whether
   * the output should be a row or column vector.
   * @returns {MatrixType | NumericMatrix} The result of summing squares of each column.
   * @throws {Error} if the input matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static sumOfSquaresOfColumnElements(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "colSumSquaresAsColumn"
      : "colSumSquaresAsRow";
    
    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  /**
   * Calculates the sum of squares of elements in each row of a matrix, excluding diagonal elements.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode of summation:
   * If mode is "row", returns a row vector (1 x columns).
   * If mode is "column", returns a column vector (columns x 1).
   * @returns {MatrixType | NumericMatrix} The result of summing the squares of each row,
   * excluding diagonal elements.
   * @throws {Error} if the input matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static sumOfSquaresOfRowElementsExceptDiagonal(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "rowSumSquaresNoDiagAsColumn"
      : "rowSumSquaresNoDiagAsRow";
    
    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  /**
   * Calculates the sum of squares of elements in each column
   * of a matrix excluding diagonal elements.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode of summation:
   * If mode is "row", returns a row vector (1 x rows).
   * If mode is "column", returns a column vector (rows x 1).
   * @returns {MatrixType | NumericMatrix} The result of summing the squares
   * of each column's elements excluding diagonal elements.
   * @throws {Error} if the input matrix is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static sumOfSquaresOfColumnElementsExceptDiagonal(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "colSumSquaresNoDiagAsColumn"
      : "colSumSquaresNoDiagAsRow";
    
    return models.MatrixMapReduce(matrix, type, modeExtension);
  }
  
  public static maxRowElements(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "maxRowElementAsColumn"
      : "maxRowElementAsRow";

    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  public static maxRowElementsExceptDiagonal(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
     ? "maxRowElementExceptDiagonalAsColumn"
     : "maxRowElementExceptDiagonalAsRow";

    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  public static maxColumnElements(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "maxColElementAsColumn"
      : "maxColElementAsRow";

    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  public static maxColumnElementsExceptDiagonal(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "maxColElementExceptDiagonalAsColumn"
      : "maxColElementExceptDiagonalAsRow"

    return models.MatrixMapReduce(matrix, type, modeExtension);
  }

  /**
   * Adds a row or column vector to each row of a matrix along the row axis.
   *
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {MatrixType | NumericMatrix} vector - The row or column vector to be
   * added to each row of the matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode specifying whether the
   * vector is a row or column vector.
   * If mode is "row", the vector is treated as a row vector.
   * If mode is "column", the vector is treated as a column vector.
   * @returns {MatrixType | NumericMatrix} The matrix resulting from adding the
   * vector to each column.
   * @throws {Error} if the input matrix or vector is incorrectly
   * defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotVectorOrHasInappropriateSizeThrow(
    errors.IncorrectVectorParameter("addVectorToMatrixByRowAxis"),
  )
  public static addVectorToMatrixByRowAxis(
    matrix: MatrixType | NumericMatrix,
    vector: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const dim = Matrix.dimensions(matrix);
    const modeExtension = mode === "column"
      ? "addColVectorToMatrixByRowAxis"
      : "addRowVectorToMatrixByRowAxis";
    return models.ApplyVectorOperationToMatrix(
      matrix,
      vector,
      type,
      dim,
      modeExtension,
    );
  }

  /**
   * Adds a row or column vector to each column of a matrix (along the column axis).
   *
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {MatrixType | NumericMatrix} vector - The vector to add to each column.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode specifying whether the vector
   * is a row or column vector.
   * @returns {MatrixType | NumericMatrix} The result of adding the vector to each
   * column of the matrix.
   * @throws {Error} if the input matrix or vector is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotVectorOrHasInappropriateSizeThrow(
    errors.IncorrectVectorParameter("addVectorToMatrixByColumnAxis"),
    "column",
  )
  public static addVectorToMatrixByColumnAxis(
    matrix: MatrixType | NumericMatrix,
    vector: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const dim = Matrix.dimensions(matrix);
    const modeExtension = mode === "column"
      ? "addColVectorToMatrixByColAxis"
      : "addRowVectorToMatrixByColAxis";
    return models.ApplyVectorOperationToMatrix(
      matrix,
      vector,
      type,
      dim,
      modeExtension,
    );
  }

  /**
   * Subtracts a row or column vector from each column of a matrix (along the column axis).
   *
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {MatrixType | NumericMatrix} vector - The vector to subtract from each column.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode specifying whether the vector is a
   * row or column vector.
   * @returns {MatrixType | NumericMatrix} The result of subtracting the vector from each
   * column of the matrix.
   * @throws {Error} if the input matrix or vector is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotVectorOrHasInappropriateSizeThrow(
    errors.IncorrectVectorParameter("subtractVectorToMatrixByColumnAxis"),
    "column",
  )
  public static subtractVectorFromMatrixByColumnAxis(
    matrix: MatrixType | NumericMatrix,
    vector: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const dim = Matrix.dimensions(matrix);
    const modeExtension = mode === "column"
      ? "subtractColVectorFromMatrixByColAxis"
      : "subtractRowVectorFromMatrixByColAxis";
    return models.ApplyVectorOperationToMatrix(
      matrix,
      vector,
      type,
      dim,
      modeExtension,
    );
  }

  /**
   * Subtracts a row or column vector from each row of a matrix along the row axis.
   *
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {MatrixType | NumericMatrix} vector - The row or column vector to be
   * subtracted from each row of the matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode specifying whether the vector
   * is a row or column vector.
   * If mode is "row", the vector is treated as a row vector.
   * If mode is "column", the vector is treated as a column vector.
   * @returns {MatrixType | NumericMatrix} The matrix resulting from subtracting the
   * vector from each column.
   * @throws {Error} if the input matrix or vector is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotVectorOrHasInappropriateSizeThrow(
    errors.IncorrectVectorParameter("subtractVectorFromMatrixByRowAxis"),
  )
  public static subtractVectorFromMatrixByRowAxis(
    matrix: MatrixType | NumericMatrix,
    vector: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const dim = Matrix.dimensions(matrix);
    const modeExtension = mode === "column"
      ? "subtractColVectorFromMatrixByRowAxis"
      : "subtractRowVectorFromMatrixByRowAxis";
    return models.ApplyVectorOperationToMatrix(
      matrix,
      vector,
      type,
      dim,
      modeExtension,
    );
  }

  /**
   * Performs pointwise multiplication of a row or column vector with
   * each row of a matrix along the row axis.
   *
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {MatrixType | NumericMatrix} vector - The row or column
   * vector to be multiplied with each row of the matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode specifying whether
   * the vector should be treated as a row or column vector.
   * @returns {MatrixType | NumericMatrix} The result of pointwise multiplication.
   * @throws {Error} if the input matrix or vector is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotVectorOrHasInappropriateSizeThrow(
    errors.IncorrectVectorParameter(
      "pointwiseMultiplyVectorWithMatrixByRowAxis",
    ),
  )
  public static pointwiseMultiplyMatrixWithVectorByRowAxis(
    matrix: MatrixType | NumericMatrix,
    vector: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "multiplyColVectorToMatrixByRowAxis"
      : "multiplyRowVectorToMatrixByRowAxis";
    const dim = Matrix.dimensions(matrix);
    return models.ApplyVectorOperationToMatrix(
      matrix,
      vector,
      type,
      dim,
      modeExtension,
    );
  }

  /**
   * Performs a pointwise multiplication of a matrix with a row or column
   * vector along the column axis.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {MatrixType | NumericMatrix} vector - The vector to be pointwise
   * multiplied with each column of the matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode specifying whether the
   * vector is a row or column vector.
   * @returns {MatrixType | NumericMatrix} The result of the pointwise
   * multiplication along the column axis.
   * @throws {Error} if the input matrix or vector is incorrectly
   * defined or if the vector size is inappropriate for the operation.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotVectorOrHasInappropriateSizeThrow(
    errors.IncorrectVectorParameter(
      "pointwiseMultiplyMatrixWithVectorByColumnAxis",
    ),
    "column",
  )
  public static pointwiseMultiplyMatrixWithVectorByColumnAxis(
    matrix: MatrixType | NumericMatrix,
    vector: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const dim = Matrix.dimensions(matrix);
    const modeExtension = mode === "column"
      ? "multiplyColVectorToMatrixByColAxis"
      : "multiplyRowVectorToMatrixByColAxis";
    return models.ApplyVectorOperationToMatrix(
      matrix,
      vector,
      type,
      dim,
      modeExtension,
    );
  }

  /**
   * Performs pointwise division of each row of a matrix by a
   * row or column vector along the row axis.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {MatrixType | NumericMatrix} vector - The row or column vector used for division.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode specifying whether the vector should
   * be treated as a row or column vector.
   * @returns {MatrixType | NumericMatrix} The result of pointwise division.
   * @throws {Error} if the input matrix or vector is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotVectorOrHasInappropriateSizeThrow(
    errors.IncorrectVectorParameter("pointwiseDivideMatrixWithVectorByRowAxis"),
  )
  public static pointwiseDivideMatrixWithVectorByRowAxis(
    matrix: MatrixType | NumericMatrix,
    vector: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const modeExtension = mode === "column"
      ? "divideColVectorToMatrixByRowAxis"
      : "divideRowVectorToMatrixByRowAxis";
    const dim = Matrix.dimensions(matrix);
    return models.ApplyVectorOperationToMatrix(
      matrix,
      vector,
      type,
      dim,
      modeExtension,
    );
  }

  /**
   * Performs a pointwise division of a matrix with a row or
   * column vector along the column axis.
   *
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {MatrixType | NumericMatrix} vector - The vector to be
   * pointwise divided with each column of the matrix.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the output.
   * @param {"row" | "column"} [mode="row"] - The mode specifying
   * whether the vector is a row or column vector.
   * @returns {MatrixType | NumericMatrix} The result of the pointwise
   * division along the column axis.
   * @throws {Error} if the input matrix or vector is incorrectly
   * defined or if the vector size is inappropriate for the operation.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotVectorOrHasInappropriateSizeThrow(
    errors.IncorrectVectorParameter(
      "pointwiseDivideMatrixWithVectorByColumnAxis",
    ),
    "column",
  )
  public static pointwiseDivideMatrixWithVectorByColumnAxis(
    matrix: MatrixType | NumericMatrix,
    vector: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    mode: "row" | "column" = "row",
  ): MatrixType | NumericMatrix {
    const dim = Matrix.dimensions(matrix);
    const modeExtension = mode === "column"
      ? "divideColVectorToMatrixByColAxis"
      : "divideRowVectorToMatrixByColAxis";
    return models.ApplyVectorOperationToMatrix(
      matrix,
      vector,
      type,
      dim,
      modeExtension,
    );
  }

  /**
   * Performs multiplication of two matrices or a matrix and a scalar.
   * If both inputs are matrices, performs matrix multiplication.
   * If one input is a scalar and the other is a matrix, performs scalar multiplication.
   *
   * @param {number | MatrixType | NumericMatrix} a - The first operand.
   * @param {number | MatrixType | NumericMatrix} b - The second operand.
   * @param {NumericType} [type=Matrix._type] - The type of the resulting matrix elements.
   * @returns {MatrixType | NumericMatrix} The result of the multiplication.
   * @throws {Error} If any input parameter is invalid.
   */
  @ifIsNotNumberOrMatrixThrow(errors.IncorrectParametersInTimes)
  @ifIsNotNumberOrMatrixThrow(errors.IncorrectParametersInTimes, 1)
  @ifTheParametersAreMatricesWithInappropriateSizeThrow(
    errors.IncorrectParametersInTimes,
  )
  public static times(
    a: number | MatrixType | NumericMatrix,
    b: number | MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);
    const aIsNumber = typeof a === "number";
    const bIsNumber = typeof b === "number";

    if (!aIsNumber && !bIsNumber) {
      let ar: Integer, ac: Integer, br: Integer, bc: Integer;
      [ar, ac] = Matrix.dimensions(a as MatrixType | NumericMatrix);
      [br, bc] = Matrix.dimensions(b as MatrixType | NumericMatrix);
      if (ar === 1 && ac === 1) {
        return Matrix.Hadamard(b as MatrixType | NumericMatrix, a[0][0]);
      }

      if (br === 1 && bc === 1) {
        return Matrix.Hadamard(a as MatrixType | NumericMatrix, b[0][0]);
      }

      return models.MultiplyMatrices(
        a as MatrixType | NumericMatrix,
        b as MatrixType | NumericMatrix,
        typedArray,
      );
    }
    if (aIsNumber && bIsNumber) {
      const c: number[] | TypedArray = new typedArray(1);
      c[0] = (a as number) * (b as number);
      return [c] as MatrixType | NumericMatrix;
    }

    if (aIsNumber && !bIsNumber) {
      return Matrix.Hadamard(b as MatrixType | NumericMatrix, a);
    }

    if (!aIsNumber && bIsNumber) {
      return Matrix.Hadamard(a as MatrixType | NumericMatrix, b);
    }

    return errors.IncorrectParametersInTimes();
  }

  /**
   * Performs matrix multiplication of two lower triangular matrices.
   * Both matrices must be square and have equal dimensions.
   *
   * @param {MatrixType | NumericMatrix} m1 - The first lower triangular matrix.
   * @param {MatrixType | NumericMatrix} m2 - The second lower triangular matrix.
   * @param {NumericType} [type=Matrix._type] - The type of the resulting matrix elements.
   * @returns {MatrixType | NumericMatrix} The result of the matrix multiplication.
   * @throws {Error} If any input parameter is invalid or if the matrices are not square.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput, 1)
  @ifIsNotSquareMatrixThrow(errors.IncorrectMatrixInput)
  @ifTheParametersAreMatricesWithInappropriateSizeThrow(
    errors.IncorrectParametersInTimes,
  )
  public static multiplyLL(
    m1: MatrixType | NumericMatrix,
    m2: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);
    return models.MultiplyLL(m1, m2, typedArray);
  }

  /**
   * Performs matrix multiplication of two upper triangular matrices.
   * Both matrices must be square and have equal dimensions.
   *
   * @param {MatrixType | NumericMatrix} m1 - The first upper triangular matrix.
   * @param {MatrixType | NumericMatrix} m2 - The second upper triangular matrix.
   * @param {NumericType} type - The type of the resulting matrix elements.
   * @returns {MatrixType | NumericMatrix} The result of the matrix multiplication.
   * @throws {Error} If any of the input parameter is invalid or if the matrices are not square.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotSquareMatrixThrow(errors.IncorrectMatrixInput)
  @ifTheParametersAreMatricesWithInappropriateSizeThrow(
    errors.IncorrectParametersInTimes,
  )
  public static multiplyUU(
    m1: MatrixType | NumericMatrix,
    m2: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);
    return models.MultiplyUU(m1, m2, typedArray);
  }

  /**
   * Performs matrix multiplication of lower and upper triangular matrices.
   * Both matrices must be square and have equal dimensions.
   *
   * @param {MatrixType | NumericMatrix} m1 - The first lower triangular matrix.
   * @param {MatrixType | NumericMatrix} m2 - The second upper triangular matrix.
   * @param {NumericType} type - The type of the resulting matrix elements.
   * @returns {MatrixType | NumericMatrix} The result of the matrix multiplication.
   * @throws {Error} If any of the input parameter is invalid or if the matrices are not square.
   */

  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotSquareMatrixThrow(errors.IncorrectMatrixInput)
  @ifTheParametersAreMatricesWithInappropriateSizeThrow(
    errors.IncorrectParametersInTimes,
  )
  public static multiplyLU(
    m1: MatrixType | NumericMatrix,
    m2: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);
    return models.MultiplyLU(m1, m2, typedArray);
  }

  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput, 1)
  @ifIsNotSquareMatrixThrow(errors.IncorrectMatrixInput)
  @ifTheParametersAreMatricesWithInappropriateSizeThrow(
    errors.IncorrectMatrixInput,
  )
  public static multiplyUL(
    m1: MatrixType | NumericMatrix,
    m2: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);
    return models.MultiplyUL(m1, m2, typedArray);
  }

  /**
   * Implements the matrix inversion algorithms.
   * The method implements the Gauss, LU inversion and
   * iterative approach for matrix inversion.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix which will be inversed.
   * @param {NumericType} [type = Matrix._type] - The type of the inversed matrix.
   * @param {InverseMethods} [method = "Gauss"] - The method which
   * will be used for matrix inversion.
   * @returns {MatrixType | NumericMatrix} The inverse matrix.
   * @throws {Error} If the matrix is incorrectly defined or if is non square.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotSquareMatrixThrow(errors.NonSquareMatrixInInverse)
  public static inverse(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
    method: InverseMethods = "Gauss",
  ): MatrixType | NumericMatrix {
    const a = Matrix.copy(matrix);
    const typedArray = models.CreateTypedArrayConstructor(type);
    if (method === "Gauss") return models.InverseMatrixGauss(a, typedArray);
    if (method === "LU") {
      const LUPC = Matrix.LUPC(a);
      return models.InverseMatrixLU(LUPC.LU, LUPC.P, typedArray);
    }

    return errors.IncorrectMethodParameterInInverse();
  }

  /**
   * Obtains the circles of Gershgorin of a matrix.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix instance.
   * @param {NumericType} [type=Matrix._type] - The type of the resulting
   * matrix.
   * @returns {MatrixType | NumericMatrix}
   * @throws {Error} If the "matrix" parameter is incorrectly declared.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static GershgorinCircles(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const center = Matrix.getDiagonal(matrix, undefined, type);
    const rr = Matrix.absoluteSumOfRowElementsExceptDiagonal(matrix, type);
    const circles: MatrixType | NumericMatrix = [
      Matrix.minus(center, rr, type)[0],
      Matrix.plus(center, rr, type)[0],
    ] as MatrixType | NumericMatrix;
    return circles;
  }

  // 5. Numerical methods

  /**
   * @param {MatrixType | NumericMatrix} matrix - The matrix which will be
   * factorized with the LU algorithm.
   * @returns {{LU: MatrixType | NumericMatrix, P: Integer[]}}
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static LUPC(
    matrix: MatrixType | NumericMatrix,
  ): { LU: MatrixType | NumericMatrix; P: Integer[] } {
    return models.CompactLUFactorizationWithPermutations(matrix);
  }

  /**
   * Performs the Cholesky LL factorization on a given symmetric positive definite matrix.
   *
   * Cholesky LL factorization decomposes a symmetric positive definite matrix into
   * the product of a lower triangular matrix and its transpose.
   *
   * @param {MatrixType | NumericMatrix} matrix - The input matrix to be factorized.
   * @param {boolean} [secure = false] - Optional. Indicates whether to perform secure operations.
   * @returns {MatrixType | NumericMatrix} The lower triangular matrix resulting from the LL factorization.
   * @throws {Error} If the input matrix is not symmetric positive definite or is incorrectly declared.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifSecureAndNotSymmetricThrow(errors.NonSymmetricMatrixInLL)
  public static LL(
    matrix: MatrixType | NumericMatrix,
    secure: boolean = false,
  ): MatrixType | NumericMatrix {
    return models.CholeskyBanachiewiczAlgorithm(matrix, secure);
  }

  /**
   * Performs the LDL decomposition on a given symmetric positive definite matrix.
   * The LDL decomposition factors a symmetric positive definite matrix A into the product L * D * L^T,
   * where L is a lower triangular matrix with unit diagonal elements, and D is a diagonal matrix.
   *
   * @param {MatrixType | NumericMatrix} matrix - The symmetric positive definite matrix to be decomposed.
   * @param {NumericType} type - The type of the matrix elements.
   * @returns {{ L: MatrixType | NumericMatrix; D: MatrixType | NumericMatrix }} The lower triangular
   * matrix L and the diagonal matrix D resulting from the LDL decomposition.
   * @throws {Error} If the input matrix is not a square matrix.
   * @throws {Error} If the input matrix is not symmetric positive definite.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotSquareMatrixThrow(errors.NonSquareMatrixInLDL)
  public static LDL(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): { L: MatrixType | NumericMatrix; D: MatrixType | NumericMatrix } {
    const typedArray = models.CreateTypedArrayConstructor(type);
    return models.CholeskyLDL(matrix, typedArray);
  }

  public static QR(matrix: MatrixType | NumericMatrix) {
    return matrix;
  }

  /**
   * Balances a matrix to have the same eigenvalues using the balanc routine.
   * The eigenvalues of the balanced matrix are the same as the original matrix,
   * and the stability of the QR algorithm for eigenvalue calculation is improved.
   * Note that on output the "matrix" input will be destroyed, so copy the initial
   * matrix if you want to save it.
   * @param {MatrixType | NumericMatrix} matrix - The input matrix to be balanced.
   * @returns {MatrixType | NumericMatrix} The balanced matrix with identical eigenvalues.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static balance(
    matrix: MatrixType | NumericMatrix,
  ): MatrixType | NumericMatrix {
    return models.Balance(matrix);
  }

  /**
   * Reduces a square matrix to a upper Hessenberg form.
   * The subdiagonal elements of the input matrix will have
   * random values, so be carefull if you want to use this
   * method outside of its context which is the method eigenvalues.
   * @param {MatrixType | NumericMatrix} matrix - the matrix to be
   * transformed.
   * @returns {MatrixType | NumericMatrix} The transformed matrix.
   * @throws {Error} if the "matrix" parameter is not square matrix.
   */
  @ifIsNotSquareMatrixThrow(errors.IncorrectMatrixInput)
  public static toUpperHessenberg(
    matrix: MatrixType | NumericMatrix,
  ): MatrixType | NumericMatrix {
    const hess = models.ObtainUpperHessenberg(matrix);

    return hess;
  }

  /**
   * Computes the eigenvalues and optionally the eigenvectors
   * of a matrix using the specified method.
   *
   * @param {MatrixType | NumericMatrix} matrix - The input square matrix.
   * @param {Object} [options={}] - Options for the eigenvalue computation.
   * @param {"HQR" | "HQR2" | "JacobiSymmetric"} [options.method="HQR"] - The
   * method to use for the computation.
   * @param {boolean} [options.balance=true] - Whether to balance the matrix before computation.
   * @param {boolean} [options.sort=false] - Whether to sort the eigenvalues.
   * @param {NumericType} [options.type="float64"] - The numeric type of the matrix elements.
   * @returns {{ eigenvalues: { real: TypedArray | number[]; imaginary: TypedArray | number[] }; eigenvectors?:
   * MatrixType | NumericMatrix }} - The computed eigenvalues and optionally the eigenvectors.
   *
   * @example
   * const matrix = [
   *   [4, 1],
   *   [2, 3]
   * ];
   * const result = Matrix.eigenproblem(matrix, { method: "HQR2" });
   * console.log(result.eigenvalues.real); // Logs the real parts of the eigenvalues
   * console.log(result.eigenvalues.imaginary); // Logs the imaginary parts of the eigenvalues
   * if (result.eigenvectors) {
   *   console.log(result.eigenvectors); // Logs the eigenvectors if computed
   * }
   */
  public static eigenproblem(
    matrix: MatrixType | NumericMatrix,
    options: {
      method?: "HQR" | "HQR2" | "JacobiSymmetric";
      balance?: boolean;
      sort?: boolean;
      type?: NumericType;
    } = {},
  ): {
    eigenvalues: {
      real: TypedArray | number[];
      imaginary: TypedArray | number[];
    };
    eigenvectors?: MatrixType | NumericMatrix;
  } {
    const init: {
      method: "HQR" | "HQR2" | "JacobiSymmetric";
      balance: boolean;
      sort: boolean;
      type: NumericType;
    } = {
      method: "HQR",
      balance: true,
      sort: false,
      type: Matrix._type,
    };
    if (options) options = { ...init, ...options };
    else options = init;
    const { method, balance, type } = options;
    const typedArray: TypedArrayConstructor | ArrayConstructor = models
      .CreateTypedArrayConstructor(type as NumericType);
    switch (method) {
      case "HQR":
        if (balance) Matrix.balance(matrix);
        matrix = Matrix.toUpperHessenberg(matrix);
        return { eigenvalues: models.HQR(matrix, typedArray) };
      case "HQR2":
        if (balance) Matrix.balance(matrix);
        matrix = Matrix.toUpperHessenberg(matrix);
        return models.modifiedHQR(matrix, typedArray);
      case "JacobiSymmetric":
        return models.Jacobi(matrix, typedArray);
      default:
        return { eigenvalues: models.HQR(matrix, typedArray) };
    }
  }

  /**
   * Computes the Singular Value Decomposition (SVD) of a given matrix.
   * The matrix "v" on the output is not transposed.
   *
   * @param {MatrixType | NumericMatrix} matrix - The input matrix to decompose.
   * @param {Object} [options] - Optional parameters for the SVD computation.
   * @param {NumericType} [options.type=Matrix._type] - The numeric type for the computation.
   * @param {boolean} [options.copy=false] - Whether to copy the input matrix before performing the decomposition.
   * @param {boolean} [options.sort=false] - Whether to sort
   * the singular values in decreasing order and maximize the count of positive elements.
   * @returns {{ s: TypedArray | number[], v: MatrixType | NumericMatrix, d: MatrixType | NumericMatrix }} - The
   * singular values (`s`),
   * the right singular vectors (`v`),
   * and the left singular vectors (`d`).
   * @throws{Error} if the "matrix" parameter is incorectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static svd(
    matrix: MatrixType | NumericMatrix,
    options: {
      type?: NumericType;
      copy?: boolean; // copy the input
      sort?: boolean; // sort in decreasing order and maximize the count of positive elements...
    } = {},
  ): {
    s: TypedArray | number[];
    v: MatrixType | NumericMatrix;
    d: MatrixType | NumericMatrix;
  } {
    const __options__: {
      type: NumericType;
      copy: boolean;
      sort: boolean;
    } = {
      type: Matrix._type,
      copy: false,
      sort: false,
    };
    const { copy, sort, type } = { ...__options__, ...options };
    const typedArray = models.CreateTypedArrayConstructor(type);
    if (copy) matrix = Matrix.copy(matrix);

    return models.SVD(matrix, typedArray, sort);
  }

  /**
   * Performs a single iteration of the power method
   * for approximating the dominant eigenvalue and
   * its corresponding eigenvector.
   *
   * @param {MatrixType | NumericMatrix} matrix - The input square matrix.
   * @param {MatrixType | NumericMatrix} [x] - Optional initial guess
   * for the eigenvector. If not provided, a default vector will be used.
   * @param {NumericType} [type="float64"] - The numeric type of the matrix elements.
   * @returns {{ eigenvalue: number, eigenvector: MatrixType | NumericMatrix }} - The
   * approximated dominant eigenvalue and the corresponding eigenvector after one iteration.
   *
   * @throws {Error} - If the input is not a matrix of arrays with equal size.
   * @throws {Error} - If the input matrix is not square.
   * @throws {Error} - If the provided vector has inappropriate size.
   *
   * @example
   * const matrix = [
   *   [4, 1],
   *   [2, 3]
   * ];
   * const result = Matrix.eigenproblemPowerMethodIteration(matrix);
   * console.log(result.eigenvalue); // Logs the approximated dominant eigenvalue after one iteration
   * console.log(result.eigenvector); // Logs the corresponding eigenvector after one iteration
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotSquareMatrixThrow(
    errors.IncorrectMatrixParameterInPowerIterationMethod,
  )
  @ifTheVectorIsDefinedAndHasInappropriateSizeThrow(
    errors.IncorrectVectorParameterInPowerIterationMethod,
  )
  public static powerMethodIteration(
    matrix: MatrixType | NumericMatrix,
    x?: MatrixType | NumericMatrix,
    type: NumericType = "float64",
  ): { eigenvalue: number; eigenvector: MatrixType | NumericMatrix } {
    let eigenvalue: number,
      eigenvector: MatrixType | NumericMatrix,
      xnorm: number,
      enorm: number;
    const n = matrix.length;
    if (!x) x = Matrix.replicate(1, n, 1, type);
    xnorm = Matrix.FrobeniusNorm(x);
    eigenvector = Matrix.times(matrix, x);
    enorm = Matrix.FrobeniusNorm(eigenvector);
    // Rayleigh quotient...
    eigenvalue = Matrix.times(Matrix.transpose(x), eigenvector)[0][0] / xnorm;
    eigenvector = Matrix.divide(eigenvector, enorm);
    // the eigen-candidates:
    return {
      eigenvalue,
      eigenvector,
    };
  }

  /**
   * Performs a single iteration of the shifted power method
   * for approximating an eigenvalue and its corresponding eigenvector.
   *
   * @param {MatrixType | NumericMatrix} matrix - The input square matrix.
   * @param {MatrixType | NumericMatrix} [x] - Optional initial guess for
   * the eigenvector. If not provided, a default vector will be used.
   * @param {number} [shift=1] - The shift value to apply in the iteration.
   * @param {NumericType} [type="float64"] - The numeric type of the matrix elements.
   * @returns {{ eigenvalue: number, eigenvector: MatrixType | NumericMatrix, remainder: number }} - The
   * approximated eigenvalue, the corresponding eigenvector, and the remainder after one iteration.
   *
   * @throws {Error} - If the input is not a matrix of arrays with equal size.
   * @throws {Error} - If the input matrix is not square.
   * @throws {Error} - If the provided vector has inappropriate size.
   *
   * @example
   * const matrix = [
   *   [4, 1],
   *   [2, 3]
   * ];
   * const result = Matrix.shiftedPowerMethodIteraton(matrix);
   * console.log(result.eigenvalue); // Logs the approximated eigenvalue after one iteration
   * console.log(result.eigenvector); // Logs the corresponding eigenvector after one iteration
   * console.log(result.remainder); // Logs the remainder after one iteration
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  @ifIsNotSquareMatrixThrow(
    errors.IncorrectMatrixParameterInPowerIterationMethod,
  )
  @ifTheVectorIsDefinedAndHasInappropriateSizeThrow(
    errors.IncorrectVectorParameterInPowerIterationMethod,
  )
  public static shiftedPowerMethodIteraton(
    matrix: MatrixType | NumericMatrix,
    x?: MatrixType | NumericMatrix,
    shift: number = 1,
    type: NumericType = Matrix._type,
  ): {
    eigenvalue: number;
    eigenvector: MatrixType | NumericMatrix;
    remainder: number;
  } {
    const n = matrix.length;
    if (!x) x = Matrix.replicate(1, n, 1, type);
    let eigenvalue: number,
      eigenvector: MatrixType | NumericMatrix,
      y: MatrixType | NumericMatrix,
      r: MatrixType | NumericMatrix,
      mju: number;
    y = Matrix.times(matrix, x);
    eigenvalue = Matrix.times(Matrix.transpose(x), y)[0][0];
    r = Matrix.minus(y, Matrix.Hadamard(x, eigenvalue));
    if (!shift) shift = eigenvalue;
    eigenvector = Matrix.minus(y, Matrix.Hadamard(x, shift));
    mju = 1 / Matrix.FrobeniusNorm(eigenvector);
    eigenvector = Matrix.Hadamard(eigenvector, mju);
    // the eigen candidates and the error estimation.
    return {
      eigenvalue,
      eigenvector,
      remainder: Matrix.FrobeniusNorm(r),
    };
  }

  public static numericalInverseStepSchulz(
    matrix: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    // v = v * (2I - av)
    return Matrix.times(
      v,
      Matrix.addNumberToDiagonal(Matrix.negate(Matrix.times(matrix, v)), 2),
      type,
    );
  }

  /**
   * Computes the inverse approximation iteration
   * according to the article of Li and Li:
   * W. Li, Z. Li, A family of iterative methods for
   * computing the approximate inverse of a square matrix
   * and inner inverse of a non - square mateix, Appl.
   * Math. Comput. 215 (2010), 3433 - 3442.
   *
   * @param {MatrixType | NumericMatrix} a - The matrix on input.
   * @param {MatrixType | NumericMatrix} v - The approximation candidate matrix.
   * @param {NumericType} [type=Matrix.type] - The type of the matrix on output.
   * @returns {MatrixType | NumericMatrix}  The resulting of the computational procedure.
   * @throws {Error} if the "a" input matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static numericalInverseStepLiAndLi(
    a: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const av = Matrix.times(a, v);
    // v = v * (3I - 3av  + (av)^2) = v * (3I - (3I - av) * av)
    return Matrix.times(
      v,
      Matrix.addNumberToDiagonal(
        Matrix.negate(
          Matrix.times(
            Matrix.addNumberToDiagonal(Matrix.negate(av), 3),
            av,
          ),
        ),
        3,
      ),
      type,
    );
  }

  /**
   * Computes the inverse approximation iteration
   * according to the article of Li et al.:
   * H. - B. Li, T. - Z. Huang, Y. Zhang, X. - P. Liu, T. - X. Gu,
   * Chebyshev - type methods and preconditioning techniques, Appl. Math.
   * Comput. 218 (2011) 260 - 270.
   *
   * @param {MatrixType | NumericMatrix} a - The matrix on input.
   * @param {MatrixType | NumericMatrix} v - The approximation candidate matrix.
   * @param {NumericType} [type=Matrix.type] - The type of the matrix on output.
   * @returns {MatrixType | NumericMatrix} The resulting of the computational procedure.
   * @throws {Error} if the "a" input matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static numericalInverseStepLiEtAl(
    a: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    // va
    const va = Matrix.times(v, a);
    // I - va
    const Imva = Matrix.addNumberToDiagonal(Matrix.negate(va), 1);
    // 3I - va
    const I3mva = Matrix.addNumberToDiagonal(Matrix.negate(va), 3);
    // (3I - va)^2
    const I3mva2 = Matrix.times(I3mva, I3mva);
    // v = [I + .25 * (I - va) * (3I - va)^2]*v
    return Matrix.times(
      Matrix.addNumberToDiagonal(
        Matrix.Hadamard(
          Matrix.times(Imva, I3mva2),
          .25,
        ),
        1,
      ),
      v,
      type,
    );
  }

  /**
   * Computes the inverse approximation iteration
   * according to the second suggestion in article of Li et al.:
   * H. - B. Li, T. - Z. Huang, Y. Zhang, X. - P. Liu, T. - X. Gu,
   * Chebyshev - type methods and preconditioning techniques, Appl. Math.
   * Comput. 218 (2011) 260 - 270.
   *
   * @param {MatrixType | NumericMatrix} a - The matrix on input.
   * @param {MatrixType | NumericMatrix} v - The approximation candidate matrix.
   * @param {NumericType} [type=Matrix.type] - The type of the matrix on output.
   * @returns {MatrixType | NumericMatrix} The resulting of the computational procedure.
   * @throws {Error} if the "a" input matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static numericalInverseStepLiEtAl2(
    a: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    // av
    const av = Matrix.times(a, v);
    // I - av
    const Imav = Matrix.addNumberToDiagonal(Matrix.negate(av), 1);
    // 2I - av
    const I2mav = Matrix.addNumberToDiagonal(Matrix.negate(av), 2);
    // (2I - av)^2
    const I2mav2 = Matrix.times(I2mav, I2mav);
    // v = v * [I + .5 * (I - av) * (I + (2I - av)^2)]
    return Matrix.times(
      v,
      Matrix.addNumberToDiagonal(
        Matrix.Hadamard(
          Matrix.times(Imav, Matrix.addNumberToDiagonal(I2mav2, 1)),
          .5,
        ),
        1,
      ),
      type,
    );
  }

  /**
   * Computes the inverse approximation iteration
   * according to the article of Soleymani and Toutounian:
   * F. Soleymani, F. Toutounian, An iterative method for
   * computing approximate inverse of a square matrix and
   * Moore - Penrose inverse of a non - square matrix,
   * Department of Applied Mathematics, School of Mathematical
   * Sciences, Ferdowsi University of Mashlad, Mashlad, Iran;
   * Appl. Math. and Comput. 224 (2013), 671 - 680.
   *
   * @param {MatrixType | NumericMatrix} a - The matrix on input.
   * @param {MatrixType | NumericMatrix} v - The approximation
   * candidate matrix.
   * @param {NumericType}[type=Matrix.type] type - The type of the
   * matrix on output.
   * @returns {MatrixType | NumericMatrix} The resulting matrix from the
   * computational procedure.
   * @throws{Error} if the "a" matrix input parameter is incorrectly
   * defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static numericalInverseStepSoleymaniAndToutounian(
    a: MatrixType | NumericMatrix,
    v: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const av = Matrix.times(a, v);
    // 6I - av
    const I6mav = Matrix.addNumberToDiagonal(Matrix.negate(av), 6);
    // av * (6I - av)
    const av6Imav = Matrix.times(av, I6mav);
    // 14I - av * (6I - av)
    const I14mavI6mav = Matrix.addNumberToDiagonal(Matrix.negate(av6Imav), 14);
    // av * (14I - av * (6I - av))
    const avI14mavI6mav = Matrix.times(av, I14mavI6mav);
    // 16I - av * (14I - av * (6I - av))
    const I16mavI14mavI6mav = Matrix.addNumberToDiagonal(
      Matrix.negate(avI14mavI6mav),
      16,
    );
    // av * (16I - av * (14I - av * (6I - av)))
    const avI16mavI14mavI6mav = Matrix.times(av, I16mavI14mavI6mav);
    // 9I - av * (16I - av * (14I - av * (6I - av)))
    const I9mavI16mavI14mavI6mav = Matrix.addNumberToDiagonal(
      Matrix.negate(avI16mavI14mavI6mav),
      9,
    );
    // v = .5 * v * [9I - av* (16I - av * (14I - av * (6I - av)))]
    return Matrix.Hadamard(Matrix.times(v, I9mavI16mavI14mavI6mav), .5, type);
  }

  /**
   * Computes the initial inverse approximation
   * according to the first  suggestion of Pan
   * and Schreiber article: V.Y. Pan, R. Schreiber,
   * "An Improved Newton Iteration for the Generalized
   * Inverse of a Matrix, with Applications",
   * SIAM J. Sci. Stat. Comput. 12 (1991), 1109 - 1131.
   *
   * @param {MatrixType | NumericMatrix} matrix - The input matrix.
   * @param {NumericType} [type=Matrix.type] - The type of the matrix on output.
   * @returns {MatrixType | NumericMatrix} The resulting of the computational procedure.
   * @throws {Error} if the input matrix parameter is incorrectly declared.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static initialInverseApproximationPanSchreiber(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const A2 = Matrix.Hadamard(Matrix.transpose(matrix), 2);
    const { s } = Matrix.svd(matrix, { copy: true, sort: true });
    const [smax, smin] = [s[0], s[s.length - 1]];

    return Matrix.Hadamard(A2, 1 / (smin * smin + smax * smax), type);
  }

  /**
   * Computes the initial inverse approximation
   * according to the Pan and Schreiber article
   * V.Y. Pan, R. Schreiber, "An improved Newton
   * iteration for the generalized inverse of
   * a matrix with applications", SIAM J. Sci.
   * Stat. Comput. 12 (1991) 1109–1131.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix whose inverse will be
   * approximated.
   * @param{NumericType} [type=Matrix.type] - The type of the matrix on output.
   * @returns {MatrixType | NumericMatrix} The resulting of the computational procedure.
   * @throws {Error} If the matrix is incorrectly defined.
   */
  public static initialInverseApproximationPanSchreiber2(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return Matrix.Hadamard(
      Matrix.transpose(matrix),
      1 / (Matrix.norm1(matrix) * Matrix.infinityNorm(matrix)),
      type,
    );
  }

  /**
   * Computes the initial inverse approximation
   * according to Ben-Israel and Greville article:
   * A. Ben - Israel, T.N.E. Greville, "Generalized Inverses",
   * second edition, Springer, NY, 2003.
   *
   * @param{MatrixType | NumericMatrix} matrix - The matrix on input.
   * @param {NumericType} [type=Matrix.type] - the type of the matrix on output.
   * @returns {MatrixType | NumericMatrix} The resulting of the computation procedure.
   * @throws{Error} if the input "matrix" parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static initialInverseApproximationBenIsraelGreville(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const limit = 2 / models.MatrixReduce(matrix, "square");
    const alpha = Math.random() * limit;

    return Matrix.Hadamard(Matrix.transpose(matrix), alpha, type);
  }

  /**
   * Computes the initial inverse approximation
   * according to the Grosz article:
   * L. Grosz, "Preconditioning by incomplete block elimination",
   * Numer. Linear Algebra Appl. 7 (2000) 527–541.
   * Note: In many cases this initial matrix lead to divergence.
   *
   * @param {MatrixType | NumericMatrix} matrix - The matrix input parameter.
   * @returns {MatrixType | NumericMatrix} The resulting matrix from the
   * computational procedure.
   * @throws {Error} If the matrix is icorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static initialInverseApproximationGrosz(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    return Matrix.toDiagonalMatrix(
      Matrix.inverted(Matrix.getDiagonal(matrix)),
      type,
    );
  }

  /**
   * Computes the initial inverse approximation
   * according to the Codevico et al article:
   * G. Codevico, V.Y. Pan, M.V. Barel,
   * "Newton-like iteration based on a cubic polynomial
   * for structured matrices", Numer. Algorith. 36 (2004) 365–380.
   * Note: In many cases this initial matrix lead to divergence.
   *
   * @param {MatrixType | NumericMatrix} matrix - The input matrix parameter.
   * @returns {MatrixType | NumericMatrix} The resulting matrix from the computation
   * procedure.
   * @throws {Error} If the matrix parameter is incorrectly defined.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  public static initialInverseApproximationCodevico(
    matrix: MatrixType | NumericMatrix,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const n = matrix.length;
    const invFroNorm = 1 / Matrix.FrobeniusNorm(matrix);

    return Matrix.setDiagonalToNumber(Matrix.zero(n, type), invFroNorm);
  }
}
