// @stress/features-0140
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0004';
export const name = 'features-0140';
export const base = 165;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
