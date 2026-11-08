// @stress/libs-0125
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0002';
export const name = 'libs-0125';
export const base = 790;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
