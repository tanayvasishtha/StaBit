import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
}

const StatsCard = ({ label, value, icon: Icon, trend }: StatsCardProps) => {
  return (
    <div className="bg-muted/20 backdrop-blur border border-border/30 rounded-xl p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-green-400">{trend}</span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
};

export default StatsCard;
