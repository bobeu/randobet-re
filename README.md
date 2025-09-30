# 🎲 Randobet - The Future of Decentralized Betting

> **Where curiosity meets blockchain, and every bet tells a story.**

Randobet is an innovative betting platform that leverages user curiosity to create a unique betting experience. Users bet against themselves by depositing funds into a pool, with winners selected through a transparent, time-based draw mechanism. We're set to revolutionalize decentralized betting platform and transforms the traditional gambling experience into an engaging, transparent, and community-driven ecosystem. Built on the Celo blockchain, Randobet introduces a unique "bet against others" mechanism where users deposit funds into time-based pools, with winners determined through provably fair, draws-rewarding system.

## 🌟 What Makes Randobet Special?

- **🎯 Self-Betting Innovation**: Unlike traditional betting, users compete against themselves in pooled systems
- **⏰ Time-Based Draws**: Automated, transparent winner selection using blockchain oracles
- **🔒 100% Transparent**: All transactions and draws are verifiable on-chain
- **💰 Low-Cost Transactions**: Built on Celo for fast, affordable operations
- **🎮 Gamified Experience**: Engaging UI with real-time updates and animations
- **🌐 Farcaster Integration**: Seamless social betting experiences
- **🛡️ Secure & Decentralized**: Smart contracts ensure fund safety and fairness

