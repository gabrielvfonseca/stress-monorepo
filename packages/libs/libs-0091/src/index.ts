// @stress/libs-0091
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/core-0027';
export const name = 'libs-0091';
export const base = 687;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
