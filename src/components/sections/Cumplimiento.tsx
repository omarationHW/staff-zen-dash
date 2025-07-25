import { CheckCircle, Clock, AlertTriangle, FileText, Calendar, Eye } from "lucide-react";
import { ChartCard } from "@/components/ui/chart-card";
import { KPICard } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { nominaData } from "@/data/mockData";

const alertIcons = {
  critica: AlertTriangle,
  advertencia: Clock,
  info: FileText
};

const alertVariants = {
  critica: "destructive",
  advertencia: "warning", 
  info: "secondary"
} as const;

export function Cumplimiento() {
  const { cumplimiento } = nominaData;
  const { procesoNomina, cfdi, alertas } = cumplimiento;

  const porcentajeProceso = (procesoNomina.pagado / procesoNomina.total) * 100;
  const porcentajeValidado = (procesoNomina.validado / procesoNomina.total) * 100;
  const porcentajeTimbrado = (procesoNomina.timbrado / procesoNomina.total) * 100;

  const stepperSteps = [
    { 
      label: "En Proceso", 
      count: procesoNomina.enProceso, 
      percentage: (procesoNomina.enProceso / procesoNomina.total) * 100,
      status: "active"
    },
    { 
      label: "Validado", 
      count: procesoNomina.validado, 
      percentage: porcentajeValidado,
      status: porcentajeValidado > 75 ? "completed" : "active"
    },
    { 
      label: "Timbrado", 
      count: procesoNomina.timbrado, 
      percentage: porcentajeTimbrado,
      status: porcentajeTimbrado > 90 ? "completed" : "active"
    },
    { 
      label: "Pagado", 
      count: procesoNomina.pagado, 
      percentage: porcentajeProceso,
      status: porcentajeProceso > 85 ? "completed" : "pending"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Cumplimiento y Procesos</h2>
          <p className="text-muted-foreground">Estado del proceso de nómina y cumplimiento fiscal</p>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Proceso Completado"
          value={`${porcentajeProceso.toFixed(1)}%`}
          subtitle={`${procesoNomina.pagado}/${procesoNomina.total} empleados`}
          trend={{
            direction: "up",
            value: "+5%",
            label: "vs período anterior"
          }}
          icon={<CheckCircle className="w-5 h-5 text-secondary" />}
          variant="secondary"
        />

        <KPICard
          title="CFDI Timbrados"
          value={`${cfdi.porcentaje}%`}
          subtitle={`${cfdi.timbrados}/${procesoNomina.total} recibos`}
          trend={{
            direction: "up",
            value: "+2",
            label: "nuevos timbres"
          }}
          icon={<FileText className="w-5 h-5 text-primary" />}
          variant="primary"
        />

        <KPICard
          title="Recibos Pendientes"
          value={cfdi.pendientes}
          subtitle="Por timbrar"
          trend={{
            direction: "down",
            value: "-3",
            label: "reducción"
          }}
          icon={<Clock className="w-5 h-5 text-warning" />}
          variant="warning"
        />

        <KPICard
          title="Alertas Activas"
          value={alertas.length}
          subtitle="Requieren atención"
          trend={{
            direction: "down",
            value: "-1",
            label: "menos alertas"
          }}
          icon={<AlertTriangle className="w-5 h-5 text-destructive" />}
          variant="destructive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proceso de Nómina - Stepper */}
        <ChartCard
          title="Proceso de Nómina"
          description="Estado actual del flujo de procesamiento"
        >
          <div className="space-y-6">
            {stepperSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center gap-4">
                  {/* Indicador circular */}
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center relative z-10
                    ${step.status === "completed" 
                      ? "bg-secondary text-white" 
                      : step.status === "active"
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                    }
                  `}>
                    {step.status === "completed" ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="font-bold text-sm">{index + 1}</span>
                    )}
                  </div>

                  {/* Contenido del step */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{step.label}</h4>
                      <div className="text-right">
                        <div className="font-mono font-bold text-sm">
                          {step.count}/{procesoNomina.total}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {step.percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <Progress value={step.percentage} className="h-2" />
                  </div>
                </div>

                {/* Línea conectora */}
                {index < stepperSteps.length - 1 && (
                  <div className="absolute left-5 top-10 w-0.5 h-6 bg-border" />
                )}
              </div>
            ))}

            {/* Progreso General */}
            <div className="mt-6 p-4 bg-gradient-primary text-white rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Progreso General</span>
                <span className="font-bold text-xl">
                  {porcentajeProceso.toFixed(0)}%
                </span>
              </div>
              <Progress value={porcentajeProceso} className="mt-2 h-2" />
            </div>
          </div>
        </ChartCard>

        {/* Cumplimiento CFDI */}
        <ChartCard
          title="Cumplimiento CFDI"
          description="Estado del timbrado fiscal"
        >
          <div className="space-y-6">
            {/* Indicador circular grande */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-muted"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 60}`}
                    strokeDashoffset={`${2 * Math.PI * 60 * (1 - cfdi.porcentaje / 100)}`}
                    className="text-secondary transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">
                      {cfdi.porcentaje}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Timbrados
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <div className="text-2xl font-bold text-secondary">{cfdi.timbrados}</div>
                <div className="text-sm text-muted-foreground">Timbrados</div>
              </div>
              <div className="text-center p-3 bg-destructive/10 rounded-lg">
                <div className="text-2xl font-bold text-destructive">{cfdi.pendientes}</div>
                <div className="text-sm text-muted-foreground">Pendientes</div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="p-4 border border-warning rounded-lg bg-warning/5">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-warning" />
                <span className="font-medium text-warning">Fecha límite</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Quedan <span className="font-bold text-foreground">2 días</span> para completar el timbrado
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Panel de Alertas */}
      <ChartCard
        title="Alertas del Sistema"
        description="Alertas que requieren atención inmediata"
      >
        <div className="space-y-3">
          {alertas.map((alerta, index) => {
            const Icon = alertIcons[alerta.tipo as keyof typeof alertIcons];
            return (
              <div 
                key={alerta.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`
                    w-5 h-5 
                    ${alerta.tipo === 'critica' ? 'text-destructive' : 
                      alerta.tipo === 'advertencia' ? 'text-warning' : 'text-primary'}
                  `} />
                  <div>
                    <p className="font-medium text-foreground">{alerta.mensaje}</p>
                    <p className="text-xs text-muted-foreground">{alerta.fecha}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant={alertVariants[alerta.tipo as keyof typeof alertVariants]}>
                    {alerta.tipo.toUpperCase()}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </ChartCard>
    </div>
  );
}