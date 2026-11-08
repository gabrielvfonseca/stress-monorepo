// @stress/features-0144
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/libs-0124';
export const name = 'features-0144';
export const base = 903;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
