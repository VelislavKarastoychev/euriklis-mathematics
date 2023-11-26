# @euriklis/mathematics library

The @euriklis/mathematics library, developed in TypeScript, provides a range of basic mathematical algorithms and concepts. Key features include matrix operations and algorithms, complex number algebra, complex matrices, big numbers, polynomials, graphs, and various numeric algorithms. The library also encompasses optimizations for vector functions, box optimization for abstract functions with non-derivative usage, quadratic programming, numerical solutions for equations (such as Newton-Raphson and bisection methods), numeric integration, and differentiation.

# Installation: 

To install the package run the following command in the terminal:

```sh 
npm install @euriklis/mathematics --save
```

This command will install the package in your node_modules folder/directory.

For more specific versions of the library you have to type the command:

```sh 
npm install @euriklis/mathematics@x.x.x
```

Here, x.x.x represents the desired version.

# Libraries:

The @euriklis/mathematics package is comprised of different libraries, each serving specific purposes. These include the Matrix library, Complex library, ComplexMatrix library, NumericalMethods library, Polynomials library, and Graphs library. To utilize the functionalities of a particular library, import it into your file. For example:


```ts 
import { Matrix } from "@euriklis/mathematics";
```

# Matrix library:

The matrix library is the core component of the @euriklis/mathematics package, providing efficient and versatile matrix operations and algorithms.

## Matrix Class


### Constructors

`constructor(options?: MatrixDeclaration | Matrix | NumericMatrix)`

Creates a new Matrix instance. The constructor can accept various options for matrix initialization, including a matrix declaration, an existing Matrix instance, or a numeric matrix.


```ts 
const matrix1 = new Matrix();
const matrix2 = new Matrix([[1, 2], [3, 4]]);
const matrix3 = new Matrix({ M: [[5, 6], [7, 8]], type: 'float64' }); // other type options - 'float32', 'int8', 'int16', etc
const matrix4 = new Matrix(matrix3);
```

### Static Methods

`Matrix.isMatrix(m: any): boolean`


Checks if the input parameter "m" is a `Matrix` instance from the Matrix library of the `@euriklis/mathematics`.


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
const randomMatrix = Matrix.random(2, 2, -1, 1, 'float64', 42); // 2x2 random matrix
```

### Instance Methods


`get M(): NumericMatrix`

Gets the matrix data.


```ts 
const matrixData = matrix2.M; // [[1, 2], [3, 4]]
```


`set M(matrix: NumericMatrix): void`


Sets the matrix data.


```ts 
matrix1.M = [[9, 10], [11, 12]];
```


`get data (): TypedArray[]`

returns the matrix as a collection of typed arrays (Int8Array, int16Array, Float32Array, Float64Array etc).


`get type(): NumericType`

Gets the numeric type of the matrix.


```ts 
const numericType = matrix2.type; // 'float64'
```


`set type(type: NumericType): void`

Sets the numeric type of the matrix.


```ts 
matrix2.type = 'int32';
```

`get rows(): Integer`

Returns the number of rows of the current matrix instance.

```ts 
const numberOfRows = matrix2.rows; // 2
```

`get columns(): Integer`

Returns the number of columns of the current matrix instance.

```ts 
const numberOfColumns = matrix2.columns; // 2
```


`getBlock(options: MatrixBlockOptions): Matrix`

Gets a block matrix by given starting and ending indices.


```ts 
const block = matrix2.getBlock({ from: [0, 0], to: [1, 1] }); // [[1, 2], [3, 4]]
```


`setBlock(options: MatrixBlockOptions): Matrix`

Sets the elements of a block/sub-matrix of the current Matrix instance with the elements of the "block" parameter.


```ts 
matrix1.setBlock({ from: [0, 0], to: [1, 1], block: [[13, 14], [15, 16]] });
```


`getRow(rowIndex: Integer, fromColumnIndex: Integer = 0, toColumnIndex: Integer = this.columns - 1): Matrix`

Retrieves a specific row from the matrix based on the provided row index and optional column range.


```ts 
const row = matrix2.getRow(1, 0, 1); // [[3, 4]]);
```


`setRow(rowIndex: Integer, fromColumnIndex: Integer, toColumnIndex: Integer, row: NumericMatrix | Matrix): Matrix`

Sets the values of a specific row in the matrix based on the provided row index, column range, and values.


```ts 
matrix1.setRow(1, 0, 1, [[17, 18]]);
```


`exchangeRows(row1: Integer, row2: Integer, fromColumn: Integer = 0, toColumn: Integer = this.columns): Matrix`

Exchanges the positions of two rows within specified column range.


```ts 
matrix1.exchangeRows(0, 1, 0, 1);
```

Similar to this method is the method `exchangeColumns`.



`getDiagonal(row: Integer = 0): Matrix`


Gets the diagonal of a matrix or the subdiagonal when a row index is defined.





