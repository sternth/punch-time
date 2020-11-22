import dayjs from 'dayjs';

/**
 * Get timestamp with values for `HH:mm:ss:SSS` are all zero.
 * @example
 * ```
 * const now = Date.now(); // today: 1605963851222 => 2020-11-21 14:04:11:222
 * expect(getDate0(now)).toBe(1605913200000); // => 2020-11-21 00:00:00:000
 * ```
 * @param date
 */
export function getDate0 (date: number): number {
  return dayjs(date)
    .millisecond(0)
    .second(0)
    .minute(0)
    .hour(0)
    .valueOf();
}
