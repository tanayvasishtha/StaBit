import { LayoutDashboard, ArrowLeftRight, Wallet, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  activeSection?: string;
}

const Sidebar = ({ activeSection = "dashboard" }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/" },
    { id: "trade", label: "Trade", icon: ArrowLeftRight, to: "/trade" },
    { id: "deposits", label: "Deposits", icon: Wallet, to: "/deposits" },
    { id: "settings", label: "Settings", icon: Settings, to: "/settings" },
    { id: "profile", label: "Profile", icon: User, to: "/profile" },
  ];

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-56 bg-sidebar-background border-r border-sidebar-border hidden lg:block">
      <div className="p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive: routeActive }) =>
                cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all",
                  routeActive || isActive
                    ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-blue"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )
              }
            >
              <Icon className="w-[18px] h-[18px]" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
