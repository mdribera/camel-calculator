import _ from 'lodash';
import assert from 'assert';

import orderPermuter from '../../src/helpers/order-permuter';

describe('orderPermuter', () => {
  describe('five dice permutations', () => {
    it('should have length equal to five factorial', () => {
      const mockCamels = ['blue', 'green', 'orange', 'white', 'yellow'];
      const numberOfPerms = _.reduce(_.range(2, mockCamels.length + 1), (fact, n) => {
        return n * fact;
      }, 1);
      const result = orderPermuter(mockCamels);

      assert.equal(result.length, numberOfPerms);
    });
  });

  describe('three dice permutations', () => {
    it('should generate all possible dice orders', () => {
      const mockCamels = ['blue', 'green', 'orange'];
      const result = orderPermuter(mockCamels);

      assert.deepEqual(
        result,
        [
          ['blue', 'green', 'orange'],
          ['green', 'blue', 'orange'],
          ['orange', 'blue', 'green'],
          ['blue', 'orange', 'green'],
          ['green', 'orange', 'blue'],
          ['orange', 'green', 'blue'],
        ],
      );
    });
  });
});
