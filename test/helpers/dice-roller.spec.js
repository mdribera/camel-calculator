import assert from 'assert';
import diceRoller from '../../src/helpers/dice-roller';

describe('diceRoller', () => {
  describe('rolling 5 dice', () => {
    it('should have the same number of combinations as 3^5', () => {
      const result = diceRoller(5);

      assert.equal(result.length, 3 ** 5);
    });
  });

  describe('rolling 3 dice', () => {
    it('should be equal to this array I pasted here', () => {
      const result = diceRoller(3);

      assert.deepEqual(
        result,
        [
          [1, 1, 1],
          [1, 1, 2],
          [1, 1, 3],
          [1, 2, 1],
          [1, 2, 2],
          [1, 2, 3],
          [1, 3, 1],
          [1, 3, 2],
          [1, 3, 3],
          [2, 1, 1],
          [2, 1, 2],
          [2, 1, 3],
          [2, 2, 1],
          [2, 2, 2],
          [2, 2, 3],
          [2, 3, 1],
          [2, 3, 2],
          [2, 3, 3],
          [3, 1, 1],
          [3, 1, 2],
          [3, 1, 3],
          [3, 2, 1],
          [3, 2, 2],
          [3, 2, 3],
          [3, 3, 1],
          [3, 3, 2],
          [3, 3, 3],
        ],
      );
    });
  });
});
