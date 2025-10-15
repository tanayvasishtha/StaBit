import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useWallet } from "@/contexts/WalletContext";
import { useEvmWallet } from "@/providers/EvmWalletProvider";
import { toast } from "sonner";
import { useStarknet } from "@/contexts/StarknetContext";

const UniversalConnect = () => {
    const { account, chainId, connectWallet: connectEvmCtx, disconnectWallet: disconnectEvmCtx } = useWallet();
    const { address: evmAddress, connect: connectEvm, disconnect: disconnectEvm } = useEvmWallet();
    const { address: starkAddr, connectWallet: connectSn, disconnectWallet: disconnectSn } = useStarknet();

    const connectedLabel = evmAddress ?? account ?? starkAddr;
    const disconnect = evmAddress || account ? (evmAddress ? disconnectEvm : disconnectEvmCtx) : disconnectSn;

    if (connectedLabel) {
        const short = `${connectedLabel.slice(0, 6)}…${connectedLabel.slice(-4)}`;
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                        {short}
                        {account && chainId != null && (
                            <span className="ml-2 text-[11px] text-muted-foreground">Chain {chainId}</span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => disconnect()}>Disconnect</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" className="bg-primary text-white">Connect</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onSelect={async (e) => {
                        e.preventDefault();
                        try {
                            const eth = (window as any).ethereum;
                            if (!eth) {
                                toast.error("MetaMask not detected. Install the extension.");
                                return;
                            }
                            await connectEvm();
                        } catch (err) {
                            toast.error("Connection rejected. Try again.");
                        }
                    }}
                >
                    MetaMask (EVM)
                </DropdownMenuItem>
                <DropdownMenuItem
                    onSelect={async (e) => {
                        e.preventDefault();
                        try { await connectSn(); } catch { }
                    }}
                >
                    Starknet (Argent/Braavos)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UniversalConnect;


