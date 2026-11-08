// @stress/libs-0113
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/core-0065';
export const name = 'libs-0113';
export const base = 758;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
