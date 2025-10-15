export type BlogMeta = {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  readTime: string;
};

export type BlogPost = BlogMeta & {
  body: string[]; // paragraphs
};

export const posts: BlogPost[] = [
  {
    slug: "starknet-overview",
    title: "What Is Starknet? A Beginner-Friendly Overview",
    subtitle: "Understand L2 scaling, validity rollups, and why Starknet matters.",
    tag: "Basics",
    readTime: "4 min",
    body: [
      "Starknet is a Layer 2 (L2) network built on Ethereum that uses validity proofs (STARKs) to scale computation off-chain while preserving Ethereum security.",
      "Transactions are executed in parallel off-chain, compressed, and then proven on Ethereum with succinct cryptographic proofs. This means lower fees, higher throughput, and faster confirmations for users.",
      "For builders, Starknet introduces the Cairo language, account abstraction by default, and a rapidly growing ecosystem of wallets, bridges, and developer tools.",
      "Unlike optimistic rollups that rely on fraud proofs and challenge windows, validity rollups finalize as soon as their proof is verified on L1. This drives a better user experience for time-sensitive actions.",
      "Cairo, Starknet’s native language, is designed for efficient provability. Modern tooling smooths the learning curve and makes it practical to ship production apps.",
      "Starknet’s roadmap focuses on lower latency (e.g., 6-second blocks) and higher throughput while improving decentralization via a distributed sequencer architecture.",
      "Bottom line: if you need Ethereum security with Web2-like UX, Starknet is a strong choice for both consumer and institutional applications.",
    ],
  },
  {
    slug: "account-abstraction",
    title: "Account Abstraction on Starknet",
    subtitle: "Smart accounts enable gas sponsorship, social recovery, and more.",
    tag: "AA",
    readTime: "5 min",
    body: [
      "On Starknet, every wallet is a smart account. This enables features like session keys, gas sponsorship (paymaster), and multi-factor recovery without custom standards.",
      "Builders can design flows where users sign fewer messages and enjoy Web2-like UX while remaining self-custodial.",
      "Best practice: keep signatures simple, surface clear fee info, and provide one-tap re-authorization for returning users.",
      "Paymasters can sponsor fees for onboarding flows or specific actions, removing friction for new users. Set budget caps and eligibility checks to prevent abuse.",
      "Session keys allow short-lived permissions, enabling features like background swaps or portfolio refreshes without prompting the user each time.",
      "Recovery flows are critical. Offer guardian-based recovery or social resets and test them thoroughly in non-happy paths.",
      "Document the security model of your account abstraction features so users understand what’s happening behind the scenes.",
    ],
  },
  {
    slug: "ecosystem",
    title: "Starknet Ecosystem: Wallets, Bridges, and DeFi",
    subtitle: "Explore Argent/Braavos, core bridges, leading DEXs, and tooling.",
    tag: "Ecosystem",
    readTime: "6 min",
    body: [
      "Popular wallets include Argent and Braavos. Bridges connect Ethereum and other chains, and DeFi dApps provide swaps, liquidity, and yield.",
      "Developers benefit from explorers, indexers, monitoring tools, and the SN Stack for rapid development and testing.",
      "Start by integrating wallet connect, then add quotes/price discovery and on-chain settlement with clear status updates.",
      "Before mainnet launch, validate flows on Starknet Sepolia and track RPC version changes in release notes to avoid last-minute surprises.",
      "Consider routing liquidity through aggregators to reduce price impact and improve execution quality.",
      "Expose explorer links for each step of a cross-chain flow and keep users informed with a persistent status sidebar.",
      "As your app scales, add observability (metrics, logs, alerts) to quickly triage provider or contract issues.",
    ],
  },
  {
    slug: "build",
    title: "Building dApps with Cairo and the SN Stack",
    subtitle: "From contracts in Cairo to frontend connects and indexing.",
    tag: "Develop",
    readTime: "7 min",
    body: [
      "Write contracts in Cairo, test locally, and deploy to Starknet Sepolia before mainnet. Use modern React tooling on the frontend.",
      "Implement wallet connects, optimistic UI, and robust error handling. Expose helpful debug info in dev mode.",
      "Automate deployments with version pinning and monitor RPC deprecations announced in network release notes.",
      "Adopt a typed interface between frontend and contracts. Generate client bindings from your ABIs to reduce runtime errors.",
      "Use feature flags to roll out high-risk changes gradually and add end-to-end tests that simulate user flows.",
      "Cache metadata (token lists, symbols, decimals) to avoid blocking the UI on network responses.",
      "Plan for migrations early. Define upgrade paths for contracts and keep a playbook for emergency pauses.",
    ],
  },
  {
    slug: "fees",
    title: "Fees and Performance: What to Expect",
    subtitle: "Median fees, upcoming features like 6s blocks and fee market.",
    tag: "Performance",
    readTime: "4 min",
    body: [
      "Fees are typically a fraction of a cent to a few cents depending on load. As the network upgrades, block times and throughput will continue to improve.",
      "Design your dApp to surface fee estimates and quote expiries. Provide sensible slippage defaults and allow advanced overrides.",
      "Cache recent quotes client-side and refresh them periodically to keep the UI feeling instant.",
      "When locking quotes, show remaining time and a clear ‘min received’ number inclusive of all fees.",
      "Prefer idempotent submissions for retries—users should never fear double-spends in race conditions.",
      "Batch requests and debounce user input to reduce unnecessary RPC calls and keep the interface responsive.",
    ],
  },
  {
    slug: "security",
    title: "Security on Starknet: Proofs and Best Practices",
    subtitle: "How STARK proofs work and how to secure your app and users.",
    tag: "Security",
    readTime: "6 min",
    body: [
      "STARK proofs provide strong cryptographic guarantees with transparent setup. Always verify assumptions and handle reorg-sensitive logic carefully.",
      "Follow least-privilege for roles, rate-limit sensitive actions, and validate user input on both client and contract layers.",
      "Set up monitoring/alerts and runtime checks for unexpected revert reasons or RPC errors.",
      "Run audits on critical paths and maintain a responsible disclosure channel. Fix high-severity issues before shipping.",
      "Sign and verify typed data where possible. Show human-readable summaries to prevent phishing.",
      "Back up important configuration on-chain or in a versioned store to aid quick recoveries.",
    ],
  },
  {
    slug: "bridging",
    title: "Bridging BTC and L2s: Design Patterns",
    subtitle: "UX tips for cross-chain flows, quotes, expiries, and slippage.",
    tag: "Design",
    readTime: "5 min",
    body: [
      "For cross-chain flows, always give users a clear step-by-step with a persistent status panel and the ability to resume.",
      "Lock quotes for a short period (e.g., 30s) and display remaining time. Show minimum received after fees and slippage.",
      "Provide deep links back to explorers and support asynchronous confirmations gracefully.",
      "Detect the destination chain up-front and pre-validate addresses to avoid user mistakes.",
      "Offer a retry button with safe semantics and provide a support link when manual intervention is needed.",
      "Store lightweight task state locally so users can refresh the page without losing progress.",
    ],
  },
  {
    slug: "production",
    title: "Production Readiness Checklist",
    subtitle: "Monitoring, explorers, versioning, and RPC changes to track.",
    tag: "Ops",
    readTime: "5 min",
    body: [
      "Track network release notes and deprecations to avoid sudden breaks. Pin versions and test upgrades on Sepolia first.",
      "Add logging for wallet connects, quote fetches, and on-chain submissions. Alert when error rates spike.",
      "Document your env vars and operational playbooks so your team can respond quickly.",
      "Set SLOs for latency and error budgets. Use structured logs and a dashboard to visualize health.",
      "Add feature flags for kill-switches on risky modules (e.g., aggregator routing) and practice disaster drills.",
      "Continuously backtest slippage and price impact assumptions against production data to recalibrate defaults.",
    ],
  },
];

export const list = posts.map(({ body, ...meta }) => meta);
export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}


