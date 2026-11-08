// @stress/apps-0048
import { base as b0 } from '@stress/core-0002';
import { base as b1 } from '@stress/libs-0026';
export const name = 'apps-0048';
export const base = 923;
export function compute(input: number): number {
  return base + (b0 + b1) + input;
}
export default compute;
