import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import expressValidation from 'express-validation';
import helmet from 'helmet';
import _ from 'lodash';
import routes from '../server/routes/index.route';
import config from './config';
import APIError from '../server/helpers/APIError';

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount all routes on /api path
app.use('/', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  const error = err;

  if (err instanceof expressValidation.ValidationError) {
    const errors = [];

    _.each(error.errors, (element) => {
      errors.push(_.pick(element, ['field', 'messages']));
    });

    error.errors = errors;
  }

  res.status(error.status || 500).json(error);
  return next();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('Resource not found', httpStatus.NOT_FOUND);
  return next(err);
});

export default app;
