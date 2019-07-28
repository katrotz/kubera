import { Response, NextFunction } from 'express';
import { HTTPClientError, HTTP404Error } from './httpErrors';
import { StatusCodeError } from 'request-promise/errors';

type ErrorResponseBody = {
  errors: string[]
}

const isTestEnvironment = ('test' === process.env.NODE_ENV);

const errorToResponseBody = (errorMessage: string, responseBody: ErrorResponseBody = {errors: []}) => {
  responseBody.errors.push(errorMessage);

  return responseBody;
};

export const notFoundError = () => {
  throw new HTTP404Error('Method not found.');
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    !isTestEnvironment && console.warn(err);
    res.status(err.statusCode).json(errorToResponseBody(err.message));
  } else {
    next(err);
  }
};

export const remoteServerError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof StatusCodeError) {
    !isTestEnvironment && console.warn(err);
    try {
      const errorResponse = JSON.parse(err.error);

      res.status(err.statusCode).json(errorToResponseBody(errorResponse.error));
    } catch (parseError) {
      return next(parseError);
    }
  } else {
    next(err);
  }
};

export const serverError = (err: Error, res: Response, next: NextFunction) => {
  !isTestEnvironment && console.error(err);
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json(errorToResponseBody('Internal Server Error'));
  } else {
    res.status(500).json(errorToResponseBody(err.stack || err.message));
  }
};
