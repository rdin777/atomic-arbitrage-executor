import { ArbitrageScanner } from './scanner';
import { log } from './utils';

async function main() {
  log('Starting Atomic Arbitrage Executor...', 'success');
  
  const scanner = new ArbitrageScanner();
  
  // Launching the scanner.
  await scanner.start();

  // Handling graceful shutdown (Ctrl+C)
  process.on('SIGINT', () => {
    log('Shutting down...', 'warning');
    scanner.stop();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    log('Shutting down...', 'warning');
    scanner.stop();
    process.exit(0);
  });
}

main().catch((error) => {
  log(`Fatal error: ${error.message}`, 'error');
  process.exit(1);
});

