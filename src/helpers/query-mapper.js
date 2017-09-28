import _ from 'lodash';

import constants from './constants';

/**
 * Map request properties to a more flexible object format.
 *
 * @function
 * @name queryMapper
 *
 * @requires lodash
 * @requires constants
 *
 * @param {Object} request - GET request query params with camel configuration properties
 *
 * @returns {Array.<Object>} result - An array of camel objects with color, rolled, space, and stack
 *  properties.
 */
const queryMapper = (request) => {
  const result = [];

  constants.COLORS.forEach((color) => {
    const params = _.get(request, color);
    if (params) {
      const splitParams = params.split('');
      result.push({
        color,
        space: parseInt(splitParams[0], 10),
        stack: parseInt(splitParams[1], 10),
        rolled: splitParams[2] === 'y' || splitParams[2] === 't',
      });
    }
  });

  return result;
};

export default queryMapper;
