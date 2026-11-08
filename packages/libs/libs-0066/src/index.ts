// @stress/libs-0066
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0001';
import { base as b2 } from '@stress/core-0003';
export const name = 'libs-0066';
export const base = 934;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;

// note 166
