import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useWallet } from "@/contexts/WalletContext";
import { useStarknet } from "@/contexts/StarknetContext";

const UniversalConnect = () => {
    const { account, chainId, connectWallet: connectEvm, disconnectWallet: disconnectEvm } = useWallet();
    const { address: starkAddr, connectWallet: connectSn, disconnectWallet: disconnectSn } = useStarknet();

    const connectedLabel = account ?? starkAddr;
    const disconnect = account ? disconnectEvm : disconnectSn;

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
                <DropdownMenuItem onClick={() => connectEvm()}>MetaMask (EVM)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => connectSn()}>Starknet (Argent/Braavos)</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UniversalConnect;


