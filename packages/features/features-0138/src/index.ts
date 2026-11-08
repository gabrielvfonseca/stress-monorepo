// @stress/features-0138
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0001';
import { base as b2 } from '@stress/libs-0115';
export const name = 'features-0138';
export const base = 435;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export * from './util';
export default compute;
