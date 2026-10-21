import { describe, expect, it } from 'vitest';
import { getAbv, gravityMessage } from './abv';

describe('getAbv', () => {
  it('returns the correct value for valid inputs', () => {
    expect(getAbv({ og: 1.056, fg: 1.015 })).toEqual(5.38);
  });

  it('gracefully handles missing values', () => {
    expect(getAbv({ fg: 1.015 })).toEqual(0);
    expect(getAbv({ og: 1.058 })).toEqual(0);
    expect(getAbv({ og: NaN, fg: 1.015 })).toEqual(0);
  });

  it('blocks values under 1.000', () => {
    expect(getAbv({ og: 1.056, fg: 0.9999 })).toEqual(0);
    expect(getAbv({ og: 0.9999, fg: 1.008 })).toEqual(0);
    expect(getAbv({ og: 0.9999, fg: 0.9999 })).toEqual(0);
  });

  it('blocks values over 1.999', () => {
    expect(getAbv({ og: 1.056, fg: 2.0 })).toEqual(0);
    expect(getAbv({ og: 2.0, fg: 1.008 })).toEqual(0);
    expect(getAbv({ og: 2.0, fg: 2.0 })).toEqual(0);
  });
});

describe('gravityMessage', () => {
  it('is empty for valid and empty values', () => {
    expect(gravityMessage(1.008)).toEqual('');
    expect(gravityMessage(NaN)).toEqual('');
  });

  it('describes out-of-range values', () => {
    expect(gravityMessage(0.99)).toEqual('Gravity must be greater than 0.999');
    expect(gravityMessage(2)).toEqual('Gravity must be 1.999 or less');
  });
});
