import { defaultDayNames, defaultMonthNames } from '../utils/data';

describe('check size of data', function () {
  it('should get 7 days in array', () => {
    expect(defaultDayNames.length).toEqual(7);
  });

  it('should get 12 months in array', () => {
    expect(defaultMonthNames.length).toEqual(12);
  });
});
