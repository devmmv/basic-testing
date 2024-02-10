// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((func: void) => func),
}));

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: 'test' });
    jest.spyOn(axios, 'create').mockReturnThis();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/test');
    expect(jest.spyOn(axios, 'create')).lastCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/test');
    expect(axios.get).toHaveBeenCalledWith('/test');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('/test');
    expect(result).toEqual('test');
  });
});
