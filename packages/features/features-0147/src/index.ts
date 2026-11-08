// @stress/features-0147
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/libs-0174';
export const name = 'features-0147';
export const base = 320;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
