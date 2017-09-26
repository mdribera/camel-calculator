/**
 * The orderPermuter takes a list of dice colors which need to be rolled. It then generates all
 *  possible orders in which they could be rolled using
 *  [Heap's algorithm]{https://en.wikipedia.org/wiki/Heap%27s_algorithm}. The number of
 *  permutations: `N!` where `N` is the number of dice to be rolled.
 *
 * @function
 * @name orderPermuter
 *
 * @param {Array} camels - An array of camel colors
 *
 * @returns {Array.<string[]>} result - A 2D array containing every possible order in which the
 *  colored dice could be rolled.
 */
const orderPermuter = (camels) => {
  const { length } = camels;
  const result = [camels.slice()];
  const c = new Array(length).fill(0);
  let i = 1;
  let swappy;
  let temp;

  while (i < length) {
    if (c[i] < i) {
      swappy = i % 2 && c[i];
      temp = camels[i];
      camels[i] = camels[swappy];
      camels[swappy] = temp;
      c[i] += 1;
      i = 1;
      result.push(camels.slice());
    } else {
      c[i] = 0;
      i += 1;
    }
  }

  return result;
};

export default orderPermuter;
