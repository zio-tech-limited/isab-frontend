import ManagementSystemCertificationsPage from "@/components/home/Service/ManagementSystemCertificationsPage";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
    return generateDynamicMetadata({
        title: "ISAB | Management System Certifications",
        description: "ISAB provides accreditation for Management System Certification Bodies under ISO/IEC 17021. Accredited for 19 management system schemes including ISO 9001, ISO 14001, ISO 45001, and more.",
        keywords: [
            "management system certification", "ISO 17021", "ISO 9001", "ISO 14001", "ISO 45001",
            "QMS", "EMS", "OHSAS", "FSMS", "ISMS", "BCMS", "accreditation", "ISAB"
        ],
    });
}

export default function Page() {
    return <ManagementSystemCertificationsPage />;
}