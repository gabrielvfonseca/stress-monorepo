// @stress/libs-0082
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0002';
import { base as b2 } from '@stress/core-0003';
export const name = 'libs-0082';
export const base = 744;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export * from './util';
export default compute;
