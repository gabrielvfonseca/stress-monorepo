// @stress/features-0025
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/libs-0006';
import { base as b3 } from '@stress/libs-0169';
export const name = 'features-0025';
export const base = 873;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;
