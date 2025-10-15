export type SwapRequest = {
    fromAsset: string;
    toAsset: string;
    amount: number;
    recipient: string;
    slippageBps: number; // 100 = 1%
};

export type SwapStatus = "pending" | "confirming" | "completed" | "failed";

export type SwapResponse = {
    id: string;
    status: SwapStatus;
    lockSeconds: number;
};

// Mock implementation: replace with backend integration (e.g., Atomiq/Xverse)
export async function createSwap(req: SwapRequest): Promise<SwapResponse> {
    await new Promise((r) => setTimeout(r, 400));
    return { id: `${Date.now()}`, status: "pending", lockSeconds: 30 };
}

export async function pollSwap(id: string): Promise<SwapResponse> {
    await new Promise((r) => setTimeout(r, 800));
    return { id, status: "completed", lockSeconds: 0 };
}


