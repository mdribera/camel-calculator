import _ from 'lodash';

import constants from './constants';
import legRunner from './leg-runner';

/**
 * Now that we've generated every possible scenarios (order permutations * roll combinations),
 *  we'll determine and tally up which camels get first and second place in each scenario?
 *
 * @function
 * @name winsCalculator
 *
 * @requires lodash
 * @requires constants
 * @requires legRunner
 *
 * @param {Array.<Object[]>} scenarios - An array containing all possible dice order and roll
 *  scenarios.
 * @param {Object} camels - An object containing each camel's position on the board and stack.
 *
 * @returns {Object} winners - An object containing a count of each camel's first and second place
 *  finishes.
 */
const winsCalculator = (scenarios, camels) => {
  const winners = _.cloneDeep(constants.STATS);

  while (scenarios.length) {
    const legResult = legRunner(scenarios.shift(), _.cloneDeep(camels));

    winners[legResult[0].color].firsts += 1;
    winners[legResult[1].color].seconds += 1;
  }

  return winners;
};

export default winsCalculator;
