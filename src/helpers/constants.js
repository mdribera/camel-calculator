const define = (name, value) => {
  Object.defineProperty(exports, name, {
    value,
    enumerable: true,
  });
};

/**
 * @constant
 */
const COLORS = ['orange', 'green', 'blue', 'white', 'yellow'];
define('COLORS', COLORS);

/**
 * @constant
 */
const STATS = {
  orange: { firsts: 0, seconds: 0 },
  green: { firsts: 0, seconds: 0 },
  blue: { firsts: 0, seconds: 0 },
  white: { firsts: 0, seconds: 0 },
  yellow: { firsts: 0, seconds: 0 },
};
define('STATS', STATS);

/**
 * @constant
 */
const REQUEST_PROPS = {
  ROLLED: 'rolled',
  SPACE: 'space',
  STACK: 'stack',
};
define('REQUEST_PROPS', REQUEST_PROPS);

