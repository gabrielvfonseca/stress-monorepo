// @stress/features-0108
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/libs-0068';
import { base as b3 } from '@stress/core-0039';
export const name = 'features-0108';
export const base = 590;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;
