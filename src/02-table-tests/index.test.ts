// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: '', b: 2, action: Action.Exponentiate, expected: null },
  { a: '', b: '', action: '', expected: null },
];
describe('simpleCalculator', () => {
  test.each(testCases)('table test', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
  // Consider to use Jest table tests API to test all cases above
});
