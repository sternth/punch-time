import Mockdate from 'mockdate';
import { getInitialDateValue, getInitialTimeValue } from '@/components/task/utils/helpers';

describe('Component Task helpers', () => {
  describe('getInitialDateValue()', () => {
    beforeEach(() => {
      const today = new Date('2020-12-24T13:18:55.377Z');
      Mockdate.set(today);
    });

    afterEach(() => {
      Mockdate.reset();
    });

    it('should return correct formatted current date', () => {
      expect(getInitialDateValue()).toBe('2020-12-24');
    });
  });

  describe('getInitialTimeValue()', () => {
    beforeEach(() => {
      const today = new Date('2020-12-24T13:18:55.377Z');
      Mockdate.set(today);
    });

    afterEach(() => {
      Mockdate.reset();
    });

    it('should return range from 1400 to 1500 by default', () => {
      expect(getInitialTimeValue()).toBe('1400-1500');
    });

    it('should return range from 1400 to 1430', () => {
      expect(getInitialTimeValue(0.5)).toBe('1400-1430');
    });

    it('should return range from 1400 to 1700', () => {
      expect(getInitialTimeValue(3)).toBe('1400-1700');
    });
  });
});
