"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNumberLike = void 0;
/**
 * Tests if the value property is number or string which can be transformed to number.
 * Utility function for isNumberLike method.
 * @param {any | number | string} value
 * @returns {boolean}
 */
const IsNumberLike = (value) => typeof value === "number" ||
    (typeof value === "string" && !Number.isNaN(Number(value)));
exports.IsNumberLike = IsNumberLike;
