// @stress/features-0129
import { base as b0 } from '@stress/libs-0081';
import { base as b1 } from '@stress/libs-0115';
export const name = 'features-0129';
export const base = 512;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
