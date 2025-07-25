import { Calendar, TrendingDown, Shield, AlertTriangle } from "lucide-react";
import { ChartCard } from "@/components/ui/chart-card";
import { KPICard } from "@/components/ui/kpi-card";
import { Badge } from "@/components/ui/badge";
import { nominaData, formatPercentage } from "@/data/mockData";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

const riskColors = {
  alto: "#ef4444",
  medio: "#f59e0b",
  bajo: "#10b981"
};

const getRiskColor = (riesgo: string) => {
  return riskColors[riesgo as keyof typeof riskColors];
};

export function Antiguedad() {
  const { antiguedad } = nominaData;
  
  const totalEmpleados = antiguedad.distribucion.reduce((sum, item) => sum + item.empleados, 0);
  
  // Datos con colores para el histograma
  const histogramaData = antiguedad.distribucion.map((item, index) => ({
    ...item,
    color: index < 2 ? "#ef4444" : index < 3 ? "#f59e0b" : "#10b981" // Rojo para nuevos, amarillo para intermedios, verde para antiguos
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Antigüedad y Permanencia</h2>
          <p className="text-muted-foreground">Análisis de retención y estabilidad laboral</p>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Antigüedad Promedio"
          value={`${antiguedad.promedioAntiguedad} años`}
          subtitle="Tiempo promedio en empresa"
          trend={{
            direction: "up",
            value: "+0.3",
            label: "vs año anterior"
          }}
          icon={<Calendar className="w-5 h-5 text-primary" />}
          variant="primary"
        />

        <KPICard
          title="Empleados +5 Años"
          value={`${antiguedad.empleadosMas5Anos}%`}
          subtitle="Personal con alta antigüedad"
          trend={{
            direction: "up",
            value: "+2%",
            label: "incremento"
          }}
          icon={<Shield className="w-5 h-5 text-secondary" />}
          variant="secondary"
        />

        <KPICard
          title="Tasa de Retención"
          value={`${antiguedad.tasaRetencion}%`}
          subtitle="Empleados que permanecen"
          trend={{
            direction: "up",
            value: "+1.5%",
            label: "mejora"
          }}
          icon={<TrendingDown className="w-5 h-5 text-warning" />}
          variant="warning"
        />

        <KPICard
          title="Empleados en Riesgo"
          value="12"
          subtitle="Posible rotación próxima"
          trend={{
            direction: "down",
            value: "-3",
            label: "reducción"
          }}
          icon={<AlertTriangle className="w-5 h-5 text-destructive" />}
          variant="destructive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Histograma de Antigüedad */}
        <ChartCard
          title="Distribución por Antigüedad"
          description="Empleados agrupados por tiempo en la empresa"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={histogramaData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="rango" 
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `${value} empleados (${((value / totalEmpleados) * 100).toFixed(1)}%)`,
                    "Cantidad"
                  ]}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="empleados" radius={[4, 4, 0, 0]}>
                  {histogramaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Leyenda de riesgo */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded-full" />
              <span className="text-xs">Alto Riesgo (0-12m)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-xs">Riesgo Medio (1-3a)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded-full" />
              <span className="text-xs">Estable (3a+)</span>
            </div>
          </div>
        </ChartCard>

        {/* Métricas de Permanencia */}
        <ChartCard
          title="Indicadores de Retención"
          description="Análisis detallado de permanencia"
        >
          <div className="space-y-6">
            {/* Indicador circular principal */}
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
                    strokeDashoffset={`${2 * Math.PI * 60 * (1 - antiguedad.tasaRetencion / 100)}`}
                    className="text-secondary transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">
                      {antiguedad.tasaRetencion}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Retención
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalles por rango */}
            <div className="space-y-3">
              {antiguedad.distribucion.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <span className="font-medium text-sm">{item.rango}</span>
                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${item.porcentaje}%`,
                          backgroundColor: histogramaData[index].color
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-bold text-sm">{item.empleados}</div>
                    <div className="text-xs text-muted-foreground">{item.porcentaje}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Heat Map de Riesgo por Departamento */}
      <ChartCard
        title="Mapa de Riesgo por Departamento"
        description="Evaluación de riesgo de rotación por área"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {antiguedad.riesgoRotacion.map((dept, index) => (
            <div 
              key={index}
              className="p-4 border rounded-lg hover:shadow-md transition-all"
              style={{ 
                borderColor: getRiskColor(dept.riesgo),
                backgroundColor: `${getRiskColor(dept.riesgo)}10`
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">{dept.departamento}</h4>
                <Badge 
                  variant={dept.riesgo === "alto" ? "destructive" : 
                          dept.riesgo === "medio" ? "warning" : "secondary"}
                >
                  {dept.riesgo.toUpperCase()}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Empleados totales</span>
                  <span className="font-mono">
                    {dept.departamento === "Ventas" ? 25 :
                     dept.departamento === "IT" ? 12 : 20}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Antigüedad promedio</span>
                  <span className="font-mono">
                    {dept.departamento === "Ventas" ? "2.1a" :
                     dept.departamento === "IT" ? "3.8a" : "4.2a"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Riesgo de salida</span>
                  <span className="font-mono" style={{ color: getRiskColor(dept.riesgo) }}>
                    {dept.riesgo === "alto" ? "15%" :
                     dept.riesgo === "medio" ? "8%" : "3%"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Predicciones */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <h4 className="font-medium text-foreground mb-3">Predicciones Próximos 6 Meses</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">4-6</div>
              <div className="text-sm text-muted-foreground">Bajas esperadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">12</div>
              <div className="text-sm text-muted-foreground">Empleados en riesgo</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">87%</div>
              <div className="text-sm text-muted-foreground">Retención proyectada</div>
            </div>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}