// @stress/apps-0036
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/features-0089';
export const name = 'apps-0036';
export const base = 896;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
