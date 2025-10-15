import { Button } from "@/components/ui/button";
import { useEvmWallet } from "@/providers/EvmWalletProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

function short(addr?: string) {
    if (!addr) return "";
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

const ConnectButton = () => {
    const { address, isConnecting, connect, disconnect } = useEvmWallet();

    if (address) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">{short(address)}</Button>
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
                <DropdownMenuItem onClick={() => connect()} disabled={isConnecting}>
                    {isConnecting ? "Connecting..." : "MetaMask"}
                </DropdownMenuItem>
                {/* Future wallets can be added here */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ConnectButton;


