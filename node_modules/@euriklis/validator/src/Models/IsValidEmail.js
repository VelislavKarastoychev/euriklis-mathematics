"use strict";
/** 
 * Checks if the parameter of the function is
 * a valid email.
 *
 * @param {string} email - a string which have to be
 * tested if is valid email.
 * @returns {boolean} True if the parameter is a
 * valid email, false otherwise.
 */
export const IsValidEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  return emailRegex.test(email);
}
