"use strict";
import * as conditions from "./Conditions";
import * as models from "./Models";
import * as errors from "./Errors";
import {
  ifBlockHasDifferentColumnsFromTheMatrixThrow,
  ifBlockHasDifferentRowsFromTheMatrixThrow,
  ifBlockIsEmptyReturnMatrix,
  ifColumnsOrFromRowIndexOrToRowIndexIsIncorrectlyDefinedThrow,
  ifFromOrToParametersAreIncorrectlyDefinedThrow,
  ifIsColumnVectorThrow,
  ifIsNotArrayOfArraysWithEqualSizeThrow,
  ifIsNotNumberOrMatrixThrow,
  ifRowOrFromIndexOrToIndexIsIncorrectlyDefinedThrow,
  ifRowParameterIsInappropriatelyDefinedThrow,
  ifRowsAndColumnsAreInappropriatelyDefinedThrow,
  ifRowsOrColumnsAreNotPositiveIntegersThrow,
  //  resetMatrix,
  ifTheParametersAreNotMatricesThrow,
} from "./Decorators/index.ts";
import {
  Integer,
  MatrixBlockOptions,
  // MatrixDeclaration,
  MatrixType,
  NumericMatrix,
  NumericType,
  // TypedArray,
  TypedArrayConstructor,
} from "./types";
// import { ifRowsAndColumnsAreInappropriatelyDefinedThrow } from "./Decorators/IfRowsAndColumnsAreInappropriatelyDefinedThrow.ts";

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
    return models.GenerateZeroMatrix(rows, columns, type);
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
    return models.GenerateIdentityLikeMatrix(rows, columns, type);
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
   * @returns {MatrixType | NumericMatrix} A new Matrix with the specified dimensions and replicated numeric value.
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
    return models.Replicate(n, rows, columns, type) as MatrixType;
  }

  /**
   * Creates a new Matrix instance with randomized values.
   *
   * @param {Integer} rows - The number of rows.
   * @param {Integer} columns - The number of columns.
   * @param {number} from - The minimum value for randomization.
   * @param {number} to - The maximum value for randomization.
   * @param {NumericType} type - The numeric type of the matrix.
   * @param {Integer} seed - The seed for randomization.
   * @returns {MatrixType | NumericMatrix} A new Matrix instance.
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
   * Generates a random matrix with unique values each time the method is called.
   *
   * @param {Integer} rows - The number of rows in the generated matrix.
   * @param {Integer} columns - The number of columns in the generated matrix.
   * @param {number} [from=0] - The lower bound of the random values range.
   * @param {number} [to=1] - The upper bound of the random values range.
   * @param {NumericType} [type=Matrix._type] - The numeric type of the elements in the generated matrix.
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
    const dimensions: Integer[] = [rows, columns];
    return models.GenerateRandomMatrix2(dimensions, from, to, typedArray);
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

  // // 3 Properties and utility fields
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

  // 4. Utility methods or operators
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
   * @returns {MatrixType | NumericMatrix} - The diagonal or subdiagonal as a Matrix.
   */
  @ifRowParameterIsInappropriatelyDefinedThrow(
    errors.IncorrectRowIndexParameterInGetDiagonal,
  )
  public static getDiagonal(
    matrix: MatrixType | NumericMatrix,
    row: Integer = 0,
    type: NumericType = Matrix._type,
  ): MatrixType | NumericMatrix {
    const typedArray = models.CreateTypedArrayConstructor(type);
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
  static appendBlockRight(
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
  static appendBlockBottom(
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

  // 6. Matrix operations and
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
  static reshape(
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
   * @returns {MatrixType | NumericMatrix} A new Matrix
   * instance representing the transposed matrix.
   */
  @ifIsNotArrayOfArraysWithEqualSizeThrow(errors.IncorrectMatrixInput)
  static transpose(
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
  static FrobeniusNorm(matrix: MatrixType | NumericMatrix): number {
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
  static infinityNorm(matrix: MatrixType | NumericMatrix): number {
    const infNorm = models.MatrixReduce(matrix, "infNorm");
    if (infNorm < 0 || isNaN(infNorm)) {
      errors.InternalErrorInInfinityNorm();
    }

    return infNorm;
  }
  //
  // /**
  //  * Obtains the maximum absolute element norm of the matrix.
  //  * The maximum absolute element norm is the maximum absolute value of any element in the matrix.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose norm
  //  * have to be computed.
  //  * @returns {number} The maximum absolute element norm of the matrix.
  //  *
  //  * @example
  //  * const matrix = new Matrix([[1, 2, 3], [-4, 5, 6], [7, 8, 9]]);
  //  * const maxNorm = matrix.maxNorm; // Returns 9 (maximum absolute value in the matrix)
  //  */
  // static maxNorm(matrix: MatrixType | NumericMatrix): number {
  //   const maxNorm = models.MatrixReduce(matrix, "maxNorm");
  //   if (maxNorm < 0 || isNaN(maxNorm)) {
  //     errors.InternalErrorInMaxNorm();
  //   }
  //
  //   return maxNorm;
  // }
  //
  // /**
  //  * Computes the 1-norm (maximum column sum) of the matrix.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix
  //  * whose norm has to be computed.
  //  * @returns {number} The 1-norm of the matrix.
  //  * @throws {Error} If the calculation of the method is NaN.
  //  */
  // static norm1(matrix: MatrixType | NumericMatrix): number {
  //   const norm1 = models.MatrixReduce(matrix, "norm1");
  //   if (norm1 < 0 || isNaN(norm1)) {
  //     errors.InternalErrorInNorm1();
  //   }
  //
  //   return norm1;
  // }
  //
  // /**
  //  * Computes the superior norm of the matrix.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix
  //  * whose elements will be examined.
  //  * @returns {number} The superior norm.
  //  * @throws {Error} If the calculation result is NaN.
  //  */
  // static superior(matrix: MatrixType | NumericMatrix): number {
  //   const superior = models.MatrixReduce(matrix, "sup");
  //   if (isNaN(superior)) {
  //     errors.InternalErrorInSuperiorNorm();
  //   }
  //
  //   return superior;
  // }
  //
  // /**
  //  * Computes the inferior norm of the matrix.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix
  //  * whose elements will be examined.
  //  * @returns {number} The inferior norm.
  //  * @throws {Error} If the calculation result is NaN.
  //  */
  // static inferior(matrix: MatrixType | NumericMatrix): number {
  //   const inferior = models.MatrixReduce(matrix, "inf");
  //   if (isNaN(inferior)) {
  //     errors.InternalErrorInInferiorNorm();
  //   }
  //
  //   return inferior;
  // }
  //
  // /**
  //  * Computes the sum of all elements in the matrix.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix
  //  * whose elements will be added.
  //  * @returns {number} The sum of all elements.
  //  * @throws {Error} If the calculation result is NaN.
  //  */
  // static sumOfAllElements(matrix: MatrixType | NumericMatrix): number {
  //   const sum = models.MatrixReduce(matrix, "sum");
  //   if (isNaN(sum)) errors.InternalErrorInSum();
  //
  //   return sum;
  // }
  //
  // /**
  //  * Computes the sum of all elements in the matrix.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix
  //  * whose elements will be multiplied.
  //  * @returns {number} The product of all elements.
  //  * @throws {Error} If the calculation result is NaN.
  //  */
  // static productOfAllElements(matrix: MatrixType | NumericMatrix): number {
  //   const product = models.MatrixReduce(matrix, "product");
  //   if (isNaN(product)) errors.InternalErrorInProduct();
  //
  //   return product;
  // }
  //
  // /**
  //  * Computes the sum of the squares of all matrix elements.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix
  //  * whose elements will be used for computation.
  //  * @returns {number} The sum of squares of all matrix elements.
  //  * @throws {Error} If some  of the elements of the matrix is NaN
  //  * or the result of the computation is negative.
  //  */
  // static sumOfSquaresOfAllElements(matrix: MatrixType | NumericMatrix): number {
  //   const squares = models.MatrixReduce(matrix, "square");
  //   if (isNaN(squares) || squares < 0) {
  //     errors.InternalErrorInSquares();
  //   }
  //
  //   return squares;
  // }
  //
  // /**
  //  * Computes the sum of the cubes of all matrix elements.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix
  //  * whose elelements will be used for computations.
  //  * @returns {number} The calculated result of the method.
  //  * @throws {Error} If the calculated result is NaN.
  //  */
  // static sumOfCubesOfAllElements(matrix: MatrixType | NumericMatrix): number {
  //   const cubes = models.MatrixReduce(matrix, "cube");
  //   if (isNaN(cubes)) errors.InternalErrorInCubes();
  //
  //   return cubes;
  // }
  //
  //
  // /**
  //  * Performs a pointwise addition operation (classical matrix addition) between
  //  * the current matrix and the provided number or matrix. If the input is a
  //  * number, each element of the current matrix is added by that number.
  //  * If the input is a matrix with the same dimensions as the current matrix,
  //  * the addition operation is applied element-wise between corresponding elements.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The first matrix needed for the addition
  //  * operation.
  //  * @param {number | Matrix | MatrixType | NumericMatrix} m - The number or
  //  * matrix for the addition operation.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix}  A new matrix resulting from the pointwise addition operation.
  //  * @throws {Error } If the "m" parameter is not a number or Matrix-like structure.
  //  */
  // @ifIsNotNumberOrMatrixThrow(
  //   errors.IncorrectMatrixParameterInPointwise("plus"),
  // )
  // static plus(
  //   matrix: MatrixType | NumericMatrix,
  //   m: number | MatrixType | NumericMatrix,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   if (!conditions.IsNumber(m)) {
  //     if (
  //       (m as MatrixType | NumericMatrix).length !== matrix.length &&
  //       (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
  //     ) {
  //       errors.IncorrectMatrixParameterInPointwise("plus")();
  //     }
  //   }
  //   return models.BinaryPointwise(
  //     matrix,
  //     m as number | MatrixType | NumericMatrix,
  //     "plus",
  //     type,
  //   );
  // }
  //
  // /**
  //  * Performs a pointwise subtraction operation between the current matrix and
  //  * the provided number or matrix. If the input is a number, each element of
  //  * the current matrix is subtracted by that number. If the input is a matrix
  //  * with the same dimensions as the current matrix, the subtraction operation
  //  * is applied element-wise between corresponding elements.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The first matrix needed for
  //  * the subtraction operation.
  //  * @param {number | Matrix | MatrixType | NumericMatrix} m - The number or
  //  * matrix for the subtraction operation.
  //  * @param {NumericType} type - The type of the elements of the output matrix.
  //  * @returns {MatrixType | NumericMatrix}  new matrix resulting from the pointwise subtraction operation.
  //  * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
  //  */
  // @ifIsNotNumberOrMatrixThrow(
  //   errors.IncorrectMatrixParameterInPointwise("minus"),
  // )
  // static minus(
  //   matrix: MatrixType | NumericMatrix,
  //   m: number | MatrixType | NumericMatrix,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   if (!conditions.IsNumber(m)) {
  //     if (
  //       (m as MatrixType | NumericMatrix).length !== matrix.length &&
  //       (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
  //     ) {
  //       errors.IncorrectMatrixParameterInPointwise("minus")();
  //     }
  //   }
  //   return models.BinaryPointwise(
  //     matrix,
  //     m as number | MatrixType | NumericMatrix,
  //     "minus",
  //     type,
  //   );
  // }
  //
  // /**
  //  * Performs a pointwise exponentiation operation between the current matrix and
  //  * the provided number or matrix. If the input is a number, each element of the
  //  * current matrix is raised to the power of that number. If the input is a matrix
  //  * with the same dimensions as the current matrix, the exponentiation operation
  //  * is applied element-wise between corresponding elements.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix which elements will be
  //  * power-ised.
  //  * @param {number | Matrix | MatrixType | NumericMatrix} m - The number or matrix
  //  * for the exponentiation operation.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix resulting from the pointwise exponentiation operation.
  //  * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
  //  */
  // @ifIsNotNumberOrMatrixThrow(
  //   errors.IncorrectMatrixParameterInPointwise("power"),
  // )
  // static power(
  //   matrix: MatrixType | NumericMatrix,
  //   m: number | MatrixType | NumericMatrix,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   if (!conditions.IsNumber(m)) {
  //     if (
  //       (m as MatrixType | NumericMatrix).length !== matrix.length &&
  //       (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
  //     ) {
  //       errors.IncorrectMatrixParameterInPointwise("power")();
  //     }
  //   }
  //
  //   return models.BinaryPointwise(
  //     matrix,
  //     m as number | MatrixType | NumericMatrix,
  //     "power",
  //     type,
  //   );
  // }
  //
  // /**
  //  * Performs the Hadamard product (element-wise multiplication) between the
  //  * current matrix and the provided number or matrix. If the input is a number,
  //  * each element of the current matrix is multiplied by that number. If the input
  //  * is a matrix with the same dimensions as the current matrix, the Hadamard
  //  * product is applied element-wise between corresponding elements.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The first matrix needed for
  //  * the pointwise multiplicaton.
  //  * @param {number | Matrix | MatrixType | NumericMatrix} m - The number or matrix
  //  * for the Hadamard product.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix resulting from the Hadamard product operation.
  //  * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
  //  */
  // @ifIsNotNumberOrMatrixThrow(
  //   errors.IncorrectMatrixParameterInPointwise("Hadamard"),
  // )
  // static Hadamard(
  //   matrix: MatrixType | NumericMatrix,
  //   m: number | MatrixType | NumericMatrix,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   if (typeof m !== "number") {
  //     if (
  //       (m as MatrixType | NumericMatrix).length !== matrix.length &&
  //       (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
  //     ) {
  //       errors.IncorrectMatrixParameterInPointwise("Hadamard")();
  //     }
  //   }
  //   return models.BinaryPointwise(
  //     matrix,
  //     m as number | MatrixType | NumericMatrix,
  //     "Hadamard",
  //     type,
  //   );
  // }
  //
  // /**
  //  * Performs element-wise division between the current matrix and the provided
  //  * number or matrix. If the input is a number, each element of the current
  //  * matrix is divided by that number. If the input is a matrix with the same
  //  * dimensions as the current matrix, division is applied element-wise between
  //  * corresponding elements.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix, whose elements will
  //  * be divided.
  //  * @param {number | Matrix | MatrixType | NumericMatrix} m -The number or
  //  * matrix for the element-wise division.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix}  A new matrix resulting from the element-wise division operation.
  //  * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
  //  */
  // static divide(
  //   matrix: MatrixType | NumericMatrix,
  //   m: number | MatrixType | NumericMatrix,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   if (typeof m !== "number") {
  //     if (
  //       (m as MatrixType | NumericMatrix).length !== matrix.length &&
  //       (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
  //     ) {
  //       errors.IncorrectMatrixParameterInPointwise("divide")();
  //     }
  //   }
  //
  //   return models.BinaryPointwise(
  //     matrix,
  //     m as MatrixType | NumericMatrix,
  //     "divide",
  //     type,
  //   );
  // }
  //
  // /**
  //  * Performs element-wise modulus operation between the current matrix and the
  //  * provided number or matrix. If the input is a number, each element of the
  //  * current matrix is computed modulo that number. If the input is a matrix
  //  * with the same dimensions as the current matrix, modulus operation is applied
  //  * element-wise between corresponding elements.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The first matrix needed for
  //  * the modulus operation.
  //  * @param {number | Matrix | MatrixType | NumericMatrix} m - The number or matrix
  //  * for the element-wise modulus operation.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix resulting from the element-wise modulus operation.
  //  * @throws {Error} If the "m" parameter is not a number or Matrix-like structure.
  //  */
  // static modulus(
  //   matrix: MatrixType | NumericMatrix,
  //   m: number | MatrixType | NumericMatrix,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   if (typeof m !== "number") {
  //     if (
  //       (m as MatrixType | NumericMatrix).length !== matrix.length &&
  //       (m as MatrixType | NumericMatrix)[0].length !== matrix[0].length
  //     ) {
  //       errors.IncorrectMatrixParameterInPointwise("modulus")();
  //     }
  //   }
  //
  //   return models.BinaryPointwise(
  //     matrix,
  //     m as MatrixType | NumericMatrix,
  //     "modulus",
  //     type,
  //   );
  // }
  //
  // /**
  //  * Performs a unary point-wise negation.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose
  //  * elements will be negated.
  //  * @returns {MatrixType | NumericMatrix} A new Matrix instance with negated elements.
  //  */
  // static negate(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(matrix, "neg", type, weight, bias);
  // }
  //
  // /**
  //  * Performs a unary point-wise bitwise negation.
  //  *
  //  * Optionally, a weight and bias can be applied to
  //  * each element.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements
  //  * will be bitwise negated.
  //  * @returns {MatrixType | NumericMatrix} A new Matrix instance with bitwise negated elements.
  //  */
  // static bitwiseNegate(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "bneg",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the sine function point-wise to the elements of the matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the sine.
  //  * The resulting value is computed as `Math.sin(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements
  //  * will be transformed to its sine values.
  //  * @param {number} [weight=1] - The weight to multiply each matrix element before applying the sine function.
  //  * @param {number} [bias=0] - The bias to be added to each element after the multiplication.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {Matrix} A new matrix with the sine function applied to its elements.
  //  */
  // static sin(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(matrix, "sin", type, weight, bias);
  // }
  //
  // /**
  //  * Applies the cosine function point-wise to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the cosine.
  //  * The resulting value is computed as `Math.cos(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be
  //  * transformed to its cosine value.
  //  * @param {number} [weight=1] - The weight to multiply each matrix element before applying the cosine function.
  //  * @param {number} [bias=0] - The bias to be added to each element after the multiplication.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {Matrix} A new matrix with the cosine function applied to its elements.
  //  */
  // static cos(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(matrix, "cos", type, weight, bias);
  // }
  //
  // /**
  //  * Applies the tangent function point-wise to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the tangent.
  //  * The resulting value is computed as `Math.tan(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be used
  //  * to provide a new matrix with its tangent values.
  //  * @param {number} [weight=1] - The weight to multiply each matrix element before applying the tangent function.
  //  * @param {number} [bias=0] - The bias to be added to each element after the multiplication.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {Matrix} A new matrix with the tangent function applied to its elements.
  //  */
  // static tan(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(matrix, "tan", type, weight, bias);
  // }
  //
  // /**
  //  * Applies the cotangent function point-wise to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the cotangent.
  //  * The resulting value is computed as `Math.cotan(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will
  //  * be used for providing of a matrix with its cotangent values.
  //  * @param {number} [weight=1] - The weight to multiply each matrix element before applying the cotangent function.
  //  * @param {number} [bias=0] - The bias to be added to each element after the multiplication.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the cotangent function applied to its elements.
  //  */
  // static cotan(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "cotan",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the point-wise exponential function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the exponent.
  //  * The resulting value is computed as `Math.exp(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be
  //  * used for providing of a matrix with its exponent values.
  //  * @param {number} weight - A number to multiply each element before applying the exponential function.
  //  * @param {number} bias - A number to be added to each element before applying the exponential function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the exponential function applied to its elements.
  //  */
  // static exp(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(matrix, "exp", type, weight, bias);
  // }
  //
  // /**
  //  * Applies the point-wise hyperbolic sine function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the hyperbolic sine.
  //  * The resulting value is computed as `Math.sinh(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be
  //  * used to be produces a new matrix with its hyperbolic sine values.
  //  * @param {number} weight - A number to multiply each element before applying the hyperbolic sine function.
  //  * @param {number} bias - A number to be added to each element before applying the hyperbolic sine function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {Matrix} A new matrix with the hyperbolic sine function applied to its elements.
  //  */
  // static sinh(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "sinh",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the point-wise hyperbolic cosine function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the hyperbolic cosine.
  //  * The resulting value is computed as `Math.cosh(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericType} matrix - The matrix which will be used
  //  * for computing and creation of matrix with its hyperbolic cosine values.
  //  * @param {number} weight - A number to multiply each element before applying the hyperbolic cosine function.
  //  * @param {number} bias - A number to be added to each element before applying the hyperbolic cosine function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the hyperbolic cosine function applied to its elements.
  //  */
  // static cosh(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "cosh",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the point-wise hyperbolic tangent function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the hyperbolic tangent.
  //  * The resulting value is computed as `Math.tanh(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be used
  //  * for providing of a matrix with its hyperbolic tangent values.
  //  * @param {number} weight - A number to multiply each element before applying the hyperbolic tangent function.
  //  * @param {number} bias - A number to be added to each element before applying the hyperbolic tangent function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the hyperbolic tangent function applied to its elements.
  //  */
  // static tanh(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "tanh",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the point-wise hyperbolic cotangent function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the hyperbolic cotangent.
  //  * The resulting value is computed as `cotanh(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be used
  //  * for the generating of a matrix of its hyperbolic cotangent values.
  //  * @param {number} weight - A number to multiply each element before applying the hyperbolic cotangent function.
  //  * @param {number} bias - A number to be added to each element before applying the hyperbolic cotangent function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the hyperbolic cotangent function applied to its elements.
  //  */
  // static cotanh(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "cotanh",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the point-wise arcsine function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the arcsine.
  //  * The resulting value is computed as `Math.asin(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements
  //  * will be used for generating of a new matrix of its arcus sine values.
  //  * @param {number} weight - A number to multiply each element before applying the arcsine function.
  //  * @param {number} bias - A number to be added to each element before applying the arcsine function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the arcsine function applied to its elements.
  //  */
  // static arcsin(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "arcsin",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  // /**
  //  * Applies the point-wise arccosine function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the arccosine.
  //  * The resulting value is computed as `Math.acos(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be used
  //  * for generating of a matrix of its arcus cosine values.
  //  * @param {number} weight - A number to multiply each element before applying the arccosine function.
  //  * @param {number} bias - A number to be added to each element before applying the arccosine function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the arccosine function applied to its elements.
  //  */
  // static arccos(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "arccos",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the point-wise arctangent function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the arctangent.
  //  * The resulting value is computed as `Math.atan(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be used
  //  * for the providing of new matrix of its arcus tangent values.
  //  * @param {number} weight - A number to multiply each element before applying the arctangent function.
  //  * @param {number} bias - A number to be added to each element before applying the arctangent function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the arctangent function applied to its elements.
  //  */
  // static arctan(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "atan",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the point-wise arccotangent function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the arccotangent.
  //  * The resulting value is computed as `Math.acotan(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix whose elements will be used
  //  * for generating of new matrix of its arcus tangent values.
  //  * @param {number} weight - A number to multiply each element before applying the arccotangent function.
  //  * @param {number} bias - A number to be added to each element before applying the arccotangent function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the arccotangent function applied to its elements.
  //  */
  // static arccotan(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "acotan",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the point-wise absolute value function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the absolute value.
  //  * The resulting value is computed as `Math.abs(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix -The matrix whose elements will be used
  //  * to generate a new matrix of its absolute values.
  //  * @param {number} weight - A number to multiply each element before applying the absolute value function.
  //  * @param {number} bias - A number to be added to each element before applying the absolute value function.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the absolute value function applied to its elements.
  //  */
  // static abs(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(matrix, "abs", type, weight, bias);
  // }
  //
  // /**
  //  * Applies the point-wise sigmoid function to the elements of the matrix or array.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the sigmoid.
  //  * The resulting value is computed as `1 / (1 + Math.exp(-(weight * element + bias)))`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix which elements
  //  * will be used for generating of matrix of its sigmoid values.
  //  * @param {number} weight - A number to multiply each element before applying the sigmoid function.
  //  * @param {number} bias - A number to be added to each element before applying the sigmoid function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the sigmoid function applied to its elements.
  //  */
  // static sigmoid(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "sigmoid",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the point-wise rounding function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before rounding.
  //  * The resulting value is computed as `Math.round(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix which elements will be
  //  * used for generating of a new matrix of its rounded values.
  //  * @param {number} weight - A number to multiply each element before applying the rounding function.
  //  * @param {number} bias - A number to be added to each element before applying the rounding function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the rounding function applied to its elements.
  //  */
  // static round(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "round",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the point-wise ceiling function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before ceiling.
  //  * The resulting value is computed as `Math.ceil(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix of the elements of which
  //  * will be produces a new matrix of its ceiled valuss.
  //  * @param {number} weight - A number to multiply each element before applying the ceiling function.
  //  * @param {number} bias - A number to be added to each element before applying the ceiling function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the ceiling function applied to its elements.
  //  */
  // static ceil(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "ceil",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the point-wise square root function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the square root.
  //  * The resulting value is computed as `Math.sqrt(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix of the elements of which will
  //  * be performaed a new matrix with elements equal to its square root values.
  //  * @param {number} weight - A number to multiply each element before applying the square root function.
  //  * @param {number} bias - A number to be added to each element before applying the square root function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the square root function applied to its elements.
  //  */
  // static sqrt(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "sqrt",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the point-wise natural logarithm function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the natural logarithm.
  //  * The resulting value is computed as `Math.log(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix from the elements of which will be
  //  * performed a new matrix of tis logarithmic values.
  //  * @param {number} weight - A number to multiply each element before applying the natural logarithm function.
  //  * @param {number} bias - A number to be added to each element before applying the natural logarithm function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the natural logarithm function applied to its elements.
  //  */
  // static log(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(matrix, "log", type, weight, bias);
  // }
  //
  // /**
  //  * Applies the point-wise floor function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the floor.
  //  * The resulting value is computed as `Math.floor(weight * element + bias)`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix of the elements of which will
  //  * be performed a matrix of its floored values.
  //  * @param {number} weight - A number to multiply each element before applying the floor function.
  //  * @param {number} bias - A number to be added to each element before applying the floor function.
  //  * @param {NumricType} type - type - The type of output matrix elements.
  //  * @returns {MatrixType | NumericMatrix} A new matrix with the floor function applied to its elements.
  //  */
  // static floor(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "floor",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the point-wise Rectified Linear Unit (ReLU) function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the ReLU.
  //  * The resulting value is computed as `x <= 0 ? -1 : x`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix from the elements of which
  //  * will be performed a new matrix of its ReLU values.
  //  * @param {number} weight - A number to multiply each element before applying the ReLU function.
  //  * @param {number} bias - A number to be added to each element before applying the ReLU function.
  //  * @param {NumericType} type - The type of the output matrix elements.
  //  * @returns {MatrixType | NumericType} A new matrix with the ReLU function applied to its elements.
  //  */
  // static ReLU(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "ReLU",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  // /**
  //  * Applies the point-wise step function to the elements of the Matrix.
  //  *
  //  * Optionally, a weight and bias can be applied to each element before computing the step function.
  //  * The resulting value is computed as `x <= 0 ? -1 : 1`.
  //  *
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix from the elements of which will
  //  * be performed a new matrix provided of its step function values.
  //  * @param {number} weight - A number to multiply each element before applying the step function.
  //  * @param {number} bias - A number to be added to each element before applying the step function.
  //  * @param {NumericType} type - The type of the output matrix elements
  //  * @returns {MatrixType | NumericType} A new matrix with the step function applied to its elements.
  //  */
  // step(
  //   matrix: MatrixType | NumericMatrix,
  //   weight: number = 1,
  //   bias: number = 0,
  //   type: NumericType = Matrix._type,
  // ): MatrixType | NumericMatrix {
  //   return models.UnaryPointwise(
  //     matrix,
  //     "step",
  //     type,
  //     weight,
  //     bias,
  //   );
  // }
  //
  //
  // // 6. Numerical methods
  //
  // /**
  //  * @param {MatrixType | NumericMatrix} matrix - The matrix which will be
  //  * factorized with the LU algorithm.
  //  * @returns {{LU: MatrixType | NumericMatrix, P: Integer[]}}
  //  */
  // LUPC(
  //   matrix: MatrixType | NumericMatrix,
  // ): { LU: MatrixType | NumericMatrix; P: Integer[] } {
  //   return models.CompactLUFactorizationWithPermutations(matrix);
  // }
}
