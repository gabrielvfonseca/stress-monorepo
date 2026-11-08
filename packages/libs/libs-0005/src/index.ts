// @stress/libs-0005
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0003';
export const name = 'libs-0005';
export const base = 117;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export * from './util';
export default compute;
