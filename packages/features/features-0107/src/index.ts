// @stress/features-0107
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/core-0068';
import { base as b3 } from '@stress/libs-0070';
export const name = 'features-0107';
export const base = 75;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;
