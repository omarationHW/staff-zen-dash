import { DollarSign, Users, Calculator, TrendingUp } from "lucide-react";
import { KPICard } from "@/components/ui/kpi-card";
import { ChartCard } from "@/components/ui/chart-card";
import { nominaData, formatCurrency, formatPercentage } from "@/data/mockData";
import { 
  ComposedChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const comparativoData = [
  { periodo: "Mes Anterior", neto: 1185000, bruto: 1600000 },
  { periodo: "Mes Actual", neto: 1250000, bruto: 1680000 }
];

const incidenciasDistribucion = [
  { name: "Faltas", value: nominaData.incidencias.faltas, color: "#ef4444" },
  { name: "Retardos", value: nominaData.incidencias.retardos, color: "#f59e0b" },
  { name: "Incapacidades", value: nominaData.incidencias.incapacidades, color: "#8b5cf6" },
  { name: "Permisos", value: nominaData.incidencias.permisos, color: "#10b981" }
];

export function ResumenGeneral() {
  const { resumenGeneral, incidencias } = nominaData;

  const renderTooltip = (value: any, name: string) => {
    if (name.includes('neto') || name.includes('bruto')) {
      return [formatCurrency(value), name];
    }
    return [value, name];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Resumen General de Nómina</h2>
          <p className="text-muted-foreground">Vista panorámica de los indicadores clave</p>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Nómina Neto"
          value={formatCurrency(resumenGeneral.totalNeto)}
          subtitle="Monto total a pagar"
          trend={{
            direction: "up",
            value: `+${formatPercentage(resumenGeneral.variacionMensual.neto)}`,
            label: "vs mes anterior"
          }}
          icon={<DollarSign className="w-5 h-5 text-primary" />}
          variant="primary"
        />

        <KPICard
          title="Total Nómina Bruto"
          value={formatCurrency(resumenGeneral.totalBruto)}
          subtitle="Antes de deducciones"
          trend={{
            direction: "up",
            value: `+${formatPercentage(resumenGeneral.variacionMensual.bruto)}`,
            label: "vs mes anterior"
          }}
          icon={<Calculator className="w-5 h-5 text-secondary" />}
          variant="secondary"
        />

        <KPICard
          title="Empleados Activos"
          value={resumenGeneral.empleadosActivos}
          subtitle="Personal en nómina"
          trend={{
            direction: "up",
            value: `+${resumenGeneral.variacionMensual.empleados}`,
            label: "nuevos empleados"
          }}
          icon={<Users className="w-5 h-5 text-warning" />}
          variant="warning"
        />

        <KPICard
          title="Costo Promedio/Empleado"
          value={formatCurrency(resumenGeneral.costoPromedio)}
          subtitle="Costo unitario mensual"
          trend={{
            direction: "up",
            value: `+${formatPercentage(resumenGeneral.variacionMensual.costo)}`,
            label: "incremento"
          }}
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
        />
      </div>

      {/* Gráficos Comparativos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparativo vs Mes Anterior */}
        <ChartCard
          title="Comparativo Mensual"
          description="Evolución de la nómina vs período anterior"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={comparativoData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="periodo" 
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip 
                  formatter={renderTooltip}
                  labelStyle={{ color: '#1f2937' }}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="neto" fill="#2563eb" name="Nómina Neto" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bruto" fill="#10b981" name="Nómina Bruto" radius={[4, 4, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Distribución de Incidencias */}
        <ChartCard
          title="Incidencias del Mes"
          description="Distribución de ausentismo y variables"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidenciasDistribucion}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {incidenciasDistribucion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string) => [value, name]}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Leyenda de incidencias */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {incidenciasDistribucion.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}