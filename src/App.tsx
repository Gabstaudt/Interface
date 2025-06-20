
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Layout } from "@/components/Layout";
import { PatientsPage } from "@/pages/PatientsPage";
import { AnalysisPage } from "@/pages/AnalysisPage";
import { SettingsPage } from "@/pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("patients");
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("patients");
    setShowRegister(false);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "patients":
        return <PatientsPage />;
      case "analysis":
        return <AnalysisPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <PatientsPage />;
    }
  };

  if (!isAuthenticated) {
    if (showRegister) {
      return (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <UserProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <RegisterForm 
                  onRegister={handleRegister} 
                  onBackToLogin={() => setShowRegister(false)}
                />
              </TooltipProvider>
            </UserProvider>
          </ThemeProvider>
        </QueryClientProvider>
      );
    }

    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <UserProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <LoginForm 
                onLogin={handleLogin} 
                onShowRegister={() => setShowRegister(true)}
              />
            </TooltipProvider>
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Layout currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout}>
              {renderCurrentPage()}
            </Layout>
          </TooltipProvider>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
