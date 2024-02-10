// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)

  test('should generate linked list from values 1', () => {
    const values = [101, 102, 103];
    expect(generateLinkedList(values)).toMatchSnapshot();
    expect(generateLinkedList(values)).toStrictEqual({
      next: {
        next: { next: { next: null, value: null }, value: 103 },
        value: 102,
      },
      value: 101,
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = [10, 20, 30];
    expect(generateLinkedList(values)).toMatchSnapshot();
  });
});
