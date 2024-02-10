// Uncomment the code below and write your tests
import path, { join } from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
    const cb = () => 'hello';
    const timeout = 2000;
    doStuffByTimeout(cb, timeout);
  });

  test('should set timeout with provided callback and timeout', () => {
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);
  });

  test('should call callback only after timeout', () => {
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const cb = jest.fn();
    const interval = 2000;
    doStuffByInterval(cb, interval);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(cb, 2000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const doSomething = jest.fn();

    doStuffByInterval(doSomething, 2000);
    jest.advanceTimersByTime(2000 * 5);
    expect(doSomething).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');

    const filePath = '/app';
    await readFileAsynchronously(filePath);
    expect(join).toHaveBeenCalled();
    expect(join).toHaveBeenCalledTimes(1);
    expect(join).toHaveBeenCalledWith(expect.any(String), filePath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => false);
    expect(await readFileAsynchronously('pathFile')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockImplementationOnce(async () => Buffer.alloc(5, 'a'));
    expect(await readFileAsynchronously('pathFile')).toBe('aaaaa');
  });
});
