import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          <span className="text-foreground/60">Smarter Crypto</span>{" "}
          <span className="text-foreground">Tracking,</span>
          <br />
          <span className="text-foreground/60">Powered by</span>{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-cyan-bright bg-clip-text text-transparent">
            Advanced AI
          </span>
        </h1>

        <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8">
          Where Artificial Intelligence Meets Financial Precision.
        </p>

        {/* Intentionally no primary CTA button per request */}
      </div>
    </section>
  );
};

export default Hero;
