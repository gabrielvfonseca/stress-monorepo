// @stress/features-0014
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0001';
import { base as b2 } from '@stress/core-0003';
import { base as b3 } from '@stress/core-0074';
import { base as b4 } from '@stress/libs-0012';
export const name = 'features-0014';
export const base = 864;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4) + input;
}
export default compute;
