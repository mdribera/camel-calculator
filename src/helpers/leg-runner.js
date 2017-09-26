import _ from 'lodash';

/**
 * Given a particular set of dice rolls, where would each camel end up?
 *
 * @function
 * @name legRunner
 *
 * @requires lodash
 *
 * @param {Array.<Object>} scenario - An array of roll objects needed to complete the leg.
 * @param {Array.<Object>} camels - The original camel configuration containing each camel's
 *  position on the board and stack.
 *
 * @returns {Array.<Object>} camels - The resulting camel order after applying the given rolls.
 */
const legRunner = (scenario, camels) => {
  while (scenario.length) {
    const roll = scenario.shift();
    const luckyCamel = _.cloneDeep(_.find(camels, { color: roll.color }));
    const luckyStack = _.filter(camels, (camel) => {
      const sameSpace = camel.space === luckyCamel.space;
      const onTopOf = camel.stack >= luckyCamel.stack;
      return sameSpace && onTopOf;
    });

    const receivingSpace = luckyCamel.space + roll.number;
    const receivingStackHeight = _.filter(camels, { space: receivingSpace }).length;

    _.forEach(luckyStack, (camel) => {
      camel.space += roll.number;
      camel.stack += receivingStackHeight - luckyCamel.stack;
    });
  }

  return _.orderBy(camels, ['space', 'stack'], ['desc', 'desc']);
};

export default legRunner;
