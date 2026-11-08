// @stress/features-0003
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0003';
export const name = 'features-0003';
export const base = 89;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
