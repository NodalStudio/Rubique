import { erfc } from "../../index.ts";

/**
 * Inverse complementary error function.
 *
 * Computes the inverse of the complementary error function.
 *
 * It satisfies `y = erfc(x)` for `0 ≤ y ≤ 2` with `-∞ ≤ x ≤ ∞`.
 *
 * @param y A real value in the range [2, 0]
 * @returns The value of the inverse complementary error function
 * @throws If the input is out of range
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Compute the inverse complementary error function for a value less than 1
 * assertEquals(erfcinv(1.5), -0.476936236121904);
 *
 * // Example 2: Compute the inverse complementary error function for a value greater than 1
 * assertEquals(erfcinv(0.5), 0.476936236121904);
 *
 * // Example 3: Compute the inverse complementary error function for 1
 * assertEquals(erfcinv(1), 0);
 *
 * // Example 4: Compute the inverse complementary error function for 2 (should return negative infinity)
 * assertEquals(erfcinv(2), -Infinity);
 *
 * // Example 5: Compute the inverse complementary error function for 0 (should return positive infinity)
 * assertEquals(erfcinv(0), Infinity);

 * ```*/
export default function erfcinv(y: number): number {
  if (y >= 2) return -Infinity;
  if (y === 1) return 0;
  if (y <= 0) return Infinity;

  let z = 0;
  const _y = y < 1 ? y : 2 - y;
  const t = Math.sqrt(-2 * Math.log(_y / 2));
  let x =
    -0.70711 *
    ((2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t);

  for (let i = 0; i < 2; i++) {
    z = erfc(x) - _y;
    x += z / (1.128379167095512 * Math.exp(-x * x) - x * z);
  }

  return y < 1 ? x : -x;
}
