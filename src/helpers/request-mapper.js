import constants from './constants';

/**
 * Map request properties to a more flexible object format.
 *
 * @function
 * @name requestMapper
 *
 * @requires constants
 *
 * @param {Object} request - A request object with camel configuration properties
 *
 * @returns {Array.<Object>} result - An array of camel objects with color, rolled, space, and stack
 *  properties.
 */
const requestMapper = (request) => {
  const result = [];
  const props = constants.REQUEST_PROPS;

  constants.COLORS.forEach((color) => {
    result.push({
      color,
      rolled: request[`${color}.${props.ROLLED}`] === 'true',
      space: parseInt(request[`${color}.${props.SPACE}`], 10),
      stack: parseInt(request[`${color}.${props.STACK}`], 10),
    });
  });

  return result;
};

export default requestMapper;
