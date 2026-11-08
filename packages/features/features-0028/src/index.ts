// @stress/features-0028
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0002';
import { base as b2 } from '@stress/libs-0120';
export const name = 'features-0028';
export const base = 271;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
