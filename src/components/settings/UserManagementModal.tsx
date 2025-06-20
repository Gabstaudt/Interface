
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, CheckCircle, Users, UserPlus } from "lucide-react";

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserManagementModal({ isOpen, onClose }: UserManagementModalProps) {
  const [newInvite, setNewInvite] = useState({
    role: "",
    expiresIn: "7"
  });
  const [generatedCode, setGeneratedCode] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  // Mock data
  const users = [
    { id: 1, name: "Dr. Ana Silva", email: "ana.silva@hospital.com", role: "admin", status: "Ativo" },
    { id: 2, name: "Dr. João Santos", email: "joao.santos@hospital.com", role: "user", status: "Ativo" },
    { id: 3, name: "Enf. Maria Costa", email: "maria.costa@hospital.com", role: "user", status: "Inativo" }
  ];

  const inviteCodes = [
    { code: "ABC123DEF", role: "user", createdAt: "2024-01-15", expiresAt: "2024-01-22", used: false },
    { code: "XYZ789GHI", role: "admin", createdAt: "2024-01-10", expiresAt: "2024-01-17", used: true }
  ];

  const generateInviteCode = () => {
    const code = Math.random().toString(36).substring(2, 15).toUpperCase();
    setGeneratedCode(code);
    setNewInvite({ role: "", expiresIn: "7" });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getRoleColor = (role: string) => {
    return role === "admin" ? "destructive" : "secondary";
  };

  const getStatusColor = (status: string) => {
    return status === "Ativo" ? "default" : "secondary";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gerenciamento de Usuários
          </DialogTitle>
          <DialogDescription>
            Gerencie usuários e convites do sistema
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="invites">Convites</TabsTrigger>
            <TabsTrigger value="create">Criar Convite</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleColor(user.role)}>
                        {user.role === "admin" ? "Administrador" : "Usuário"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="invites" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Expira em</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inviteCodes.map((invite, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono">{invite.code}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleColor(invite.role)}>
                        {invite.role === "admin" ? "Administrador" : "Usuário"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(invite.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{new Date(invite.expiresAt).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <Badge variant={invite.used ? "secondary" : "default"}>
                        {invite.used ? "Usado" : "Ativo"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Criar Novo Convite
                </CardTitle>
                <CardDescription>
                  Gere um código de convite para novos usuários
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!generatedCode ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="role">Função do Usuário</Label>
                        <Select value={newInvite.role} onValueChange={(value) => setNewInvite(prev => ({ ...prev, role: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a função" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">Usuário</SelectItem>
                            <SelectItem value="admin">Administrador</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expires">Expira em</Label>
                        <Select value={newInvite.expiresIn} onValueChange={(value) => setNewInvite(prev => ({ ...prev, expiresIn: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 dia</SelectItem>
                            <SelectItem value="7">7 dias</SelectItem>
                            <SelectItem value="30">30 dias</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={generateInviteCode} disabled={!newInvite.role} className="w-full">
                      Gerar Código de Convite
                    </Button>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold">Código Gerado!</h3>
                      <p className="text-muted-foreground">Compartilhe este código com o novo usuário</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center justify-center gap-2">
                        <code className="text-2xl font-mono font-bold">{generatedCode}</code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyCode}
                          className="ml-2"
                        >
                          {copiedCode ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => setGeneratedCode("")}>
                      Gerar Novo Código
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
