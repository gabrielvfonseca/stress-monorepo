// @stress/apps-0062
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0003';
import { base as b2 } from '@stress/libs-0067';
import { base as b3 } from '@stress/libs-0007';
import { base as b4 } from '@stress/features-0111';
import { base as b5 } from '@stress/libs-0152';
export const name = 'apps-0062';
export const base = 778;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4 + b5) + input;
}
export default compute;
