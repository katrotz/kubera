import request from 'request-promise';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'https://api.exchangeratesapi.io';

export const getLatestRatesForBaseCurrency = async (baseCurrency: string = 'EUR', targetCurrencies: string[] = []) => {
  const url = targetCurrencies.reduce((acc, targetCurrency) => `${acc}&symbols=${targetCurrency}`, `${API_URL}/latest?base=${baseCurrency}`);

  const response = await request(url);

  return JSON.parse(response);
};
