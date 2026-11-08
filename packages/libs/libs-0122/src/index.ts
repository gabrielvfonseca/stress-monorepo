// @stress/libs-0122
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0002';
import { base as b2 } from '@stress/core-0004';
export const name = 'libs-0122';
export const base = 646;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
