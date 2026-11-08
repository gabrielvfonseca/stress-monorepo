// @stress/core-0003
import { base as b0 } from '@stress/core-0002';
export const name = 'core-0003';
export const base = 125;
export function compute(input: number): number {
  return base + (b0) + input;
}
export default compute;
