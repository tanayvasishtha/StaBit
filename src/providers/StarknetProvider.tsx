import { ReactNode } from "react";
import { StarknetConfig, publicProvider, argent, braavos } from "@starknet-react/core";

type Props = { children: ReactNode };

const connectors = [argent(), braavos()];

export function StarknetProvider({ children }: Props) {
    return (
        <StarknetConfig
            provider={publicProvider()}
            connectors={connectors}
            autoConnect
        >
            {children}
        </StarknetConfig>
    );
}

export default StarknetProvider;


