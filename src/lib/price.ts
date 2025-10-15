const COINGECKO = "https://api.coingecko.com/api/v3/simple/price";

function mapId(symbol: string): string | null {
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

export async function fetchUsdPrice(symbol: string): Promise<number> {
    const id = mapId(symbol);
    if (!id) throw new Error(`Unsupported asset: ${symbol}`);
    const url = `${COINGECKO}?ids=${id}&vs_currencies=usd`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch price");
    const json = await res.json();
    const price = json?.[id]?.usd;
    if (typeof price !== "number") throw new Error("Invalid price response");
    return price;
}

export async function fetchRate(fromAsset: string, toAsset: string): Promise<number> {
    if (fromAsset.toUpperCase() === toAsset.toUpperCase()) return 1;
    const [fromUsd, toUsd] = await Promise.all([
        fetchUsdPrice(fromAsset),
        fetchUsdPrice(toAsset),
    ]);
    // 1 fromAsset = rate toAsset
    return fromUsd / toUsd;
}


