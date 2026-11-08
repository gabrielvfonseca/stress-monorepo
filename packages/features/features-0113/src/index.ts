// @stress/features-0113
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0002';
import { base as b2 } from '@stress/libs-0026';
import { base as b3 } from '@stress/libs-0002';
export const name = 'features-0113';
export const base = 258;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;
