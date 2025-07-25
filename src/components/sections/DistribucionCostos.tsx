import { useState } from "react";
import { ChevronDown, Download, Filter } from "lucide-react";
import { ChartCard } from "@/components/ui/chart-card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { nominaData, formatCurrency, formatPercentage } from "@/data/mockData";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

const departamentos = ["Todos", "Ventas", "Operaciones", "Administración", "IT", "RRHH"];
const periodos = ["Mes", "Trimestre", "Año"];

export function DistribucionCostos() {
  const [selectedDepartment, setSelectedDepartment] = useState("Todos");
  const [selectedPeriod, setSelectedPeriod] = useState("Mes");
  const [showPercentages, setShowPercentages] = useState(true);

  const { distribucionCostos } = nominaData;

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Distribución de Costos</h2>
          <p className="text-muted-foreground">Análisis detallado de la estructura de costos de nómina</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filtros:</span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {selectedDepartment}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {departamentos.map((dept) => (
              <DropdownMenuItem 
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {selectedPeriod}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {periodos.map((periodo) => (
              <DropdownMenuItem 
                key={periodo}
                onClick={() => setSelectedPeriod(periodo)}
              >
                {periodo}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          variant={showPercentages ? "default" : "outline"} 
          size="sm"
          onClick={() => setShowPercentages(!showPercentages)}
        >
          {showPercentages ? "%" : "$"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Dona Principal */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Distribución de Costos"
            description="Porcentaje de participación por categoría"
          >
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribucionCostos}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {distribucionCostos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [
                      showPercentages ? `${formatPercentage((value / 1680000) * 100)}` : formatCurrency(value),
                      "Monto"
                    ]}
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Tarjetas de Desglose */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Desglose Detallado</h3>
          
          {distribucionCostos.map((item, index) => (
            <div 
              key={index}
              className="p-4 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-foreground">{item.name}</span>
                </div>
                <Badge variant="secondary">
                  {formatPercentage(item.percentage)}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monto</span>
                  <span className="font-mono font-medium">{formatCurrency(item.value)}</span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: item.color 
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          
          {/* Total */}
          <div className="p-4 bg-gradient-primary text-white rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Nómina Bruta</span>
              <span className="font-mono font-bold text-lg">
                {formatCurrency(1680000)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}