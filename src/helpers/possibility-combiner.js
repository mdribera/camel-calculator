import _ from 'lodash';

/**
 * After permuting all possible dice orders and generating all possible dice rolls,
 *  we need to combine them.
 *
 * @function
 * @name possibilityCombiner
 *
 * @requires lodash
 *
 * @param {Array.<string[]>} colors - A 2D array of camel colors in every permutation possible.
 * @param {Array.<Number[]>} rolls - A 2D array of dice rolls with ever combination possible.
 *
 * @returns {Array.<Object[]>} result - The final product of orders and rolls,
 *  containing every dice outcome.
 */
const possibilityCombiner = (colors, rolls) => {
  const numOfDice = colors[0].length;
  const result = [];

  _.forEach(colors, (color) => {
    _.forEach(rolls, (roll) => {
      const leg = [];
      for (let i = 0; i < numOfDice; i += 1) {
        leg.push({
          color: color[i],
          number: roll[i],
        });
      }
      result.push(leg);
    });
  });

  return result;
};

export default possibilityCombiner;
