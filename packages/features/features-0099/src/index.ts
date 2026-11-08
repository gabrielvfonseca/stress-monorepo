// @stress/features-0099
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0004';
export const name = 'features-0099';
export const base = 995;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
