/**
 * The `validator` class is a JavaScript library for conditional verification.
 * It allows you to create expressions and perform various tests on them.
 * Each validator instance has properties such as `answer`, `value`, and
 * description.
 */
export default class validator {
    /**
     * The constructor initializes a new `validator` instance with the given parameter.
     *
     * @param {any} parameter - A JavaScript valid variable or expression. The
     * type of the parameter can be any valid JavaScript expression or a type
     * defined in this language.
     */
    constructor(parameter: any);
    /**
     * Sets the value property of the current validator instance.
     *
     * @param {any} parameter - The value to set for the validator instance.
     */
    set value(parameter: any);
    /**
     * Gets the current value property.
     *
     * @returns {any} The value property of the validator instance.
     */
    get value(): any;
    /**
     * Sets the description property of the current validator instance.
     *
     * @param {string} text - the description of the validator instance.
     * @throws {Error} if the "text" parameter is not a string or a number.
     */
    set description(text: string);
    /**
     * @returns {string} The description property of the
     * current validator instance.
     */
    get description(): string;
    /**
     * Sets the "description" property
     * of the current validator instance
     * to the "message" parameter if it
     * is a string type.
     *
     * @param {string} message - the
     * description of the current
     * validator instance.
     *
     * @returns {validator} The updated validator
     * instance with the "description" property set
     * to the "message" argument.
     */
    describe(message: string): validator;
    /**
     * Resets internal state fields, including #not, #operand, and #question.
     */
    reset(): void;
    /**
     * Gets the result from the validator's logical computations and reset
     * the operand and question states to null.
     * @returns {boolean} The result from the validator's logical computations.
     */
    get answer(): boolean;
    /**
     * Sets the value of the status for error or warning printing in the console.
     *
     * @param {boolean} warnings - The status value to set.
     */
    set show_warnings(warnings: boolean);
    /**
     * Gets the status of showing warning or error messages to the user.
     *
     * @returns {boolean} If true, warning messages will be printed to the console
     * when an inaccuracy is made by the user.
     */
    get show_warnings(): boolean;
    /**
     * Enables logical negation for the current validator instance.
     * When combined with other methods, it performs logical negation
     * of the result.
     *
     * @returns {validator} The current validator instance.
     */
    get not(): validator;
    /**
     * Sets the current validator instance to use logical AND (&&)
     * for subsequent validations.
     *
     * @returns {validator} The current validator instance.
     */
    get and(): validator;
    /**
     * Sets the current validator instance to use logical OR (||)
     * for subsequent validations.
     *
     * @returns {validator} The current validator instance.
     */
    get or(): validator;
    /**
     * Creates a new instance with the current value of the validator and
     * discards the obtained answer.
     *
     * @returns {validator} A new validator instance with an undefined answer.
     */
    copy(): validator;
    /**
     * Creates a new instance of the current validator object and copies
     * the obtained answer and other properties.
     *
     * @returns {validator} A new validator instance with the same answer
     * and other properties as the current instance.
     */
    absoluteCopy(): validator;
    /**
     * Checks if the value property of the current validator instance is a boolean.
     *
     * @returns {validator} The current validator instance.
     */
    get isBoolean(): validator;
    /**
     * Checks if the value property of the current validator instance is undefined.
     *
     * @returns {validator} The current validator instance.
     */
    get isUndefined(): validator;
    /**
     * Checks if the value property of the current validator instance is null.
     *
     * @returns {validator} The updated current validator instance.
     */
    get isNull(): validator;
    /**
     * Checks if the "value" property of the current validator instance
     * is a Symbol data type in JavaScript.
     *
     * @returns {validator} The updated current validator instance
     * with the "answer" property set to true if the "value" is a Symbol,
     * otherwise, sets the "answer" to false.
     */
    get isSymbol(): validator;
    /**
     * Checks if the "value" property is a BigInt data type.
     *
     * @returns {validator} The updated current validator instance
     * with the "answer" property set to true if the value is a BigInt,
     * otherwise set to false.
     */
    get isBigInt(): validator;
    /**
     * Checks if the value property of the current validator instance is a string.
     * @returns {validator} The updated current validator instance.
     */
    get isString(): validator;
    /**
     * Checks if the value property of the current validator instance is a number.
     *
     * @returns {validator} The updated current validator instance.
     */
    get isNumber(): validator;
    /**
     * Checks if the value property of the current validator instance is an integer.
     *
     * @returns {validator} The updated current validator instance.
     */
    get isInteger(): validator;
    /**
     * Checks if the value property of
     * the current validator instance
     * is a non-integer number (float).
     *
     * @returns {validator} The updated
     * current validator instance with
     * "answer" property set to true if
     * the "value" is a floating point
     * number, false otherwise.
     */
    get isFloat(): validator;
    /**
     * Checks if the value property of the current validator
     * instance is greater than a given real number, 'a'.
     *
     * @param {number} a - A real number that must be
     * lesser or equal to the validator instance value property.
     * @returns {validator} A validator instance with the answer
     * property set to true or false based on the comparison.
     * @throws {Error} If the "a" parameter is not a valid number.
     */
    isGreaterThan(a: number): validator;
    /**
     * Checks if the value property of the current validator
     * instance is less than a given real number, 'a'.
     *
     * @param {number} a - A real number that must be
     * greater or equal to the validator instance value property.
     * @returns {validator} A validator instance with the answer
     * property set to true or false based on the comparison.
     * @throws {Error} If "a" parameter is not a valid number.
     */
    isLessThan(a: number): validator;
    /**
     * Checks if the "value" property of the
     * current validator instance is greater
     * than or equals to the "a" parameter of
     * the method
     *
     * @param {number} a a real number
     * @returns {validator} The updated validator
     * instance with "answer" property set to true
     * if the "value" is greater than or equals to
     * the "a" input parameter of the method, false
     * otherwise.
     * @throws {Error} If "a" parameter is not a valid number.
     */
    isGreaterThanOrEqual(a: number): validator;
    /**
     * Checks if the value property of the current validator
     * instance is less than or equal to a given real number, 'a'.
     *
     * @param {number} a - A real number that has to be greater
     * or equal to the current value property of the validator instance.
     * @returns {validator} A validator instance with the answer
     * property set to true or false based on the comparison.
     * @throws {Error} if "a" parameter is not a valid number.
     */
    isLessThanOrEqual(a: number): validator;
    /**
     * Checks if the value property of the current validator
     * instance is a number which is equals to some real number
     * say "a".
     *
     * @param {number} a - a real number
     * @returns {validator} the updated validator instance
     * with the answer property set to true or false based
     * on the comparison.
     * @throws {Error} If "a" parameter is not a valid number.
     */
    isEqual(a: number): validator;
    /**
     * Checks if the value property of the current validator instance
     * is not equal to some real number, "a".
     *
     * @returns {validator} the updated validator instance with
     * "answer" property set to true or false based on the comparison.
     * @throws {Error} if "a" parameter is not a valid number.
     */
    isNotEqual(a: any): validator;
    /**
     * Checks if the "value" property of the current validator instance
     * is a number within the open interval (a, b).
     *
     * @param {number} a - A real number that must be smaller than
     * the "value" property of the validator instance.
     * @param {number} b - A real number that must be greater than
     * the "value" property of the validator instance.
     * @returns {validator} The updated validator instance with the
     * "answer" property set to true if the "value" is in the specified
     * range, or false otherwise.
     * @throws {Error} If the provided arguments are not valid numbers,
     * or if 'a' is greater than or equal to 'b'.
     */
    isInRange(a: number, b: number): validator;
    /**
     * Checks if the "value" property is in the closed range [a, b].
     *
     * @param {number} a - A real number that must be smaller than or equal to
     * the "value" property of the validator instance.
     * @param {number} b - A real number that must be greater or equal to
     * the "value" property of the validator instance.
     * @returns {validator} The updated validator instance with the "answer"
     * property set to true if the "value" is in the closed range [a, b], or false
     * otherwise.
     * @throws {Error} If the provided arguments are not valid numbers, or if 'a'
     * is greater than 'b'.
     */
    isInClosedRange(a: number, b: number): validator;
    /**
     * Checks if the value property of the current
     * validator instance is a positive number.
     *
     * @returns {validator} The updated validator
     * instance with the answer property set to
     * true or false based on the comparison with zero.
     */
    get isPositive(): validator;
    /**
     * Checks if the "value" property is a number, which is
     * lesser than zero (negative number).
     *
     * @returns {validator} The updated validator instance
     * with the "answer" property to be true or false based
     * on the comparision with 0.
     */
    get isNegative(): validator;
    /**
     * Checks if the "value" property is a positive integer.
     *
     * @returns {validator} The updated validator instance
     * with the "answer" property to be true or false based
     * on the comparison with 0.
     */
    get isPositiveInteger(): validator;
    /**
     * Checks if the "value" property is integer, which is less than zero.
     *
     * @returns {validator} The updated validator instance with the
     * "answer" property to be set to true or false based on the
     * comparison with 0.
     */
    get isNegativeInteger(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is a number or if it is a string, which may be
     * converted to a number.
     *
     * @returns {validator} The updated validator property with
     * "answer" property set to true if the "value" is a number
     * or if it is a string which may be converted to a number.
     */
    get isConvertibleToNumber(): validator;
    /**
     * Checks if the value property of the
     * current validator instance is an integer
     * or a string that may be converted
     * to an integer.
     *
     * @returns {validator} The updated current validator instance.
     */
    get isConvertibleToInteger(): validator;
    /**
     * Checks if the "value" property is a positive number
     * or if it is a string which may be converted to a positive
     * number.
     *
     * @returns {validator} the updated validator instance with
     * "answer" property set to true or false based on whether
     * the "value" property is a positive number or if it is a
     * string which may be converted to a positive number.
     */
    get isConvertibleToPositiveNumber(): validator;
    /**
     * Checks if the "value" property is a negative number or
     * a string which may be converted to a negative number.
     *
     * @returns {validator} the updated validator instance with
     * "answer" property set to true or false based on whether
     * the "value" property is a negative number or a string
     * which may be converted to a negative number.
     */
    get isConvertibleToNegativeNumber(): validator;
    /**
     * Checks if the "value" property is a positive
     * integer or a string which may be converted to
     * a positive integer.
     *
     * @returns {validator} the updated validator instance with
     * "answer" property set to true or false based on the
     * whether the "value" is positive integer or a string,
     * which may be converted to positive integer.
     */
    get isConvertibleToPositiveInteger(): validator;
    /**
     * Checks if the "value" property of the validator instance
     * is a negative integer or a string which may be converted
     * to negative integer.
     *
     * @returns {validator} the updated validator instance with
     * "answer" property set to true or false based on whether
     * the "value" is negative integer or a string which may be
     * converted to negative integer.
     */
    get isConvertibleToNegativeInteger(): validator;
    /**
     * Checks if the "value" of the current validator instance
     * is a primitive data type.
     *
     * @returns {validator} The updated current validator instance.
     * The "answer" property is set to true if the "value" is a primitive
     * type (string, number, bigInt, symbol, boolean, undefined, or null),
     * otherwise, it is set to false.
     */
    get isPrimitiveType(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an ArrayBuffer data type in JavaScript.
     *
     * @returns {validator} The updated validator instance with
     * the "answer" property set to true or false based on the
     * type of the "value" property.
     */
    get isArrayBuffer(): validator;
    /**
     * Checks if the "value" property of the current
     * validator instance is an Int8Array in JavaScript.
     *
     * Note: This method does not ensure that all elements
     * of the "array" are not NaN.
     *
     * @returns {validator} The updated validator instance with
     * the "answer" property set to true if the type is Int8Array,
     * false otherwise.
     */
    get isInt8Array(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is a Uint8Array in JavaScript.
     *
     * Note: This method
     * does not ensure that all elements of the "array" are not NaN.
     *
     * @returns {validator} the updated validator instance with
     * the "answer" property set to true if the type is Uint8Array,
     * false otherwise.
     */
    get isUint8Array(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is a Uint8CLampedArray in JavaScript.
     *
     * Note: This method
     * does not ensure that all elements of the "array" are not NaN.
     *
     * @returns {validator} the updated current validator instance with
     * the "answer" property set to true if the type is Uint8ClampedArray,
     * false otherwise.
     */
    get isUint8ClampedArray(): validator;
    /**
     * Checks if the "value" property of the current validator instance
     * is Int16Array in JavaScript.
     *
     * Note: This method does not ensure that all the elements of
     * the "array" are not NaN.
     *
     * @returns {validator} The updated current validator instance
     * with the "answer" property set to true if the "value" is Int16Array,
     * false otherwise.
     */
    get isInt16Array(): validator;
    /**
     * Checks if the "value" property of the current validator instance
     * is Uint16Array in JavaScript.
     *
     * Note: This method does not ensure that all elements of the
     * "array" are not NaN.
     *
     * @returns {validator} The updated current validator instance
     * with the "answer" property set to true if the type is Uint16Array,
     * false otherwise.
     */
    get isUint16Array(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is Int32Array in JavaScript.
     *
     * Note: This method does not ensure that all the elements of
     * the "array" are not NaN.
     *
     * @returns {validator} The updated current validator instance
     * with "answer" property set to true if the "value" is Int32Array,
     * false otherwise.
     */
    get isInt32Array(): validator;
    /**
     * Checks if the "value" property of the current validator instance
     * is a Uint332Array in JavaScript.
     *
     * Note: This method does not ensure that all elements of the
     * "array" are not NaN.
     *
     * @returns {validator} the updated current validator instance with
     * answer property set to true if the "value" is Uint32Array, false
     * otherwise.
     */
    get isUint32Array(): validator;
    /**
     * Checks if the "value" property of the current validator instance
     * is an integer typed array (Int8Array, Uint8Array, Uint8ClampedArray,
     * Int16Array, Uint16Array, Int32Array, or Uint32Array).
     *
     * Note: This method does not ensure that all elements of the "array"
     * are not NaN.
     *
     * @returns {validator} The updated current validator instance with
     * "answer" property set to true if the "value" is an integer typed array,
     * false otherwise.
     */
    get isIntegerTypedArray(): validator;
    /**
     * Checks if the "value" property of the current validator instance
     * is Float32Array in JavaScript.
     *
     * Note: This method does not ensure that all elements of the "array"
     * are not NaN.
     *
     * @returns {validator} The updated current validator instance with
     * "answer" property set to true if the "value" is Float32Array,
     * false otherwise.
     */
    get isFloat32Array(): validator;
    /**
     * Checks if the "value" property of the current validator instance
     * is Float64Array in JavaScript.
     *
     * Note: This method does not ensure that all elements of the "array"
     * are not NaN.
     *
     * @returns {validator} the updated current validator instance
     * with "answer" property set to true if the "value" is Float64Array,
     * false otherwise.
     */
    get isFloat64Array(): validator;
    /**
     * Checks if the "value" property of the current validator instance
     * is a float typed array (Float32Array or Float64Array).
     *
     * Note: This method does not ensure that all elements of the "array"
     * are not NaN.
     *
     * @returns {validator} the updated current validator instance with
     * "answer" property set to true if the "value" is some instance of
     * float - typed array, false otherwise.
     */
    get isFloatTypedArray(): validator;
    /**
     * Checks if the "value" property of the current validator instance
     * is likely to be some kind of a TypedArray in JavaScript.
     *
     * Note: This method does not ensure that all elements of the "array"
     * are not NaN.
     *
     * @returns {validator} The updated validator instance with
     * "answer" property set to true if the "value" is likely to be
     * a typed array, false otherwise.
     */
    get isTypedArray(): validator;
    /**
     * Checks if the "value" property of the current validator instance
     * is a generic array type in JavaScript.
     *
     * @returns {validator} The updated validator instance with "answer"
     * property set to true if the "value" is an array, false otherwise.
     */
    get isArray(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an array of boolean elements.
     *
     * @returns {validator} The updated validator instance with
     * the "answer" property set to true if the "value" is an array
     * of boolean elements and false otherwise.
     */
    get isBooleanArray(): validator;
    /**
     * Checks if the "value" property of the current
     * validator instance is an array of number elements.
     *
     * @returns {validator} The updated validator instance
     * with "answer" property set to true if the "value" is
     * a number array, false otherwise.
     */
    get isNumberArray(): validator;
    /**
     * Checks if the "value" property of the current
     * validator instance is an array of integer numbers.
     *
     * @returns {validator} The updated validator instance
     * with "answer" property set to true if the "value" is
     * an integer array, false otherwise.
     */
    get isIntegerArray(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an array of positive numbers.
     *
     * @returns {validator} The updated validator instance
     * with "answer" property set to true if the "value" is
     * positive numeric array, false otherwise.
     */
    get isArrayOfPositiveNumbers(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an array whose elements are negative numbers.
     *
     * @returns {validator} The updated validator instance with
     * the "answer" property set to true if all the elements of
     * the "value" array are negative numbers.
     */
    get isArrayOfNegativeNumbers(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an array of positive integers.
     *
     * @returns {validator} The updated validator instance
     * with the "answer" property set to true if the "value"
     * is an array of positive integers.
     */
    get isArrayOfPositiveIntegers(): validator;
    /**
     * Checks if the "value" property of the current validator instance
     * is an array of negative integer number elements.
     *
     * @returns {validator} The updated validator instance with the
     * "answer" property set to true if the "value" is an array of
     * negative integers.
     */
    get isArrayOfNegativeIntegers(): validator;
    /**
     * Checks if the "value" property of the current
     * validator instance is an array and in addition
     * if all elements of the array are numbers which
     * belongs to the open interval (a, b), where "a"
     * and "b" are the parameters of the method.
     *
     * @param {number} a
     * @param {number} b
     * @throws {Error} if "a" and "b" are not numbers or "a"
     * is not less than "b".
     * @returns {validator} The updated validator instance
     * with "answer" property set to true if the "value" is
     * numeric array with elements in an open interval (a, b),
     * false otherwise.
     */
    isArrayOfNumbersInRange(a: number, b: number): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an array of numbers in the closed range [a, b],
     * where "a" and "b" are the parameters of the method.
     *
     * @param {number} a
     * @param {number} b
     * @throws {Error} if "a" and "b" are not numbers or "a"
     * is not less than "b".
     * @returns {validator} The updated validator instance
     * with "answer" proeprty set to true if the "value" is
     * an array of numbers in an closed range [a, b]
     */
    isArrayOfNumbersInClosedRange(a: number, b: number): validator;
    /**
     * Checks if "value" property of the current validator
     * instance is an array of integers which lie in the
     * open interval (a, b).
     *
     * @param {number} a
     * @param {number} b
     * @throws {Error} if "a" and "b" are not integers or
     * "a" is not less than "b"
     * @returns {validator} The updated validator instance
     * with "answer" property set to true if the "value" is
     * an integer array with all elements to be in the
     * open interval (a, b).
     */
    isArrayOfIntegersInRange(a: number, b: number): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an integer array whoose elements lies in the
     * closed range [a, b], where "a" and "b" are the parameters
     * of the method.
     *
     * @param {number} a
     * @param {number} b
     * @throws {Error} if "a" and "b" are not integers or "a" is
     * not lesser than "b".
     * @returns {validator} The updated validator instance
     * with "answer" property set to true if the "value" is
     * an integer array with elements in the closed range [a, b].
     */
    isArrayOfIntegersInClosedRange(a: number, b: number): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an array of string elements.
     *
     * @returns {validator} The updated validator instance
     * with the "answer" property set to true if the "value"
     * is array of string elements.
     */
    get isStringArray(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an array of object elements.
     *
     * @returns {validator} The updated current validator instance
     * with "answer" property set to true if the "value" is an
     * array of object elements, false otherwise.
     */
    get isObjectArray(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an array whoose elements are all functions.
     *
     * @returns {validator} The updated validator instance
     * with the "answer" property set to true if the "value"
     * is an array of function components, false otherwise.
     */
    get isArrayOfFunctions(): validator;
    /**
     * Checks if the "value" property is an array of arbitrary
     * array elements.
     *
     * @returns {validator} The updated validator instance
     * witht the "answer" property set to true if the "value"
     * porpeorty is an array of arbitrary array elements.
     */
    get isArrayOfArrays(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an array of arbitrary arrays with equal size.
     *
     * @returns {validator} The updated validator instance
     * with the "answer" property set to true if the "value"
     * is an array of arrays and every element of the "value"
     * has the same length, false otherwise.
     */
    get isArrayOfArraysWithEqualSize(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an array of numeric arrays with have arbitrary
     * length.
     *
     * @returns {validator} The updated validator instance
     * with the "answer" property set to true if the "value"
     * is an array of numeric arrays with arbitrary length,
     * false otherwise.
     */
    get isArrayOfNumberArrays(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is a numeric matrix.
     *
     * @returns {validator} The updated validator instance
     * with the "answer" property set to true if the "value"
     * is a numeric matrix, false otherwise.
     */
    get isArrayOfNumberArraysWithEqualSize(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an array whoose elements are integer arrays
     * with arbitrary length.
     *
     * @returns {validator} The updated validator instance with
     * "answer" property set to true if the "value" is an array
     * of integer arrays, false otherwise.
     */
    get isArrayOfIntegerArrays(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an integer matrix.
     *
     * @returns {validator} The updated validator instance
     * with "answer" property set to true if the "value" is
     * an array of integer arrays with equal size (integer matrix).
     */
    get isArrayOfIntegerArraysWithEqualSize(): validator;
    /**
     * Checks if the "value" property of the current
     * validator instance is a collection of typed
     * arrays.
     *
     * @returns {validator} The updated validator
     * instance with "answer" property set to
     * true if the "value" is an array of typed
     * arrays, false otherwise.
     */
    get isArrayOfTypedArrays(): validator;
    /**
     * Checks if the "value" property of the current
     * validator instance is a typed matrix.
     *
     * @returns {validator} The updated validator instance
     * with "answer" property set to true if the "value"
     * is an typed matrix, false otherwise.
     */
    get isArrayOfTypedArraysWithEqualSize(): validator;
    /**
     * Checks if the "value" property of the current
     * validator instance is an array of generic or
     * typed arrays.
     *
     * @returns {validator} The updated validator
     * instance with "answer" property set to true
     * if the "value" is an array of arrays or an
     * array of typed arrays.
     */
    get isArrayOfAbstractArrays(): validator;
    /**
     * Checks if the "value" property of the
     * current validator instance is a matrix or
     * a typed matrix (array of typed arrays with
     * equal length).
     *
     * @returns {validator} The updated validator
     * instance with the "answer" property set to
     * true if the "value" is abstract matrix, false
     * otherwise.
     */
    get isArrayOfAbstractArraysWithEqualSize(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an array of string arrays with arbitrary length.
     *
     * @returns {validator} The updated validator instance
     * with "answer" property set to true if the "value" is
     * an array of string arrays with arbitrary length, false otherwise.
     */
    get isArrayOfStringArrays(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is a string matrix.
     *
     * @returns {validator} The updated validator isntance
     * with "answer" property set to true if the "value" is
     * a string matrix, false otherwies.
     */
    get isArrayOfStringArraysWithEqualSize(): validator;
    /**
     * Checks if the "value" property of the current
     * validator instance is an array of object arrays
     * with arbitrary length.
     *
     * @returns {validator} The updated validator instances
     * with "answer" property set to true if the "value" is
     * an array of object arrays, false otherwise.
     */
    get isArrayOfObjectArrays(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is a matrix of object elements.
     *
     * @returns {validator} The updated validator instance with
     * "answer" property set to true if the "value"is an matrix of
     * object elements, false otherwise.
     */
    get isArrayOfObjectArraysWithEqualSize(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an object.
     *
     * @returns {validator} The updated current validator instance
     * with the "answer" property set to true if the "value" is an
     * object type, false otherwise.
     */
    get isObject(): validator;
    /**
     * Checks if the "value" property of the current validator instance
     * is a Map data type in JavaScript.
     *
     * @returns {validator} The updated current validator instance
     * with "answer" property set to true if the "value" is a Map
     * data type, false otherwise.
     */
    get isMap(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is a Set data type in JavaScript.
     *
     * @returns {validator} The updated current validator instance
     * with "answer" property set to true if the "value" is a Set,
     * false otherwise.
     */
    get isSet(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is a Function data type in JavaScript.
     *
     * @returns {validator} The updated validator instance with
     * "answer" property set to true if the "value" is a Function,
     * false otherwise.
     */
    get isFunction(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an asynchronous function.
     *
     * @returns {validator} The updated current validator instance
     * with "answer" property set to true if the "value" is an
     * asynchronous function, false otherwise.
     */
    get isAsync(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is a Generator or GeneratorFunction in JavaScript.
     *
     * @returns {validator} The updated current validator instance
     * with "answer" property set to true if the "value" is a Generator
     * or Generator function, false otherwise.
     */
    get isGenerator(): validator;
    /**
     * Checks if the "value" property of the current validator instance
     * is a Promise in JavaScript.
     *
     * @returns {validator} The updated current validator instance
     * with "answer" property set to true if the "value" is a Promise,
     * false otherwise.
     */
    get isPromise(): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance is an Error object.
     *
     * @returns {validator} The updated validator instance
     * with "answer" property set to true if the "value" is
     * an Error object in JavaScript, false otherwise.
     */
    get isError(): validator;
    /**
     * Checks if the value
     * property of the current validator instance is
     * valid date data type in JavaScript.
     *
     * @returns {validator} The updated validator instance
     * with "answer" property set to true if the "value" is
     * a date type, false otherwise.
     */
    get isDate(): validator;
    /**
     * Checks if the "value" property of the current
     * validator instance is a valid email.
     *
     * @returns {validator} The updated validator instance
     * with "answer" property set to true if the "value" is
     * a valid email, false otherwise.
     */
    get isEmail(): validator;
    /**
     * Checks if the current validator value is instanceof
     * the "instance" parameter. The "instance" can be
     * defined with its constructor or as a string, equal
     * to the name of the instance type.
     *
     * @param {InstanceType | string} instance
     * @returns {validator} The updated validator instance
     * with "answer" property set to true if the "value" is
     * instance of the "instance" parameter, false otherwise.
     */
    isInstanceof(instance: InstanceType | string): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance has a length-like property (e.g., length, byteLength, size)
     * and if that property is equals to the specified value "n".
     *
     * @param {number} n - An integer value to compare with the length-like property.
     * @throws {Error} if the "n" parameter is not an integer number.
     * @returns {validator} The updated validator instance
     * with the "answer" property set to true if the "value" has a
     * length-like property that is equals to the "n" parameter.
     */
    hasLength(n: number): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance has a length-like property (e.g., length, byteLength, size)
     * and if that property is greater than the specified value "n".
     *
     * @param {number} n - An integer value to compare with the length-like property.
     * @throws {Error} if "n" parameter is not an integer number.
     * @returns {validator} The updated validator instance
     * with the "answer" property set to true if the "value" has a
     * length-like property that is greater than the "n" parameter.
     */
    hasLengthGreaterThan(n: number): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance has a length-like property (e.g., length, byteLength, size)
     * and if that property is equal to or greater than the specified value "n".
     *
     * @param {number} n - An integer value to compare with the length-like property.
     * @throws {Error} if "n" parameter is not an integer number.
     * @returns {validator} The updated validator instance
     * with the "answer" property set to true if the "value" has a
     * length-like property that is equal to or greater than the "n" parameter.
     */
    hasLengthEqualsOrGreaterThan(n: number): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance has a length-like property (e.g., length, byteLength, size)
     * and if that property is less than the specified value "n".
     *
     * @param {number} n - An integer value to compare with the length-like property.
     * @throws {Error} if "n" parameter is not an integer number.
     * @returns {validator} The updated validator instance
     * with the "answer" property set to true if the "value" has a
     * length-like property that is less than the "n" parameter.
     */
    hasLengthLessThan(n: number): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance has a length-like property (e.g., length, byteLength, size)
     * and if that property is equal to or less than the specified value "n".
     *
     * @param {number} n - An integer value to compare with the length-like property.
     * @throws {TypeError} If the "n" parameter is not an integer number.
     * @returns {validator} The updated validator instance
     * with the "answer" property set to true if the "value" has a
     * length-like property that is equal to or less than the "n" parameter.
     */
    hasLengthEqualsOrLessThan(n: number): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance has a length-like property (e.g., length) that falls within
     * the specified open range defined by "a" and "b".
     *
     * @param {number} a - An integer representing the lower bound of the range.
     * @param {number} b - An integer representing the upper bound of the range.
     * @throws {TypeError} If either "a" or "b" is not an integer, or if "a" is greater than or equal to "b".
     * @returns {validator} The updated validator instance with the "answer" property
     * set to true if the length-like property is within the open range (a < length < b),
     * false otherwise.
     */
    hasLengthInRange(a: number, b: number): validator;
    /**
     * Checks if the "value" property of the current validator
     * instance has a length-like property (e.g., length) that falls within
     * the specified closed range defined by "a" and "b".
     *
     * @param {number} a - An integer representing the lower bound of the closed range.
     * @param {number} b - An integer representing the upper bound of the closed range.
     * @returns {validator} The updated validator instance with the "answer" property
     * set to true if the length-like property is within the closed range (a ≤ length ≤ b),
     * false otherwise.
     * @throws {TypeError} If either "a" or "b" is not an integer, or if "a" is greater than or equal to "b".
     */
    hasLengthInClosedRange(a: number, b: number): validator;
    /**
     * Checks if the "value" property of the current validator instance is empty,
     * depending on the data type. For undefined or null values, it's considered empty.
     * For arrays, array buffers, maps, objects, sets, strings, and typed arrays,
     * it checks if the length or similar property is equal to 0.
     *
     * @throws {Error} If the "value" is an incorrect argument.
     * @returns {validator} The updated validator instance with the "answer" property
     * set to true if the "value" is empty according to its data type, false otherwise.
     */
    get isEmpty(): validator;
    /**
     * Iterates over the elements of the "value" property of the current validator instance,
     * applying the provided callback function to each element. The callback function should
     * return a validator instance. This method returns true if the callback function returns
     * a "truthy" validator instance for all elements in the value, false otherwise.
     *
     * @param {function(validator, number | string): validator} callback - A function that
     * takes a validator instance and an optional key or index and returns a validator instance.
     *
     * @example
     * let a = new validator([12, 32, 998.3, 89, 0.9839])
     *     .forEvery(element => {
     *         return element.isFloat;
     *     });
     * console.log(a.answer) // true
     *
     * @throws {Error} If the "callback" parameter is not a function.
     *
     * @returns {validator} The updated validator instance with the "answer" property set to true
     * if the callback function returns "truthy" validator instances for all elements, false otherwise.
     */
    forEvery(callback: (arg0: validator, arg1: number | string) => validator): validator;
    /**
     * Iterates through the elements of the current
     * validator's "value" property and checks if the
     * provided callback function returns a "truthy"
     * validator instance for any of the elements.
     *
     * @param {function(validator, number): validator} callback - A
     * function that jtakes a validator instance and an optional key
     * or index and returns a validator instance.
     *
     * @example
     * let a = new validator([12, 32, 998.3, 89, 0.9839])
     *     .forAny(element => {
     *         return element.isFloat;
     *     });
     * console.log(a.answer); // true
     *
     * @throws {Error} if the "callback" parameter is not a function.
     *
     * @returns {validator} The updated validator instance with the "answer"
     * property set to true if the "callback" function returns a "truthy"
     * validator instance for any of the elements, false otherwise.
     */
    forAny(callback: (arg0: validator, arg1: number) => validator): validator;
    /**
     * Checks if the current validator instance's value
     * is an array and if a given callback function
     * returns a truthy result for every element in the array.
     *
     * @param {function(validator, number | string): validator} callback - A
     * function that takes a validator instance and an optional
     * key or index and returns a validator instance.
     * @throws {Error} If the "callback" parameter is not a function.
     * @returns {validator} The updated validator instance
     * with the "answer" property set to true if the current
     * instance's value is an array and the callback function
     * returns "truthy" for every element,false otherwise.
     */
    isArrayAndForEvery(callback: (arg0: validator, arg1: number | string) => validator): validator;
    /**
     * Checks if the current validator instance's value
     * is an array and if a given callback function returns
     * a truthy result for at least one element in the array.
     *
     * @param {function(validator, number | string): validator} callback - A
     * function that takes a validator instance and an optional
     * key or index and returns a validator instance.
     * @throws {Error} If the "callback" parameter is not a function.
     * @returns {validator} The updated validator instance
     * with the "answer" property set to true if the current
     * instance's value is an array and the callback function
     * returns "truthy" for at least one element, false otherwise.
     */
    isArrayAndForAny(callback: (arg0: validator, arg1: number | string) => validator): validator;
    /**
     * Define an interface for validating
     * properties of the current validator
     * instance's object value.
     * This method works when the "value"
     * property is an object. It accepts
     * functions as values in the object
     * argument.
     * Use this method to define an interface
     * for validating the properties of the
     * current validator instance's object value.
     * Each property in the object argument
     * represents a property in the object,
     * and the associated function should
     * validate that property.
  
     * @param {Object<string, function(validator): validator>} params - An
     * object where keys represent properties
     * of the object and values are functions.
     * The function argument is assumed to be
     * a validator instance corresponding to
     * the property and should return a validator.
     * @example
     * const user = {
     *   name: 'John',
     *   age: 30,
     *   email: 'john@example.com'
     * };
     * const userValidator = new validator(user);
     *
     * const interfaceValidator = userValidator.interface({
     *   name: (name) => name.isString.and.not.isEmpty,
     *   age: (age) => age.isNumber.and.isGreaterThan(18),
     *   email: (email) => email.isEmail,
     * });
     *
     * console.log(interfaceValidator.answer); // true (if all properties pass validation)
     *
     * @returns {validator} A new validator
     * instance with the "answer" property
     * set to true if all property validations
     * pass, or false if any validation fails.
     */
    interface(params: {
        [x: string]: (arg0: validator) => validator;
    }): validator;
    /**
     * Checks if the "value" property the current
     * validator instance is equals to (same with)
     * the "param" argument of the method.
     *
     * @param {any} param
     * @returns {validator} The updated validator instance
     * with "answer" property set to true if the "value" is
     * same with the "param" argument of the method.
     */
    isSame(param: any): validator;
    /**
     * Checks if the value of the
     * current validator instance
     * is the same as any of the
     * values in the provided array.
     *
     * @param {Array|TypedArray} arrParam - The array to compare with.
     * @returns {validator} The updated validator
     * instance with the "answer" property set
     * to true if there's a match, false otherwise.
     */
    isSameWithAny(arrParam: any[] | TypedArray): validator;
    /**
     * Bind the results of the current validator instance with another validator's results.
     * The binding operation sets the "answer" property to the result of the comparison.
     *
     * This method allows you to combine the results of the current validator
     * expression and another validator expression using logical AND/OR/NOT.
     *
     * @param {validator} otherValidator - Another validator expression to bind with.
     * @example
     * const ageValidator = new validator(25).isInteger;
     * const nameValidator = new validator('John').isString.and.not.isEmpty;
     *
     * const resultValidator = ageValidator.and.bind(nameValidator);
     * console.log(resultValidator.answer); // true
     *
     * @returns {validator} A new validator instance representing the combined result
     * of the binding operation.
     */
    bind(otherValidator: validator): validator;
    /**
     * @callback eventCallback
     * @param {validator} value - the current validator property.
     */
    /**
     * Executes a callback function depending on
     * the state ("answer") of the current validator
     * instance.
     *
     * @param {boolean} state - The expected state.
     * @param {eventCallback} callback - The
     * function to be executed when the "answer"
     * property matches the specified state.
     * @example
     * const numberValidator = new validator(42);
     * numberValidator.isInteger.and.isLessThan(50).on(true, (v) => {
     *   console.log(`The number ${v.value} is a n integer and is less than 50!`);
     *   v.value = 0; // avoid to make this!
     * });
     *
     * @returns {validator} The current validator instance.
     * It remains unchanged if the callback doesn't modify it.
     */
    on(state: boolean, callback: (value: validator) => any): validator;
    /**
     * Update the current validator's "value"
     * property by executing the "value"
     * function if it is a function.
     * If the "value" property is an
     * asynchronous function, it will
     * be executed and updated.
     * If the "value" is neither a function
     * nor an asynchronous function, it remains unchanged.
     * If the `show_warnings` property is
     * set to true for this instance, a
     * warning message is printed when
     * the "value" is neither a function
     * nor an asynchronous function.
     *
     * @param {...any} params - Parameters
     * to be passed to the "value" function when executed.
     * @returns {validator} The updated validator instance
     * with the "value" property set to the result of the
     * executed function.
     */
    executeWith(...params: any[]): validator;
    /**
     * Execute the current validator's "value"
     * function with the specified parameters.
     * If the "value" property is a function,
     * the method executes it with the provided parameters.
     *
     * The `throwsErrorWith` method executes
     * the  "value" function and checks whether
     * it throws an error.
     *
     * It is recommended to use the `copy`
     * method before calling this method.
     *
     * @param {...any} params - Parameters
     * to be passed to the "value" function
     * when executed.
     * @returns {validator} The current validator instance
     * with the "answer" property indicating whether the
     * execution resulted in an error (true) or not (false).
     */
    throwsErrorWith(...params: any[]): validator;
    /**
     * A callback function that will be executed
     * during the validator benchmark to measure its performance.
     *
     * @callback benchmarkCallback
     * @param {any} parameter - The value of the current
     * validator instance.
     */
    /**
     * Measures the execution time of a given callback function
     * when called with the current validator instance's value.
     *
     * @param {benchmarkCallback} f - The function to benchmark.
     * @param {number} iterations - The number of iterations to run
     *                             the benchmark (default is 100).
     * @returns {{mean: number, std: number, iterations: number}} An object
     *          with keys "mean" (average time), "std" (standard deviation),
     *          and "iterations" (number of iterations).
     */
    benchmark(f: (parameter: any) => any, iterations?: number): {
        mean: number;
        std: number;
        iterations: number;
    };
    /**
     * Prints the description message of the current
     * validator instance with green color if the "answer"
     * property is true and with red color if the "answer"
     * property is false.
     * if the "answer" property is not boolean, then no
     * messages will be printed.
     *
     * @param {{
     *   title: boolean,
     *   success: string,
     *   error: string
     * }} options
     * @returns {validator} The current validator property.
     */
    test(options?: {
        title: boolean;
        success: string;
        error: string;
    }): validator;
    #private;
}
//# sourceMappingURL=validator.d.ts.map