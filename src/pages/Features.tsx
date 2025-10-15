import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import { ArrowLeftRight, Wallet, Gauge, Shield } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const features = [
    {
        title: "Cross-Chain Swaps",
        desc: "Swap BTC ↔ Starknet assets with quote lock, clear fees, and min received.",
        items: [
            "30s rate lock with visible countdown",
            "Live prices refreshed every 5s",
            "Min-received and network fee breakdown",
        ],
        icon: ArrowLeftRight,
    },
    {
        title: "Wallet Connectivity",
        desc: "Connect MetaMask and Starknet wallets (Argent/Braavos) from one menu.",
        items: [
            "Single Connect entry with multiple options",
            "Short address display with quick disconnect",
            "Auto-fill recipient when appropriate",
        ],
        icon: Wallet,
    },
    {
        title: "Performance & UX",
        desc: "Modern UI with smooth gradients, responsive layout, and fast interactions.",
        items: [
            "Low-latency UI with optimistic updates",
            "Accessible components based on shadcn-ui",
            "Mobile-friendly layout and keyboard navigation",
        ],
        icon: Gauge,
    },
    {
        title: "Security & Reliability",
        desc: "Built with clear error states, retries, and explorer links for transparency.",
        items: [
            "Idempotent actions and retry-safe flows",
            "Explorer deep links for each step",
            "Input validation and address pre-checks",
        ],
        icon: Shield,
    },
];

const Features = () => {
    return (
        <div className="min-h-screen bg-gradient-primary">
            <Navigation />
            <Sidebar />
            <div className="lg:pl-56 pt-14">
                <main className="container mx-auto px-6 pb-12">
                    <div className="max-w-6xl mx-auto bg-gradient-card backdrop-blur-xl border border-border/40 rounded-3xl p-6 shadow-card">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-foreground">Features</h1>
                            <p className="text-sm text-muted-foreground">Everything you need for a smooth BTC ↔ Starknet swapping experience.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {features.map((f) => {
                                const Icon = f.icon as typeof ArrowLeftRight;
                                return (
                                    <div key={f.title} className="rounded-xl border border-border/30 bg-background/60 p-5">
                                        <div className="flex items-center gap-3 mb-1">
                                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{f.desc}</p>
                                        <ul className="mt-3 space-y-1 text-sm text-foreground/90 list-disc list-inside">
                                            {f.items.map((i) => (
                                                <li key={i}>{i}</li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-3">Why StaBit?</h2>
                            <div className="rounded-xl border border-border/30 bg-background/60 p-4 overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-1/3">Capability</TableHead>
                                            <TableHead>StaBit</TableHead>
                                            <TableHead>Centralized Exchange</TableHead>
                                            <TableHead>Generic L2 DEX</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Custody</TableCell>
                                            <TableCell className="text-primary">Self-custodial</TableCell>
                                            <TableCell>Custodial</TableCell>
                                            <TableCell>Self-custodial</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Rate Lock</TableCell>
                                            <TableCell className="text-primary">30s lock with countdown</TableCell>
                                            <TableCell>Quoted, may change</TableCell>
                                            <TableCell>Often no lock</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Fees</TableCell>
                                            <TableCell className="text-primary">Transparent network fee + slippage</TableCell>
                                            <TableCell>Hidden spreads</TableCell>
                                            <TableCell>Varies by pool</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Wallets</TableCell>
                                            <TableCell className="text-primary">MetaMask + Starknet (Argent/Braavos)</TableCell>
                                            <TableCell>Exchange account</TableCell>
                                            <TableCell>Depends on dApp</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Transparency</TableCell>
                                            <TableCell className="text-primary">Explorer links for each step</TableCell>
                                            <TableCell>Internal ledger</TableCell>
                                            <TableCell>Explorer links</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Features;


