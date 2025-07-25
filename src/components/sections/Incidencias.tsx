import { useState } from "react";
import { Search, AlertCircle, Clock, UserX, Calendar } from "lucide-react";
import { ChartCard } from "@/components/ui/chart-card";
import { KPICard } from "@/components/ui/kpi-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { nominaData } from "@/data/mockData";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

const getRiskBadgeVariant = (riesgo: string) => {
  switch (riesgo) {
    case "alto": return "destructive";
    case "medio": return "warning";
    case "bajo": return "secondary";
    default: return "outline";
  }
};

export function Incidencias() {
  const [searchTerm, setSearchTerm] = useState("");
  const { topIncidencias, horasExtrasPorArea, incidencias } = nominaData;

  const filteredIncidencias = topIncidencias.filter(emp => 
    emp.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const asistenciaPromedio = 92;
  const diasTrabajados = 22;
  const diasHabiles = 24;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Incidencias y Variables</h2>
          <p className="text-muted-foreground">Control de asistencia y variables de nómina</p>
        </div>
      </div>

      {/* Métricas de Incidencias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Faltas del Mes"
          value={incidencias.faltas}
          subtitle="Empleados con faltas"
          trend={{
            direction: "down",
            value: "-2",
            label: "vs mes anterior"
          }}
          icon={<UserX className="w-5 h-5 text-destructive" />}
          variant="destructive"
        />

        <KPICard
          title="Retardos"
          value={incidencias.retardos}
          subtitle="Total de retardos"
          trend={{
            direction: "up",
            value: "+5",
            label: "incremento"
          }}
          icon={<Clock className="w-5 h-5 text-warning" />}
          variant="warning"
        />

        <KPICard
          title="Incapacidades"
          value={incidencias.incapacidades}
          subtitle="Personal en incapacidad"
          trend={{
            direction: "neutral",
            value: "=",
            label: "sin cambios"
          }}
          icon={<AlertCircle className="w-5 h-5 text-muted-foreground" />}
        />

        <KPICard
          title="Asistencia Promedio"
          value={`${asistenciaPromedio}%`}
          subtitle="Promedio general"
          trend={{
            direction: "up",
            value: "+1.2%",
            label: "mejora"
          }}
          icon={<Calendar className="w-5 h-5 text-secondary" />}
          variant="secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Control de Asistencia */}
        <ChartCard
          title="Control de Asistencia"
          description="Días trabajados vs días hábiles del mes"
        >
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold font-mono text-secondary mb-2">
                {asistenciaPromedio}%
              </div>
              <p className="text-muted-foreground">Asistencia Promedio</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Días trabajados</span>
                <span className="font-mono">{diasTrabajados}/{diasHabiles}</span>
              </div>
              <Progress value={(diasTrabajados / diasHabiles) * 100} className="h-3" />
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-3 bg-secondary/10 rounded-lg">
                  <div className="text-lg font-bold text-secondary">{diasTrabajados}</div>
                  <div className="text-xs text-muted-foreground">Días Trabajados</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-foreground">{diasHabiles}</div>
                  <div className="text-xs text-muted-foreground">Días Hábiles</div>
                </div>
              </div>
            </div>
          </div>
        </ChartCard>

        {/* Horas Extras por Área */}
        <ChartCard
          title="Horas Extras por Área"
          description="Distribución de horas extras con límites recomendados"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={horasExtrasPorArea}
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#64748b" />
                <YAxis 
                  type="category" 
                  dataKey="area" 
                  tick={{ fontSize: 12 }} 
                  stroke="#64748b"
                  width={75}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [`${value} hrs`, name]}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <ReferenceLine x={100} stroke="#ef4444" strokeDasharray="5 5" />
                <Bar 
                  dataKey="horas" 
                  fill="#2563eb"
                  radius={[0, 4, 4, 0]}
                  name="Horas Extras"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Ranking de Empleados con Incidencias */}
      <ChartCard
        title="Ranking de Empleados con Incidencias"
        description="Top empleados con mayor número de incidencias"
        headerActions={
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar empleado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Empleado</TableHead>
              <TableHead className="text-center">Faltas</TableHead>
              <TableHead className="text-center">Retardos</TableHead>
              <TableHead className="text-center">Puntos Total</TableHead>
              <TableHead className="text-center">Nivel de Riesgo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIncidencias.map((empleado, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium">{empleado.nombre}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="destructive" className="font-mono">
                    {empleado.faltas}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="warning" className="font-mono">
                    {empleado.retardos}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-mono font-bold">{empleado.puntos}</span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={getRiskBadgeVariant(empleado.riesgo)}>
                    {empleado.riesgo.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ChartCard>
    </div>
  );
}