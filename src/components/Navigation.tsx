import { Button } from "@/components/ui/button";
import { Bitcoin } from "lucide-react";
import UniversalConnect from "@/components/UniversalConnect";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/40 backdrop-blur-xl border-b border-border/40">
      <div className="container mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
            <Bitcoin className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-foreground">
            StaBit
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-[13px] font-medium text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/features" className="text-[13px] font-medium text-foreground/80 hover:text-foreground transition-colors">
            Features
          </Link>
          <Link to="/blog" className="text-[13px] font-medium text-foreground/80 hover:text-foreground transition-colors">
            Blog
          </Link>
        </div>

        <UniversalConnect />
      </div>
    </nav>
  );
};

export default Navigation;
