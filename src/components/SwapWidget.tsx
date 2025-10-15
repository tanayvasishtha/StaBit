import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownUp, Bitcoin, Wallet as WalletIcon, TrendingUp } from "lucide-react";
import { toast } from "sonner";
// Temporarily disable Starknet imports to avoid runtime import errors
import { fetchQuote } from "@/lib/rates";
import { fetchRate } from "@/lib/price";

const SwapWidget = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromAsset, setFromAsset] = useState("BTC");
  const [toAsset, setToAsset] = useState("STRK");
  const [walletAddress, setWalletAddress] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const starknetAddress = undefined as unknown as string | undefined;

  const [rate, setRate] = useState<number>(fromAsset === "BTC" ? 45000 : 0.000022);
  const [isLocked, setIsLocked] = useState(false);
  const [lockSeconds, setLockSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (toAsset !== "BTC" && starknetAddress) {
      setWalletAddress(starknetAddress);
    }
  }, [starknetAddress, toAsset]);

  useEffect(() => {
    if (isLocked) return; // do not refresh while locked
    let aborted = false;
    let intervalId: number | null = null;

    const load = async () => {
      try {
        const liveRate = await fetchRate(fromAsset, toAsset);
        if (!aborted) {
          setRate(liveRate);
          const amount = parseFloat(fromAmount || "0");
          if (amount > 0) setToAmount((amount * liveRate).toFixed(8));
        }
      } catch {
        // keep previous rate
      }
    };

    load();
    intervalId = window.setInterval(load, 5000); // refresh every 5s
    return () => {
      aborted = true;
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [fromAsset, toAsset, fromAmount, isLocked]);

  const handleSwapDirection = () => {
    const tempAsset = fromAsset;
    setFromAsset(toAsset);
    setToAsset(tempAsset);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = () => {
    if (!fromAmount || !walletAddress) {
      toast.error("Please fill in all fields");
      return;
    }

    // Lock the current rate for 30 seconds
    setIsLocked(true);
    setLockSeconds(30);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setLockSeconds((s) => {
        if (s <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          timerRef.current = null;
          setIsLocked(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    setIsSwapping(true);
    toast.loading("Initiating swap at locked rate...");

    // Simulate network delay
    setTimeout(() => {
      setIsSwapping(false);
      toast.success("Swap completed successfully!");
    }, 3000);
  };

  const calculateToAmount = (value: string) => {
    if (!value) return "";
    const amount = parseFloat(value);
    if (isNaN(amount)) return "";
    return (amount * rate).toFixed(8);
  };

  return (
    <div className="w-full">
      <div className="bg-muted/20 backdrop-blur border border-border/30 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-1">Portfolio performance</h3>
        <p className="text-sm text-muted-foreground mb-6">Track your crypto swap history</p>

        <div className="space-y-4">
          {/* From Section */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">From</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={fromAmount}
                onChange={(e) => {
                  setFromAmount(e.target.value);
                  setToAmount(calculateToAmount(e.target.value));
                }}
                className="text-xl h-12 pr-20 bg-background/60 border-border/40 focus:border-primary focus:ring-primary/20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-md text-sm font-semibold">
                <Bitcoin className="w-3.5 h-3.5" />
                {fromAsset}
              </div>
            </div>
          </div>

          {/* Swap Direction Button */}
          <div className="flex justify-center -my-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwapDirection}
              className="rounded-full w-9 h-9 border-border/40 bg-background/60 hover:bg-primary/10 hover:border-primary/50"
            >
              <ArrowDownUp className="w-4 h-4 text-primary" />
            </Button>
          </div>

          {/* To Section */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">To</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={toAmount}
                readOnly
                className="text-xl h-12 pr-20 bg-background/60 border-border/40"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-accent text-white px-3 py-1.5 rounded-md text-sm font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                {toAsset}
              </div>
            </div>
          </div>

          {/* Rate Display */}
          <div className="bg-background/40 rounded-lg p-3 border border-border/30">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-muted-foreground">Exchange Rate</span>
              <span className="font-medium text-foreground">
                1 {fromAsset} = {rate.toLocaleString(undefined, { maximumFractionDigits: 8 })} {toAsset}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Network Fee</span>
              <span className="font-medium text-foreground">0.0001 {fromAsset}</span>
            </div>
            {isLocked && (
              <div className="flex justify-between items-center text-xs mt-1.5">
                <span className="text-muted-foreground">Rate locked</span>
                <span className="font-medium text-primary">{lockSeconds}s</span>
              </div>
            )}
          </div>

          {/* Wallet Address */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <WalletIcon className="w-3.5 h-3.5" />
              Recipient Wallet Address
            </label>
            <Input
              placeholder={`Enter ${toAsset} wallet address`}
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="bg-background/60 border-border/40 text-sm focus:border-primary focus:ring-primary/20"
            />
          </div>

          {/* Swap Button */}
          <Button
            onClick={handleSwap}
            disabled={isSwapping}
            className="w-full h-11 font-semibold bg-gradient-to-r from-primary to-primary/90 hover:shadow-blue transition-all"
          >
            {isSwapping ? "Swapping..." : isLocked ? `Locked (${lockSeconds}s)` : "Swap Now"}
          </Button>

          {/* Transaction Status */}
          {isSwapping && (
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs font-medium text-primary">Transaction in progress...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapWidget;
