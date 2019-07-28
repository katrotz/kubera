import { Request, Response } from 'express';
import { getRatesByCurrency } from './RatesController';
import { checkRatesParams } from '../../middleware/checks';

export default [
  {
    path: '/api/v1/rates',
    method: 'get',
    handler: [
      checkRatesParams,
      async ({ query }: Request, res: Response) => {
        const result = await getRatesByCurrency(query.source, query.target);

        res.status(200).send(result);
      }
    ]
  }
];
