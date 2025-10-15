import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bitcoin, TrendingUp, Wallet } from "lucide-react";

const ChainAllocation = () => {
  const allocations = [
    { name: "Bitcoin", symbol: "BTC", amount: "$23.3B", percentage: 71.6, color: "bg-primary", icon: Bitcoin },
    { name: "Ethereum", symbol: "ETH", amount: "$23.3B", percentage: 21.6, color: "bg-accent", icon: TrendingUp },
    { name: "Starknet", symbol: "STRK", amount: "$23.3B", percentage: 21.6, color: "bg-blue-bright", icon: Wallet },
  ];

  return (
    <div className="bg-muted/20 backdrop-blur border border-border/30 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-foreground mb-6">Chain Allocation</h3>
      
      <div className="space-y-5">
        {allocations.map((allocation) => {
          const Icon = allocation.icon;
          return (
            <div key={allocation.symbol} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full ${allocation.color} flex items-center justify-center`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{allocation.name}</p>
                    <p className="text-xs text-muted-foreground">{allocation.percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{allocation.amount}</p>
                </div>
              </div>
              <div className="h-1.5 bg-background/60 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${allocation.color} transition-all`}
                  style={{ width: `${allocation.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChainAllocation;
