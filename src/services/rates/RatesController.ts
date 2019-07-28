import { getLatestRatesForBaseCurrency } from './providers/ExchangeRatesDataProvider';

export const getRatesByCurrency = async (sourceCurrency: string, targetCurrency: string) => {
  return await getLatestRatesForBaseCurrency(sourceCurrency, [targetCurrency]);
};
