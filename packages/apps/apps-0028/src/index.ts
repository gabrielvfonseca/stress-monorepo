// @stress/apps-0028
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0003';
import { base as b2 } from '@stress/libs-0165';
import { base as b3 } from '@stress/libs-0015';
import { base as b4 } from '@stress/libs-0000';
import { base as b5 } from '@stress/features-0142';
export const name = 'apps-0028';
export const base = 956;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4 + b5) + input;
}
export default compute;
