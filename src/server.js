const express = require('express');

const app = express();

const path = require('path');

const bodyParser = require('body-parser');

const msg = require('gulp-messenger');

const chalk = require('chalk');

const _ = require('lodash');


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
app.all('/', require('./routes'));

// lets startup this puppy
app.listen(app.get('port'), () => {
  msg.log('\n');
  msg.log(chalk.cyan(`Server Started ${new Date()}`));
  msg.log('\n');
  const serverInfo = chalk.yellow(`http://localhost:${app.get('port')}`);
  msg.success('=', _.pad(`Application Running On: ${serverInfo}`, 80), '=');
});
