// @stress/features-0098
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0001';
export const name = 'features-0098';
export const base = 39;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
