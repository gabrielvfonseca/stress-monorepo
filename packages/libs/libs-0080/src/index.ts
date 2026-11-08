// @stress/libs-0080
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0002';
import { base as b2 } from '@stress/core-0021';
export const name = 'libs-0080';
export const base = 796;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
