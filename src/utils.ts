import { formatEther, parseEther } from 'viem';

/**
 * Converts sqrtPriceX96 into the standard token price.
 * Formula: price = (sqrtPriceX96 / 2^96)^2
 */
export function sqrtPriceX96ToPrice(sqrtPriceX96: bigint, decimals0: number, decimals1: number): number {
  const Q96 = 2n ** 96n;
  const sqrtPrice = Number(sqrtPriceX96) / Number(Q96);
  const price = sqrtPrice * sqrtPrice;
  
  // Adjustment for the number of decimal places
  const decimalDiff = 10 ** (decimals1 - decimals0);
  return price * decimalDiff;
}

/**
 * Calculates the spread between two prices as a percentage.
 */
export function calculateSpread(price1: number, price2: number): number {
  const diff = Math.abs(price1 - price2);
  const avg = (price1 + price2) / 2;
  return (diff / avg) * 100;
}

/**
 * Formats a BigInt into a readable format.
 */
export function formatBigInt(value: bigint, decimals: number = 18): string {
  return (Number(value) / 10 ** decimals).toFixed(6);
}

/**
 * Logs with a timestamp
 */
export function log(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info'): void {
  const timestamp = new Date().toISOString();
  const prefix = {
    info: 'ℹ️',
    success: '✅',
    error: '',
    warning: '⚠️'
  }[type];
  
  console.log(`${prefix} [${timestamp}] ${message}`);
}

