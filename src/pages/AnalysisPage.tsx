
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/analysis/ImageUpload";
import { AnalysisResults } from "@/components/analysis/AnalysisResults";
import { SymptomsForm } from "@/components/analysis/SymptomsForm";
import { Upload, Brain, UserCheck, FileText } from "lucide-react";

export function AnalysisPage() {
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSymptomsForm, setShowSymptomsForm] = useState(false);
  const [symptoms, setSymptoms] = useState(null);

  // Buscar pacientes do localStorage
  const getPatients = () => {
    const storedPatients = localStorage.getItem('patients');
    const mockPatients = [
      { id: "1", name: "Maria Silva", age: 35 },
      { id: "2", name: "Ana Santos", age: 42 },
      { id: "3", name: "Carla Oliveira", age: 28 },
      { id: "4", name: "Fernanda Costa", age: 38 },
      { id: "5", name: "Juliana Lima", age: 31 }
    ];
    
    if (storedPatients) {
      const parsedPatients = JSON.parse(storedPatients);
      return [...mockPatients, ...parsedPatients.map((p: any) => ({
        id: p.id.toString(),
        name: p.name,
        age: p.age
      }))];
    }
    
    return mockPatients;
  };

  const patients = getPatients();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setAnalysisResult(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !selectedPatient) return;
    
    setIsAnalyzing(true);
    
    // Simular análise de IA
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Resultado simulado
    const mockResult = {
      risk: Math.random() > 0.5 ? "Alto" : Math.random() > 0.5 ? "Moderado" : "Baixo",
      confidence: Math.floor(Math.random() * 20) + 80,
      affectedArea: Math.floor(Math.random() * 30) + 5,
      vascularPattern: "Mosaico irregular",
      recommendations: "Acompanhamento em 3 meses",
      timestamp: new Date().toISOString(),
      patient: patients.find(p => p.id === selectedPatient),
      symptoms: symptoms
    };
    
    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
  };

  const handleSaveSymptoms = (symptomsData: any) => {
    setSymptoms(symptomsData);
    console.log("Sintomas salvos:", symptomsData);
  };

  const selectedPatientData = patients.find(p => p.id === selectedPatient);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Análise de Imagem</h1>
        <p className="text-muted-foreground">
          Selecione uma paciente e envie uma imagem de colposcopia para obter uma análise automatizada
        </p>
      </div>

      {/* Seleção de Paciente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Seleção de Paciente
          </CardTitle>
          <CardDescription>
            Escolha a paciente para realizar a análise
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patient">Paciente</Label>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma paciente" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} - {patient.age} anos
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedPatientData && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">Paciente selecionada:</p>
              <p className="text-sm text-muted-foreground">
                {selectedPatientData.name}, {selectedPatientData.age} anos
              </p>
            </div>
          )}

          {selectedPatient && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowSymptomsForm(!showSymptomsForm)}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                {showSymptomsForm ? "Ocultar" : "Adicionar"} Sintomas
              </Button>
              {symptoms && (
                <div className="text-sm text-green-600 flex items-center gap-1">
                  ✓ Sintomas registrados
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Formulário de Sintomas */}
      {showSymptomsForm && (
        <SymptomsForm
          onClose={() => setShowSymptomsForm(false)}
          onSave={handleSaveSymptoms}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload e Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload de Imagem
            </CardTitle>
            <CardDescription>
              Selecione uma imagem de colposcopia para análise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              onImageSelect={handleImageSelect}
              imagePreview={imagePreview}
              selectedImage={selectedImage}
            />
            
            {selectedImage && selectedPatient && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Arquivo: {selectedImage.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Tamanho: {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p className="text-sm text-muted-foreground">
                  Paciente: {selectedPatientData?.name}
                </p>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full flex items-center gap-2"
                >
                  <Brain className="h-4 w-4" />
                  {isAnalyzing ? "Analisando..." : "Analisar Imagem"}
                </Button>
              </div>
            )}

            {selectedImage && !selectedPatient && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Selecione uma paciente antes de realizar a análise
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resultados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Resultados da Análise
            </CardTitle>
            <CardDescription>
              Resultado da análise automatizada por IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnalysisResults
              result={analysisResult}
              isAnalyzing={isAnalyzing}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
