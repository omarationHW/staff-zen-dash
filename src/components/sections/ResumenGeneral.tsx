import { useState, useEffect } from "react";
import { DollarSign, Users, Calculator, TrendingUp, Calendar } from "lucide-react";
import { KPICard } from "@/components/ui/kpi-card";
import { ChartCard } from "@/components/ui/chart-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

interface ApiResponse {
  Ano: number;
  Mes: number;
  Liquido: number;
  Liquido1: number;
  DiferenciaPorcentual: number;
  totalNeto: number;
  totalBruto: number;
  empleadoActivos: number;
  costoPromedio: number;
  neto: number;
  bruto: number;
  empleados: number;
  costo: number;
}

const API_ENDPOINT = "https://harwebdboapiv2-2.azurewebsites.net/api/ApiDashboardCapacitacion?code=MSscINf9LqKZ-cNR7AmyM8o7b49ANAtGiIkjdpTuMo2oAzFuKbhUMg==";
const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InhpbWVuYS5jZXJuYUBoYXJ3ZWJkYm8ubXgiLCJFbWFpbCI6InhpbWVuYS5jZXJuYUBoYXJ3ZWJkYm8ubXgiLCJSb2xlIjoiVXNlcnMiLCJEb21haW4iOiJtcGdzc2NwcmVwcm9kdWNjaW9uLndjbG91ZHNlcnZpY2VzLm14IiwiSGFzaCI6IiIsIkRvbWFpbkhhc2giOiJGRkVCMDkwOUYwQkJFNTQwQTA1QzE1RjdBNEYyQzlGRUEwOTk0M0I4RjRCNDA0NTgxN0EwQTBDRDEwOTM0QjQ5Iiwid2Vic2l0ZSI6Im1wZ3NzY3ByZXByb2R1Y2Npb24ud2Nsb3Vkc2VydmljZXMubXgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9oYXNoIjoiIiwibmJmIjoxNzUzNDc0ODk2LCJleHAiOjE3NTM1NjEyOTYsImlhdCI6MTc1MzQ3NDg5NiwiaXNzIjoiaGFyd2ViZGJvLm14IiwiYXVkIjoiaGFyd2ViZGJvLm14In0.wFTxlBkiSGLPuA9UNzYaKB3tkNtzD2FXu8BFD4rHYPs";

const incidenciasDistribucion = [
  { name: "Faltas", value: nominaData.incidencias.faltas, color: "#ef4444" },
  { name: "Retardos", value: nominaData.incidencias.retardos, color: "#f59e0b" },
  { name: "Incapacidades", value: nominaData.incidencias.incapacidades, color: "#8b5cf6" },
  { name: "Permisos", value: nominaData.incidencias.permisos, color: "#10b981" }
];

export function ResumenGeneral() {
  console.log('ResumenGeneral component loading...');
  console.log('nominaData:', nominaData);
  
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async (mes: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({
          op: "0",
          mes: mes
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: ApiResponse[] = await response.json();
      if (data && data.length > 0) {
        setApiData(data[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(selectedMonth);
  }, [selectedMonth]);

  // Usar datos de la API si están disponibles, sino usar datos mock
  const currentData = apiData || {
    Liquido: nominaData.resumenGeneral.totalNeto,
    Liquido1: nominaData.resumenGeneral.totalBruto,
    empleadoActivos: nominaData.resumenGeneral.empleadosActivos,
    costoPromedio: nominaData.resumenGeneral.costoPromedio,
    DiferenciaPorcentual: nominaData.resumenGeneral.variacionMensual.neto
  };

  const comparativoData = [
    { periodo: "Mes Anterior", neto: currentData.Liquido * 0.95, bruto: currentData.Liquido1 * 0.95 },
    { periodo: "Mes Actual", neto: currentData.Liquido, bruto: currentData.Liquido1 }
  ];

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
        <div className="flex items-center gap-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({length: 12}, (_, i) => i + 1).map((month) => (
                <SelectItem key={month} value={month.toString()}>
                  {new Date(2024, month - 1, 1).toLocaleDateString('es-ES', { month: 'long' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            onClick={() => fetchDashboardData(selectedMonth)} 
            disabled={loading}
            size="sm"
          >
            {loading ? "Cargando..." : "Actualizar"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
          <p className="text-sm font-medium">Error al cargar datos: {error}</p>
        </div>
      )}

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Nómina Neto"
          value={formatCurrency(currentData.Liquido)}
          subtitle="Monto total a pagar"
          trend={{
            direction: currentData.DiferenciaPorcentual >= 0 ? "up" : "down",
            value: `${currentData.DiferenciaPorcentual >= 0 ? '+' : ''}${formatPercentage(Math.abs(currentData.DiferenciaPorcentual))}`,
            label: "vs mes anterior"
          }}
          icon={<DollarSign className="w-5 h-5 text-primary" />}
          variant="primary"
        />

        <KPICard
          title="Total Nómina Bruto"
          value={formatCurrency(currentData.Liquido1)}
          subtitle="Antes de deducciones"
          trend={{
            direction: "up",
            value: `+${formatPercentage(5.2)}`,
            label: "vs mes anterior"
          }}
          icon={<Calculator className="w-5 h-5 text-secondary" />}
          variant="secondary"
        />

        <KPICard
          title="Empleados Activos"
          value={currentData.empleadoActivos || nominaData.resumenGeneral.empleadosActivos}
          subtitle="Personal en nómina"
          trend={{
            direction: "up",
            value: `+${nominaData.resumenGeneral.variacionMensual.empleados}`,
            label: "nuevos empleados"
          }}
          icon={<Users className="w-5 h-5 text-warning" />}
          variant="warning"
        />

        <KPICard
          title="Costo Promedio/Empleado"
          value={formatCurrency(currentData.costoPromedio || (currentData.Liquido / (currentData.empleadoActivos || nominaData.resumenGeneral.empleadosActivos)))}
          subtitle="Costo unitario mensual"
          trend={{
            direction: "up",
            value: `+${formatPercentage(2.8)}`,
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