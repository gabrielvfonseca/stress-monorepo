// @stress/apps-0073
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/core-0099';
import { base as b3 } from '@stress/core-0023';
export const name = 'apps-0073';
export const base = 587;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3) + input;
}
export default compute;
