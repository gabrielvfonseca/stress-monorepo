// @stress/libs-0039
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0003';
import { base as b2 } from '@stress/core-0004';
export const name = 'libs-0039';
export const base = 953;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
