import PageMeta from "../../components/common/PageMeta";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";

export default function Home() {
  return (
    <>
      <PageMeta
        title="RedOrange Dashboard | RedOrange Admin Dashboard"
        description="This is RedOrange Dashboard page for RedOrange Admin Dashboard"
      />
      <div className="space-y-6">
        <EcommerceMetrics />
        <MonthlySalesChart />
      </div>
    </>
  );
}
