// @stress/features-0103
import { base as b0 } from '@stress/core-0003';
import { base as b1 } from '@stress/core-0004';
export const name = 'features-0103';
export const base = 24;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export * from './util';
export default compute;
