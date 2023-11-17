"use strict";
/**
 * Implements the IsError utility function which checks if the "value" property is error type.
 * The function is used in the isError method of the validator library.
 * @param {Error} value - the current validator instance.
 * @param {boolean} error - the private flag error, which is set to true, when this error is thrown.
 * @returns {boolean} if the value is Error type and is not trhown, then returns true, otherwise returns false.
 **/
export const IsError = (value, error) => {
  return value instanceof Error && !error;
}
