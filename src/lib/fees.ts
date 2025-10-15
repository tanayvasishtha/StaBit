// Network fee estimators per source chain

async function fetchBtcFeeBtc(): Promise<number> {
    // mempool.space recommended fees (sat/vB)
    const res = await fetch("https://mempool.space/api/v1/fees/recommended");
    if (!res.ok) throw new Error("btc-fee-failed");
    const json = await res.json();
    const satsPerVb: number = Number(json?.fastestFee ?? json?.halfHourFee ?? 15);
    const vbytes = 180; // typical P2WPKH single-in/out swap TX
    const sats = satsPerVb * vbytes;
    const btc = sats / 1e8;
    return btc;
}

async function fetchEthFeeEth(): Promise<number> {
    const eth: any = (window as any).ethereum;
    if (!eth) throw new Error("no-eth");
    const gasPriceHex = await eth.request({ method: "eth_gasPrice" });
    const gasPrice = Number(BigInt(gasPriceHex)); // wei
    const gasLimit = 21000; // simple transfer baseline
    const feeWei = gasPrice * gasLimit;
    const feeEth = feeWei / 1e18;
    return feeEth;
}

// Placeholder for STRK: fee is estimated on submit via provider RPC; we return 0 for display
async function fetchStrkFeeStrk(): Promise<number> {
    // Ideally call starknet_estimateFee here; for now return 0 (displayed as ~)
    return 0;
}

export async function fetchNetworkFee(asset: string): Promise<{ amount: number; symbol: string; approx: boolean }> {
    const sym = asset.toUpperCase();
    if (sym === "BTC") {
        const amt = await fetchBtcFeeBtc();
        return { amount: amt, symbol: "BTC", approx: true };
    }
    if (sym === "ETH") {
        const amt = await fetchEthFeeEth();
        return { amount: amt, symbol: "ETH", approx: true };
    }
    if (sym === "STRK") {
        const amt = await fetchStrkFeeStrk();
        return { amount: amt, symbol: "STRK", approx: true };
    }
    return { amount: 0, symbol: sym, approx: true };
}


