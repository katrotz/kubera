import request from 'request-promise';
import * as Provider from './ExchangeRatesDataProvider';

jest.mock('request-promise');

describe('ExchangeRatesDataProvider', () => {
  test('an invalid non-json response', async () => {
    (request as any).mockImplementation(() => 'Service Unavailable.');
    await expect(Provider.getLatestRatesForBaseCurrency('EUR')).rejects.toThrow(SyntaxError);
  });

  test('an invalid base currency response', async () => {
    (request as any).mockImplementation(() => '{error:"Base \'UNKNOWN_CURRENCY\' is not supported."}');
    await expect(Provider.getLatestRatesForBaseCurrency('UNKNOWN_CURRENCY')).rejects.toThrow(SyntaxError);
  });
});
