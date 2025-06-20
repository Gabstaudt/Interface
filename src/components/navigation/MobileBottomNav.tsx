
import { Users, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  {
    title: "Pacientes",
    icon: Users,
    id: "patients",
  },
  {
    title: "Análise",
    icon: Search,
    id: "analysis",
  },
  {
    title: "Ajustes",
    icon: Settings,
    id: "settings",
  },
];

export function MobileBottomNav({ currentPage, onNavigate }: MobileBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
      <div className="grid grid-cols-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "flex flex-col items-center gap-1 py-3 px-4 text-xs transition-colors",
              currentPage === item.id
                ? "text-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
