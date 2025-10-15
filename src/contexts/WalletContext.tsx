import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
    account: string | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    provider: ethers.BrowserProvider | null;
    error: string | null;
    chainId?: number | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [chainId, setChainId] = useState<number | null>(null);

    useEffect(() => {
        const eth = (window as any).ethereum;
        if (typeof eth !== 'undefined') {
            const browserProvider = new ethers.BrowserProvider(eth);
            setProvider(browserProvider);

            const handleAccountsChanged = (accounts: string[]) => {
                setAccount(accounts.length > 0 ? accounts[0] : null);
            };

            const handleChainChanged = (hexId: string) => {
                try { setChainId(parseInt(hexId, 16)); } catch { }
                window.location.reload();
            };

            eth.on?.('accountsChanged', handleAccountsChanged);
            eth.on?.('chainChanged', handleChainChanged);

            browserProvider.listAccounts().then((accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0].address);
                }
            }).catch(() => { });

            browserProvider.getNetwork().then((n) => {
                setChainId(Number(n.chainId));
            }).catch(() => { });

            return () => {
                eth.removeListener?.('accountsChanged', handleAccountsChanged);
                eth.removeListener?.('chainChanged', handleChainChanged);
            };
        } else {
            setError('Please install MetaMask to use this application.');
        }
    }, []);

    const connectWallet = async () => {
        const eth = (window as any).ethereum;
        if (!provider || !eth) {
            setError('MetaMask is not installed. Please install it to continue.');
            return;
        }
        try {
            await eth.request({ method: 'eth_requestAccounts' });
            const signer = await provider.getSigner();
            const userAccount = await signer.getAddress();
            setAccount(userAccount);
            setError(null);
            try {
                const n = await provider.getNetwork();
                setChainId(Number(n.chainId));
            } catch { }
        } catch (err) {
            setError('Connection request rejected. Please try again.');
            setAccount(null);
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
    };

    return (
        <WalletContext.Provider value={{ account, connectWallet, disconnectWallet, provider, error, chainId }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};



