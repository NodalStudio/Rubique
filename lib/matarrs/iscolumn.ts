import type { matrix } from "../types.d.ts";
import ismatrix from "../datatype/ismatrix.ts";

/**
 * Checks if the input is a column vector.
 *
 * Returns `true` if the input matrix is a column vector, meaning it has more than one row and exactly one column.
 *
 * @param x The input matrix to check.
 * @returns Returns `true` if `x` is a column vector, otherwise `false`.
 * @throws If the input is not a valid matrix or if no argument is provided.
 *
 * @example
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * // Example 1: Valid column vector
 * assertEquals(iscolumn([[2], [2]]), true);
 *
 * // Example 2: Row vector (not a column vector)
 * assertEquals(iscolumn([[2, 2]]), false);
 *
 * // Example 3: Column vector with multiple rows
 * assertEquals(iscolumn([[1], [2], [3]]), true);
 *
 * // Example 4: Square matrix (not a column vector)
 * assertEquals(iscolumn([[1, 2], [3, 4]]), false);
 *
 * // Example 5: Single-element column vector
 * assertEquals(iscolumn([[1]]), true);
 *
 * // Example 6: Invalid input (not a matrix)
 * assertThrows(() => iscolumn(5), "Input must be a non-empty matrix");
 *
 * // Example 7: Empty matrix (should throw an error)
 * assertThrows(() => iscolumn([]), "Input must be a non-empty matrix");

 * ```*/
export default function iscolumn(x: unknown): x is matrix {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (!ismatrix(x)) {
    throw new Error("Input must be a non-empty matrix (array of arrays)");
  }

  const nrows = x.length;
  const ncols = x[0].length;

  return nrows >= 1 && ncols === 1;
}
