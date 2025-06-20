
import { Users, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface DesktopSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
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

export function DesktopSidebar({ currentPage, onNavigate }: DesktopSidebarProps) {
  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(item.id)}
                    isActive={currentPage === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
