// @stress/features-0039
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0002';
import { base as b2 } from '@stress/core-0003';
import { base as b3 } from '@stress/libs-0025';
export const name = 'features-0039';
export const base = 773;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;
