// @stress/libs-0070
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0002';
export const name = 'libs-0070';
export const base = 662;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
