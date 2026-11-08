// @stress/features-0137
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0002';
export const name = 'features-0137';
export const base = 743;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
