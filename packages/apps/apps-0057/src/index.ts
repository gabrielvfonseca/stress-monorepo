// @stress/apps-0057
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/libs-0118';
export const name = 'apps-0057';
export const base = 917;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
