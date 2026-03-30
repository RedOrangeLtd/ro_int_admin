import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ContactForm from "../../components/Contact/ContactForm";

export default function Contact() {
  return (
    <>
      <PageMeta title="Contact Info | Admin Dashboard" description="Manage contact section" />
      <PageBreadcrumb pageTitle="Contact Section" />
      
      <div className="w-full max-w-4xl">
        <ContactForm />
      </div>
    </>
  );
}
