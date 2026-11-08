// @stress/features-0117
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/libs-0152';
export const name = 'features-0117';
export const base = 795;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export * from './util';
export default compute;
