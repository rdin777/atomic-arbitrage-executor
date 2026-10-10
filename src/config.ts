import dotenv from 'dotenv';
import { Address } from 'viem';

dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const config = {
  // RPC URLs
  wsRpcUrl: requireEnv('WS_RPC_URL'),
  privateRpcUrl: requireEnv('PRIVATE_RPC_URL'),
  
  // Wallet
  privateKey: requireEnv('PRIVATE_KEY') as `0x${string}`,
  
  // Contract
  contractAddress: requireEnv('CONTRACT_ADDRESS') as Address,
  minProfit: requireEnv('MIN_PROFIT') || '0.001',
  
  // Pools
  uniswapPool: requireEnv('UNISWAP_POOL') as Address,
  aerodromePool: requireEnv('AERODROME_POOL') as Address,
  
  // Tokens
  tokenA: requireEnv('TOKEN_A') as Address,
  tokenB: requireEnv('TOKEN_B') as Address,
  
  // Commissions
  fee1: parseInt(requireEnv('FEE_1') || '3000'),
  fee2: parseInt(requireEnv('FEE_2') || '3000'),
};

console.log('✅ Configuration loaded');
console.log(`   Contract: ${config.contractAddress}`);
console.log(`   Uniswap Pool: ${config.uniswapPool}`);
console.log(`   Aerodrome Pool: ${config.aerodromePool}`);
console.log(`   Min Profit: ${config.minProfit} ETH`);

