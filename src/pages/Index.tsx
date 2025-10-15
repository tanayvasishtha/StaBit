import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import SwapWidget from "@/components/SwapWidget";
import StatsCard from "@/components/StatsCard";
import ChainAllocation from "@/components/ChainAllocation";
import { DollarSign, TrendingUp, Activity } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navigation />
      <Sidebar activeSection="dashboard" />

      <div className="lg:pl-56 pt-14">
        <Hero />

        <main className="container mx-auto px-6 pb-12">
          {/* Main Dashboard Card */}
          <div className="max-w-6xl mx-auto bg-gradient-card backdrop-blur-xl border border-border/40 rounded-3xl p-6 shadow-card">
            {/* Dashboard Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Welcome Back, Arkhan</h2>
                <p className="text-sm text-muted-foreground">Your crypto trading dashboard</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="search"
                  placeholder="Search"
                  className="w-64 px-4 py-2 bg-muted/40 border border-border/40 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatsCard
                label="Total assets"
                value="$ 87,743"
                icon={DollarSign}
                trend="+12.3%"
              />
              <StatsCard
                label="Total deposits"
                value="$ 78,342"
                icon={TrendingUp}
                trend="+8.5%"
              />
              <StatsCard
                label="APY"
                value="+ 12.3%"
                icon={Activity}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Swap Widget - Takes 2 columns */}
              <div className="lg:col-span-2">
                <SwapWidget />
              </div>

              {/* Chain Allocation - Takes 1 column */}
              <div className="lg:col-span-1">
                <ChainAllocation />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
