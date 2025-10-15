export type QuoteRequest = {
    fromAsset: "BTC" | "STRK" | "ETH";
    toAsset: "BTC" | "STRK" | "ETH";
    amount: number;
};

export type QuoteResponse = {
    rate: number;
    networkFee: number;
    minAmount?: number;
    maxAmount?: number;
};

// Placeholder: replace with Atomiq/Xverse integrations
export async function fetchQuote(req: QuoteRequest): Promise<QuoteResponse> {
    const base = req.fromAsset === "BTC" ? 45000 : 0.000022;
    const rate = base;
    const networkFee = req.fromAsset === "BTC" ? 0.0001 : 0.001;
    await new Promise((r) => setTimeout(r, 250));
    return { rate, networkFee };
}


