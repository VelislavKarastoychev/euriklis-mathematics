# @euriklis/mathematics library

The @euriklis/mathematics library, developed in TypeScript, provides a range of
basic mathematical algorithms and concepts. Key features include matrix
operations and algorithms, complex number algebra, complex matrices, big
numbers, polynomials, graphs, and various numeric algorithms. The library also
encompasses optimizations for vector functions, box optimization for abstract
functions with non-derivative usage, quadratic programming, numerical solutions
for equations (such as Newton-Raphson and bisection methods), numeric
integration, and differentiation.

# Installation:

To install the package run the following command in the terminal:

```sh
npm install @euriklis/mathematics --save
```

This command will install/add the package in your node_modules folder/directory.

For more specific versions of the library you have to type the command:

```sh
npm install @euriklis/mathematics@x.x.x
```

Here, x.x.x represents the desired version.

# Libraries:

The @euriklis/mathematics package is comprised of different libraries, each
serving specific purposes. These include the Matrix library, Complex library,
ComplexMatrix library, NumericalMethods library, Polynomials library, and Graphs
library. To utilize the functionalities of a particular library, import it into
your file. For example:

```ts
import { Matrix } from "@euriklis/mathematics";
```

# Matrix library:

The matrix library is the core component of the @euriklis/mathematics package,
providing efficient and versatile matrix operations and algorithms.

## Matrix Class

### Methods

`Matrix.isMatrix(m: any): boolean`

Checks if the input parameter "m" is a `Matrix` instance from the Matrix library
of the `@euriklis/mathematics`.

```ts
const isMatrix = Matrix.isMatrix(matrix1); // true
```

`Matrix.zeros(rows: Integer, columns: Integer, type: NumericType = "float64"): Matrix`

Creates a matrix with zero elements.

```ts
const zeroMatrix = Matrix.zeros(3, 3); // 3x3 zero matrix
```

`Matrix.zero(n: Integer, type: NumericType = "float64"): Matrix`

Generates a square zero matrix.

```ts
const squareZeroMatrix = Matrix.zero(4); // 4x4 zero matrix
```

`Matrix.identityLike(rows: Integer, columns: Integer, type: NumericType = "float64"): Matrix`

Generates an identity-like matrix with specified dimensions.

```ts
const identityLikeMatrix = Matrix.identityLike(2, 3); // 2x3 identity-like matrix
```

`Matrix.identity(n: Integer, type: NumericType = "float64"): Matrix`

Generates an identity matrix with specified dimensions.

```ts
const identityMatrix = Matrix.identity(3); // 3x3 identity matrix
```

`Matrix.random(rows: Integer, columns: Integer, from = 0, to = 1, type: NumericType = "float64", seed: number = 123445): Matrix`

Creates a new Matrix instance with randomized values.

```ts
const randomMatrix = Matrix.random(2, 2, -1, 1, "float64"); // 2x2 random matrix
```


To generate a random matrix more efficiently in the case when we have large dimensions you may use the method setType, to set the type of the Matrix i.e.:


```ts 
Matrix.setType("generic");
const randMatrix = Matrix.random(5000, 5000, -1, 1);
Matrix.setType("float64");
```

The ***Matrix.random([Integer, Integer], from: [number, number], to: [number, number], type: NumericType)*** produces the same sequences of random numbers. If you want to create a random matrix with random elements wich will be unique each time when you create a new matrix you have to use the method ***Matrix.uniqueRandom(rows: Integer, columns: Integer, from: [number, number], to: [number, number], type: NumericType)*** which uses the Math.random build-in function of JavaScript. This method is a little bit slallow than the ***Matrix.random*** method.


`Matrix.getBlock(matrix: MatrixType | NumericMatrix, options: {from: Integer[], to: Integer[], type: NumericType}): MatrixType | NumericMatrix`

Gets a block matrix by given starting and ending indices.

```ts
const block = Matrix.getBlock(
  [
    [1, 2, 3, 4],
    [3, 4, 5, 6],
  ],
  { from: [0, 0], to: [1, 1] },
); // [[1, 2], [3, 4]]
```

`Matrix.setBlock(matrix: MatrixType | NumericMatrix, options: MatrixBlockOptions): Matrix`

Sets the elements of a block/sub-matrix of the current Matrix instance with the
elements of the "block" parameter.

```ts
Matrix.setBlock({
    matrix1,
    from: [0, 0],
    to: [1, 1],
  }, [
    [13, 14],
    [15, 16],
  ]);
```

`Matrix.getRow(matrix: MatrixType | NumericMatrix, rowIndex: Integer, fromColumnIndex: Integer = 0, toColumnIndex: Integer = matrix.length - 1): MatrixType | NumericMatrix`

Retrieves a specific row from the matrix based on the provided row index and
optional column range.

```ts
const row = Matrix.getRow(matrix2, 1, 0, 1); // [[3, 4]]);
```

`Matrix.setRow(matrix: MatrixType | NumericMatrix, rowIndex: Integer, fromColumnIndex: Integer, toColumnIndex: Integer, row: NumericMatrix | Matrix): Matrix`

Sets the values of a specific row in the matrix based on the provided row index,
column range, and values.

```ts
Matrix.setRow(matrix1, 1, 0, 1, [[17, 18]]);
```

`Matrix.exchangeRows(matrix: MatrixType | NumericMatrix, row1: Integer, row2: Integer, fromColumn: Integer = 0, toColumn: Integer = this.columns): Matrix`

Exchanges the positions of two rows within specified column range.

```ts
Matrix.exchangeRows(matrix1, 0, 1, 0, 1);
```

Similar to this method is the method `exchangeColumns`.

`Matrix.getDiagonal(matrix: MatrixType | NumericMatrix, row: Integer = 0): Matrix`

Gets the diagonal of a matrix or the subdiagonal when a row index is defined.
