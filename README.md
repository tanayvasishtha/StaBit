# StaBit - Bitcoin–Starknet Swap Widget

## Overview
StaBit is a user-friendly and secure web application that enables seamless cross-chain swapping between Bitcoin (BTC) and Starknet assets (STRK, ETH, and others). Built with modern web technologies and integrated with Atomiq and Xverse APIs, StaBit simplifies the complex process of swapping assets across chains while providing real-time rates and transparent fees.


## Features
*   **Cross-Chain Swaps:** Swap BTC to STRK/ETH and vice versa.
*   **Real-Time Data:** Get live conversion rates and transparent fee breakdowns before you commit.
*   **Simple Interface:** Just input the amount and wallet addresses to get started.
*   **Live Tracking:** Monitor your transaction status in real time from pending to confirmed.
*   **Modern UI:** A clean, modern interface with a blue color palette inspired by the Nexo crypto dashboard.
*   **Responsive Design:** Fully functional on both desktop and mobile devices.

## Tech Stack
*   **Vite**
*   **TypeScript**
*   **React**
*   **shadcn-ui**
*   **Tailwind CSS**
*   **Backend APIs:** Atomiq & Xverse for cross-chain swap execution.
*   **Deployment:** Vercel / Netlify.

## How to Use
1.  Navigate to the StaBit web application.
2.  Select the desired swap direction (e.g., BTC to STRK).
3.  Enter the amount you wish to swap and provide the destination wallet address.
4.  Review the real-time conversion rate and associated fees.
5.  Click the "Swap" button to initiate the transaction.
6.  Follow the on-screen prompts to track the status of your swap.

## Local Development

### Prerequisites
- Node 18+
- A Starknet wallet (Argent X or Braavos)

### Setup
```bash
npm i
npm run dev
```

### Environment Variables
Create a `.env` file in the project root:
```bash
VITE_DEFAULT_CHAIN=sepolia
# Optional future API keys
# VITE_ATOMIQ_API_KEY=
# VITE_XVERSE_PROJECT_ID=
```

### Wallets
- Use the Connect button (Argent/Braavos) in the top-right to connect your Starknet wallet. When swapping to a Starknet asset, your connected address auto-fills as the recipient.

### Rates/Quotes
- Currently uses a placeholder quote function in `src/lib/rates.ts`. Replace with Atomiq/Xverse quote endpoints for production.

## Future Plans
*   Expand token support to include more assets on both Bitcoin and Starknet.
*   Implement a transaction history feature for user accounts.
*   Integrate with additional DeFi protocols to source deeper liquidity.
*   Develop native mobile applications for iOS and Android.

## Starknet ReSolve Hackathon
This project is a submission for the **Starknet ReSolve Hackathon 2025**, primarily targeting the **Bitcoin Track**. StaBit embodies the spirit of the hackathon by leveraging blockchain interoperability to unlock the power of low-cost, secure asset swaps, bridging the Bitcoin and Starknet ecosystems.

## License
This project is open source and available under the MIT License.    # StaBit  
