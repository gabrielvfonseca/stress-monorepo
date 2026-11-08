// @stress/features-0122
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0003';
import { base as b2 } from '@stress/core-0004';
import { base as b3 } from '@stress/libs-0026';
export const name = 'features-0122';
export const base = 362;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;
