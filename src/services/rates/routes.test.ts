import express, { Router } from 'express';
import request from 'supertest';
import { applyMiddleware, applyRoutes } from '../../utils';
import promiseRequest from 'request-promise';
import middleware from '../../middleware';
import errorHandlers from '../../middleware/errorHandlers';
import routes from '../../services/rates/routes';

jest.mock('request-promise');

describe('routes', () => {
  let router: Router;

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);
  });

  describe('success 3rd party API response', () => {
    (promiseRequest as any).mockImplementation(() => '{"base": "EUR", "rates": {"USD": 1.1138}}');

    test('a valid string query', async () => {
      const response = await request(router).get('/api/v1/rates?source=EUR&target=USD');
      expect(response.status).toEqual(200);
    });

    test('a non-existing api method', async () => {
      const response = await request(router).get('/api/v11/rates');
      expect(response.status).toEqual(404);
    });

    test('missing rates params', async () => {
      const response = await request(router).get('/api/v1/rates');
      expect(response.status).toEqual(400);
    });

    test('a missing source currency param', async () => {
      const response = await request(router).get('/api/v1/rates?target=USD');
      expect(response.status).toEqual(400);
    });

    test('a missing target currency param', async () => {
      const response = await request(router).get('/api/v1/rates?source=USD');
      expect(response.status).toEqual(400);
    });
  });

  // describe('errored 3rd party API response', () => {
  //   (promiseRequest as any).mockImplementation(() => '{"error": "Symbols \'UNKNOWN_CURRENCY\' are invalid for date TODAY."}');
  //
  //   test('an invalid target currency param', async () => {
  //     const response = await request(router).get('/api/v1/rates?source=EUR&target=UNKNOWN_CURRENCY');
  //     expect(response.body).toEqual(400);
  //   });
  // });
});
