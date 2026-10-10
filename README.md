markdown
# ⚡ Atomic Arbitrage Executor

Real-time WebSocket scanner with MEV-protected arbitrage execution on Base L2.

## 🎯 Features

- **Real-time monitoring**: WebSocket listener for instant Swap event detection
- **MEV protection**: Transactions sent via Flashbots Protect RPC (no public mempool exposure)
- **Atomic execution**: Uses flash loans for zero-risk arbitrage (all-or-nothing)
- **Configurable**: Easy setup via `.env` file
- **TypeScript + Viem**: Modern, type-safe stack

## 🏗️ Architecture

┌─────────────────┐ WebSocket ┌──────────────────┐
│ Base Network │ ──────────────────▶ │ Scanner │
│ (Swap Events) │ │ (This Project) │
└─────────────────┘ └────────┬─────────┘
│
│ HTTP (Flashbots)
▼
┌──────────────────┐
│ ArbitrageExecutor│
│ Smart Contract │
└──────────────────┘


## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- [Alchemy](https://www.alchemy.com/) or [QuickNode](https://www.quicknode.com/) account (for WebSocket RPC)
- Deployed [ArbitrageExecutor](https://github.com/rdin777/base-arbitrage-project) contract on Base

### Installation

```bash
git clone https://github.com/rdin777/atomic-arbitrage-executor.git
cd atomic-arbitrage-executor
npm install

Configuration
Copy .env.example to .env:
bash
cp .env.example .env

Fill in your details:
env
WS_RPC_URL=wss://base-mainnet.g.alchemy.com/v2/YOUR_KEY
PRIVATE_RPC_URL=https://rpc.flashbots.net
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS
UNISWAP_POOL=0x...
AERODROME_POOL=0x...
TOKEN_A=0x4200000000000000000000000000000000000006
TOKEN_B=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
FEE_1=3000
FEE_2=3000
MIN_PROFIT=0.001

Running
bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm run start

🛡️ MEV Protection
This bot uses Flashbots Protect (rpc.flashbots.net) to send transactions. This means:
✅ Your transactions are not visible in the public mempool
✅ Protection against sandwich attacks
✅ Direct submission to block builders
✅ If transaction reverts, you only lose gas (not principal)
📊 How It Works
Listen: WebSocket subscribes to Swap events on Uniswap V3 pool
Calculate: When a swap occurs, bot reads price from Aerodrome pool
Compare: If spread > threshold (default 0.3%), opportunity detected
Execute: Calls executeArbitrage() on smart contract via Flashbots RPC
Profit: Flash loan executes atomically — profit kept, loan repaid
⚠️ Important Notes
Test on Base Sepolia first before using mainnet
Start with small amounts (0.001 ETH minimum profit)
Monitor gas costs — high gas can eat profits
Never share your .env file or private keys
Related Projects
base-arbitrage-project — Smart contract + original bot
Flashbots Protect — MEV protection docs
Contributing
Contributions welcome! Open an issue or PR.
📄 License
MIT

