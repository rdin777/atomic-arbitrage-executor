import { createPublicClient, createWalletClient, webSocket, http, parseEther, formatEther, type Address } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import { config } from './config';
import { ARBITRAGE_EXECUTOR_ABI, POOL_ABI, SWAP_EVENT_ABI } from './abi';
import { sqrtPriceX96ToPrice, calculateSpread, log } from './utils';

export class ArbitrageScanner {
  private publicClient: any;
  private walletClient: any;
  private unwatchEvent: (() => void) | null = null;
  private isRunning: boolean = false;

  constructor() {
    // Public WebSocket client for real-time event reading
    this.publicClient = createPublicClient({
      chain: base,
      transport: webSocket(config.wsRpcUrl)
    });

    // Client wallet via PRIVATE RPC (MEV protection via Flashbots)
    const account = privateKeyToAccount(config.privateKey);
    this.walletClient = createWalletClient({
      chain: base,
      transport: http(config.privateRpcUrl),
      account
    });

    log('Scanner initialized with MEV protection', 'success');
    log(`Monitoring: ${config.uniswapPool} ↔ ${config.aerodromePool}`, 'info');
  }

  // Starting the scanner
  public async start(): Promise<void> {
    if (this.isRunning) {
      log('Scanner is already running', 'warning');
      return;
    }

    this.isRunning = true;
    log('Starting WebSocket listener...', 'info');

    try {
      // Subscribing to Swap events in the Uniswap pool.
      this.unwatchEvent = this.publicClient.watchEvent({
        address: config.uniswapPool,
        event: SWAP_EVENT_ABI,
        onLogs: async (logs) => {
          for (const log of logs) {
            await this.handleSwap(log.args);
          }
        },
        onError: (error) => {
          log(`WebSocket error: ${error.message}`, 'error');
        }
      });

      log('Listening for Swap events...', 'success');
    } catch (error: any) {
      log(`Failed to start scanner: ${error.message}`, 'error');
      this.isRunning = false;
    }
  }

  // Scanner stop
  public stop(): void {
    if (this.unwatchEvent) {
      this.unwatchEvent();
      this.unwatchEvent = null;
    }
    this.isRunning = false;
    log('Scanner stopped', 'info');
  }

  // Handling the Swap event
  private async handleSwap(args: any): Promise<void> {
    try {
      const sqrtPriceX96 = args.sqrtPriceX96;
      
      // We get the current price from the second pool.
      const aerodromeSlot0 = await this.publicClient.readContract({
        address: config.aerodromePool,
        abi: POOL_ABI,
        functionName: 'slot0'
      });

      const aerodromeSqrtPrice = aerodromeSlot0[0];

      // Calculating prices (simplified, for WETH/USDC: 18 and 6 decimals)
      const uniswapPrice = sqrtPriceX96ToPrice(sqrtPriceX96, 18, 6);
      const aerodromePrice = sqrtPriceX96ToPrice(aerodromeSqrtPrice, 18, 6);

      // Calculating the spread
      const spread = calculateSpread(uniswapPrice, aerodromePrice);

      if (spread > 0.3) { // If the spread is greater than 0.3%, there is a chance of profit.
        log(`🚨 Arbitrage opportunity detected!`, 'warning');
        log(`   Uniswap price: ${uniswapPrice.toFixed(6)}`, 'info');
        log(`   Aerodrome price: ${aerodromePrice.toFixed(6)}`, 'info');
        log(`   Spread: ${spread.toFixed(3)}%`, 'success');
        
        // We are attempting to carry it out.
        await this.executeArbitrage();
      }
    } catch (error: any) {
      log(`Error handling swap: ${error.message}`, 'error');
    }
  }

