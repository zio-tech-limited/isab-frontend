
import ServicesPage from "@/components/home/Service/Service";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "ISAB | Accreditation Services",
        description: "ISAB provides comprehensive accreditation services including Management System Certifications, Inspections Testing & Calibration, Product Certification, and Personnel Certification.",
        keywords: [
            "accreditation", "management system certification", "ISO 17021", "inspection", "testing", "calibration",
            "ISO 17020", "ISO 17025", "product certification", "ISO 17065", "personnel certification", "ISO 17024",
            "ISAB", "accreditation services", "certification body"
        ],
    });
}

const ServicePage = () => {
    return (
        <div className="min-h-screen">
            <ServicesPage />
        </div>
    )
}

export default ServicePage;