import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import SwapWidget from "@/components/SwapWidget";

const Trade = () => {
    return (
        <div className="min-h-screen bg-gradient-primary">
            <Navigation />
            <Sidebar activeSection="trade" />

            <div className="lg:pl-56 pt-14">
                <main className="container mx-auto px-6 pb-12">
                    <div className="max-w-6xl mx-auto bg-gradient-card backdrop-blur-xl border border-border/40 rounded-3xl p-6 shadow-card">
                        <h2 className="text-xl font-bold text-foreground mb-6">Trade</h2>
                        <SwapWidget />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Trade;


