import { useState } from "react";
import { UserPlus, UserMinus, TrendingUp, RotateCcw, Calendar } from "lucide-react";
import { ChartCard } from "@/components/ui/chart-card";
import { KPICard } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { nominaData, formatPercentage } from "@/data/mockData";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  ComposedChart,
  BarChart,
  Bar
} from "recharts";

const rangoOptions = ["3M", "6M", "1A"];

export function AltasBajas() {
  const [selectedRange, setSelectedRange] = useState("6M");
  const { altasBajas } = nominaData;

  // Calcular rotación neta
  const movimientosConRotacion = altasBajas.movimientos.map(item => ({
    ...item,
    rotacionNeta: item.altas - item.bajas
  }));

  const currentMonth = altasBajas.movimientos[altasBajas.movimientos.length - 1];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Altas y Bajas de Personal</h2>
          <p className="text-muted-foreground">Análisis de movimientos y rotación de personal</p>
        </div>
        
        <div className="flex items-center gap-2">
          {rangoOptions.map((range) => (
            <Button
              key={range}
              variant={selectedRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Altas del Mes"
          value={currentMonth.altas}
          subtitle="Nuevos empleados"
          trend={{
            direction: "up",
            value: "+14%",
            label: "vs mes anterior"
          }}
          icon={<UserPlus className="w-5 h-5 text-secondary" />}
          variant="secondary"
        />

        <KPICard
          title="Bajas del Mes"
          value={currentMonth.bajas}
          subtitle="Empleados que salieron"
          trend={{
            direction: "down",
            value: "-17%",
            label: "reducción"
          }}
          icon={<UserMinus className="w-5 h-5 text-destructive" />}
          variant="destructive"
        />

        <KPICard
          title="Rotación Mensual"
          value={formatPercentage(altasBajas.rotacionMensual)}
          subtitle="Índice de rotación"
          trend={{
            direction: "down",
            value: "-0.8%",
            label: "mejora"
          }}
          icon={<RotateCcw className="w-5 h-5 text-warning" />}
          variant="warning"
        />

        <KPICard
          title="Rotación Anual Proyectada"
          value={formatPercentage(altasBajas.rotacionAnual)}
          subtitle="Proyección 12 meses"
          trend={{
            direction: "down",
            value: "-2.1%",
            label: "vs año anterior"
          }}
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
          variant="primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Líneas Temporales */}
        <ChartCard
          title="Evolución de Movimientos"
          description="Tendencia de altas, bajas y rotación neta"
          headerActions={
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              {selectedRange}
            </Button>
          }
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart 
                data={movimientosConRotacion}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="mes" 
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                
                {/* Área sombreada para rotación neta */}
                <Area 
                  type="monotone" 
                  dataKey="rotacionNeta" 
                  fill="#e0f2fe" 
                  fillOpacity={0.3}
                  stroke="none"
                />
                
                {/* Líneas para altas y bajas */}
                <Line 
                  type="monotone" 
                  dataKey="altas" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  name="Altas"
                />
                <Line 
                  type="monotone" 
                  dataKey="bajas" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                  name="Bajas"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Leyenda personalizada */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded-full" />
              <span className="text-sm">Altas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded-full" />
              <span className="text-sm">Bajas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary/30 rounded-full" />
              <span className="text-sm">Rotación Neta</span>
            </div>
          </div>
        </ChartCard>

        {/* Motivos de Baja */}
        <ChartCard
          title="Motivos de Baja"
          description="Análisis de causas de separación laboral"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={altasBajas.motivosBaja}
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#64748b" />
                <YAxis 
                  type="category" 
                  dataKey="motivo" 
                  tick={{ fontSize: 12 }} 
                  stroke="#64748b"
                  width={75}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `${value} empleados (${altasBajas.motivosBaja.find(m => m.cantidad === value)?.porcentaje}%)`,
                    name
                  ]}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="cantidad" 
                  fill="#2563eb"
                  radius={[0, 4, 4, 0]}
                  name="Cantidad"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detalle de porcentajes */}
          <div className="mt-4 space-y-2">
            {altasBajas.motivosBaja.map((motivo, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="font-medium">{motivo.motivo}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{motivo.cantidad}</span>
                  <span className="text-muted-foreground">
                    ({formatPercentage(motivo.porcentaje)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Análisis de Rotación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChartCard
          title="Rotación por Trimestre"
          description="Comparativo trimestral"
        >
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {formatPercentage(altasBajas.rotacionMensual)}
              </div>
              <p className="text-muted-foreground">Rotación Actual</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Q4 2023</span>
                <span className="font-mono text-sm">8.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Q3 2023</span>
                <span className="font-mono text-sm">9.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Q2 2023</span>
                <span className="font-mono text-sm">7.8%</span>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard
          title="Impacto Financiero"
          description="Costo de rotación estimado"
        >
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive mb-2">
                $485K
              </div>
              <p className="text-muted-foreground">Costo Total Rotación</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Reclutamiento</span>
                <span className="font-mono text-sm">$180K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Capacitación</span>
                <span className="font-mono text-sm">$205K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Productividad</span>
                <span className="font-mono text-sm">$100K</span>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard
          title="Predicción"
          description="Tendencia próximos 3 meses"
        >
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">
                6.8%
              </div>
              <p className="text-muted-foreground">Rotación Estimada</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Febrero</span>
                <span className="font-mono text-sm">7.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Marzo</span>
                <span className="font-mono text-sm">6.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Abril</span>
                <span className="font-mono text-sm">6.5%</span>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}