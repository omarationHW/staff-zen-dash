import { Building, Users, UserPlus, Search, MoreHorizontal } from "lucide-react";
import { ChartCard } from "@/components/ui/chart-card";
import { KPICard } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { nominaData } from "@/data/mockData";
import { 
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const capacityColors = {
  lleno: "#ef4444",
  alto: "#f59e0b", 
  medio: "#10b981",
  bajo: "#2563eb"
};

const getCapacityStatus = (empleados: number, capacidad: number) => {
  const porcentaje = (empleados / capacidad) * 100;
  if (porcentaje >= 95) return "lleno";
  if (porcentaje >= 80) return "alto";
  if (porcentaje >= 60) return "medio";
  return "bajo";
};

const getCapacityColor = (status: string) => {
  return capacityColors[status as keyof typeof capacityColors];
};

export function Plantilla() {
  const { plantillaDepartamentos } = nominaData;
  
  const totalEmpleados = plantillaDepartamentos.reduce((sum, dept) => sum + dept.empleados, 0);
  const totalVacantes = plantillaDepartamentos.reduce((sum, dept) => sum + dept.vacantes, 0);
  const totalCapacidad = plantillaDepartamentos.reduce((sum, dept) => sum + dept.capacidad, 0);
  const ocupacionPromedio = (totalEmpleados / totalCapacidad) * 100;

  // Datos para el treemap
  const treemapData = plantillaDepartamentos.map(dept => ({
    name: dept.departamento,
    value: dept.empleados,
    empleados: dept.empleados,
    capacidad: dept.capacidad,
    vacantes: dept.vacantes
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Plantilla por Departamento</h2>
          <p className="text-muted-foreground">Distribución y capacidad organizacional</p>
        </div>
        
        <Button className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Nueva Vacante
        </Button>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Empleados"
          value={totalEmpleados}
          subtitle="Personal activo"
          trend={{
            direction: "up",
            value: "+3",
            label: "vs mes anterior"
          }}
          icon={<Users className="w-5 h-5 text-primary" />}
          variant="primary"
        />

        <KPICard
          title="Vacantes Activas"
          value={totalVacantes}
          subtitle="Posiciones disponibles"
          trend={{
            direction: "up",
            value: "+2",
            label: "nuevas vacantes"
          }}
          icon={<UserPlus className="w-5 h-5 text-secondary" />}
          variant="secondary"
        />

        <KPICard
          title="Capacidad Total"
          value={totalCapacidad}
          subtitle="Máximo autorizado"
          icon={<Building className="w-5 h-5 text-muted-foreground" />}
        />

        <KPICard
          title="Ocupación Promedio"
          value={`${ocupacionPromedio.toFixed(1)}%`}
          subtitle="Nivel de ocupación"
          trend={{
            direction: "up",
            value: "+2.1%",
            label: "incremento"
          }}
          icon={<Building className="w-5 h-5 text-warning" />}
          variant="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organigrama Visual */}
        <ChartCard
          title="Mapa de Organización"
          description="Visualización de la estructura organizacional"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={treemapData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Leyenda de colores */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded-full" />
              <span className="text-xs">Lleno (95%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-xs">Alto (80-95%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded-full" />
              <span className="text-xs">Medio (60-80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-xs">Bajo (&lt;60%)</span>
            </div>
          </div>
        </ChartCard>

        {/* Vacantes Activas */}
        <ChartCard
          title="Proceso de Reclutamiento"
          description="Estado de vacantes activas"
          headerActions={
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar posición..." className="w-48" />
            </div>
          }
        >
          <div className="space-y-4">
            {[
              { posicion: "Desarrollador Senior", departamento: "IT", tiempo: "15 días", estado: "Entrevistas" },
              { posicion: "Analista de Ventas", departamento: "Ventas", tiempo: "8 días", estado: "CV Review" },
              { posicion: "Coordinador", departamento: "Operaciones", tiempo: "22 días", estado: "Oferta" },
              { posicion: "Asistente Admin", departamento: "Administración", tiempo: "5 días", estado: "Publicado" }
            ].map((vacante, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{vacante.posicion}</h4>
                    <p className="text-sm text-muted-foreground">{vacante.departamento}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{vacante.estado}</Badge>
                      <span className="text-xs text-muted-foreground">{vacante.tiempo}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progreso</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Cards Departamentales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plantillaDepartamentos.map((dept, index) => {
          const ocupacion = (dept.empleados / dept.capacidad) * 100;
          const status = getCapacityStatus(dept.empleados, dept.capacidad);
          
          return (
            <ChartCard
              key={index}
              title={dept.departamento}
              description={`${dept.empleados} de ${dept.capacidad} empleados`}
            >
              <div className="space-y-4">
                {/* Indicador circular de ocupación */}
                <div className="flex items-center justify-center">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-muted"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={getCapacityColor(status)}
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - ocupacion / 100)}`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-bold">{ocupacion.toFixed(0)}%</div>
                        <div className="text-xs text-muted-foreground">Ocupación</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Métricas del departamento */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-primary/10 rounded">
                    <div className="font-bold text-primary">{dept.empleados}</div>
                    <div className="text-xs text-muted-foreground">Empleados</div>
                  </div>
                  <div className="p-2 bg-secondary/10 rounded">
                    <div className="font-bold text-secondary">{dept.vacantes}</div>
                    <div className="text-xs text-muted-foreground">Vacantes</div>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <div className="font-bold">{dept.capacidad}</div>
                    <div className="text-xs text-muted-foreground">Capacidad</div>
                  </div>
                </div>

                {/* Estado de capacidad */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Estado:</span>
                  <Badge 
                    variant={
                      status === "lleno" ? "destructive" : 
                      status === "alto" ? "warning" : 
                      status === "medio" ? "secondary" : "outline"
                    }
                  >
                    {status === "lleno" ? "COMPLETO" :
                     status === "alto" ? "ALTO" :
                     status === "medio" ? "NORMAL" : "DISPONIBLE"}
                  </Badge>
                </div>
              </div>
            </ChartCard>
          );
        })}
      </div>
    </div>
  );
}