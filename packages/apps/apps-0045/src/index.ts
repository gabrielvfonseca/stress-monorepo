// @stress/apps-0045
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/libs-0136';
import { base as b3 } from '@stress/libs-0070';
import { base as b4 } from '@stress/libs-0021';
export const name = 'apps-0045';
export const base = 437;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4) + input;
}
export default compute;
