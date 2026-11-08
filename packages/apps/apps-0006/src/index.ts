// @stress/apps-0006
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0003';
import { base as b2 } from '@stress/core-0004';
import { base as b3 } from '@stress/core-0077';
import { base as b4 } from '@stress/libs-0015';
export const name = 'apps-0006';
export const base = 764;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4) + input;
}
export default compute;
