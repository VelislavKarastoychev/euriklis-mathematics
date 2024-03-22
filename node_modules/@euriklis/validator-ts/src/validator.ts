"use strict";
import message from "@euriklis/message-ts";
import * as errors from "./Errors/index";
import * as warnings from "./Warnings/index";
import * as models from "./Models/index";
import { BenchmarkCallback } from "./types";
/**
 * The `validator` class is a JavaScript library for conditional verification.
 * It allows you to create expressions and perform various tests on them.
 * Each validator instance has properties such as `answer`, `value`, and
 * description.
 */
export default class validator {
  /**
   * @private {any} #value - field that stores the current parameter
   * of the validator instance.
   */
  #value: any = undefined;
  /**
   * @private {boolean} #not - Stores the current value of the not flag.
   */
  #not: boolean | null = null;
  /**
   * @private {string} #operand - Stores the current operand in the
   * validator queue.
   */
  #operand: null | "not" | "or" | "and" = null;
  /**
   * @private {boolean} #question - Stores the value of the question or
   * the truth of the last executed logical test from the validator.
   */
  #question: null | boolean = null;
  /**
   * @private {boolean} #answer - Stores the result of the logical operation.
   */
  #answer: null | boolean = null;
  /**
   * @private {boolean} #warnings - Stores the value of the show_warnings
   * setter value.
   */
  #warnings = false;

  #description = "";

  /**
   * The constructor initializes a new `validator` instance with the given parameter.
   *
   * @param {any} parameter - A JavaScript valid variable or expression. The
   * type of the parameter can be any valid JavaScript expression or a type
   * defined in this language.
   */
  constructor(parameter: any = undefined) {
    this.value = parameter;
    this.#description = "";
  }
  // In order to keep the code more clear and
  // to achieve logical and functional cohesion
  // and also according with the encapsulation
  // principle we will define getters and setters
  // for every state of the constructor.

  /**
   * Gets the current value property.
   *
   * @returns {any} The value property of the validator instance.
   */
  get value(): any {
    return this.#value;
  }

  /**
   * Sets the value property of the current validator instance.
   *
   * @param {any} parameter - The value to set for the validator instance.
   */
  set value(parameter: any) {
    try {
      this.#value = parameter;
    } catch (error) {
      this.value = error;
    }
  }

  /**
   * @returns {string} The description property of the
   * current validator instance.
   */
  get description(): string {
    return this.#description;
  }

  /**
   * Sets the description property of the current validator instance.
   *
   * @param {string} text - the description of the validator instance.
   * @throws {Error} if the "text" parameter is not a string or a number.
   */
  set description(text: string) {
    if (new validator(text).isString.or.isNumber.answer) {
      this.#description = text;
    } else errors.IncorrectDescriptionProperty();
  }

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
  describe(message: string): validator {
    if (new validator(message).isString.and.not.isEmpty.answer) {
      this.#description = message;
    } else errors.IncorrectParameterInDescribe();

    return this;
  }

  /**
   * Resets internal state fields, including #not, #operand, and #question.
   */
  reset(): void {
    this.#not = null;
    this.#operand = null;
    this.#question = null;
  }

  /**
   * Gets the result from the validator's logical computations and reset
   * the operand and question states to null.
   * @returns {boolean} The result from the validator's logical computations.
   */
  get answer(): boolean {
    this.reset();
    return this.#answer as boolean;
  }

  /**
   * Gets the status of showing warning or error messages to the user.
   *
   * @returns {boolean} If true, warning messages will be printed to the console
   * when an inaccuracy is made by the user.
   */
  get show_warnings(): boolean {
    return this.#warnings;
  }

  /**
   * Sets the value of the status for error or warning printing in the console.
   *
   * @param {boolean} warnings - The status value to set.
   */
  set show_warnings(warnings: boolean) {
    new validator(warnings)
      .isBoolean
      .on(true, () => this.#warnings = warnings);
  }

  // In order to apply the functional cohesion
  // and DRY principles we insert here a method
  // which is private (according to the interface segregation
  // principle of the SOLID paradigm).The method
  // #set_answer() is crucial for the validator
  // library because in this method is implemented
  // the logical mechanism of the library.

  /**
   * @private Internal method for computing the result of logical operations.
   * This method is crucial for the validator library's logic.
   *
   * @returns {validator} The current validator instance, allowing method chaining.
   */
  #set_answer(): validator {
    if (this.#not) {
      this.#question = !this.#question;
    }
    if (this.#operand === "or") {
      this.#answer = this.#answer || this.#question;
    }
    if (this.#operand === "and") {
      this.#answer = this.#answer && this.#question;
    }
    if (this.#operand === null) {
      this.#answer = this.#question;
    }
    this.reset();
    return this;
  }

  // In order to make logical decisions we need
  // some operators. According to the mathematical
  // logic to make a closed logical system, we need
  // to introduce (provide) at least three logical
  // operations - the negation (not), the conjunction
  // (and) and the disjunction (or). So we now implement
  // as getters the three logical operators
  // not, or and logical and. The not method sets the
  // #not field to true if is called and the other two
  // methods set the #operator field to "or" and "and.

  /**
   * Enables logical negation for the current validator instance.
   * When combined with other methods, it performs logical negation
   * of the result.
   *
   * @returns {validator} The current validator instance.
   */
  get not(): validator {
    this.#not = true;
    return this;
  }

  /**
   * Sets the current validator instance to use logical AND (&&)
   * for subsequent validations.
   *
   * @returns {validator} The current validator instance.
   */
  get and(): validator {
    this.#operand = "and";
    return this;
  }

  /**
   * Sets the current validator instance to use logical OR (||)
   * for subsequent validations.
   *
   * @returns {validator} The current validator instance.
   */
  get or(): validator {
    this.#operand = "or";
    return this;
  }

