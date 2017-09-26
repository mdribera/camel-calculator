import _ from 'lodash';
import assert from 'assert';

import winsCalculator from '../../src/helpers/wins-calculator';

// TODO Mock legRunner

const mockCamels = [
  {
    color: 'red', space: 1, stack: 0,
  },
  {
    color: 'green', space: 1, stack: 1,
  },
  {
    color: 'blue', space: 3, stack: 0,
  },
  {
    color: 'white', space: 2, stack: 0,
  },
  {
    color: 'yellow', space: 1, stack: 2,
  },
];

describe('winsCalculator', () => {
  describe('one camel wins all the firsts', () => {
    it('should give every first place to blue and every second place to white', () => {
      const mockScenario = [
        [{ color: 'blue', number: 1 }],
        [{ color: 'blue', number: 2 }],
        [{ color: 'blue', number: 3 }],
      ];
      const result = winsCalculator(mockScenario, _.cloneDeep(mockCamels));

      assert.deepEqual(
        result,
        {
          red: { firsts: 0, seconds: 0 },
          green: { firsts: 0, seconds: 0 },
          blue: { firsts: 3, seconds: 0 },
          white: { firsts: 0, seconds: 3 },
          yellow: { firsts: 0, seconds: 0 },
        },
      );
    });
  });

  describe('some split winnings', () => {
    it('divides firsts and seconds between green, blue, and yellow', () => {
      const result = winsCalculator(
        require('../mocks/green-yellow-scenario.json'),
        _.cloneDeep(mockCamels),
      );

      assert.deepEqual(
        result,
        {
          red: { firsts: 0, seconds: 0 },
          green: { firsts: 5, seconds: 8 },
          blue: { firsts: 1, seconds: 7 },
          white: { firsts: 0, seconds: 0 },
          yellow: { firsts: 12, seconds: 3 },
        },
      );
    });
  });
});
