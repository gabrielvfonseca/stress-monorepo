// @stress/libs-0031
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0001';
import { base as b2 } from '@stress/core-0004';
import { base as b3 } from '@stress/core-0043';
export const name = 'libs-0031';
export const base = 470;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;
