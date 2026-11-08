// @stress/apps-0034
import { base as b0 } from '@stress/core-0001';
import { base as b1 } from '@stress/core-0002';
import { base as b2 } from '@stress/core-0004';
import { base as b3 } from '@stress/libs-0056';
import { base as b4 } from '@stress/core-0089';
import { base as b5 } from '@stress/features-0055';
import { base as b6 } from '@stress/features-0064';
export const name = 'apps-0034';
export const base = 375;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4 + b5 + b6) + input;
}
export default compute;
