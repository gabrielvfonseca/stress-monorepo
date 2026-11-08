// @stress/apps-0054
import { base as b0 } from '@stress/core-0000';
import { base as b1 } from '@stress/core-0004';
import { base as b2 } from '@stress/libs-0020';
import { base as b3 } from '@stress/libs-0069';
import { base as b4 } from '@stress/libs-0167';
export const name = 'apps-0054';
export const base = 336;
export function compute(input: number): number {
  return base + (b0 + b1 + b2 + b3 + b4) + input;
}
export default compute;
