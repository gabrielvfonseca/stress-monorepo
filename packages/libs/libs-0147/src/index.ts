// @stress/libs-0147
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0002';
import { base as b2 } from '@stress/core-0004';
export const name = 'libs-0147';
export const base = 652;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
