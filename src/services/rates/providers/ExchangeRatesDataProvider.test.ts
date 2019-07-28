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

  test('a valid response', async () => {
    const apiResponse = {"base":"EUR","rates":{"EUR": 1}};
    (request as any).mockImplementation(() => JSON.stringify(apiResponse));

    expect(await Provider.getLatestRatesForBaseCurrency('EUR', ['EUR'])).toEqual(apiResponse);
  });
});
