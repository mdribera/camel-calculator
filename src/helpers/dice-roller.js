import _ from 'lodash';

/**
 * The diceRoller takes the number of dice to be rolled and generates a Cartesian product which
 *  is a set of all possible dice rolls. This set could be a pre-defined constant but that's no fun.
 *  https://en.wikipedia.org/wiki/Cartesian_product
 * The number of combinations: 3^N
 *
 * @function
 * @name diceRoller
 *
 * @requires lodash {lodash}
 *
 * @param {Number} numOfDice - The number of dice to be rolled.
 *
 * @returns {Array.<Number[]>} result - A 2D array containing all possible dice rolls.
 */
const diceRoller = (numOfDice) => {
  const dice = _.fill(new Array(numOfDice), [1, 2, 3]);

  return _.reduce(dice, (a, b) => {
    return _.flatten(_.map(a, (x) => {
      return _.map(b, (y) => {
        return x.concat([y]);
      });
    }), true);
  }, [[]]);
};

export default diceRoller;
