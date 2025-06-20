
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Palette, Globe, HelpCircle, Users, LogOut } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/contexts/ThemeContext";
import { EditProfileModal } from "@/components/settings/EditProfileModal";
import { ChangePasswordModal } from "@/components/settings/ChangePasswordModal";
import { UserManagementModal } from "@/components/settings/UserManagementModal";

export function SettingsPage() {
  const { user, isAdmin, logout } = useUser();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [notifications, setNotifications] = useState({
    newAnalysis: true,
    highRiskAlerts: true,
    followUpReminders: false
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    autoBackup: true
  });
  const [appearance, setAppearance] = useState({
    animations: true
  });

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ajustes</h1>
        <p className="text-muted-foreground">Configure suas preferências e configurações do sistema</p>
      </div>

      <div className="grid gap-6">
        {/* Perfil do Médico */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Perfil do Médico
            </CardTitle>
            <CardDescription>
              Gerencie suas informações pessoais e profissionais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Nome</Label>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">CRM</Label>
                <p className="font-medium">{user.crm}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Especialidade</Label>
                <p className="font-medium">{user.specialty}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Email</Label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Função</Label>
                <p className="font-medium">{user.role === 'admin' ? 'Administrador' : 'Usuário'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
                Editar Perfil
              </Button>
              <Button variant="outline" onClick={handleLogout} className="text-red-600 hover:text-red-700">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Gerenciamento de Usuários (apenas para admin) */}
        {isAdmin() && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gerenciamento de Usuários
              </CardTitle>
              <CardDescription>
                Gerencie usuários e permissões do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Visualize usuários, crie convites e gerencie permissões do sistema.
              </p>
              <Button onClick={() => setIsUserManagementOpen(true)}>
                Gerenciar Usuários
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
            <CardDescription>
              Configure como deseja receber notificações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Novas análises</Label>
                <p className="text-sm text-muted-foreground">
                  Receber notificação quando uma análise for concluída
                </p>
              </div>
              <Switch 
                checked={notifications.newAnalysis}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, newAnalysis: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas de risco alto</Label>
                <p className="text-sm text-muted-foreground">
                  Notificação imediata para casos de risco alto
                </p>
              </div>
              <Switch 
                checked={notifications.highRiskAlerts}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, highRiskAlerts: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Lembrete de follow-up</Label>
                <p className="text-sm text-muted-foreground">
                  Lembrar sobre consultas de acompanhamento
                </p>
              </div>
              <Switch 
                checked={notifications.followUpReminders}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, followUpReminders: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Segurança
            </CardTitle>
            <CardDescription>
              Configurações de segurança e privacidade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticação de dois fatores</Label>
                <p className="text-sm text-muted-foreground">
                  Adicione uma camada extra de segurança
                </p>
              </div>
              <Switch 
                checked={security.twoFactor}
                onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, twoFactor: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Backup automático</Label>
                <p className="text-sm text-muted-foreground">
                  Fazer backup dos dados automaticamente
                </p>
              </div>
              <Switch 
                checked={security.autoBackup}
                onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, autoBackup: checked }))}
              />
            </div>
            <div className="pt-2">
              <Button variant="outline" size="sm" onClick={() => setIsPasswordModalOpen(true)}>
                Alterar Senha
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Aparência */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Aparência
            </CardTitle>
            <CardDescription>
              Personalize a interface do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo escuro</Label>
                <p className="text-sm text-muted-foreground">
                  Usar tema escuro na interface
                </p>
              </div>
              <Switch 
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Animações</Label>
                <p className="text-sm text-muted-foreground">
                  Habilitar animações na interface
                </p>
              </div>
              <Switch 
                checked={appearance.animations}
                onCheckedChange={(checked) => setAppearance(prev => ({ ...prev, animations: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Sistema
            </CardTitle>
            <CardDescription>
              Configurações gerais do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Idioma</Label>
              <p className="font-medium">Português (Brasil)</p>
              <Button variant="outline" size="sm" className="mt-2">
                Alterar Idioma
              </Button>
            </div>
            <Separator />
            <div>
              <Label className="text-sm text-muted-foreground">Versão do Sistema</Label>
              <p className="font-medium">ColpoView v1.0.0</p>
            </div>
            <Separator />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Ajuda
              </Button>
              <Button variant="outline" size="sm">
                Sobre
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      {isAdmin() && (
        <UserManagementModal
          isOpen={isUserManagementOpen}
          onClose={() => setIsUserManagementOpen(false)}
        />
      )}
    </div>
  );
}
