import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import HomeForm from "../../components/Home/HomeForm";

export default function HomeSetup() {
  return (
    <>
      <PageMeta title="Home Setup | Admin Dashboard" description="Manage main home page content" />
      <PageBreadcrumb pageTitle="Home Setup" />
      <div className="space-y-6">
         <HomeForm />
      </div>
    </>
  );
}
