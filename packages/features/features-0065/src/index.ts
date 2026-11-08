// @stress/features-0065
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0001';
import { base as b2 } from '@stress/core-0004';
export const name = 'features-0065';
export const base = 403;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
