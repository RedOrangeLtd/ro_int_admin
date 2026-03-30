import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import AboutForm from "../../components/About/AboutForm";

export default function About() {
  return (
    <>
      <PageMeta title="About Content | Admin Dashboard" description="Manage about section" />
      <PageBreadcrumb pageTitle="About Section" />
      
      <div className="w-full max-w-4xl">
        <AboutForm />
      </div>
    </>
  );
}
