// @stress/libs-0021
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0001';
import { base as b2 } from '@stress/core-0002';
import { base as b3 } from '@stress/core-0003';
export const name = 'libs-0021';
export const base = 415;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;
