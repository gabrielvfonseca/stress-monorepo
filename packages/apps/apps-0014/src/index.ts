// @stress/apps-0014
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/libs-0158';
import { base as b2 } from '@stress/features-0065';
import { base as b3 } from '@stress/libs-0094';
import { base as b4 } from '@stress/libs-0159';
export const name = 'apps-0014';
export const base = 976;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4) + input;
}
export default compute;
