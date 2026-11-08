// @stress/features-0026
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0003';
import { base as b2 } from '@stress/core-0004';
import { base as b3 } from '@stress/core-0090';
import { base as b4 } from '@stress/core-0087';
export const name = 'features-0026';
export const base = 410;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4) + input;
}
export * from './util';
export default compute;
