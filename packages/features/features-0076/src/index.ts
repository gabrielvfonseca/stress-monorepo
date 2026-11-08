// @stress/features-0076
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0004';
export const name = 'features-0076';
export const base = 986;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
