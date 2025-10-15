import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';

const WalletButton = () => {
    const { account, connectWallet, disconnectWallet, error } = useWallet();

    const formatAddress = (addr: string) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

    return (
        <div>
            {account ? (
                <div className="flex items-center gap-2">
                    <span className="text-xs text-foreground/80 hidden sm:inline">{formatAddress(account)}</span>
                    <Button onClick={disconnectWallet} variant="outline" size="sm">Disconnect</Button>
                </div>
            ) : (
                <Button onClick={connectWallet} size="sm" className="bg-primary text-white">Connect</Button>
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default WalletButton;



