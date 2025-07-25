import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CostosPage from "./pages/CostosPage";
import IncidenciasPage from "./pages/IncidenciasPage";
import CumplimientoPage from "./pages/CumplimientoPage";
import AltasBajasPage from "./pages/AltasBajasPage";
import PlantillaPage from "./pages/PlantillaPage";
import AntiguedadPage from "./pages/AntiguedadPage";
import DocumentacionPage from "./pages/DocumentacionPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/costos" element={<CostosPage />} />
          <Route path="/incidencias" element={<IncidenciasPage />} />
          <Route path="/cumplimiento" element={<CumplimientoPage />} />
          <Route path="/altas-bajas" element={<AltasBajasPage />} />
          <Route path="/plantilla" element={<PlantillaPage />} />
          <Route path="/antiguedad" element={<AntiguedadPage />} />
          <Route path="/documentacion" element={<DocumentacionPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
