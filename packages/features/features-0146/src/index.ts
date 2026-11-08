// @stress/features-0146
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0089';
export const name = 'features-0146';
export const base = 344;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
