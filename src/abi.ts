// ABI of the ArbitrageExecutor smart contract from base-arbitrage-project
export const ARBITRAGE_EXECUTOR_ABI = [
  {
    name: 'executeArbitrage',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'tokenBorrow', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'tokenIn', type: 'address' },
      { name: 'tokenOut', type: 'address' },
      { name: 'fee1', type: 'uint24' },
      { name: 'fee2', type: 'uint24' }
    ],
    outputs: []
  },
  {
    name: 'getTokenBalance',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'token', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  }
] as const;

// ABI for reading the price from a Uniswap V3 / Aerodrome pool
export const POOL_ABI = [
  {
    name: 'slot0',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      { name: 'sqrtPriceX96', type: 'uint160' },
      { name: 'tick', type: 'int24' },
      { name: 'observationIndex', type: 'uint16' },
      { name: 'observationCardinality', type: 'uint16' },
      { name: 'observationCardinalityNext', type: 'uint16' },
      { name: 'feeProtocol', type: 'uint8' },
      { name: 'unlocked', type: 'bool' }
    ]
  },
  {
    name: 'token0',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }]
  },
  {
    name: 'token1',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }]
  },
  {
    name: 'fee',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint24' }]
  }
] as const;

// ABI Swap Events
export const SWAP_EVENT_ABI = {
  name: 'Swap',
  type: 'event',
  inputs: [
    { indexed: true, name: 'sender', type: 'address' },
    { indexed: true, name: 'recipient', type: 'address' },
    { indexed: false, name: 'amount0', type: 'int256' },
    { indexed: false, name: 'amount1', type: 'int256' },
    { indexed: false, name: 'sqrtPriceX96', type: 'uint160' },
    { indexed: false, name: 'liquidity', type: 'uint128' },
    { indexed: false, name: 'tick', type: 'int24' }
  ]
} as const;

