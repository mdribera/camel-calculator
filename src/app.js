import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import routes from './routes';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

app.locals.production = app.get('env') === 'production';
app.locals.basedir = path.join(__dirname, '/views');
app.locals.title = 'Camel Calculator';

// view engine setup
const viewsDir = path.join(__dirname, '/views');
app.set('views', viewsDir);
app.set('view engine', 'pug');
app.set('layout', 'layouts/default');

// port definition
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// static directory
app.use(express.static(path.resolve(__dirname, 'public')));

// Deal with the requests
app.all('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message,
    });
});

export default app;
