// @stress/libs-0120
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0003';
import { base as b2 } from '@stress/core-0004';
import { base as b3 } from '@stress/core-0036';
export const name = 'libs-0120';
export const base = 991;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;

// note 220
