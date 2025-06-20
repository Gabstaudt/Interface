
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { UserPlus, ArrowLeft } from "lucide-react";

interface RegisterFormProps {
  onRegister: () => void;
  onBackToLogin: () => void;
}

export function RegisterForm({ onRegister, onBackToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    crm: "",
    specialty: "",
    inviteCode: ""
  });
  const [error, setError] = useState("");
  const [registrationType, setRegistrationType] = useState<"invite" | "admin" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (registrationType === "invite" && !formData.inviteCode) {
      setError("Código de convite é obrigatório");
      return;
    }

    // Simular registro
    console.log("Registrando usuário:", formData);
    onRegister();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  if (!registrationType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Cadastrar no ColpoView</CardTitle>
            <CardDescription>
              Escolha como deseja se cadastrar no sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setRegistrationType("invite")}
              variant="outline"
              className="w-full h-16 flex flex-col items-center gap-2"
            >
              <strong>Tenho um código de convite</strong>
              <span className="text-sm text-muted-foreground">Usar código fornecido pelo administrador</span>
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">ou</span>
              </div>
            </div>

            <Button
              onClick={() => setRegistrationType("admin")}
              className="w-full h-16 flex flex-col items-center gap-2"
            >
              <strong>Cadastrar como Administrador</strong>
              <span className="text-sm opacity-90">Criar primeira conta do sistema</span>
            </Button>

            <Button
              variant="ghost"
              onClick={onBackToLogin}
              className="w-full flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">
            {registrationType === "admin" ? "Cadastro de Administrador" : "Cadastro com Convite"}
          </CardTitle>
          <CardDescription>
            {registrationType === "admin" 
              ? "Crie a primeira conta administrativa do sistema"
              : "Use seu código de convite para se cadastrar"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="crm">CRM</Label>
                <Input
                  id="crm"
                  value={formData.crm}
                  onChange={(e) => handleChange('crm', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidade</Label>
                <Input
                  id="specialty"
                  value={formData.specialty}
                  onChange={(e) => handleChange('specialty', e.target.value)}
                  required
                />
              </div>
            </div>

            {registrationType === "invite" && (
              <div className="space-y-2">
                <Label htmlFor="inviteCode">Código de Convite</Label>
                <Input
                  id="inviteCode"
                  value={formData.inviteCode}
                  onChange={(e) => handleChange('inviteCode', e.target.value.toUpperCase())}
                  placeholder="Digite o código fornecido"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              Cadastrar
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => setRegistrationType(null)}
              className="w-full flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
