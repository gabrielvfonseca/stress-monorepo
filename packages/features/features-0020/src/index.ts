// @stress/features-0020
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0092';
import { base as b2 } from '@stress/core-0061';
export const name = 'features-0020';
export const base = 716;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
