import dayjs from 'dayjs';

export function getInitialDateValue (): string {
  return dayjs().format('YYYY-MM-DD');
}

export function getInitialTimeValue (hours = 1): string {
  const tpl = 'HHmm';
  const start = dayjs().startOf('h');
  const end = start.add(hours, 'h');

  return `${start.format(tpl)}-${end.format(tpl)}`;
}
