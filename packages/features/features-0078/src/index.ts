// @stress/features-0078
import { base as b0 } from '@stress/core-0003';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/core-0087';
export const name = 'features-0078';
export const base = 423;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
