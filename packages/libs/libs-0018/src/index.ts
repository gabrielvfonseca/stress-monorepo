// @stress/libs-0018
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0001';
export const name = 'libs-0018';
export const base = 470;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
