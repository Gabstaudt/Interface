
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DesktopSidebar } from "./navigation/DesktopSidebar";
import { MobileBottomNav } from "./navigation/MobileBottomNav";
import { Header } from "./navigation/Header";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Layout({ children, currentPage, onNavigate, onLogout }: LayoutProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header onLogout={onLogout} />
        <main className="flex-1 pb-16 p-4">
          {children}
        </main>
        <MobileBottomNav currentPage={currentPage} onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DesktopSidebar currentPage={currentPage} onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <Header onLogout={onLogout} />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
