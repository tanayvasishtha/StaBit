const COINGECKO = "https://api.coingecko.com/api/v3/simple/price";
const BINANCE = "https://api.binance.com/api/v3/ticker/price";

type CacheEntry = { value: number; ts: number };
const cache: Record<string, CacheEntry> = {};

function geckoId(symbol: string): string | null {
    switch (symbol.toUpperCase()) {
        case "BTC":
            return "bitcoin";
        case "ETH":
            return "ethereum";
        case "STRK":
            return "starknet";
        default:
            return null;
    }
}

function binanceSymbol(symbol: string): string | null {
    switch (symbol.toUpperCase()) {
        case "BTC":
            return "BTCUSDT";
        case "ETH":
            return "ETHUSDT";
        case "STRK":
            return "STRKUSDT";
        default:
            return null;
    }
}

async function fetchFromBinance(symbol: string): Promise<number> {
    const pair = binanceSymbol(symbol);
    if (!pair) throw new Error("no-binance-pair");
    const res = await fetch(`${BINANCE}?symbol=${pair}`);
    if (!res.ok) throw new Error("binance-failed");
    const json = await res.json();
    const price = Number(json?.price);
    if (!isFinite(price)) throw new Error("binance-bad");
    return price; // USDT ~ USD
}

async function fetchFromCoingecko(symbol: string): Promise<number> {
    const id = geckoId(symbol);
    if (!id) throw new Error("no-gecko-id");
    const res = await fetch(`${COINGECKO}?ids=${id}&vs_currencies=usd`);
    if (!res.ok) throw new Error("gecko-failed");
    const json = await res.json();
    const price = json?.[id]?.usd;
    if (typeof price !== "number") throw new Error("gecko-bad");
    return price;
}

async function fetchUsdPrice(symbol: string): Promise<number> {
    const key = `usd:${symbol.toUpperCase()}`;
    const now = Date.now();
    const cached = cache[key];
    if (cached && now - cached.ts < 10_000) return cached.value; // 10s cache

    // Try Binance first (fast), then fallback to CoinGecko
    let price: number;
    try {
        price = await fetchFromBinance(symbol);
    } catch {
        price = await fetchFromCoingecko(symbol);
    }
    cache[key] = { value: price, ts: now };
    return price;
}

export async function fetchRate(fromAsset: string, toAsset: string): Promise<number> {
    if (fromAsset.toUpperCase() === toAsset.toUpperCase()) return 1;
    const [fromUsd, toUsd] = await Promise.all([
        fetchUsdPrice(fromAsset),
        fetchUsdPrice(toAsset),
    ]);
    return fromUsd / toUsd;
}


