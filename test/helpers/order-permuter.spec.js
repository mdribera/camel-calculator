import _ from 'lodash';
import assert from 'assert';

import orderPermuter from '../../src/helpers/order-permuter';

describe('orderPermuter', () => {
  describe('five dice permutations', () => {
    it('should have length equal to five factorial', () => {
      const mockCamels = ['blue', 'green', 'red', 'white', 'yellow'];
      const numberOfPerms = _.reduce(_.range(2, mockCamels.length + 1), (fact, n) => {
        return n * fact;
      }, 1);
      const result = orderPermuter(mockCamels);

      assert.equal(result.length, numberOfPerms);
    });
  });

  describe('three dice permutations', () => {
    it('should generate all possible dice orders', () => {
      const mockCamels = ['blue', 'green', 'red'];
      const result = orderPermuter(mockCamels);

      assert.deepEqual(
        result,
        [
          ['blue', 'green', 'red'],
          ['green', 'blue', 'red'],
          ['red', 'blue', 'green'],
          ['blue', 'red', 'green'],
          ['green', 'red', 'blue'],
          ['red', 'green', 'blue'],
        ],
      );
    });
  });
});
