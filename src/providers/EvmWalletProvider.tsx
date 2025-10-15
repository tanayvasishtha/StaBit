import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type EvmWalletContextValue = {
    address?: string;
    isConnecting: boolean;
    connect: () => Promise<void>;
    disconnect: () => void;
};

const EvmWalletContext = createContext<EvmWalletContextValue | undefined>(undefined);

export function EvmWalletProvider({ children }: { children: React.ReactNode }) {
    const [address, setAddress] = useState<string | undefined>(undefined);
    const [isConnecting, setIsConnecting] = useState(false);

    const connect = useCallback(async () => {
        const eth = (window as any).ethereum;
        if (!eth) {
            alert("MetaMask not detected. Please install MetaMask.");
            return;
        }
        try {
            setIsConnecting(true);
            const accounts: string[] = await eth.request({ method: "eth_requestAccounts" });
            setAddress(accounts?.[0]);
        } finally {
            setIsConnecting(false);
        }
    }, []);

    const disconnect = useCallback(() => {
        setAddress(undefined);
    }, []);

    useEffect(() => {
        const eth = (window as any).ethereum;
        if (!eth) return;

        const handleAccountsChanged = (accounts: string[]) => {
            setAddress(accounts?.[0]);
        };

        eth.on?.("accountsChanged", handleAccountsChanged);
        return () => {
            eth?.removeListener?.("accountsChanged", handleAccountsChanged);
        };
    }, []);

    const value = useMemo(() => ({ address, isConnecting, connect, disconnect }), [address, isConnecting, connect, disconnect]);

    return <EvmWalletContext.Provider value={value}>{children}</EvmWalletContext.Provider>;
}

export function useEvmWallet() {
    const ctx = useContext(EvmWalletContext);
    if (!ctx) throw new Error("useEvmWallet must be used within EvmWalletProvider");
    return ctx;
}



