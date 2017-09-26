import _ from 'lodash';

import assert from 'assert';
import legRunner from '../../src/helpers/leg-runner';

const mockCamels = [
  {
    color: 'red', space: 1, stack: 0,
  },
  {
    color: 'green', space: 1, stack: 1,
  },
  {
    color: 'blue', space: 1, stack: 2,
  },
  {
    color: 'white', space: 2, stack: 0,
  },
  {
    color: 'yellow', space: 1, stack: 3,
  },
];

describe('legRunner', () => {
  describe('moving one camel', () => {
    it('should only update space of the yellow camel and put it in first place', () => {
      const mockRolls = [{ color: 'yellow', number: 2 }];
      const result = legRunner(mockRolls, _.cloneDeep(mockCamels));

      assert.deepEqual(
        result,
        [
          {
            color: 'yellow', space: 3, stack: 0,
          },
          {
            color: 'white', space: 2, stack: 0,
          },
          {
            color: 'blue', space: 1, stack: 2,
          },
          {
            color: 'green', space: 1, stack: 1,
          },
          {
            color: 'red', space: 1, stack: 0,
          },
        ],
      );
    });

    it('should also move blue and yellow when green is rolled', () => {
      const mockRolls = [{ color: 'green', number: 2 }];
      const result = legRunner(mockRolls, _.cloneDeep(mockCamels));

      assert.deepEqual(
        result,
        [
          {
            color: 'yellow', space: 3, stack: 2,
          },
          {
            color: 'blue', space: 3, stack: 1,
          },
          {
            color: 'green', space: 3, stack: 0,
          },
          {
            color: 'white', space: 2, stack: 0,
          },
          {
            color: 'red', space: 1, stack: 0,
          },
        ],
      );
    });
  });

  describe('moving multiple camels', () => {
    it('yellow, green, and blue should leave red alone on space 1 then red moves on top of white' +
      ' on space 2', () => {
      const mockRolls = [{ color: 'green', number: 2 }, { color: 'red', number: 1 }];
      const result = legRunner(mockRolls, _.cloneDeep(mockCamels));

      assert.deepEqual(
        result,
        [
          {
            color: 'yellow', space: 3, stack: 2,
          },
          {
            color: 'blue', space: 3, stack: 1,
          },
          {
            color: 'green', space: 3, stack: 0,
          },
          {
            color: 'red', space: 2, stack: 1,
          },
          {
            color: 'white', space: 2, stack: 0,
          },
        ],
      );
    });
  });
});
