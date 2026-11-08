// @stress/features-0043
import { base as b0 } from '@stress/libs-0108';
import { base as b1 } from '@stress/libs-0013';
export const name = 'features-0043';
export const base = 8;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
