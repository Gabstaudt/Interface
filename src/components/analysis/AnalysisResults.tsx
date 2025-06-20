
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalysisResult {
  risk: string;
  confidence: number;
  affectedArea: number;
  vascularPattern: string;
  recommendations: string;
  timestamp: string;
}

interface AnalysisResultsProps {
  result: AnalysisResult | null;
  isAnalyzing: boolean;
}

export function AnalysisResults({ result, isAnalyzing }: AnalysisResultsProps) {
  if (isAnalyzing) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg font-medium">Analisando imagem...</p>
          <p className="text-sm text-muted-foreground">Processando com IA</p>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Selecione uma imagem e clique em "Analisar" para ver os resultados</p>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Alto":
        return { color: "destructive", icon: AlertTriangle };
      case "Moderado":
        return { color: "secondary", icon: AlertTriangle };
      case "Baixo":
        return { color: "default", icon: CheckCircle };
      default:
        return { color: "outline", icon: CheckCircle };
    }
  };

  const riskInfo = getRiskColor(result.risk);
  const RiskIcon = riskInfo.icon;

  return (
    <div className="space-y-4">
      {/* Resultado Principal */}
      <div className="text-center p-6 border rounded-lg bg-card">
        <RiskIcon className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-bold mb-2">Análise Concluída</h3>
        <Badge variant={riskInfo.color as any} className="text-lg px-4 py-2">
          Risco {result.risk}
        </Badge>
      </div>

      {/* Detalhes da Análise */}
      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Confiança da Análise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Precisão</span>
              <span className="text-sm font-medium">{result.confidence}%</span>
            </div>
            <Progress value={result.confidence} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Área Afetada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Percentual</span>
              <span className="text-sm font-medium">{result.affectedArea}%</span>
            </div>
            <Progress value={result.affectedArea} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Padrão Vascular</label>
                <p className="text-sm">{result.vascularPattern}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Recomendações</label>
                <p className="text-sm">{result.recommendations}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Analisado em {new Date(result.timestamp).toLocaleString('pt-BR')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
