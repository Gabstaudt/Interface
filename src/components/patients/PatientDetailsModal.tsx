
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Plus, User } from "lucide-react";

interface Patient {
  id: number;
  name: string;
  age: number;
  lastAnalysis: string;
  medicalHistory: string;
  analyses: Array<{
    date: string;
    risk: string;
    details: string;
  }>;
}

interface PatientDetailsModalProps {
  patient: Patient | null;
  open: boolean;
  onClose: () => void;
}

export function PatientDetailsModal({ patient, open, onClose }: PatientDetailsModalProps) {
  if (!patient) return null;

  const getRiskVariant = (risk: string) => {
    switch (risk) {
      case "Alto":
        return "destructive";
      case "Moderado":
        return "secondary";
      case "Baixo":
        return "default";
      default:
        return "outline";
    }
  };

  const handleNewAnalysis = () => {
    // Esta função seria implementada para navegar para a tela de análise
    console.log("Iniciar nova análise para:", patient.name);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {patient.name}
          </DialogTitle>
          <DialogDescription>
            {patient.age} anos • Detalhes do paciente e histórico de análises
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Paciente */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nome</label>
                  <p className="text-sm">{patient.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Idade</label>
                  <p className="text-sm">{patient.age} anos</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Histórico Médico</label>
                  <p className="text-sm mt-1">{patient.medicalHistory}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Análises Anteriores */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Análises Anteriores</CardTitle>
                <Button onClick={handleNewAnalysis} size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nova Análise
                </Button>
              </div>
              <CardDescription>
                Histórico de {patient.analyses.length} análise(s) realizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.analyses.map((analysis, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {new Date(analysis.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {analysis.details}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getRiskVariant(analysis.risk)}>
                      Risco {analysis.risk}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
