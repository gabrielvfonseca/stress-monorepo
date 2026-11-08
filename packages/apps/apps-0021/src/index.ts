// @stress/apps-0021
import { base as b0 } from '@stress/core-0003';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/features-0145';
export const name = 'apps-0021';
export const base = 365;
export function compute(input: number): number {
  return base + (b0 + b1 + b2) + input;
}
export default compute;
