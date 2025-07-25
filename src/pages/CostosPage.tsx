import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DistribucionCostos } from "@/components/sections/DistribucionCostos";

const CostosPage = () => {
  return (
    <DashboardLayout>
      <DistribucionCostos />
    </DashboardLayout>
  );
};

export default CostosPage;