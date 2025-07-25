import { FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { ChartCard } from "@/components/ui/chart-card";
import { KPICard } from "@/components/ui/kpi-card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { nominaData } from "@/data/mockData";

export function Documentacion() {
  const { documentacion } = nominaData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Documentación y Expedientes</h2>
          <p className="text-muted-foreground">Control de documentos y expedientes del personal</p>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Expedientes Completos"
          value={`${documentacion.porcentajeCompleto}%`}
          subtitle="Documentación al 100%"
          icon={<CheckCircle className="w-5 h-5 text-secondary" />}
          variant="secondary"
        />

        <KPICard
          title="Expedientes Pendientes"
          value={documentacion.expedientesPendientes}
          subtitle="Con documentos faltantes"
          icon={<AlertCircle className="w-5 h-5 text-warning" />}
          variant="warning"
        />

        <KPICard
          title="Documentos por Vencer"
          value="16"
          subtitle="Próximos 30 días"
          icon={<Clock className="w-5 h-5 text-destructive" />}
          variant="destructive"
        />

        <KPICard
          title="Meta Objetivo"
          value="95%"
          subtitle="Completitud esperada"
          icon={<FileText className="w-5 h-5 text-primary" />}
          variant="primary"
        />
      </div>

      {/* Progress Ring y Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Estado General" description="Completitud de expedientes">
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-muted" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" 
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - documentacion.porcentajeCompleto / 100)}`}
                  className="text-secondary transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary">{documentacion.porcentajeCompleto}%</div>
                  <div className="text-sm text-muted-foreground">Completitud</div>
                </div>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Tipos de Documento" description="Progress por categoría">
          <div className="space-y-4">
            {documentacion.tiposDocumento.map((tipo, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{tipo.tipo}</span>
                  <span className="font-mono text-sm">{tipo.completos}/{tipo.total}</span>
                </div>
                <Progress value={tipo.porcentaje} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{tipo.porcentaje}% completo</span>
                  <span>{tipo.total - tipo.completos} pendientes</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}