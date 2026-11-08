// @stress/features-0013
import { base as b0 } from '@stress/core-0003';
import { base as b1 } from '@stress/core-0004';
export const name = 'features-0013';
export const base = 27;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
