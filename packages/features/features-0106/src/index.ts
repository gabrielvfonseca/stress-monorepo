// @stress/features-0106
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0003';
import { base as b2 } from '@stress/core-0004';
import { base as b3 } from '@stress/libs-0105';
export const name = 'features-0106';
export const base = 977;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;
