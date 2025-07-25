import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Building, 
  Calendar,
  FileText,
  Menu
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { 
    title: "Resumen General", 
    url: "/", 
    icon: BarChart3,
    description: "Vista general de nómina"
  },
  { 
    title: "Distribución Costos", 
    url: "/costos", 
    icon: DollarSign,
    description: "Análisis de costos"
  },
  { 
    title: "Incidencias", 
    url: "/incidencias", 
    icon: AlertTriangle,
    description: "Variables y asistencia"
  },
  { 
    title: "Cumplimiento", 
    url: "/cumplimiento", 
    icon: CheckCircle,
    description: "Procesos y CFDI"
  },
  { 
    title: "Altas y Bajas", 
    url: "/altas-bajas", 
    icon: Users,
    description: "Movimientos de personal"
  },
  { 
    title: "Plantilla", 
    url: "/plantilla", 
    icon: Building,
    description: "Por departamento"
  },
  { 
    title: "Antigüedad", 
    url: "/antiguedad", 
    icon: Calendar,
    description: "Permanencia y retención"
  },
  { 
    title: "Documentación", 
    url: "/documentacion", 
    icon: FileText,
    description: "Expedientes"
  },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r transition-all duration-300`}>
      <SidebarContent className="bg-sidebar">
        {/* Logo Section */}
        <div className="p-4 border-b border-sidebar-border">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-sidebar-foreground">NóminaApp</h2>
                <p className="text-xs text-muted-foreground">Dashboard RRHH</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navegación Principal
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`
                      ${isActive(item.url) 
                        ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                        : "hover:bg-sidebar-accent text-sidebar-foreground"
                      }
                      transition-all duration-200
                    `}
                  >
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-3 py-2"
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-sm">{item.title}</span>
                          <p className="text-xs opacity-75 truncate">{item.description}</p>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collapse Toggle */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <SidebarTrigger className="w-full">
            <Menu className="w-4 h-4" />
            {!collapsed && <span className="ml-2 text-sm">Colapsar</span>}
          </SidebarTrigger>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}