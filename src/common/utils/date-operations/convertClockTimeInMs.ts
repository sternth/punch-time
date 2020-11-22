/**
 * Convert clock time (format: `HHmm`) into milliseconds.
 * @example
 * ```
 * expect(convertClockTimeInMs('1404')).toBe(50640000);
 * ```
 * @param value
 */
export function convertClockTimeInMs (value: string): number {
  const time = parseInt(value, 10);
  const hours = Math.floor(time / 100);
  const minutes = time % 100;

  return (hours * 60 + minutes) * 60 * 1000;
}
