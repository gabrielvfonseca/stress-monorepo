// @stress/features-0139
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0001';
import { base as b2 } from '@stress/core-0003';
import { base as b3 } from '@stress/core-0055';
import { base as b4 } from '@stress/libs-0143';
export const name = 'features-0139';
export const base = 584;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4) + input;
}
export default compute;