  /**
   * Creates a new instance with the current value of the validator and
   * discards the obtained answer.
   *
   * @returns {validator} A new validator instance with an undefined answer.
   */
  copy(): validator {
    return new validator(this.value);
  }

  /**
   * Creates a new instance of the current validator object and copies
   * the obtained answer and other properties.
   *
   * @returns {validator} A new validator instance with the same answer
   * and other properties as the current instance.
   */
  absoluteCopy(): validator {
    let v = new validator(this.value);
    v.#answer = this.#answer;
    v.#not = this.#not;
    v.#operand = this.#operand;
    v.#question = this.#question;
    return v;
  }

  // test conditions for primary data types:

  /**
   * Checks if the value property of the current validator instance is a boolean.
   *
   * @returns {validator} The current validator instance.
   */
  get isBoolean(): validator {
    this.#question = models.CheckType(this.value, "Boolean");
    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator instance is undefined.
   *
   * @returns {validator} The current validator instance.
   */
  get isUndefined(): validator {
    this.#question = models.CheckType(this.value, "Undefined");
    return this.#set_answer();
  }
  /**
   * Checks if the value property of the current validator instance is null.
   *
   * @returns {validator} The updated current validator instance.
   */
  get isNull(): validator {
    this.#question = models.CheckType(this.value, "Null");
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is a Symbol data type in JavaScript.
   *
   * @returns {validator} The updated current validator instance
   * with the "answer" property set to true if the "value" is a Symbol,
   * otherwise, sets the "answer" to false.
   */
  get isSymbol(): validator {
    this.#question = models.CheckType(this.value, "Symbol");
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property is a BigInt data type.
   *
   * @returns {validator} The updated current validator instance
   * with the "answer" property set to true if the value is a BigInt,
   * otherwise set to false.
   */
  get isBigInt(): validator {
    this.#question = models.CheckType(this.value, "BigInt");
    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator instance is a string.
   * @returns {validator} The updated current validator instance.
   */
  get isString(): validator {
    this.#question = models.CheckType(this.value, "String");
    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator instance is a number.
   *
   * @returns {validator} The updated current validator instance.
   */
  get isNumber(): validator {
    this.#question = models.CheckType(this.value, "Number");
    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator instance is an integer.
   *
   * @returns {validator} The updated current validator instance.
   */
  get isInteger(): validator {
    this.#question = models.IsInteger(this.value);
    return this.#set_answer();
  }

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
  get isFloat(): validator {
    this.#question = this.copy()
      .isNumber.and.not.isInteger
      .answer;
    return this.#set_answer();
  }

  // We use an utility function named "TestCondtions",
  // which is nicely written and encapsulates
  // the comparison logic in a clean and reusable way.
  // This will indeed facilitate the reuse of the logic
  // in other methods, promoting consistency and reducing
  // redundancy. This function is modified to be used
  // in the isBigger/Lesser/Equals as well as in the
  // methods in the form hasLength.

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
  isGreaterThan(a: number): validator {
    if (new validator(a).not.isNumber.answer) {
      errors.IncorrectArgumentInIsBiggerThan();
    }

    if (this.copy().isNumber.answer) {
      this.#question = models.TestCondition(
        this.value,
        undefined,
        a,
        "gt",
      ) as boolean;
    } else this.#question = false;

    return this.#set_answer();
  }

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
  isLessThan(a: number): validator {
    if (new validator(a).not.isNumber.answer) {
      errors.IncorrectArgumentInIsLesserThan();
    }

    if (this.copy().isNumber.answer) {
      this.#question = models.TestCondition(
        this.value,
        undefined,
        a,
        "lt",
      ) as boolean;
    } else this.#question = false;

    return this.#set_answer();
  }

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
  isGreaterThanOrEqual(a: number): validator {
    if (new validator(a).not.isNumber.answer) {
      errors.IncorrectArgumentInIsEqualOrBiggerThan();
    }

    if (this.copy().isNumber.answer) {
      this.#question = models.TestCondition(
        this.value,
        undefined,
        a,
        "geq",
      ) as boolean;
    } else this.#question = false;

    return this.#set_answer();
  }

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
  isLessThanOrEqual(a: number): validator {
    if (new validator(a).not.isNumber.answer) {
      errors.IncorrectArgumentInIsEqualOrLesserThan();
    }
    if (this.copy().isNumber.answer) {
      this.#question = models.TestCondition(
        this.value,
        undefined,
        a,
        "leq",
      ) as boolean;
    } else this.#question = false;

    return this.#set_answer();
  }

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
  isEqual(a: number): validator {
    if (new validator(a).not.isNumber.answer) {
      errors.IncorrectArgumentInIsEqual();
    }
    if (this.copy().isNumber.answer) {
      this.#question = models.TestCondition(
        this.value,
        undefined,
        a,
        "eq",
      ) as boolean;
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current validator instance
   * is not equal to some real number, "a".
   *
   * @param {number} a - The number which has to be tested.
   * @returns {validator} the updated validator instance with
   * "answer" property set to true or false based on the comparison.
   * @throws {Error} if "a" parameter is not a valid number.
   */
  isNotEqual(a: number): validator {
    if (new validator(a).not.isNumber.answer) {
      errors.IncorrectArgumentInIsNotEqual();
    }
    if (this.copy().isNumber.answer) {
      this.#question = models.TestCondition(
        this.value,
        undefined,
        a,
        "neq",
      ) as boolean;
    } else this.#question = false;

    return this.#set_answer();
  }

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
  isInRange(a: number, b: number): validator {
    if (new validator([a, b]).not.isNumberArray.answer) {
      errors.IncorrectArgumentsInIsInRange();
    }
    if (a >= b) errors.IncorrectArgumentsInIsInRange();
    this.#question = this.copy().isNumber.answer
      ? models.TestCondition(this.value, undefined, a, "gt") as boolean &&
        models.TestCondition(this.value, undefined, b, "lt") as boolean
      : false;

    return this.#set_answer();
  }

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
  isInClosedRange(a: number, b: number): validator {
    if (new validator([a, b]).not.isNumberArray.answer) {
      errors.IncorrectArgumentsInIsInClosedRange();
    }
    if (a >= b) errors.IncorrectArgumentsInIsInClosedRange();

    this.#question = this.copy().isNumber.answer
      ? models.TestCondition(this.value, undefined, a, "geq") as boolean &&
        models.TestCondition(this.value, undefined, b, "leq") as boolean
      : false;

    return this.#set_answer();
  }

  /**
   * Checks if the value property of the current
   * validator instance is a positive number.
   *
   * @returns {validator} The updated validator
   * instance with the answer property set to
   * true or false based on the comparison with zero.
   */
  get isPositive(): validator {
    if (this.copy().not.isNumber.answer) {
      if (this.show_warnings) warnings.IncorrectValueInIsPositive();
      this.#question = false;
    } else {
      this.#question = models.TestCondition(
        this.value,
        undefined,
        0,
        "geq",
      ) as boolean;
    }
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property is a number, which is
   * lesser than zero (negative number).
   *
   * @returns {validator} The updated validator instance
   * with the "answer" property to be true or false based
   * on the comparision with 0.
   */
  get isNegative(): validator {
    if (this.copy().not.isNumber.answer) {
      if (this.show_warnings) warnings.IncorrectValueInIsNegative();
      this.#question = false;
    } else {
      this.#question = models.TestCondition(
        this.value,
        undefined,
        0,
        "lt",
      ) as boolean;
    }

    return this.#set_answer();
  }
  /**
   * Checks if the "value" property is a positive integer.
   *
   * @returns {validator} The updated validator instance
   * with the "answer" property to be true or false based
   * on the comparison with 0.
   */
  get isPositiveInteger(): validator {
    if (this.copy().isInteger.answer) {
      this.#question = models.TestCondition(
        this.value,
        undefined,
        0,
        "geq",
      ) as boolean;
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property is integer, which is less than zero.
   *
   * @returns {validator} The updated validator instance with the
   * "answer" property to be set to true or false based on the
   * comparison with 0.
   */
  get isNegativeInteger(): validator {
    if (this.copy().isInteger.answer) {
      this.#question = models.TestCondition(
        this.value,
        undefined,
        0,
        "lt",
      ) as boolean;
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a number or if it is a string, which may be
   * converted to a number.
   *
   * @returns {validator} The updated validator property with
   * "answer" property set to true if the "value" is a number
   * or if it is a string which may be converted to a number.
   */
  get isConvertibleToNumber(): validator {
    this.#question = models.IsNumberLike(this.value);

    return this.#set_answer();
  }

  /**
   * Checks if the value property of the
   * current validator instance is an integer
   * or a string that may be converted
   * to an integer.
   *
   * @returns {validator} The updated current validator instance.
   */
  get isConvertibleToInteger(): validator {
    this.#question = models.IsIntegerLike(this.value);
    return this.#set_answer();
  }

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
  get isConvertibleToPositiveNumber(): validator {
    this.#question = models.IsPositiveNumberLike(this.value);

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property is a negative number or
   * a string which may be converted to a negative number.
   *
   * @returns {validator} the updated validator instance with
   * "answer" property set to true or false based on whether
   * the "value" property is a negative number or a string
   * which may be converted to a negative number.
   */
  get isConvertibleToNegativeNumber(): validator {
    this.#question = models.IsNegativeNumberLike(this.value);

    return this.#set_answer();
  }

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
  get isConvertibleToPositiveInteger(): validator {
    this.#question = models.IsPositiveIntegerLike(this.value);

    return this.#set_answer();
  }

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
  get isConvertibleToNegativeInteger(): validator {
    this.#question = models.IsNegativeIntegerLike(this.value);

    return this.#set_answer();
  }

  /**
   * Checks if the "value" of the current validator instance
   * is a primitive data type.
   *
   * @returns {validator} The updated current validator instance.
   * The "answer" property is set to true if the "value" is a primitive
   * type (string, number, bigInt, symbol, boolean, undefined, or null),
   * otherwise, it is set to false.
   */
  get isPrimitiveType(): validator {
    this.#question = this.copy()
      .isString
      .or.isNumber
      .or.isBigInt
      .or.isBoolean
      .or.isUndefined
      .or.isNull
      .or.isSymbol.answer;

    return this.#set_answer();
  }

  // Implementation of methods which tests the type of
  // reference data types in JavaScript.
  // First we will implement the methods of the family
  // "isArrayBuffer" which deals with buffers
  // and typed arrays.
  // Then we will implement the methods which are
  // related to the "isArray" family.
  // Finally we will implement the so called Object
  // methods (isObject, isFunction, isPromise etc)
  // as well as the utility methods (isSame, throwsErrorWith,
  // executeWith etc).

  /**
   * Checks if the "value" property of the current validator
   * instance is an ArrayBuffer data type in JavaScript.
   *
   * @returns {validator} The updated validator instance with
   * the "answer" property set to true or false based on the
   * type of the "value" property.
   */
  get isArrayBuffer(): validator {
    this.#question = models.CheckType(this.value, "ArrayBuffer");

    return this.#set_answer();
  }

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
  get isInt8Array(): validator {
    this.#question = models.CheckType(this.value, "Int8Array");

    return this.#set_answer();
  }

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
  get isUint8Array(): validator {
    this.#question = models.CheckType(this.value, "Uint8Array");

    return this.#set_answer();
  }

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
  get isUint8ClampedArray(): validator {
    this.#question = models.CheckType(this.value, "Uint8ClampedArray");

    return this.#set_answer();
  }

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
  get isInt16Array(): validator {
    this.#question = models.CheckType(this.value, "Int16Array");

    return this.#set_answer();
  }

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
  get isUint16Array(): validator {
    this.#question = models.CheckType(this.value, "Uint16Array");

    return this.#set_answer();
  }

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
  get isInt32Array(): validator {
    this.#question = models.CheckType(this.value, "Int32Array");

    return this.#set_answer();
  }

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
  get isUint32Array(): validator {
    this.#question = models.CheckType(this.value, "Uint32Array");

    return this.#set_answer();
  }

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
  get isIntegerTypedArray(): validator {
    this.#question = this.copy()
      .isInt8Array
      .or.isUint8Array
      .or.isUint8ClampedArray
      .or.isInt16Array
      .or.isUint16Array
      .or.isInt32Array
      .or.isUint32Array.answer;

    return this.#set_answer();
  }

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
  get isFloat32Array(): validator {
    this.#question = models.CheckType(this.value, "Float32Array");

    return this.#set_answer();
  }

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
  get isFloat64Array(): validator {
    this.#question = models.CheckType(this.value, "Float64Array");

    return this.#set_answer();
  }

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
  get isFloatTypedArray(): validator {
    this.#question = this.copy().isFloat32Array.or.isFloat64Array.answer;

    return this.#set_answer();
  }

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
  get isTypedArray(): validator {
    this.#question = models.IsTypedArray(this.value);

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is a generic array type in JavaScript.
   *
   * @returns {validator} The updated validator instance with "answer"
   * property set to true if the "value" is an array, false otherwise.
   */
  get isArray(): validator {
    this.#question = models.CheckType(this.value, "Array");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of boolean elements.
   *
   * @returns {validator} The updated validator instance with
   * the "answer" property set to true if the "value" is an array
   * of boolean elements and false otherwise.
   */
  get isBooleanArray(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsBooleanArray(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current
   * validator instance is an array of number elements.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * a number array, false otherwise.
   */
  get isNumberArray(): validator {
    const cp = this.copy();
    if (cp.isArray.answer) {
      this.#question = models.IsNumberArray(this.value);
    } else if (cp.isTypedArray.answer) {
      this.#question = !models.HasNaNInTypedArray(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current
   * validator instance is an array of integer numbers.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * an integer array, false otherwise.
   */
  get isIntegerArray(): validator {
    const copy = this.copy();
    if (copy.isArray.or.isFloatTypedArray.answer) {
      this.#question = models.IsIntegerArray(this.value);
    } else if (copy.isIntegerTypedArray.answer) {
      this.#question = !models.HasNaNInTypedArray(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of positive numbers.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * positive numeric array, false otherwise.
   */
  get isArrayOfPositiveNumbers(): validator {
    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfPositiveNumbers(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array whose elements are negative numbers.
   *
   * @returns {validator} The updated validator instance with
   * the "answer" property set to true if all the elements of
   * the "value" array are negative numbers.
   */
  get isArrayOfNegativeNumbers(): validator {
    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfNegativeNumbers(this.value);
    } else this.#question = false;
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of positive integers.
   *
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value"
   * is an array of positive integers.
   */
  get isArrayOfPositiveIntegers(): validator {
    const cp = this.copy();
    if (cp.isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfPositiveIntegers(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is an array of negative integer number elements.
   *
   * @returns {validator} The updated validator instance with the
   * "answer" property set to true if the "value" is an array of
   * negative integers.
   */
  get isArrayOfNegativeIntegers(): validator {
    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfNegativeIntegers(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

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
  isArrayOfNumbersInRange(a: number, b: number): validator {
    const isInputIncorrect = new validator([a, b]).not.isNumberArray
      .or.bind(
        new validator(a).isGreaterThanOrEqual(b),
      ).answer;

    if (isInputIncorrect) errors.IllegalParametersInIsArrayOfNumbersInRange();
    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfNumbersInRange(this.value, a, b);
    } else this.#question = false;

    return this.#set_answer();
  }

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
  isArrayOfNumbersInClosedRange(a: number, b: number): validator {
    const isInputIncorrect = new validator([a, b]).not.isNumberArray
      .or.bind(
        new validator(a).isGreaterThanOrEqual(b),
      ).answer;

    if (isInputIncorrect) {
      errors.IllegalParametersInIsArrayOfNumbersInClosedRange();
    }

    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfNumbersInClosedRange(this.value, a, b);
    } else this.#question = false;

    return this.#set_answer();
  }

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
  isArrayOfIntegersInRange(a: number, b: number): validator {
    const isInputIncorrect = new validator([a, b]).not.isIntegerArray
      .or.bind(
        new validator(a).isGreaterThanOrEqual(b),
      ).answer;

    if (isInputIncorrect) {
      errors.IllegalParametersInIsArrayOfIntegersInRange();
    }

    if (this.copy().not.isArray.and.not.isTypedArray.answer) {
      this.#question = false;
    } else this.#question = models.IsArrayOfIntegersInRange(this.value, a, b);

    return this.#set_answer();
  }

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
  isArrayOfIntegersInClosedRange(a: number, b: number): validator {
    const isInputIncorrect = new validator([a, b]).not.isNumberArray
      .or.bind(
        new validator(a).isGreaterThanOrEqual(b),
      ).answer;

    if (isInputIncorrect) {
      errors.IllegalParametersInIsArrayOfIntegersInClosedRange();
    }

    if (this.copy().isArray.or.isTypedArray.answer) {
      this.#question = models.IsArrayOfIntegersInClosedRange(this.value, a, b);
    } else this.#question = true;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of string elements.
   *
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value"
   * is array of string elements.
   */
  get isStringArray(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsStringArray(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of object elements.
   *
   * @returns {validator} The updated current validator instance
   * with "answer" property set to true if the "value" is an
   * array of object elements, false otherwise.
   */
  get isObjectArray(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsObjectArray(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array whoose elements are all functions.
   *
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value"
   * is an array of function components, false otherwise.
   */
  get isArrayOfFunctions(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfFunctions(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property is an array of arbitrary
   * array elements.
   *
   * @returns {validator} The updated validator instance
   * witht the "answer" property set to true if the "value"
   * porpeorty is an array of arbitrary array elements.
   */
  get isArrayOfArrays(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfArrays(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of arbitrary arrays with equal size.
   *
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value"
   * is an array of arrays and every element of the "value"
   * has the same length, false otherwise.
   */
  get isArrayOfArraysWithEqualSize(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfArraysWithEqualSize(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

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
  get isArrayOfNumberArrays(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfNumberArrays(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a numeric matrix.
   *
   * @returns {validator} The updated validator instance
   * with the "answer" property set to true if the "value"
   * is a numeric matrix, false otherwise.
   */
  get isArrayOfNumberArraysWithEqualSize(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfNumberArraysWithEqualSize(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array whoose elements are integer arrays
   * with arbitrary length.
   *
   * @returns {validator} The updated validator instance with
   * "answer" property set to true if the "value" is an array
   * of integer arrays, false otherwise.
   */
  get isArrayOfIntegerArrays(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfIntegerArrays(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an integer matrix.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * an array of integer arrays with equal size (integer matrix).
   */
  get isArrayOfIntegerArraysWithEqualSize(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfIntegerArraysWithEqualSize(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

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
  get isArrayOfTypedArrays(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfTypedArrays(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current
   * validator instance is a typed matrix.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value"
   * is an typed matrix, false otherwise.
   */
  get isArrayOfTypedArraysWithEqualSize(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfTypedArraysWithEqualSize(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

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
  get isArrayOfAbstractArrays(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfAbstractArrays(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

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
  get isArrayOfAbstractArraysWithEqualSize(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfAbstractArraysWithEqualSize(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an array of string arrays with arbitrary length.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * an array of string arrays with arbitrary length, false otherwise.
   */
  get isArrayOfStringArrays(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfStringArrays(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a string matrix.
   *
   * @returns {validator} The updated validator isntance
   * with "answer" property set to true if the "value" is
   * a string matrix, false otherwies.
   */
  get isArrayOfStringArraysWithEqualSize(): validator {
    if (this.copy().isArray.answer) {
      this.#question = models.IsArrayOfStringArraysWithEqualSize(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current
   * validator instance is an array of object arrays
   * with arbitrary length.
   *
   * @returns {validator} The updated validator instances
   * with "answer" property set to true if the "value" is
   * an array of object arrays, false otherwise.
   */
  get isArrayOfObjectArrays(): validator {
    if (this.copy().not.isArray.answer) this.#question = false;
    else this.#question = models.IsArrayOfObjectArrays(this.value);

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a matrix of object elements.
   *
   * @returns {validator} The updated validator instance with
   * "answer" property set to true if the "value"is an matrix of
   * object elements, false otherwise.
   */
  get isArrayOfObjectArraysWithEqualSize(): validator {
    if (this.copy().not.isArray.answer) this.#question = false;
    else this.#question = models.IsArrayOfObjectArraysWithEqualSize(this.value);

    return this.#set_answer();
  }

  // Methods for more abstract data types.
  // Methods for validation of Objects,
  // maps, sets, functions, asyncronous
  // functions, generators, promises,
  // errors and instances.

  /**
   * Checks if the "value" property of the current validator
   * instance is an object.
   *
   * @returns {validator} The updated current validator instance
   * with the "answer" property set to true if the "value" is an
   * object type, false otherwise.
   */
  get isObject(): validator {
    this.#question = models.CheckType(this.value, "Object");
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is a Map data type in JavaScript.
   *
   * @returns {validator} The updated current validator instance
   * with "answer" property set to true if the "value" is a Map
   * data type, false otherwise.
   */
  get isMap(): validator {
    this.#question = models.CheckType(this.value, "Map");
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a Set data type in JavaScript.
   *
   * @returns {validator} The updated current validator instance
   * with "answer" property set to true if the "value" is a Set,
   * false otherwise.
   */
  get isSet(): validator {
    this.#question = models.CheckType(this.value, "Set");
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a Function data type in JavaScript.
   *
   * @returns {validator} The updated validator instance with
   * "answer" property set to true if the "value" is a Function,
   * false otherwise.
   */
  get isFunction(): validator {
    this.#question = models.CheckType(this.value, "Function");
    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an asynchronous function.
   *
   * @returns {validator} The updated current validator instance
   * with "answer" property set to true if the "value" is an
   * asynchronous function, false otherwise.
   */
  get isAsync(): validator {
    this.#question = models.CheckType(this.value, "AsyncFunction");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is a Generator or GeneratorFunction in JavaScript.
   *
   * @returns {validator} The updated current validator instance
   * with "answer" property set to true if the "value" is a Generator
   * or Generator function, false otherwise.
   */
  get isGenerator(): validator {
    this.#question = models.CheckType(this.value, "GeneratorFunction") ||
      models.CheckType(this.value, "Generator");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator instance
   * is a Promise in JavaScript.
   *
   * @returns {validator} The updated current validator instance
   * with "answer" property set to true if the "value" is a Promise,
   * false otherwise.
   */
  get isPromise(): validator {
    this.#question = models.CheckType(this.value, "Promise");

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current validator
   * instance is an Error object.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * an Error object in JavaScript, false otherwise.
   */
  get isError(): validator {
    this.#question = models.CheckType(this.value, "Error");

    return this.#set_answer();
  }

  /**
   * Checks if the value
   * property of the current validator instance is
   * valid date data type in JavaScript.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * a date type, false otherwise.
   */
  get isDate(): validator {
    this.#question = models.CheckType(this.value, "Date")
      ? this.value.toString() !== "Invalid Date"
      : false;

    return this.#set_answer();
  }

  /**
   * Checks if the "value" property of the current
   * validator instance is a valid email.
   *
   * @returns {validator} The updated validator instance
   * with "answer" property set to true if the "value" is
   * a valid email, false otherwise.
   */
  get isEmail(): validator {
    if (this.copy().isString.answer) {
      this.#question = models.IsValidEmail(this.value);
    } else this.#question = false;

    return this.#set_answer();
  }

  // Higher order utility methods.
  // Implementation of methods which
  // are realated with more than one
  // data types or classes and which
  // allows as to extract information
  // for properties of generalized and
  // abstract objects.
  // The methods which we will be implemented
  // are isInstanceOf, hasLength, hasLengthLessThan,
  // hasLengthGreaterThan, hasLengthLessThanOrEqualTo,
  // hasLengthGreaterThanOrEqualTo, hasLengthInRange,
  // hasLengthInClosedRange, isEmpty (may be applied
  // on different data types as strings, arrays, objects,
  // array buffers, typed arrays, sets and maps among all),
  // forEvery, forAny, isArrayAndForEvery, isArrayAndForAny,
  // isSame, isSameWithAnyOf, bind and interface methods.

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
  isInstanceof(instance: any | string): validator {
    if (models.IsInstanceType(instance)) {
      this.#question = models.IsInstanceof(this.value, instance);
    } else if (typeof instance === "string") {
      this.#question = new validator((a: any) =>
        a.constructor.name === instance
      )
        .executeWith(this.value).value;
    } else errors.IncorrectArgumentInIsInstanceof();

    return this.#set_answer();
  }

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
  hasLength(n: number): validator {
    if (Number.isInteger(n)) n = Number(n);
    else errors.IncorrectArgumentInHasLength();
    let cp_instance = this.copy();
    if (cp_instance.isArray.or.isTypedArray.or.isString.answer) {
      this.#question = models.TestCondition(this.value, "length", n);
    } else if (cp_instance.isObject.answer) {
      this.#question = models.TestCondition(
        Object.keys(cp_instance.value),
        "length",
        n,
      );
    } else if (cp_instance.isArrayBuffer.answer) {
      this.#question = models.TestCondition(this.value, "byteLength", n);
    } else if (cp_instance.isMap.or.isSet.answer) {
      this.#question = models.TestCondition(this.value, "size", n);
    } else this.#question = false;

    return this.#set_answer();
  }

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
  hasLengthGreaterThan(n: number): validator {
    if (Number.isInteger(n)) n = Number(n);
    else errors.IncorrectArgumentInHasLengthBiggerThan();
    let cp_instance = this.copy();
    if (cp_instance.isArrayBuffer.answer) {
      this.#question = models.TestCondition(this.value, "byteLength", n, "gt");
    } else if (cp_instance.isArray.or.isTypedArray.or.isString.answer) {
      this.#question = models.TestCondition(this.value, "length", n, "gt");
    } else if (cp_instance.isObject.answer) {
      this.#question = models.TestCondition(
        Object.keys(cp_instance.value),
        "length",
        n,
        "gt",
      );
    } else if (cp_instance.isSet.or.isMap.answer) {
      this.#question = models.TestCondition(this.value, "size", n, "gt");
    } else this.#question = false;

    return this.#set_answer();
  }

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
  hasLengthEqualsOrGreaterThan(n: number): validator {
    if (Number.isInteger(n)) n = Number(n);
    else errors.IncorrectArgumentInHasLengthEqualsOrBiggerThan();
    let cp_instance = this.copy();
    if (cp_instance.isArrayBuffer.answer) {
      this.#question = models.TestCondition(this.value, "byteLength", n, "geq");
    } else if (cp_instance.isArray.or.isTypedArray.or.isString.answer) {
      this.#question = models.TestCondition(this.value, "length", n, "geq");
    } else if (cp_instance.isObject.answer) {
      this.#question = models.TestCondition(
        Object.keys(cp_instance.value),
        "length",
        n,
        "geq",
      );
    } else if (cp_instance.isSet.or.isMap.answer) {
      this.#question = models.TestCondition(this.value, "size", n, "geq");
    } else this.#question = false;

    return this.#set_answer();
  }

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
  hasLengthLessThan(n: number): validator {
    if (Number.isInteger(n)) n = Number(n);
    else errors.IncorrectArgumentInHasLengthLesserThan();
    let cp_instance = this.copy();
    if (cp_instance.isArrayBuffer.answer) {
      this.#question = models.TestCondition(this.value, "byteLength", n, "lt");
    } else if (cp_instance.isArray.or.isTypedArray.or.isString.answer) {
      this.#question = models.TestCondition(this.value, "length", n, "lt");
    } else if (cp_instance.isObject.answer) {
      this.#question = models.TestCondition(
        Object.keys(cp_instance.value),
        "length",
        n,
        "lt",
      );
    } else if (cp_instance.isSet.or.isMap.answer) {
      this.#question = models.TestCondition(this.value, "size", n, "lt");
    } else this.#question = false;

    return this.#set_answer();
  }

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
  hasLengthEqualsOrLessThan(n: number): validator {
    if (Number.isInteger(n)) n = Number(n);
    else errors.IncorrectArgumentInHasLengthEqualsOrLesserThan();
    let cp_instance = this.copy();
    if (cp_instance.isArrayBuffer.answer) {
      this.#question = models.TestCondition(this.value, "byteLength", n, "leq");
    } else if (cp_instance.isArray.or.isTypedArray.or.isString.answer) {
      this.#question = models.TestCondition(this.value, "length", n, "leq");
    } else if (cp_instance.isObject.answer) {
      this.#question = models.TestCondition(
        Object.keys(cp_instance.value),
        "length",
        n,
        "leq",
      );
    } else if (cp_instance.isSet.or.isMap.answer) {
      this.#question = models.TestCondition(this.value, "size", n, "leq");
    } else this.#question = false;

    return this.#set_answer();
  }

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
  hasLengthInRange(a: number, b: number): validator {
    if (Number.isInteger(a) && Number.isInteger(b)) {
      a = Number(a);
      b = Number(b);
      if (a >= b) errors.IncorrectArgumentsInHasLengthInRange();
    } else errors.IncorrectArgumentsInHasLengthInRange();
    let cp_instance = this.copy();
    if (cp_instance.isArray.or.isString.answer) {
      this.#question = this.value.length > a && this.value.length < b;
    } else if (cp_instance.isObject.answer) {
      const len = Object.keys(cp_instance.value).length;
      this.#question = len > a && len < b;
    } else this.#question = false;
    return this.#set_answer();
  }

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
  hasLengthInClosedRange(a: number, b: number): validator {
    if (Number.isInteger(a) && Number.isInteger(b)) {
      a = Number(a);
      b = Number(b);
      if (a >= b) errors.IncorrectArgumentsInHasLengthInClosedRange();
    } else errors.IncorrectArgumentsInHasLengthInClosedRange();
    let cp_instance = this.copy();
    if (cp_instance.isArray.or.isString.answer) {
      this.#question = this.value.length >= a && this.value.length <= b;
    } else if (cp_instance.isObject.answer) {
      const len = Object.keys(cp_instance.value).length;
      this.#question = len >= a && len <= b;
    } else this.#question = false;
    return this.#set_answer();
  }

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
  get isEmpty(): validator {
    const test = this.copy();
    if (test.isUndefined.or.isNull.answer) {
      this.#question = true;
    } else if (
      test
        .isArray
        .or.isArrayBuffer
        .or.isMap
        .or.isObject
        .or.isSet
        .or.isString
        .or.isTypedArray
    ) this.#question = test.hasLength(0).answer;
    else errors.IncorrectArgumentInIsEmpty();

    return this.#set_answer();
  }

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
  forEvery(
    callback: (v: validator, index: number | string) => validator,
  ): validator {
    // initialization
    const val = this.copy();
    const callback_val = new validator(callback);

    if (callback_val.not.isFunction.answer) {
      errors.IncorrectFunctionArgumentInForAll();
    }

    if (val.not.isEmpty.answer) {
      if (val.isArray.answer) {
        this.#question = models.ForEveryArrayEdition(val.value, callback);
      } else if (val.isObject.answer) {
        this.#question = models.ForEveryObjectEdition(val.value, callback);
      } else if (val.isSet.answer) {
        this.#question = models.ForEverySetEdition(val.value, callback);
      } else if (val.isMap.answer) {
        this.#question = models.ForEveryMapEdition(this.value, callback);
      } else this.#question = false;
    } else this.#question = false;

    return this.#set_answer();
  }

  /**
   * Iterates through the elements of the current
   * validator's "value" property and checks if the
   * provided callback function returns a "truthy"
   * validator instance for any of the elements.
   *
   * @param {function(validator, number | string): validator} callback - A
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
  forAny(
    callback: (v: validator, index: number | string) => validator,
  ): validator {
    const val = this.copy();
    const callbackIsNotFunction = new validator(callback).not.isFunction.answer;

    if (callbackIsNotFunction) {
      errors.IncorrectFunctionArgumentInForAny();
    }

    if (val.not.isEmpty.answer) {
      if (val.isArray.or.isTypedArray.answer) {
        this.#question = models.ForAnyArrayEdition(val.value, callback);
      } else if (val.isObject.answer) {
        this.#question = models.ForAnyObjectEdition(val.value, callback);
      } else if (val.isSet.answer) {
        this.#question = models.ForAnySetEdition(this.value, callback);
      } else if (val.isMap.answer) {
        this.#question = models.ForAnyMapEdition(this.value, callback);
      } else this.#question = false;
    } else this.#question = false;

    return this.#set_answer();
  }

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
  isArrayAndForEvery(
    callback: (v: validator, index: number) => validator,
  ): validator {
    if (new validator(callback).not.isFunction.answer) {
      errors.IncorrectFunctionArgumentInForAll();
    }
    if (this.copy().isArray.answer) {
      this.#question = models.ForEveryArrayEdition(this.value, callback);
    } else this.#question = false;

    return this.#set_answer();
  }

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
  isArrayAndForAny(
    callback: (v: validator, index: number) => validator,
  ): validator {
    if (new validator(callback).not.isFunction.answer) {
      errors.IncorrectFunctionArgumentInForAny();
    }
    if (this.copy().isArray.answer) {
      this.#question = models.ForAnyArrayEdition(this.value, callback);
    } else this.#question = false;

    return this.#set_answer();
  }

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
  interface(
    params: { [prop: string]: (v: validator) => validator },
  ): validator {
    const p = new validator(params);
    const areValueAndParamsCorrect = p.isObject && this.copy().isObject.answer;
    this.#question = false;

    if (areValueAndParamsCorrect) {
      const isParamsCorrect = p.forEvery((parameter) =>
        parameter.isFunction
      ).answer;
      if (isParamsCorrect) {
        for (let key of Object.keys(params)) {
          this.#question = params[key](new validator(this.value[key])).answer;
          if (new validator(this.#question).not.isBoolean.answer) {
            errors.IncorrectArgumentInInterface();
          }
          if (!this.#question) return this.#set_answer();
        }
      }
    }

    return this.#set_answer();
  }

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
  isSame(param: any): validator {
    const v = new validator(param);
    const t = this.copy();

    if (t.isPrimitiveType.answer) {
      if (v.isPrimitiveType.answer) {
        this.#question = String(this.value) === String(param);
      } else this.#question = false;
    } else if (t.isFunction.or.isAsync.or.isGenerator.answer) {
      if (v.isFunction.or.isAsync.or.isGenerator.answer) {
        this.#question = this.value.toString() === param.toString();
      } else this.#question = false;
    } else if (t.isArray.or.isTypedArray.or.isObject.answer) {
      if (v.isArray.or.isTypedArray.or.isObject.answer) {
        this.#question = t.forEvery((item, index) =>
          item.isSame(param[index])
        ).answer;
      } else this.#question = false;
    } else if (t.isArrayBuffer.answer) {
      if (v.isArrayBuffer.answer) {
        const tf64 = new validator(new Float64Array(this.value));
        const vf64 = new Float64Array(v.value);
        this.#question = tf64.forEvery((item, index) =>
          item.isSame(vf64[index as number])
        ).answer;
      } else this.#question = false;
    } else errors.InappropriateValueInIsSame();

    return this.#set_answer();
  }

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
  isSameWithAny(arrParam: any): validator {
    let i, j;
    const t = this.copy();
    const isArrayLike = new validator(arrParam).isArray.or.isTypedArray.answer;
    this.#question = false;

    if (isArrayLike) {
      const n = arrParam.length;
      for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (
          (t.isSame(arrParam[j]).answer) ||
          (t.isSame(arrParam[j + 1]).answer) ||
          (t.isSame(arrParam[j + 2]).answer) ||
          (t.isSame(arrParam[j + 3]).answer)
        ) {
          this.#question = true;
          return this.#set_answer();
        }
      }

      j = i << 2;
      for (; j < n; j++) {
        if (t.isSame(arrParam[j]).answer) {
          this.#question = true;
          return this.#set_answer();
        }
      }
    }

    return this.#set_answer();
  }

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
  bind(otherValidator: validator): validator {
    if (!(otherValidator instanceof validator)) {
      errors.IncorrectArgumentInBindMethod();
    }
    this.#question = otherValidator.answer;

    return this.#set_answer();
  }

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
  on(state: boolean, callback: (v: validator) => void): validator {
    let incorrectState = new validator(state)
      .not.isBoolean.and.not.isSame("true")
      .and.not.isSame("false").answer;
    let incorrectFunction = new validator(callback)
      .not.isFunction.answer;

    if (!incorrectState && !incorrectFunction) {
      if (state === this.answer) {
        callback(this);
      }
    } else if (incorrectFunction) {
      if (this.show_warnings) warnings.IncorrectFunctionInOnMethod();
    } else if (incorrectState) {
      if (this.show_warnings) warnings.IncorrectStateInOnMethod();
    }

    return this;
  }

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
  executeWith(...params: any[]): validator {
    if (this.copy().isFunction.answer) {
      try {
        this.#value = this.copy().value(...params);
      } catch (error) {
        this.#value = error;
      }
    } else if (this.copy().isAsync.answer) {
      let response = null;
      const obtainResponse = async () => {
        try {
          response = await this.copy().value(...params);
        } catch (error) {
          response = error;
        }
        return response;
      };
      this.#value = obtainResponse();
    } else if (this.show_warnings) {
      warnings.IncorrectTypeInExecuteWith();
    }

    return this;
  }

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
  throwsErrorWith(...params: any[]): validator {
    let value = null;
    try {
      value = this.copy().executeWith(...params).value;
    } catch (error) {
      value = error;
    }
    this.#question = models.CheckType(value, "Error");

    return this.#set_answer();
  }

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
  benchmark(
    f: BenchmarkCallback,
    iterations: number = 100,
  ): { mean: number; std: number; iterations: number } {
    if (new validator(iterations).not.isInteger.answer) {
      errors.IncorrectIterationsParameterInBenchmark();
    }
    return models.Benchmark(this.value, f, iterations);
  }

  /**
   * Prints the description message of the current
   * validator instance with green color if the "answer"
   * property is true and with red color if the "answer"
   * property is false.
   * if the "answer" property is not boolean, then no
   * messages will be printed.
   *
   * @param {{
   *   title?: boolean,
   *   success?: string,
   *   error?: string,
   *   background: string,
   *   textColor: string
   * }} options
   * @returns {validator} The current validator property.
   */
  test(
    options: {
      title?: boolean;
      success?: string;
      error?: string;
      background?: string;
      textColor?: string;
    } = {
      title: false,
    },
  ): validator {
    const {
      title,
      success = "green",
      error = "red",
      background = "rgb(66,55,233)",
      textColor = "rgb(10, 10, 10)",
    } = {
      ...options,
    };
    if (title) {
      new message()
        .bold.underline
        .setColor(textColor)
        .setBgColor(background)
        .append(this.description)
        .reset.log();
    } else {this
        .on(true, () => {
          new message().bold.italic.setColor(success)
            .appendCheckMark
            .append(" " + this.description)
            .reset.log();
        })
        .on(false, () => {
          new message().bold.italic
            .setColor(error)
            .appendWarningSign
            .append(" " + this.description).reset.log();
        });}
    return this;
  }
}
