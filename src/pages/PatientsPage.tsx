
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PatientDetailsModal } from "@/components/patients/PatientDetailsModal";
import { AddPatientModal } from "@/components/patients/AddPatientModal";
import { EditPatientModal } from "@/components/patients/EditPatientModal";
import { Eye, Calendar, User, Plus, Edit } from "lucide-react";

const initialPatients = [
  {
    id: 1,
    name: "Maria Santos",
    age: 45,
    email: "maria.santos@email.com",
    phone: "(11) 99999-9999",
    lastAnalysis: "2024-01-15",
    medicalHistory: "Histórico de HPV, acompanhamento regular",
    analyses: [
      { date: "2024-01-15", risk: "Baixo", details: "Epitélio normal, sem alterações" },
      { date: "2023-12-10", risk: "Moderado", details: "Pequenas alterações benignas" },
      { date: "2023-11-05", risk: "Baixo", details: "Controle pós-tratamento" },
    ]
  },
  {
    id: 2,
    name: "Ana Costa",
    age: 38,
    email: "ana.costa@email.com",
    phone: "(11) 88888-8888",
    lastAnalysis: "2024-01-12",
    medicalHistory: "Primeira consulta, sem histórico relevante",
    analyses: [
      { date: "2024-01-12", risk: "Baixo", details: "Exame preventivo normal" },
    ]
  },
  {
    id: 3,
    name: "Carmen Silva",
    age: 52,
    email: "carmen.silva@email.com",
    phone: "(11) 77777-7777",
    lastAnalysis: "2024-01-10",
    medicalHistory: "Histórico familiar de câncer cervical",
    analyses: [
      { date: "2024-01-10", risk: "Alto", details: "Alterações significativas detectadas" },
      { date: "2023-12-15", risk: "Moderado", details: "Acompanhamento trimestral" },
    ]
  },
];

export function PatientsPage() {
  const [patients, setPatients] = useState(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Carregar pacientes do localStorage ao inicializar
  useEffect(() => {
    const storedPatients = localStorage.getItem('patients');
    if (storedPatients) {
      const parsedPatients = JSON.parse(storedPatients);
      setPatients(prev => [...prev, ...parsedPatients]);
    }
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Alto":
        return "text-red-600 bg-red-50";
      case "Moderado":
        return "text-yellow-600 bg-yellow-50";
      case "Baixo":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const handleAddPatient = (newPatient: any) => {
    setPatients(prev => [...prev, newPatient]);
  };

  const handleUpdatePatient = (updatedPatient: any) => {
    setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
    
    // Atualizar no localStorage também
    const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    const updatedStoredPatients = storedPatients.map((p: any) => 
      p.id === updatedPatient.id ? updatedPatient : p
    );
    localStorage.setItem('patients', JSON.stringify(updatedStoredPatients));
    
    setEditingPatient(null);
  };

  const handleEditPatient = (patient: any) => {
    setEditingPatient(patient);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pacientes</h1>
          <p className="text-muted-foreground">Gerencie e acompanhe seus pacientes</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Paciente
        </Button>
      </div>

      <div className="grid gap-4">
        {patients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{patient.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{patient.age} anos</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Última análise: {new Date(patient.lastAnalysis).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {patient.analyses && patient.analyses.length > 0 && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(patient.analyses[0].risk)}`}>
                      {patient.analyses[0].risk}
                    </span>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPatient(patient)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPatient(patient)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PatientDetailsModal
        patient={selectedPatient}
        open={!!selectedPatient}
        onClose={() => setSelectedPatient(null)}
      />

      <AddPatientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPatient={handleAddPatient}
      />

      <EditPatientModal
        patient={editingPatient}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdatePatient={handleUpdatePatient}
      />
    </div>
  );
}