---

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [💡 The Problem We Solve](#-the-problem-we-solve)
- [✨ Our Solution](#-our-solution)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [🎯 Key Features](#-key-features)
- [📱 User Experience](#-user-experience)
- [🔧 Installation & Setup](#-installation--setup)
- [📊 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/randobet-re.git
cd randobet-re

# Install frontend dependencies
cd fe
npm install

# Start development server
npm run dev

# Deploy smart contracts (in another terminal)
cd ../be
npm install
npx hardhat deploy --network celo
```

**🎉 That's it!** Visit `http://localhost:3000` to start betting!

---

## 💡 The Problem We Solve

Traditional betting platforms suffer from critical flaws:

- **🔍 Lack of Transparency**: Users can't verify the fairness of draws
- **🏛️ Centralized Control**: Single points of failure and potential manipulation
- **💰 High Fees**: Expensive transaction costs on major blockchains
- **🎭 Poor User Experience**: Complex interfaces that confuse rather than engage
- **🔒 Trust Issues**: Users must trust centralized entities with their funds
- **📱 Limited Integration**: Isolated platforms without social features

---

## ✨ Our Solution

Randobet revolutionizes betting through:

### 🎯 **Self-Betting Mechanism**
Users deposit funds into time-based pools where they compete against themselves, creating a unique psychological engagement that traditional betting can't match.

### ⏰ **Automated Fair Draws**
- Chainlink VRF (Verifiable Random Function) ensures provably fair randomness
- Time-based triggers automate draw processes
- All draws are transparent and verifiable on-chain

### 🔒 **Decentralized Security**
- Smart contracts manage all fund operations
- No single point of failure
- Users maintain control of their funds until draw completion

### 🌐 **Social Integration**
- Farcaster mini-app compatibility for social betting
- Community-driven features and interactions
- Seamless wallet integration with RainbowKit

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        RANDOBET ECOSYSTEM                      │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (Next.js + React)                                    │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   User Interface │  │  Wallet Connect │  │  Real-time Data │ │
│  │   (Betting UI)   │  │   (RainbowKit)  │   │   (React Query) │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│  Smart Contracts (Solidity)                                    │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  RandoFutures   │  │    Verifier     │  │  FeeReceiver    │ │
│  │  (Main Logic)   │  │ (Identity)      │  │  (Revenue)      │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│  Blockchain Infrastructure                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Celo Network   │  │  Chainlink VRF  │  │  Wagmi + Viem   │ │
│  │  (Low-cost)     │  │  (Randomness)   │  │  (Web3 Utils)   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### **Frontend Technologies**
- **⚛️ React 18** - Modern UI library with hooks and concurrent features
- **🚀 Next.js 15** - Full-stack React framework with SSR/SSG
- **📘 TypeScript** - Type-safe development with enhanced IDE support
- **🎨 Tailwind CSS** - Utility-first CSS framework for rapid styling
- **🎭 Framer Motion** - Smooth animations and micro-interactions
- **🎯 Radix UI** - Accessible, unstyled UI components
- **🌈 RainbowKit** - Beautiful wallet connection interface
- **🔗 Wagmi** - React hooks for Ethereum interactions
- **⚡ Viem** - TypeScript interface for Ethereum
- **📊 TanStack Query** - Powerful data synchronization for React

### **Smart Contract Technologies**
- **📜 Solidity 0.8.19** - Smart contract programming language
- **🔧 Hardhat** - Ethereum development environment
- **🛡️ OpenZeppelin** - Secure smart contract libraries
- **🎲 Chainlink VRF** - Verifiable random function for fair draws
- **🔗 Chainlink Contracts** - Oracle integration and automation
- **📦 TypeChain** - TypeScript bindings for smart contracts

### **Blockchain & Infrastructure**
- **🌐 Celo Network** - Mobile-first blockchain with low fees
- **🔗 Chainlink Oracles** - Decentralized data feeds and VRF
- **💾 IPFS** - Decentralized file storage
- **🚀 Vercel** - Frontend deployment and hosting
- **📊 Upstash Redis** - Caching and session management

### **Development Tools**
- **🔍 ESLint** - Code linting and quality assurance
- **🎨 Prettier** - Code formatting and consistency
- **🧪 Jest** - Unit testing framework
- **📊 Hardhat Gas Reporter** - Gas optimization analysis
- **🔒 Solidity Coverage** - Smart contract test coverage

---

## 🎯 Key Features

### 🎲 **Core Betting Features**
- **Time-Based Pools**: Join betting pools with automatic draw schedules
- **Self-Betting Mechanism**: Unique psychological engagement model
- **Provably Fair Draws**: Chainlink VRF ensures verifiable randomness
- **Instant Payouts**: Automated winner selection and fund distribution
- **Multi-Epoch Support**: Participate in multiple betting cycles

### 🔐 **Security & Verification**
- **Identity Verification**: Self.ID integration for user authentication
- **Smart Contract Security**: Audited contracts with multiple safety layers
- **Fund Protection**: Non-custodial design with user-controlled wallets
- **Transparent Operations**: All transactions visible on blockchain

### 🎮 **User Experience**
- **Intuitive Interface**: Clean, modern design with smooth animations
- **Real-Time Updates**: Live data synchronization and notifications
- **Mobile Responsive**: Optimized for all device sizes
- **Dark Theme**: Eye-friendly interface for extended use
- **Toast Notifications**: Instant feedback for all user actions

### 🌐 **Social & Integration**
- **Farcaster Mini-App**: Social betting experiences
- **Wallet Integration**: Support for multiple wallet providers
- **Referral System**: Community growth through user referrals
- **Admin Panel**: Platform management and monitoring tools

---

## 📱 User Experience

### **🎯 For New Users**
1. **Connect Wallet** - Seamless wallet connection with RainbowKit
2. **Verify Identity** - Quick Self.ID verification process
3. **Join Pool** - Deposit CELO to enter betting pool
4. **Wait for Draw** - Real-time countdown to next draw
5. **Claim Winnings** - Automatic payout if you win!

### **🎮 For Experienced Users**
- **Multiple Pools** - Participate in various betting pools simultaneously
- **Admin Functions** - Advanced features for platform management
- **Analytics** - Detailed betting history and statistics
- **Social Features** - Share achievements and compete with friends

---

## 🔧 Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git
- CELO wallet (MetaMask, WalletConnect, etc.)

### **Frontend Setup**
```bash
cd fe
npm install
npm run dev
```

### **Smart Contract Setup**
```bash
cd be
npm install
npx hardhat compile
npx hardhat test
npx hardhat deploy --network celo
```

### **Environment Variables**
Create `.env.local` in the frontend directory:
```env
NEXT_PUBLIC_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_ALCHEMY_CELO_API=your_alchemy_api_key
```

---

## 📊 Project Structure

```
randobet-re/
├── fe/                          # Frontend Application
│   ├── src/
│   │   ├── components/          # React Components
│   │   │   ├── admin/          # Admin panel components
│   │   │   ├── modals/         # Modal dialogs
│   │   │   ├── read/           # Data display components
│   │   │   ├── transactions/   # Transaction components
│   │   │   └── utilities/      # Utility components
│   │   ├── context/            # React Context providers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Utility functions
│   │   └── app/                # Next.js app directory
│   └── public/                 # Static assets
├── be/                         # Smart Contracts
│   ├── contracts/              # Solidity contracts
│   │   ├── deployables/        # Main contract files
│   │   ├── abstracts/          # Abstract contracts
│   │   └── interfaces/         # Contract interfaces
│   ├── deploy/                 # Deployment scripts
│   ├── test/                   # Contract tests
│   └── deployments/            # Deployment artifacts
└── docs/                       # Documentation
    ├── USER_STORY.md           # User experience guide
    └── PROGRESS.md             # Development progress
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### **Code Standards**
- Follow TypeScript best practices
- Write comprehensive tests
- Document new features
- Follow conventional commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎯 **Ready to Start Your Betting Journey?**

**Connect your wallet, verify your identity, and join the future of decentralized betting!**

*Every bet is a story, every draw is destiny, and every winner is part of our community.*

---

<div align="center">

**Built with ❤️ by the Randobet Team**

[![Celo](https://img.shields.io/badge/Celo-35D07F?style=for-the-badge&logo=celo&logoColor=white)](https://celo.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)](https://soliditylang.org/)

</div>
