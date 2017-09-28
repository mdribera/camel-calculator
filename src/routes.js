import _ from 'lodash';

import constants from './helpers/constants';
import queryMapper from './helpers/query-mapper';
import requestMapper from './helpers/request-mapper';
import orderPermuter from './helpers/order-permuter';
import diceRoller from './helpers/dice-roller';
import possibilityCombiner from './helpers/possibility-combiner';
import winsCalculator from './helpers/wins-calculator';

const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    const camelConfiguration = queryMapper(req.query);

    res.render(
      'pages/results',
      {
        colors: constants.COLORS,
        camels: _.keyBy(camelConfiguration, 'color'),
      },
    );
  })
  .post((req, res) => {
    const camelConfiguration = requestMapper(req.body);
    const eligibleDice = _.map(
      _.filter(camelConfiguration, (camel) => {
        return !camel.rolled;
      }),
      (camel) => {
        return camel.color;
      },
    );

    const permutedDice = orderPermuter(eligibleDice);
    const rolledDice = diceRoller(eligibleDice.length);
    const scenarios = possibilityCombiner(permutedDice, rolledDice);
    const winners = winsCalculator(_.cloneDeep(scenarios), camelConfiguration);

    _.forEach(winners, (winner) => {
      winner.firstPercent = _.round((winner.firsts / scenarios.length) * 100, 1);
      winner.secondPercent = _.round((winner.seconds / scenarios.length) * 100, 1);
    });

    res.render(
      'pages/results',
      {
        colors: constants.COLORS,
        body: JSON.stringify(camelConfiguration),
        dice: eligibleDice.length,
        count: scenarios.length,
        winners,
        camels: _.keyBy(camelConfiguration, 'color'),
      },
    );
  });

module.exports = router;
