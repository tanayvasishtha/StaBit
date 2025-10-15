import { createContext, useContext, useMemo, useState } from 'react';
import { connect } from 'get-starknet';

type StarknetCtx = {
    address?: string;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
};

const Ctx = createContext<StarknetCtx | undefined>(undefined);

export function StarknetProvider({ children }: { children: React.ReactNode }) {
    const [address, setAddress] = useState<string | undefined>(undefined);

    const connectWallet = async () => {
        const res = await connect({ modalMode: 'alwaysAsk' });
        if (res && res.isConnected && res.selectedAddress) {
            setAddress(res.selectedAddress);
        }
    };

    const disconnectWallet = () => setAddress(undefined);

    const value = useMemo(() => ({ address, connectWallet, disconnectWallet }), [address]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStarknet() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error('useStarknet must be used within StarknetProvider');
    return ctx;
}


