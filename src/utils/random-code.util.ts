import { randomBytes } from 'node:crypto';

export function randomCode(
  length: number,
  type = 'hex' as BufferEncoding,
): string {
  return randomBytes(length).toString(type).slice(0, length);
}