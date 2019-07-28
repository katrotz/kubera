import { getLatestRatesForBaseCurrency } from './providers/ExchangeRatesDataProvider';

export type RateResponse = {
  source: string,
  target: string,
  rate: number
}

export const getRatesByCurrency = async (sourceCurrency: string, targetCurrency: string): Promise<RateResponse> => {
  const exchangeRates = await getLatestRatesForBaseCurrency(sourceCurrency, [targetCurrency]);

  return {
    source: sourceCurrency,
    target: targetCurrency,
    rate: exchangeRates.rates[targetCurrency]
  }
};
