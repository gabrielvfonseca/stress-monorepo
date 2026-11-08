// @stress/features-0132
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0001';
import { base as b2 } from '@stress/core-0002';
import { base as b3 } from '@stress/core-0096';
import { base as b4 } from '@stress/libs-0034';
export const name = 'features-0132';
export const base = 716;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4) + input;
}
export default compute;
