// @stress/apps-0025
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/libs-0115';
import { base as b3 } from '@stress/features-0094';
import { base as b4 } from '@stress/libs-0141';
export const name = 'apps-0025';
export const base = 98;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4) + input;
}
export default compute;
