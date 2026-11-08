// @stress/features-0135
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/libs-0029';
export const name = 'features-0135';
export const base = 712;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
