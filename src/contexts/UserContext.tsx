
import { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  id: string;
  name: string;
  crm: string;
  specialty: string;
  email: string;
  role: 'admin' | 'user';
  permissions: string[];
}

interface UserContextType {
  user: UserProfile;
  updateUser: (userData: Partial<UserProfile>) => void;
  logout: () => void;
  isAdmin: () => boolean;
  hasPermission: (permission: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultUser: UserProfile = {
  id: "1",
  name: "Dr. Ana Silva",
  crm: "12345/SP",
  specialty: "Ginecologia e Obstetrícia",
  email: "ana.silva@hospital.com",
  role: "admin",
  permissions: ["manage_patients", "manage_users", "view_analytics", "manage_settings"]
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const updateUser = (userData: Partial<UserProfile>) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));
  };

  const logout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('darkMode');
    setUser(defaultUser);
  };

  const isAdmin = () => user.role === 'admin';

  const hasPermission = (permission: string) => {
    return user.permissions.includes(permission);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout, isAdmin, hasPermission }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
