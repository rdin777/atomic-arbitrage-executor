> 📖 **Latest Article:** [Building an MEV-Protected WebSocket Arbitrage Scanner on Base: A Technical Deep Dive](https://dev.to/rdin777/building-an-mev-protected-websocket-arbitrage-scanner-on-base-a-technical-deep-dive-1djn)

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
## 🧪 Community Testing & Contribution

Due to network restrictions in some environments, I am inviting the community to help test and validate this scanner! If you have a stable connection to Base Mainnet RPCs, your tests would be incredibly valuable.

### How to Test Locally

1. **Clone & Install**:
   ```bash
   git clone https://github.com/rdin777/atomic-arbitrage-executor.git
   cd atomic-arbitrage-executor
   npm install
2 Configure Environment:
   cp .env.example .env
Open .env and fill in the details:
WS_RPC_URL: Get a free WebSocket URL from Alchemy or QuickNode for Base Mainnet.
PRIVATE_KEY: Use a dedicated test wallet with a small amount of Base ETH (e.g., 0.01 ETH) for gas. Never use your main wallet!
CONTRACT_ADDRESS: The address of the deployed ArbitrageExecutor contract (you can use the one from base-arbitrage-project or deploy your own).
UNISWAP_POOL & AERODROME_POOL: Find active WETH/USDC (or other pair) pool addresses on Uniswap Info (Base) and Aerodrome Finance.
TOKEN_A & TOKEN_B: Addresses of the tokens you are arbitraging (e.g., WETH and USDC).
3 Run the Scanner:
   npm run dev
The bot will connect via WebSocket and start listening for Swap events. If a spread > MIN_PROFIT is detected, it will attempt to execute via Flashbots Protect.
⚠️ Security Reminder
NEVER commit your .env file or share your PRIVATE_KEY.
The .gitignore is configured to prevent this, but always double-check before pushing any changes.
🤝 How to Contribute
Found a bug or a better pool pair with higher volatility?
Have an idea to improve the spread calculation logic?
Open an Issue or submit a Pull Request! All constructive feedback is welcome.


📄 License
MIT

