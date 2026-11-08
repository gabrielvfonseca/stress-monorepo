// @stress/apps-0074
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0002';
import { base as b2 } from '@stress/core-0004';
import { base as b3 } from '@stress/features-0033';
import { base as b4 } from '@stress/features-0125';
import { base as b5 } from '@stress/core-0037';
export const name = 'apps-0074';
export const base = 396;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4 + b5) + input;
}
export default compute;
