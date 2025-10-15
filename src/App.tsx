import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Features from "./pages/Features";
import Trade from "./pages/Trade";
import Deposits from "./pages/Deposits";
import SettingsPage from "./pages/Settings";
import Profile from "./pages/Profile";
import { EvmWalletProvider } from "./providers/EvmWalletProvider";
import { WalletProvider } from "./contexts/WalletContext";
import { StarknetProvider } from "./contexts/StarknetContext";
// Temporarily disable Starknet provider to avoid runtime import errors

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <EvmWalletProvider>
      <WalletProvider>
        <StarknetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                  <Route path="/blogs" element={<Navigate to="/blog" replace />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/features" element={<Features />} />
                <Route path="/trade" element={<Trade />} />
                <Route path="/deposits" element={<Deposits />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={<Profile />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </StarknetProvider>
      </WalletProvider>
    </EvmWalletProvider>
  </QueryClientProvider>
);

export default App;
