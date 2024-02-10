// Uncomment the code below and write your tests
// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(200);
    expect(() => account.withdraw(201)).toThrow();
  });

  test('should throw error when transferring more than balance', () => {
    const bank1 = getBankAccount(200);
    const bank2 = getBankAccount(0);
    expect(() => bank1.transfer(201, bank2)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const bank1 = getBankAccount(200);
    expect(() => bank1.transfer(100, bank1)).toThrow();
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(5);
    expect(account.getBalance()).toBe(105);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(5);
    expect(account.getBalance()).toBe(95);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(0);
    account1.transfer(42, account2);
    expect(account2.getBalance()).toBe(42);
    expect(account1.getBalance()).toBe(58);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(50);
    expect(await account.fetchBalance()).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(50);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    expect(async () => await account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
