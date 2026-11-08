// @stress/apps-0069
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0003';
import { base as b2 } from '@stress/core-0037';
import { base as b3 } from '@stress/core-0095';
export const name = 'apps-0069';
export const base = 746;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;
