// @stress/features-0100
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0004';
export const name = 'features-0100';
export const base = 428;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
