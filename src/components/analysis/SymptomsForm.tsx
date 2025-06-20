
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, X } from "lucide-react";

interface SymptomsFormProps {
  onClose: () => void;
  onSave: (symptoms: any) => void;
}

export function SymptomsForm({ onClose, onSave }: SymptomsFormProps) {
  const [symptoms, setSymptoms] = useState({
    bleeding: false,
    pain: false,
    discharge: false,
    itching: false,
    other: false,
    description: "",
    duration: "",
    severity: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(symptoms);
    onClose();
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setSymptoms(prev => ({ ...prev, [field]: checked }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Adicionar Sintomas
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>
          Registre os sintomas relatados pela paciente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-base font-medium">Sintomas Principais</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bleeding"
                  checked={symptoms.bleeding}
                  onCheckedChange={(checked) => handleCheckboxChange('bleeding', checked as boolean)}
                />
                <Label htmlFor="bleeding">Sangramento</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pain"
                  checked={symptoms.pain}
                  onCheckedChange={(checked) => handleCheckboxChange('pain', checked as boolean)}
                />
                <Label htmlFor="pain">Dor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="discharge"
                  checked={symptoms.discharge}
                  onCheckedChange={(checked) => handleCheckboxChange('discharge', checked as boolean)}
                />
                <Label htmlFor="discharge">Corrimento</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="itching"
                  checked={symptoms.itching}
                  onCheckedChange={(checked) => handleCheckboxChange('itching', checked as boolean)}
                />
                <Label htmlFor="itching">Coceira</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição Detalhada</Label>
            <Textarea
              id="description"
              placeholder="Descreva os sintomas em detalhes..."
              value={symptoms.description}
              onChange={(e) => setSymptoms(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duração</Label>
              <Textarea
                id="duration"
                placeholder="Ex: 2 semanas"
                value={symptoms.duration}
                onChange={(e) => setSymptoms(prev => ({ ...prev, duration: e.target.value }))}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity">Intensidade</Label>
              <Textarea
                id="severity"
                placeholder="Ex: Leve, moderada, intensa"
                value={symptoms.severity}
                onChange={(e) => setSymptoms(prev => ({ ...prev, severity: e.target.value }))}
                rows={2}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Sintomas
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
