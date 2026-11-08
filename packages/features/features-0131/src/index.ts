// @stress/features-0131
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0012';
export const name = 'features-0131';
export const base = 732;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export * from './util';
export default compute;
