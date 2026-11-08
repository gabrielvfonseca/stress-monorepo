// @stress/features-0005
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0089';
import { base as b2 } from '@stress/libs-0143';
export const name = 'features-0005';
export const base = 894;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export * from './util';
export default compute;
